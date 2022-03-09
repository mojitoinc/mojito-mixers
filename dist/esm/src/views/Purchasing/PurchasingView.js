import React__default, { useState, useRef, useEffect } from 'react';
import { useFullPayment } from '../../hooks/useFullPayment.js';
import { Box, Typography } from '@mui/material';
import { useTimeout, useInterval } from '@swyg/corre';
import { ERROR_PURCHASE } from '../../domain/errors/errors.constants.js';
import { XS_MOBILE_MAX_WIDTH } from '../../config/theme/theme.js';
import { StatusIcon } from '../../components/shared/StatusIcon/StatusIcon.js';
import { useGetPaymentNotificationQuery } from '../../queries/graphqlGenerated.js';
import { persistCheckoutModalInfo } from '../../components/public/CheckoutOverlay/CheckoutOverlay.utils.js';
import { PAYMENT_NOTIFICATION_INTERVAL_MS, PURCHASING_MESSAGES_DEFAULT, PURCHASING_MIN_WAIT_MS, PURCHASING_MESSAGES_INTERVAL_MS } from '../../config/config.js';

const PurchasingView = ({ purchasingImageSrc, purchasingMessages: customPurchasingMessages, orgID, invoiceID, savedPaymentMethods, selectedPaymentMethod, onPurchaseSuccess, onPurchaseError, onDialogBlocked, debug, }) => {
    var _a, _b, _c;
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
        purchasingMessages = [];
    }
    else if (purchasingMessages === undefined || purchasingMessages.length === 0) {
        purchasingMessages = PURCHASING_MESSAGES_DEFAULT;
    }
    const [hasWaited, setHasWaited] = useState(false);
    const [purchasingMessageIndex, setPurchasingMessageIndex] = useState(0);
    const purchasingMessage = purchasingMessages[purchasingMessageIndex];
    const redirectURL = ((_c = (_b = (_a = paymentNotificationResult.data) === null || _a === void 0 ? void 0 : _a.getPaymentNotification) === null || _b === void 0 ? void 0 : _b.message) === null || _c === void 0 ? void 0 : _c.redirectURL) || "";
    const { billingInfo, paymentInfo, cvv } = selectedPaymentMethod;
    const isCreditCardPayment = cvv || (typeof paymentInfo === "object" && paymentInfo.type === "CreditCard");
    const fullPaymentCalledRef = useRef(false);
    const checkoutInfoPersistedRef = useRef(false);
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
        if (!hasWaited)
            return;
        if (paymentStatus === "error" || paymentError) {
            onPurchaseError(paymentError || ERROR_PURCHASE());
            return;
        }
        if (isCreditCardPayment && window.location.hostname !== "localhost") {
            if (!redirectURL || checkoutInfoPersistedRef.current)
                return;
            checkoutInfoPersistedRef.current = true;
            persistCheckoutModalInfo({
                invoiceID,
                circlePaymentID,
                paymentID,
                billingInfo,
                paymentInfo,
            });
            if (debug)
                console.log("Redirecting to 3DS...");
            location.href = redirectURL;
            return;
        }
        onPurchaseSuccess(circlePaymentID, paymentID);
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
    return (React__default.createElement(Box, null,
        React__default.createElement(StatusIcon, { variant: "loading", imgSrc: purchasingImageSrc, sx: { mt: 5 } }),
        purchasingMessage ? React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center", mt: 1.5 } }, purchasingMessage) : null,
        React__default.createElement(Box, { sx: { maxWidth: XS_MOBILE_MAX_WIDTH, mx: "auto", my: 5 } },
            React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center", mb: 1.5 } }, "Hang tight! We are currently processing your payment."),
            React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center" } }, "Please, don't close or reload the page..."))));
};

export { PurchasingView };
//# sourceMappingURL=PurchasingView.js.map
