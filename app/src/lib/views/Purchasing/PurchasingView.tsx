import React, { useEffect, useRef, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTimeout, useInterval } from "@swyg/corre";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { useFullPayment } from "../../hooks/useFullPayment";
import { CheckoutModalError, SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { ERROR_PURCHASE_TIMEOUT } from "../../domain/errors/errors.constants";
import { XS_MOBILE_MAX_WIDTH } from "../../config/theme/themeConstants";
import { StatusIcon } from "../../components/shared/StatusIcon/StatusIcon";
import { useGetPaymentNotificationQuery } from "../../queries/graphqlGenerated";
import { persistCheckoutModalInfo } from "../../components/public/CheckoutOverlay/CheckoutOverlay.utils";
import { PAYMENT_NOTIFICATION_INTERVAL_MS, PURCHASING_MESSAGES_DEFAULT, PURCHASING_MIN_WAIT_MS, PURCHASING_MESSAGES_INTERVAL_MS, PAYMENT_CREATION_TIMEOUT_MS, DEV_SKIP_PAYMENT_REDIRECT_IN_LOCALHOST } from "../../config/config";
import { isLocalhost } from "../../domain/url/url.utils";
import { Wallet } from "../../domain/wallet/wallet.interfaces";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { usePromoCode } from "../../utils/promoCodeUtils";

export interface PurchasingViewProps {
  threeDSEnabled?: boolean;
  coinbaseSuccessURL?: string;
  coinbaseErrorURL?: string;
  purchasingImageSrc?: string;
  purchasingMessages?: false | string[];
  orgID: string;
  invoiceID: string;
  invoiceCountdownStart: number;
  checkoutItems: CheckoutItem[];
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethod: SelectedPaymentMethod;
  wallet: null | string | Wallet;
  onPurchaseSuccess: (processorPaymentID: string, paymentID: string, redirectURL: string) => void;
  onPurchaseError: (error?: string | CheckoutModalError) => void;
  onDialogBlocked: (blocked: boolean) => void;
  debug?: boolean;
}

export const PurchasingView: React.FC<PurchasingViewProps> = ({
  threeDSEnabled,
  coinbaseSuccessURL,
  coinbaseErrorURL,
  purchasingImageSrc,
  purchasingMessages: customPurchasingMessages,
  orgID,
  invoiceID,
  invoiceCountdownStart,
  checkoutItems,
  savedPaymentMethods,
  selectedPaymentMethod,
  wallet,
  onPurchaseSuccess,
  onPurchaseError,
  onDialogBlocked,
  debug,
}) => {
  const { setEditable, promoCode } = usePromoCode();
  const { billingInfo, paymentInfo, paymentType, cvv } = selectedPaymentMethod;

  const isCreditCardPayment = (paymentType === "CreditCard" && cvv) ||
    (paymentInfo && typeof paymentInfo === "object" && paymentInfo.type === "CreditCard");


  // Minimum wait time:

  const [hasWaited, setHasWaited] = useState(false);

  useEffect(() => {
    setEditable(false);
  }, [setEditable]);

  useTimeout(() => {
    setHasWaited(true);
  }, PURCHASING_MIN_WAIT_MS);


  // Actual payment mutation & state:

  const [fullPaymentState, fullPayment] = useFullPayment({
    orgID,
    invoiceID,
    checkoutItems,
    savedPaymentMethods,
    selectedPaymentMethod,
    wallet,
    coinbaseSuccessURL,
    coinbaseErrorURL,
    debug,
  });


  // Load 3DS redirect URL when needed:

  const [redirectURL, setRedirectURL] = useState(threeDSEnabled && isCreditCardPayment ? "" : null);

  const skipPaymentNotificationRedirect =
    !threeDSEnabled ||
    !isCreditCardPayment ||
    !!redirectURL ||
    fullPaymentState.paymentStatus !== "processed";

  const paymentNotificationResult = useGetPaymentNotificationQuery({
    skip: skipPaymentNotificationRedirect,
    pollInterval: PAYMENT_NOTIFICATION_INTERVAL_MS,
  });

  const receivedRedirectURL = paymentNotificationResult.data?.getPaymentNotification?.message?.redirectURL || "";

  useEffect(() => {
    if (skipPaymentNotificationRedirect) return;

    setRedirectURL((prevRedirectURL) => {
      const nextRedirectURL = prevRedirectURL || receivedRedirectURL;

      if (debug) console.log(`  👀 getPaymentNotificationQuery redirectURL = ${ nextRedirectURL }`);

      return nextRedirectURL;
    });
  }, [skipPaymentNotificationRedirect, receivedRedirectURL, debug]);


  // Load Coinbase redirect URL (if available):

  useEffect(() => {
    const { hostedURL } = fullPaymentState;

    if (hostedURL && paymentType === "Coinbase") {
      if (debug) console.log(`  👀 hostedURL = ${ hostedURL }`);

      setRedirectURL(hostedURL);
    }
  }, [fullPaymentState, paymentType, debug]);


  // Triggers for payment mutation and onPurchaseSuccess/onPurchaseError callbacks:

  const fullPaymentCalledRef = useRef(false);
  const purchaseSuccessHandledRef = useRef(false);

  useTimeout(() => {
    if (purchaseSuccessHandledRef.current) return;

    purchaseSuccessHandledRef.current = true;

    onPurchaseError(ERROR_PURCHASE_TIMEOUT());
  }, redirectURL === null ? null : PAYMENT_CREATION_TIMEOUT_MS, [onPurchaseError]);

  useEffect(() => {
    if (fullPaymentCalledRef.current) return;

    fullPaymentCalledRef.current = true;

    fullPayment(promoCode.id);
  }, [fullPayment, promoCode]);

  useEffect(() => {
    const { paymentStatus, paymentMethodID, processorPaymentID, paymentID, paymentError } = fullPaymentState;

    if (paymentStatus === "processing") {
      onDialogBlocked(true);

      return;
    }

    if (paymentStatus === "error" || paymentError) {
      onPurchaseError(paymentError);

      return;
    }

    if (!hasWaited || redirectURL === "" || purchaseSuccessHandledRef.current) return;

    purchaseSuccessHandledRef.current = true;

    const skipRedirect = DEV_SKIP_PAYMENT_REDIRECT_IN_LOCALHOST && isLocalhost();

    if (redirectURL && !skipRedirect) {
      persistCheckoutModalInfo({
        orgID,
        invoiceID,
        invoiceCountdownStart,
        processorPaymentID,
        paymentID,
        billingInfo,
        paymentInfo: typeof paymentInfo === "string" ? paymentInfo : paymentMethodID,
        checkoutItems,
      });
    }

    onPurchaseSuccess(processorPaymentID, paymentID, skipRedirect ? "" : (redirectURL || ""));
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
    orgID,
    invoiceID,
    invoiceCountdownStart,
    checkoutItems,
    debug,
  ]);


  // Purchasing Messages:

  const [purchasingMessageIndex, setPurchasingMessageIndex] = useState(0);

  useInterval(() => {
    setPurchasingMessageIndex(prevWaitMessageIndex => Math.min(prevWaitMessageIndex + 1, PURCHASING_MESSAGES_DEFAULT.length - 1));
  }, PURCHASING_MESSAGES_INTERVAL_MS);

  let purchasingMessages = customPurchasingMessages;

  if (purchasingMessages === false) {
    purchasingMessages = [];
  } else if (purchasingMessages === undefined || purchasingMessages.length === 0) {
    purchasingMessages = PURCHASING_MESSAGES_DEFAULT;
  }

  const purchasingMessage = purchasingMessages[purchasingMessageIndex];

  return (
    <Box>

      <StatusIcon
        variant="loading"
        imgSrc={ purchasingImageSrc }
        sx={{ mt: 5 }} />

      { purchasingMessage ? <Typography variant="body2" sx={{ textAlign: "center", mt: 1.5 }}>{ purchasingMessage }</Typography> : null }

      <Box sx={{ maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto", my: 5 }}>
        <Typography variant="body2" sx={{ textAlign: "center", mb: 1.5 }}>Hang tight! We are currently processing your payment.</Typography>
        <Typography variant="body2" sx={{ textAlign: "center" }}>Please, don’t close or reload the page...</Typography>
      </Box>

    </Box>
  );
};
