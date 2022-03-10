import React__default, { useState, useEffect, useRef } from 'react';
import { useFullPayment } from '../../hooks/useFullPayment.js';
import { Box, Typography } from '@mui/material';
import { useTimeout, useInterval } from '@swyg/corre';
import { ERROR_PURCHASE_TIMEOUT, ERROR_PURCHASE } from '../../domain/errors/errors.constants.js';
import { XS_MOBILE_MAX_WIDTH } from '../../config/theme/theme.js';
import { StatusIcon } from '../../components/shared/StatusIcon/StatusIcon.js';
import { useGetPaymentNotificationQuery } from '../../queries/graphqlGenerated.js';
import { persistCheckoutModalInfo } from '../../components/public/CheckoutOverlay/CheckoutOverlay.utils.js';
import { PURCHASING_MIN_WAIT_MS, PAYMENT_NOTIFICATION_INTERVAL_MS, PURCHASING_MESSAGES_DEFAULT, PURCHASING_MESSAGES_INTERVAL_MS } from '../../config/config.js';
import { isLocalhost } from '../../domain/url/url.utils.js';

const PurchasingView = ({ purchasingImageSrc, purchasingMessages: customPurchasingMessages, orgID, invoiceID, savedPaymentMethods, selectedPaymentMethod, walletAddress, onPurchaseSuccess, onPurchaseError, onDialogBlocked, debug, }) => {
    var _a, _b, _c;
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
    const nextRedirectURL = ((_c = (_b = (_a = paymentNotificationResult.data) === null || _a === void 0 ? void 0 : _a.getPaymentNotification) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.redirectURL) || "";
    useEffect(() => {
        if (!isCreditCardPayment)
            return;
        setRedirectURL(prevRedirectURL => prevRedirectURL || nextRedirectURL);
    }, [isCreditCardPayment, nextRedirectURL]);
    // Triggers for payment mutation and onPurchaseSuccess/onPurchaseError callbacks:
    const fullPaymentCalledRef = useRef(false);
    const purchaseSuccessHandledRef = useRef(false);
    useTimeout(() => {
        if (purchaseSuccessHandledRef.current)
            return;
        purchaseSuccessHandledRef.current = true;
        onPurchaseError(ERROR_PURCHASE_TIMEOUT());
    }, redirectURL === null ? null : 5000, [onPurchaseError]);
    useEffect(() => {
        if (fullPaymentCalledRef.current)
            return;
        fullPaymentCalledRef.current = true;
        fullPayment();
    }, [fullPayment]);
    useEffect(() => {
        const { paymentStatus, circlePaymentID, paymentID, paymentError } = fullPaymentState;
        if (paymentStatus === "processing") {
            onDialogBlocked(true);
            return;
        }
        if (!hasWaited || redirectURL === "" || purchaseSuccessHandledRef.current)
            return;
        purchaseSuccessHandledRef.current = true;
        if (paymentStatus === "error" || paymentError) {
            onPurchaseError(paymentError || ERROR_PURCHASE());
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
        purchasingMessages = [];
    }
    else if (purchasingMessages === undefined || purchasingMessages.length === 0) {
        purchasingMessages = PURCHASING_MESSAGES_DEFAULT;
    }
    const purchasingMessage = purchasingMessages[purchasingMessageIndex];
    return (React__default.createElement(Box, null,
        React__default.createElement(StatusIcon, { variant: "loading", imgSrc: purchasingImageSrc, sx: { mt: 5 } }),
        purchasingMessage ? React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center", mt: 1.5 } }, purchasingMessage) : null,
        React__default.createElement(Box, { sx: { maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto", my: 5 } },
            React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center", mb: 1.5 } }, "Hang tight! We are currently processing your payment."),
            React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center" } }, "Please, don't close or reload the page..."))));
};

export { PurchasingView };
//# sourceMappingURL=PurchasingView.js.map
