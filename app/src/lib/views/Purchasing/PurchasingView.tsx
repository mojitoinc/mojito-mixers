import { useEffect, useRef, useState } from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { useFullPayment } from "../../hooks/useFullPayment";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTimeout, useInterval } from "@swyg/corre";
import { SelectedPaymentMethod } from "../../components/payments/CheckoutModal/CheckoutModal.hooks";
import { CheckoutItem } from "../..";

const DEFAULT_PURCHASING_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif";

const PURCHASING_MIN_WAIT_MS = 3000;

const PURCHASING_MESSAGES_INTERVAL_MS = 5000;

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
  onPurchaseError: (error: string) => void;
  onDialogBlocked: (blocked: boolean) => void;
  debug?: boolean;
}

export const PurchasingView: React.FC<PurchasingViewProps> = ({
  purchasingImageSrc,
  purchasingMessages: customPurchasingMessages,
  orgID,
  invoiceID,
  checkoutItems,
  savedPaymentMethods,
  selectedPaymentMethod,
  onPurchaseSuccess,
  onPurchaseError,
  onDialogBlocked,
  debug,
}) => {
  let purchasingMessages = customPurchasingMessages;

  if (purchasingMessages === false) {
    purchasingMessages = []
  } else if (purchasingMessages === undefined || purchasingMessages.length === 0) {
    purchasingMessages = PURCHASING_MESSAGES_DEFAULT;
  }

  const [hasWaited, setHasWaited] = useState(false);
  const [purchasingMessageIndex, setPurchasingMessageIndex] = useState(0);
  const purchasingMessage = purchasingMessages[purchasingMessageIndex];

  const [paymentState, fullPayment] = useFullPayment({
    orgID,
    invoiceID,
    checkoutItems,
    savedPaymentMethods,
    selectedPaymentMethod,
    debug,
  });

  const calledRef = useRef(false);

  useEffect(() => {
    if (calledRef.current) return;

    calledRef.current = true;

    fullPayment();
  }, [fullPayment]);

  useEffect(() => {
    const { paymentStatus, paymentReferenceNumber, paymentError } = paymentState;

    if (paymentStatus === "processing") {
      onDialogBlocked(true);

      return;
    }

    if (!hasWaited) return;

    onDialogBlocked(false);

    if (paymentStatus === "error" || paymentError) {
      onPurchaseError(paymentError);

      return;
    }

    onPurchaseSuccess(paymentReferenceNumber);
  }, [paymentState, hasWaited, onPurchaseError, onDialogBlocked, onPurchaseSuccess]);

  useTimeout(() => {
    setHasWaited(true);
  }, PURCHASING_MIN_WAIT_MS);

  useInterval(() => {
    setPurchasingMessageIndex(prevWaitMessageIndex => Math.min(prevWaitMessageIndex + 1, PURCHASING_MESSAGES_DEFAULT.length - 1));
  }, PURCHASING_MESSAGES_INTERVAL_MS);

  return (
    <Box sx={{ position: "relative", mt: 2 }}>
      <Box
          component="img"
          src={ purchasingImageSrc || DEFAULT_PURCHASING_IMAGE_SRC }
          sx={{
            width: 196,
            height: 196,
            mx: "auto",
            mt: 5,
          }} />

      { purchasingMessage ? <Typography variant="body2" sx={{ textAlign: "center", mt: 1.5 }}>{ purchasingMessage }</Typography> : null }

      <Typography variant="body2" sx={{ textAlign: "center", mt: 5, mb: 1.5 }}>Hang tight! We are currently processing your payment.</Typography>
      <Typography variant="body2" sx={{ textAlign: "center", mt: 1.5, mb: 5 }}>Please, don't close or reload the page...</Typography>
    </Box>
  );
};
