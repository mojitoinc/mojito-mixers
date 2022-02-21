import { useEffect, useRef, useState } from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { useFullPayment } from "../../hooks/useFullPayment";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTimeout, useInterval } from "@swyg/corre";
import { CheckoutModalError, SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { CheckoutItem } from "../..";
import { ERROR_PURCHASE } from "../../domain/errors/errors.constants";
import { XS_MOBILE_MAX_WIDTH } from "../../config/theme/theme";
import { StatusIcon } from "../../components/shared/StatusIcon/StatusIcon";
import { useGetPaymentNotificationQuery } from "../../queries/graphqlGenerated";
import { persistCheckoutModalInfo } from "../../components/public/CheckoutOverlay/CheckoutOverlay.utils";

// TODO: Move these to theme or similar config file:

const PURCHASING_MIN_WAIT_MS = 3000;

const PURCHASING_MESSAGES_INTERVAL_MS = 5000;

const PAYMENT_NOTIFICATION_INTERVAL_MS = 1500;

const PURCHASING_MESSAGES_DEFAULT = [
  "Muddling mint and lime.",
  "Topping up with club soda.",
  "Adding rum, lime juice and ice.",
  "Shaking things up!",
];

export interface PurchasingViewProps {
  purchasingImageSrc?: string;
  purchasingMessages?: false | string[];
  orgID: string;
  invoiceID?: string;
  checkoutItems: CheckoutItem[];
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethod: SelectedPaymentMethod;
  onPurchaseSuccess: (paymentReferenceNumber: string) => void;
  onPurchaseError: (error: string | CheckoutModalError) => void;
  onDialogBlocked: (blocked: boolean) => void;
  debug?: boolean;
}

export const PurchasingView: React.FC<PurchasingViewProps> = ({
  purchasingImageSrc,
  purchasingMessages: customPurchasingMessages,
  orgID,
  invoiceID: existingInvoiceID,
  checkoutItems,
  savedPaymentMethods,
  selectedPaymentMethod,
  onPurchaseSuccess,
  onPurchaseError,
  onDialogBlocked,
  debug,
}) => {
  const [paymentState, fullPayment] = useFullPayment({
    orgID,
    invoiceID: existingInvoiceID,
    checkoutItems,
    savedPaymentMethods,
    selectedPaymentMethod,
    debug,
  });

  const paymentNotificationResult = useGetPaymentNotificationQuery({
    skip: paymentState.paymentStatus !== "processed",
    pollInterval: PAYMENT_NOTIFICATION_INTERVAL_MS,
  });

  let purchasingMessages = customPurchasingMessages;

  if (purchasingMessages === false) {
    purchasingMessages = []
  } else if (purchasingMessages === undefined || purchasingMessages.length === 0) {
    purchasingMessages = PURCHASING_MESSAGES_DEFAULT;
  }

  const [hasWaited, setHasWaited] = useState(false);
  const [purchasingMessageIndex, setPurchasingMessageIndex] = useState(0);
  const purchasingMessage = purchasingMessages[purchasingMessageIndex];
  const redirectURL = paymentNotificationResult.data?.getPaymentNotification?.message?.redirectURL || "";
  const { billingInfo, paymentInfo, cvv } = selectedPaymentMethod;
  const isCreditCardPayment = cvv || (typeof paymentInfo === "object" && paymentInfo.type === "CreditCard");

  const calledRef = useRef(false);
  const processedRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;

    calledRef.current = true;

    fullPayment();
  }, [fullPayment]);

  useEffect(() => {
    const { invoiceID, paymentStatus, paymentReferenceNumber, paymentError } = paymentState;

    if (paymentStatus === "processing") {
      onDialogBlocked(true);

      return;
    }

    if (!hasWaited) return;

    if (paymentStatus === "error" || paymentError) {
      onDialogBlocked(false);
      onPurchaseError(paymentError || ERROR_PURCHASE());

      return;
    }

    if (isCreditCardPayment) {
      if (!redirectURL || processedRef.current) return;

      processedRef.current = true;

      persistCheckoutModalInfo({
        url: window.location.href,
        invoiceID,
        paymentReferenceNumber,
        billingInfo,
        paymentInfo,
      });

      console.log("Redirecting to 3DS...");

      location.href = redirectURL;

      return;
    }

    onDialogBlocked(false);
    onPurchaseSuccess(paymentReferenceNumber);
  }, [
    paymentState,
    hasWaited,
    isCreditCardPayment,
    redirectURL,
    billingInfo,
    paymentInfo,
    onPurchaseError,
    onDialogBlocked,
    onPurchaseSuccess,
  ]);

  useTimeout(() => {
    setHasWaited(true);
  }, PURCHASING_MIN_WAIT_MS);

  useInterval(() => {
    setPurchasingMessageIndex(prevWaitMessageIndex => Math.min(prevWaitMessageIndex + 1, PURCHASING_MESSAGES_DEFAULT.length - 1));
  }, PURCHASING_MESSAGES_INTERVAL_MS);

  return (
    <Box>

      <StatusIcon
        variant="loading"
        imgSrc={ purchasingImageSrc }
        sx={{ mt: 5 }} />

      { purchasingMessage ? <Typography variant="body2" sx={{ textAlign: "center", mt: 1.5 }}>{ purchasingMessage }</Typography> : null }

      <Box sx={{ maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto", my: 5 }}>
        <Typography variant="body2" sx={{ textAlign: "center", mb: 1.5 }}>Hang tight! We are currently processing your payment.</Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>Please, don't close or reload the page...</Typography>
      </Box>

    </Box>
  );
};
