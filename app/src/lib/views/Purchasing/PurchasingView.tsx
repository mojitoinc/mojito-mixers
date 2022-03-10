import { useEffect, useRef, useState } from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { useFullPayment } from "../../hooks/useFullPayment";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useTimeout, useInterval } from "@swyg/corre";
import { CheckoutModalError, SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { ERROR_PURCHASE_TIMEOUT } from "../../domain/errors/errors.constants";
import { XS_MOBILE_MAX_WIDTH } from "../../config/theme/theme";
import { StatusIcon } from "../../components/shared/StatusIcon/StatusIcon";
import { useGetPaymentNotificationQuery } from "../../queries/graphqlGenerated";
import { persistCheckoutModalInfo } from "../../components/public/CheckoutOverlay/CheckoutOverlay.utils";
import { PAYMENT_NOTIFICATION_INTERVAL_MS, PURCHASING_MESSAGES_DEFAULT, PURCHASING_MIN_WAIT_MS, PURCHASING_MESSAGES_INTERVAL_MS } from "../../config/config";
import { isLocalhost } from "../../domain/url/url.utils";

export interface PurchasingViewProps {
  purchasingImageSrc?: string;
  purchasingMessages?: false | string[];
  orgID: string;
  invoiceID: string;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethod: SelectedPaymentMethod;
  walletAddress: string | null;
  onPurchaseSuccess: (circlePaymentID: string, paymentID: string, redirectURL: string) => void;
  onPurchaseError: (error?: string | CheckoutModalError) => void;
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
  walletAddress,
  onPurchaseSuccess,
  onPurchaseError,
  onDialogBlocked,
  debug,
}) => {
  const { billingInfo, paymentInfo, cvv } = selectedPaymentMethod;
  const isCreditCardPayment = cvv || (typeof paymentInfo === "object" && paymentInfo.type === "CreditCard");


  // Minimum wait time:

  const [hasWaited, setHasWaited] = useState(false);

  useTimeout(() => {
    setHasWaited(true);
  }, PURCHASING_MIN_WAIT_MS);


  // Actual payment mutation & state:

  const [fullPaymentState, fullPayment] = useFullPayment({
    orgID,
    invoiceID,
    savedPaymentMethods,
    selectedPaymentMethod,
    walletAddress,
    debug,
  });


  // Load 3DS redirect URL when needed:

  const [redirectURL, setRedirectURL] = useState(isCreditCardPayment ? "" : null);

  const paymentNotificationResult = useGetPaymentNotificationQuery({
    skip: !isCreditCardPayment || !!redirectURL || fullPaymentState.paymentStatus !== "processed",
    pollInterval: PAYMENT_NOTIFICATION_INTERVAL_MS,
  });

  const nextRedirectURL = paymentNotificationResult.data?.getPaymentNotification?.message?.redirectURL || "";

  useEffect(() => {
    if (!isCreditCardPayment) return;

    setRedirectURL(prevRedirectURL => prevRedirectURL || nextRedirectURL);
  }, [isCreditCardPayment, nextRedirectURL]);


  // Triggers for payment mutation and onPurchaseSuccess/onPurchaseError callbacks:

  const fullPaymentCalledRef = useRef(false);
  const purchaseSuccessHandledRef = useRef(false);

  useTimeout(() => {
    if (purchaseSuccessHandledRef.current) return;

    purchaseSuccessHandledRef.current = true;

    onPurchaseError(ERROR_PURCHASE_TIMEOUT());
  }, redirectURL === null ? null : 5000, [onPurchaseError]);

  useEffect(() => {
    if (fullPaymentCalledRef.current) return;

    fullPaymentCalledRef.current = true;

    fullPayment();
  }, [fullPayment]);

  useEffect(() => {
    const { paymentStatus, circlePaymentID, paymentID, paymentError } = fullPaymentState;

    if (paymentStatus === "processing") {
      onDialogBlocked(true);

      return;
    }

    if (!hasWaited || redirectURL === "" || purchaseSuccessHandledRef.current) return;

    purchaseSuccessHandledRef.current = true;

    if (paymentStatus === "error" || paymentError) {
      onPurchaseError(paymentError);

      return;
    }

    if (redirectURL && !isLocalhost()) {
      persistCheckoutModalInfo({
        invoiceID,
        circlePaymentID,
        paymentID,
        billingInfo,
        paymentInfo,
      });
    }

    onPurchaseSuccess(circlePaymentID, paymentID, isLocalhost() ? "" : (redirectURL || ""));
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


  // Purchasing Messages:

  const [purchasingMessageIndex, setPurchasingMessageIndex] = useState(0);

  useInterval(() => {
    setPurchasingMessageIndex(prevWaitMessageIndex => Math.min(prevWaitMessageIndex + 1, PURCHASING_MESSAGES_DEFAULT.length - 1));
  }, PURCHASING_MESSAGES_INTERVAL_MS);

  let purchasingMessages = customPurchasingMessages;

  if (purchasingMessages === false) {
    purchasingMessages = []
  } else if (purchasingMessages === undefined || purchasingMessages.length === 0) {
    purchasingMessages = PURCHASING_MESSAGES_DEFAULT;
  }

  const purchasingMessage = purchasingMessages[purchasingMessageIndex];

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
