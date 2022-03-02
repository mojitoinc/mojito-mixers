import { useEffect, useRef, useState } from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { useFullPayment } from "../../hooks/useFullPayment";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTimeout, useInterval } from "@swyg/corre";
import { CheckoutModalError, SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { ERROR_PURCHASE } from "../../domain/errors/errors.constants";
import { XS_MOBILE_MAX_WIDTH } from "../../config/theme/theme";
import { StatusIcon } from "../../components/shared/StatusIcon/StatusIcon";
import { useGetPaymentNotificationQuery } from "../../queries/graphqlGenerated";
import { persistCheckoutModalInfo } from "../../components/public/CheckoutOverlay/CheckoutOverlay.utils";
import { PAYMENT_NOTIFICATION_INTERVAL_MS, PURCHASING_MESSAGES_DEFAULT, PURCHASING_MIN_WAIT_MS, PURCHASING_MESSAGES_INTERVAL_MS } from "../../config/config";

export interface PurchasingViewProps {
  purchasingImageSrc?: string;
  purchasingMessages?: false | string[];
  orgID: string;
  invoiceID: string;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethod: SelectedPaymentMethod;
  onPurchaseSuccess: (paymentReferenceNumber: string, paymentID: string) => void;
  onPurchaseError: (error: string | CheckoutModalError) => void;
  onDialogBlocked: (blocked: boolean) => void;
  debug?: boolean;
}

export const PurchasingView: React.FC<PurchasingViewProps> = ({
  purchasingImageSrc,
  purchasingMessages: customPurchasingMessages,
  orgID,
  invoiceID,
  savedPaymentMethods,
  selectedPaymentMethod,
  onPurchaseSuccess,
  onPurchaseError,
  onDialogBlocked,
  debug,
}) => {
  const [fullPaymentState, fullPayment] = useFullPayment({
    orgID,
    invoiceID,
    savedPaymentMethods,
    selectedPaymentMethod,
    debug,
  });

  const paymentNotificationResult = useGetPaymentNotificationQuery({
    skip: fullPaymentState.paymentStatus !== "processed",
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

  const fullPaymentCalledRef = useRef(false);
  const checkoutInfoPersistedRef = useRef(false);

  useEffect(() => {
    if (fullPaymentCalledRef.current) return;

    fullPaymentCalledRef.current = true;

    fullPayment();
  }, [fullPayment]);

  useEffect(() => {
    const { paymentStatus, paymentReferenceNumber, paymentID, paymentError } = fullPaymentState;

    if (paymentStatus === "processing") {
      onDialogBlocked(true);

      return;
    }

    if (!hasWaited) return;

    if (paymentStatus === "error" || paymentError) {
      onPurchaseError(paymentError || ERROR_PURCHASE());

      return;
    }

    if (isCreditCardPayment && window.location.hostname !== "localhost") {
      if (!redirectURL || checkoutInfoPersistedRef.current) return;

      checkoutInfoPersistedRef.current = true;

      persistCheckoutModalInfo({
        invoiceID,
        paymentReferenceNumber,
        billingInfo,
        paymentInfo,
        paymentID
      });

      if (debug) console.log("Redirecting to 3DS...");

      location.href = redirectURL;

      return;
    }

    onPurchaseSuccess(paymentReferenceNumber, paymentID);
  }, [
    fullPaymentState,
    hasWaited,
    isCreditCardPayment,
    redirectURL,
    billingInfo,
    paymentInfo,
    onPurchaseError,
    onDialogBlocked,
    onPurchaseSuccess,
    invoiceID,
    debug,
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
        imgSrc={purchasingImageSrc}
        sx={{ mt: 5 }} />

      {purchasingMessage ? <Typography variant="body2" sx={{ textAlign: "center", mt: 1.5 }}>{purchasingMessage}</Typography> : null}

      <Box sx={{ maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto", my: 5 }}>
        <Typography variant="body2" sx={{ textAlign: "center", mb: 1.5 }}>Hang tight! We are currently processing your payment.</Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>Please, don't close or reload the page...</Typography>
      </Box>

    </Box>
  );
};
