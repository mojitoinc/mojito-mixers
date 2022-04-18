import { ApolloError } from "@apollo/client";
import { useState, useCallback } from "react";
import { CheckoutModalError, SelectedPaymentMethod } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { SavedPaymentMethod } from "../domain/circle/circle.interfaces";
import { savedPaymentMethodToBillingInfo } from "../domain/circle/circle.utils";
import { ERROR_PURCHASE_CREATING_PAYMENT_METHOD, ERROR_PURCHASE_CVV, ERROR_PURCHASE_NO_ITEMS, ERROR_PURCHASE_PAYING, ERROR_PURCHASE_SELECTED_PAYMENT_METHOD } from "../domain/errors/errors.constants";
import { PaymentStatus } from "../domain/payment/payment.interfaces";
import { Wallet } from "../domain/wallet/wallet.interfaces";
import { filterSpecialWalletAddressValues } from "../domain/wallet/wallet.utils";
import { BillingInfo } from "../forms/BillingInfoForm";
import { CreatePaymentMetadataInput, useCreatePaymentMutation } from "../queries/graphqlGenerated";
import { useCreatePaymentMethod } from "./useCreatePaymentMethod";
import { useEncryptCardData } from "./useEncryptCard";

export interface UseFullPaymentOptions {
  orgID: string;
  invoiceID: string;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethod: SelectedPaymentMethod;
  wallet: null | string | Wallet;
  debug?: boolean;
}

export interface FullPaymentState {
  paymentStatus: PaymentStatus;
  processorPaymentID: string;
  paymentID: string;
  paymentError?: string | CheckoutModalError;
}

export function useFullPayment({
  orgID,
  invoiceID,
  savedPaymentMethods,
  selectedPaymentMethod,
  wallet,
  debug = false,
}: UseFullPaymentOptions): [FullPaymentState, () => Promise<void>] {
  const [paymentState, setPaymentState] = useState<FullPaymentState>({
    paymentStatus: "processing",
    processorPaymentID: "",
    paymentID: ""
  });

  const setError = useCallback((paymentError: string | CheckoutModalError) => {
    setPaymentState({
      paymentStatus: "error",
      processorPaymentID: "",
      paymentID: "",
      paymentError,
    });
  }, []);

  const [encryptCardData] = useEncryptCardData({ orgID });
  const [createPaymentMethod] = useCreatePaymentMethod({ orgID, debug });
  const [makePayment] = useCreatePaymentMutation();

  const fullPayment = useCallback(async () => {
    const {
      billingInfo: selectedBillingInfo,
      paymentInfo: selectedPaymentInfo,
    } = selectedPaymentMethod;

    if (selectedPaymentInfo === null) {
      setError(ERROR_PURCHASE_CREATING_PAYMENT_METHOD());

      return;
    }

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
      processorPaymentID: "",
      paymentID: "",
    });

    let paymentMethodID = "";
    let processorPaymentID = "";
    let paymentID = "";
    let mutationError: ApolloError | Error | undefined = undefined;

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
        selectedBillingInfoData,
        selectedPaymentInfo,
      ).catch((error: ApolloError | Error) => {
        mutationError = error;

        if (debug) console.log("      🔴 createPaymentMethod error", error);
      });

      if (createPaymentMethodResult && !createPaymentMethodResult.errors) {
        if (debug) console.log("      🟢 createPaymentMethod result", createPaymentMethodResult);

        paymentMethodID = createPaymentMethodResult.data?.createPaymentMethod?.id || "";
      }
    }

    if (!paymentMethodID) {
      setError(ERROR_PURCHASE_CREATING_PAYMENT_METHOD(mutationError));

      return;
    }

    if (debug) {
      console.log("  💸 makePayment", {
        paymentMethodID,
        invoiceID,
      });
    }

    let destinationAddress = "";

    if (typeof wallet === "object") {
      destinationAddress = wallet?.address || "";
    } else {
      destinationAddress = filterSpecialWalletAddressValues(wallet);
    }

    const metadata: Partial<CreatePaymentMetadataInput> = destinationAddress ? { destinationAddress } : { };

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

      processorPaymentID = makePaymentResult.data?.createPayment?.processorPaymentID || "";
      paymentID = makePaymentResult.data?.createPayment?.id || "";
    }

    if (!processorPaymentID) {
      setError(ERROR_PURCHASE_PAYING(mutationError));

      return;
    }

    // TODO: Error handling and automatic retry:

    setPaymentState({
      paymentStatus: "processed",
      processorPaymentID,
      paymentID
    });
  }, [
    orgID,
    invoiceID,
    savedPaymentMethods,
    selectedPaymentMethod,
    wallet,
    debug,
    setError,
    encryptCardData,
    createPaymentMethod,
    makePayment,
  ]);

  return [paymentState, fullPayment];
}
