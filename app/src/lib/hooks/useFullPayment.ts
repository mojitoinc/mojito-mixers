import { ApolloError } from "@apollo/client";
import { useState, useCallback } from "react";
import { SelectedPaymentMethod } from "../components/payments/CheckoutModal/CheckoutModal";
import { SavedPaymentMethod } from "../domain/circle/circle.interfaces";
import { parseCircleError, savedPaymentMethodToBillingInfo } from "../domain/circle/circle.utils";
import { PaymentStatus } from "../domain/payment/payment.interfaces";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { BillingInfo } from "../forms/BillingInfoForm";
import { useCreateAuctionInvoiceMutation, useCreateBuyNowInvoiceMutation, useCreatePaymentMutation } from "../queries/graphqlGenerated";
import { wait } from "../utils/promiseUtils";
import { useCreatePaymentMethod } from "./useCreatePaymentMethod";

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
  paymentError?: string;
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

  const {
    billingInfo: selectedBillingInfo,
    paymentInfo: selectedPaymentInfo,
  } = selectedPaymentMethod;

  const [createPaymentMethod] = useCreatePaymentMethod();
  const [createAuctionInvoice] = useCreateAuctionInvoiceMutation();
  const [createBuyNowInvoice] = useCreateBuyNowInvoiceMutation();
  const [makePayment] = useCreatePaymentMutation();

  const fullPayment = useCallback(async () => {
    // TODO: Quick fix. The UI can currently display multiple items with multiple units each, but will only purchase the
    // selected amount (can be multiple units) of the first item:

    const {
      lotID,
      lotType,
      units,
    } = checkoutItems[0];

    if (debug) console.log(`\n💵 Making payment for ${ units } × ${ lotType } lot ${ lotID } (orgID = ${ orgID })...\n`);

    if (checkoutItems.length === 0) {
      setPaymentState({
        paymentStatus: "error",
        paymentReferenceNumber: "",
        paymentError: "Missing lot information.",
      });

      return;
    }

    setPaymentState({
      paymentStatus: "processing",
      paymentReferenceNumber: "",
    });

    let paymentMethodID = "";
    let invoiceID = existingInvoiceID;
    let circlePaymentID = "";
    let errorMessage = "";
    let fieldErrors: Record<string, string> = {};
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
          setPaymentState({
            paymentStatus: "error",
            paymentReferenceNumber: "",
            paymentError: errorMessage || "Could not find the selected payment method.",
          });

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
        const parsedCircleError = parseCircleError(error);

        if (debug) console.log("    🔴 createPaymentMethod error", parsedCircleError, error);

        if (typeof parsedCircleError === "string") errorMessage = parsedCircleError;
        else fieldErrors = parsedCircleError;
      });

      paymentMethodCreatedAt = Date.now();

      if (createPaymentMethodResult && !createPaymentMethodResult.errors) {
        if (debug) console.log("    🟢 createPaymentMethod result", createPaymentMethodResult);

        paymentMethodID = createPaymentMethodResult.data?.createPaymentMethod?.id || "";
      }
    }

    if (!paymentMethodID) {
      setPaymentState({
        paymentStatus: "error",
        paymentReferenceNumber: "",
        paymentError: errorMessage || "Error creating payment method.",
      });

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
          if (debug) console.log("    🔴 createBuyNowInvoice error", error);
        });

        if (createBuyNowInvoiceResult && !createBuyNowInvoiceResult.errors) {
          if (debug) console.log("    🟢 createBuyNowInvoice result", createBuyNowInvoiceResult);

          invoiceID = createBuyNowInvoiceResult.data?.purchaseMarketplaceBuyNowLot?.invoice?.invoiceID;
        }
      }
    }

    if (!invoiceID) {
      setPaymentState({
        paymentStatus: "error",
        paymentReferenceNumber: "",
        paymentError: errorMessage || "Error creating invoice",
      });

      return;
    }

    if (debug) {
      console.log("  💸 makePayment", {
        paymentMethodID,
        invoiceID,
      });
    }

    const paymentMethodStatusWaitTime = Math.max(CIRCLE_MAX_EXPECTED_PAYMENT_CREATION_PROCESSING_TIME - (Date.now() - paymentMethodCreatedAt), 0);

    if (paymentMethodStatusWaitTime) await wait(paymentMethodStatusWaitTime);

    const makePaymentResult = await makePayment({
      variables: {
        paymentMethodID,
        invoiceID,
      },
    }).catch((error: ApolloError | Error) => {
      // TODO: Cancel invoice?

      if (debug) console.log("    🔴 makePayment error", error);
    });

    if (makePaymentResult && !makePaymentResult.errors) {
      if (debug) console.log("    🟢 makePayment result", makePaymentResult);

      circlePaymentID = makePaymentResult.data?.createPayment?.circlePaymentID || "";
    }

    if (!circlePaymentID) {
      setPaymentState({
        paymentStatus: "error",
        paymentReferenceNumber: "",
        paymentError: errorMessage || "Error while trying to make the payment.",
      });

      return;
    }

    // TODO: Error handling and automatic retry:

    // TODO: After this, refetch payment methods... Maybe after creation?

    setPaymentState({
      paymentStatus: "processed",
      paymentReferenceNumber: circlePaymentID,
    });
  }, [checkoutItems, createAuctionInvoice, createBuyNowInvoice, createPaymentMethod, debug, existingInvoiceID, makePayment, orgID, savedPaymentMethods, selectedBillingInfo, selectedPaymentInfo]);

  return [paymentState, fullPayment];
}
