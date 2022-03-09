import { ApolloError } from "@apollo/client";
import { useState, useCallback } from "react";
import { CheckoutModalError, SelectedPaymentMethod } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { PAYMENT_CREATION_MIN_WAIT_MS } from "../config/config";
import { SavedPaymentMethod } from "../domain/circle/circle.interfaces";
import { parseCircleError, savedPaymentMethodToBillingInfo } from "../domain/circle/circle.utils";
import { ERROR_PURCHASE_CREATING_PAYMENT_METHOD, ERROR_PURCHASE_CVV, ERROR_PURCHASE_NO_ITEMS, ERROR_PURCHASE_PAYING, ERROR_PURCHASE_SELECTED_PAYMENT_METHOD } from "../domain/errors/errors.constants";
import { PaymentStatus } from "../domain/payment/payment.interfaces";
import { BillingInfo } from "../forms/BillingInfoForm";
import { CreatePaymentMetadataInput, useCreatePaymentMutation } from "../queries/graphqlGenerated";
import { wait } from "../utils/promiseUtils";
import { useCreatePaymentMethod } from "./useCreatePaymentMethod";
import { useEncryptCardData } from "./useEncryptCard";

export interface UseFullPaymentOptions {
  orgID: string;
  invoiceID: string;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethod: SelectedPaymentMethod;
  walletAddress: string | null;
  debug?: boolean;
}

export interface FullPaymentState {
  paymentStatus: PaymentStatus;
  circlePaymentID: string;
  paymentID: string;
  paymentError?: string | CheckoutModalError;
}

export function useFullPayment({
  orgID,
  invoiceID,
  savedPaymentMethods,
  selectedPaymentMethod,
  walletAddress,
  debug = false,
}: UseFullPaymentOptions): [FullPaymentState, () => Promise<void>] {
  const [paymentState, setPaymentState] = useState<FullPaymentState>({
    paymentStatus: "processing",
    circlePaymentID: "",
    paymentID: ""
  });

  const setError = useCallback((paymentError: string | CheckoutModalError) => {
    setPaymentState({
      paymentStatus: "error",
      circlePaymentID: "",
      paymentID: "",
      paymentError,
    });
  }, []);

  const [encryptCardData] = useEncryptCardData();
  const [createPaymentMethod] = useCreatePaymentMethod({ debug });
  const [makePayment] = useCreatePaymentMutation();

  const fullPayment = useCallback(async () => {
    const {
      billingInfo: selectedBillingInfo,
      paymentInfo: selectedPaymentInfo,
    } = selectedPaymentMethod;

    let cvv = "";

    if (typeof selectedPaymentInfo === "string") {
      cvv = selectedPaymentMethod.cvv;
    } else if (selectedPaymentInfo.type === "CreditCard") {
      cvv = selectedPaymentInfo.secureCode;
    }

    if (debug) {
      console.log(invoiceID
        ? `\n💵 Making payment for invoice ${invoiceID} (orgID = ${orgID})...\n`
        : `\n💵 Aborting payment for unknown invoice (orgID = ${orgID})...\n`
      );
    }

    if (!invoiceID) {
      setError(ERROR_PURCHASE_NO_ITEMS());

      return;
    }

    setPaymentState({
      paymentStatus: "processing",
      circlePaymentID: "",
      paymentID: "",
    });

    let paymentMethodID = "";
    let circlePaymentID = "";
    let paymentID = "";
    let mutationError: ApolloError | Error | undefined = undefined;
    let checkoutError: CheckoutModalError | undefined = undefined;
    let paymentMethodCreatedAt = 0;

    if (typeof selectedPaymentInfo === "string") {
      // If selectedPaymentInfo is a payment method ID, that's all we need, no need to create a new payment method:
      paymentMethodID = selectedPaymentInfo;
    } else {
      let selectedBillingInfoData: BillingInfo;

      if (typeof selectedBillingInfo === "string") {

        // If selectedPaymentInfo is an object and selectedBillingInfo is an addressID, we need to find the matching
        // data in savedPaymentMethods:
        const selectedPaymentMethod = savedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo);

        if (!selectedPaymentMethod) {
          setError(ERROR_PURCHASE_SELECTED_PAYMENT_METHOD());

          return;
        }

        selectedBillingInfoData = savedPaymentMethodToBillingInfo(selectedPaymentMethod);
      } else {
        // If both selectedPaymentInfo and selectedBillingInfo are objects, we just create a new payment method with them:
        selectedBillingInfoData = selectedBillingInfo;
      }

      if (debug) {
        console.log("  💳 createPaymentMethod", {
          orgID,
          selectedBillingInfoData,
          selectedPaymentInfo,
        });
      }

      const createPaymentMethodResult = await createPaymentMethod(
        orgID,
        selectedBillingInfoData,
        selectedPaymentInfo,
      ).catch((error: ApolloError | Error) => {
        mutationError = error;

        const circleFieldErrors = parseCircleError(error);

        if (debug) console.log("      🔴 createPaymentMethod error", error, circleFieldErrors);

        if (circleFieldErrors) {
          checkoutError = {
            at: circleFieldErrors.firstAt,
            error: mutationError,
            circleFieldErrors,
            errorMessage: circleFieldErrors.summary,
          };
        }
      });

      paymentMethodCreatedAt = Date.now();

      if (createPaymentMethodResult && !createPaymentMethodResult.errors) {
        if (debug) console.log("      🟢 createPaymentMethod result", createPaymentMethodResult);

        paymentMethodID = createPaymentMethodResult.data?.createPaymentMethod?.id || "";
      }
    }

    if (!paymentMethodID) {
      setError(checkoutError || ERROR_PURCHASE_CREATING_PAYMENT_METHOD(mutationError));

      return;
    }

    if (debug) {
      console.log("  💸 makePayment", {
        paymentMethodID,
        invoiceID,
      });
    }

    const metadata: Partial<CreatePaymentMetadataInput> = walletAddress ? {
      destinationAddress: walletAddress,
    } : { };

    if (cvv) {
      const encryptCardDataResult = await encryptCardData({
        cvv,
      }).catch((error: ApolloError | Error) => {
        mutationError = error;

        // TODO: Cancel invoice?

        if (debug) console.log("    🔴 encryptCardData error", error);
      });

      if (!encryptCardDataResult) {
        setError(ERROR_PURCHASE_CVV(mutationError));

        return;
      }

      const { keyID, encryptedCardData } = encryptCardDataResult;

      metadata.creditCardData = {
        keyID,
        encryptedData: encryptedCardData,
      };
    }

    const paymentMethodStatusWaitTime = Math.max(PAYMENT_CREATION_MIN_WAIT_MS - (Date.now() - paymentMethodCreatedAt), 0);

    if (paymentMethodStatusWaitTime > 0) await wait(paymentMethodStatusWaitTime);

    const makePaymentResult = await makePayment({
      variables: {
        paymentMethodID,
        invoiceID,
        metadata: Object.keys(metadata).length > 0 ? (metadata as CreatePaymentMetadataInput) : undefined,
      },
    }).catch((error: ApolloError | Error) => {
      mutationError = error;

      if (debug) console.log("    🔴 makePayment error", error);
    });

    if (makePaymentResult && !makePaymentResult.errors) {
      if (debug) console.log("    🟢 makePayment result", makePaymentResult);

      circlePaymentID = makePaymentResult.data?.createPayment?.circlePaymentID || "";
      paymentID = makePaymentResult.data?.createPayment?.id || "";
    }

    if (!circlePaymentID) {
      setError(ERROR_PURCHASE_PAYING(mutationError));

      return;
    }

    // TODO: Error handling and automatic retry:

    setPaymentState({
      paymentStatus: "processed",
      circlePaymentID,
      paymentID
    });
  }, [
    orgID,
    invoiceID,
    savedPaymentMethods,
    selectedPaymentMethod,
    walletAddress,
    debug,
    setError,
    encryptCardData,
    createPaymentMethod,
    makePayment,
  ]);

  return [paymentState, fullPayment];
}
