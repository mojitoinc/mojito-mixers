import { ApolloError } from "@apollo/client";
import { useState, useCallback } from "react";
import { CheckoutModalError, SelectedPaymentMethod } from "../components/payments/CheckoutModal/CheckoutModal.hooks";
import { SavedPaymentMethod } from "../domain/circle/circle.interfaces";
import { CircleFieldErrors, parseCircleError, savedPaymentMethodToBillingInfo } from "../domain/circle/circle.utils";
import { ERROR_PURCHASE_CREATING_INVOICE, ERROR_PURCHASE_CREATING_PAYMENT_METHOD, ERROR_PURCHASE_CVV, ERROR_PURCHASE_LOADING_ITEMS, ERROR_PURCHASE_NO_ITEMS, ERROR_PURCHASE_NO_UNITS, ERROR_PURCHASE_PAYING, ERROR_PURCHASE_SELECTED_PAYMENT_METHOD } from "../domain/errors/errors.constants";
import { PaymentStatus } from "../domain/payment/payment.interfaces";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { BillingInfo } from "../forms/BillingInfoForm";
import { CreatePaymentMetadataInput, useCreateAuctionInvoiceMutation, useCreateBuyNowInvoiceMutation, useCreatePaymentMutation } from "../queries/graphqlGenerated";
import { wait } from "../utils/promiseUtils";
import { useCreatePaymentMethod } from "./useCreatePaymentMethod";
import { useEncryptCardData } from "./useEncryptCard";

const CIRCLE_MAX_EXPECTED_PAYMENT_CREATION_PROCESSING_TIME = 5000;

export interface UseFullPaymentOptions {
  orgID: string;
  invoiceID?: string;
  checkoutItems: CheckoutItem[];
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethod: SelectedPaymentMethod;
  debug?: boolean;
}

export interface PaymentState {
  paymentStatus: PaymentStatus;
  paymentReferenceNumber: string;
  paymentError?: string | CheckoutModalError;
}

export function useFullPayment({
  orgID,
  invoiceID: existingInvoiceID = "",
  checkoutItems,
  savedPaymentMethods,
  selectedPaymentMethod,
  debug = false,
}: UseFullPaymentOptions): [PaymentState, () => Promise<void>] {
  const [paymentState, setPaymentState] = useState<PaymentState>({
    paymentStatus: "processing",
    paymentReferenceNumber: "",
  });

  const setError = useCallback((paymentError: string | CheckoutModalError) => {
    setPaymentState({
      paymentStatus: "error",
      paymentReferenceNumber: "",
      paymentError,
    });
  }, []);

  const [encryptCardData] = useEncryptCardData();
  const [createPaymentMethod] = useCreatePaymentMethod();
  const [createAuctionInvoice] = useCreateAuctionInvoiceMutation();
  const [createBuyNowInvoice] = useCreateBuyNowInvoiceMutation();
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

    // TODO: Quick fix. The UI can currently display multiple items with multiple units each, but will only purchase the
    // selected amount (can be multiple units) of the first item:
    const {
      lotID,
      lotType,
      units,
    } = checkoutItems[0];

    if (debug) {
      console.log(checkoutItems[0]
        ? `\n💵 Making payment for ${ units } × ${ lotType } lot${ units > 1 ? "s" : "" }  ${ lotID } (orgID = ${ orgID })...\n`
        : `\n💵 Making payment for unknown lot (orgID = ${ orgID })...\n` );
    }

    if (checkoutItems.length === 0) {
      setError(ERROR_PURCHASE_NO_ITEMS());

      return;
    }

    if (!units) {
      setError(ERROR_PURCHASE_NO_UNITS());

      return;
    }

    if (!lotID || !lotType) {
      setError(ERROR_PURCHASE_LOADING_ITEMS());

      return;
    }

    setPaymentState({
      paymentStatus: "processing",
      paymentReferenceNumber: "",
    });

    let paymentMethodID = "";
    let invoiceID = existingInvoiceID;
    let circlePaymentID = "";
    let mutationError: ApolloError | Error;
    let circleFieldErrors: CircleFieldErrors;
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

        const parsedCircleErrors = parseCircleError(error);

        if (debug) console.log("    🔴 createPaymentMethod error", error, parsedCircleErrors);

        if (parsedCircleErrors) circleFieldErrors = parsedCircleErrors;
      });

      paymentMethodCreatedAt = Date.now();

      if (createPaymentMethodResult && !createPaymentMethodResult.errors) {
        if (debug) console.log("    🟢 createPaymentMethod result", createPaymentMethodResult);

        paymentMethodID = createPaymentMethodResult.data?.createPaymentMethod?.id || "";
      }
    }

    if (!paymentMethodID) {
      setError(circleFieldErrors ? {
        at: circleFieldErrors.firstAt,
        circleFieldErrors,
        error: mutationError,
        errorMessage: circleFieldErrors.summary,
      } : ERROR_PURCHASE_CREATING_PAYMENT_METHOD(mutationError));

      return;
    }

    if (debug) {
      console.log("  🧾 createAuctionInvoice", {
        orgID,
        lotID,
      });
    }

    /*
    if (lotType === "auction" && !invoiceID) {
      setPaymentState({
        paymentStatus: "error",
        paymentReferenceNumber: "",
        paymentError: "Missing auction invoice.",
      });

      return;
    }
    */

    if (!invoiceID) {
      if (lotType === "auction") {
        const createAuctionInvoiceResult = await createAuctionInvoice({
          variables: {
            orgID,
            lotID,
          },
        }).catch((error: ApolloError | Error) => {
          mutationError = error;

          if (debug) console.log("    🔴 createAuctionInvoice error", error);
        });

        if (createAuctionInvoiceResult && !createAuctionInvoiceResult.errors) {
          if (debug) console.log("    🟢 createAuctionInvoice result", createAuctionInvoiceResult);

          invoiceID = createAuctionInvoiceResult.data?.createAuctionLotInvoice?.invoiceID;
        }
      } else if (lotType === "buyNow") {
        const createBuyNowInvoiceResult = await createBuyNowInvoice({
          variables: {
            input: {
              itemCount: units,
              marketplaceBuyNowLotID: lotID,
            },
          },
        }).catch((error: ApolloError | Error) => {
          mutationError = error;

          if (debug) console.log("    🔴 createBuyNowInvoice error", error);
        });

        if (createBuyNowInvoiceResult && !createBuyNowInvoiceResult.errors) {
          if (debug) console.log("    🟢 createBuyNowInvoice result", createBuyNowInvoiceResult);

          invoiceID = createBuyNowInvoiceResult.data?.purchaseMarketplaceBuyNowLot?.invoice?.invoiceID;
        }
      }
    }

    if (!invoiceID) {
      setError(ERROR_PURCHASE_CREATING_INVOICE(mutationError));

      return;
    }

    if (debug) {
      console.log("  💸 makePayment", {
        paymentMethodID,
        invoiceID,
      });
    }


    let metadata: CreatePaymentMetadataInput | null = null;

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

      metadata = {
        creditCardData: {
          keyID,
          encryptedData: encryptedCardData,
        },
      };
    }

    const paymentMethodStatusWaitTime = Math.max(CIRCLE_MAX_EXPECTED_PAYMENT_CREATION_PROCESSING_TIME - (Date.now() - paymentMethodCreatedAt), 0);

    if (paymentMethodStatusWaitTime) await wait(paymentMethodStatusWaitTime);

    const makePaymentResult = await makePayment({
      variables: {
        paymentMethodID,
        invoiceID,
        metadata,
      },
    }).catch((error: ApolloError | Error) => {
      mutationError = error;

      // TODO: Cancel invoice?

      if (debug) console.log("    🔴 makePayment error", error);
    });

    if (makePaymentResult && !makePaymentResult.errors) {
      if (debug) console.log("    🟢 makePayment result", makePaymentResult);

      circlePaymentID = makePaymentResult.data?.createPayment?.circlePaymentID || "";
    }

    if (!circlePaymentID) {
      setError(ERROR_PURCHASE_PAYING(mutationError));

      return;
    }

    // TODO: Error handling and automatic retry:

    setPaymentState({
      paymentStatus: "processed",
      paymentReferenceNumber: circlePaymentID,
    });
  }, [
    checkoutItems,
    createAuctionInvoice,
    createBuyNowInvoice,
    createPaymentMethod,
    debug,
    encryptCardData,
    existingInvoiceID,
    makePayment,
    orgID,
    savedPaymentMethods,
    selectedPaymentMethod,
    setError,
  ]);

  return [paymentState, fullPayment];
}
