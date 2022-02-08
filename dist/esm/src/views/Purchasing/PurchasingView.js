import React__default, { useState, useEffect } from 'react';
import { useFullPayment } from '../../hooks/useFullPayment.js';
import { Box, Typography } from '@mui/material';
import { useTimeout, useInterval } from '@swyg/corre';

const DEFAULT_PURCHASING_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif";
const PURCHASING_MIN_WAIT_MS = 3000;
const PURCHASING_MESSAGES_INTERVAL_MS = 5000;
const PURCHASING_MESSAGES_DEFAULT = [
    "Muddling mint and lime.",
    "Topping up with club soda.",
    "Adding rum, lime juice and ice.",
    "Shaking things up!",
];
const PurchasingView = ({ purchasingImageSrc, purchasingMessages: customPurchasingMessages, orgID, invoiceID, lotID, lotType, savedPaymentMethods, selectedPaymentMethod, onPurchaseSuccess, onPurchaseError, onNext, onDialogBlocked, debug, }) => {
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
    const paymentState = useFullPayment({
        orgID,
        invoiceID,
        lotID,
        lotType,
        savedPaymentMethods,
        selectedPaymentMethod,
        debug,
    });
    useEffect(() => {
        const { paymentStatus, paymentReferenceNumber, paymentError } = paymentState;
        if (paymentStatus === "processing") {
            onDialogBlocked(true);
            return;
        }
        if (!hasWaited)
            return;
        onDialogBlocked(false);
        if (paymentStatus === "error" || paymentError) {
            onPurchaseError(paymentError);
            return;
        }
        onPurchaseSuccess(paymentReferenceNumber);
        onNext();
    }, [paymentState, hasWaited, onPurchaseError, onNext, onDialogBlocked, onPurchaseSuccess]);
    useTimeout(() => {
        setHasWaited(true);
    }, PURCHASING_MIN_WAIT_MS);
    useInterval(() => {
        setPurchasingMessageIndex(prevWaitMessageIndex => Math.min(prevWaitMessageIndex + 1, PURCHASING_MESSAGES_DEFAULT.length - 1));
    }, PURCHASING_MESSAGES_INTERVAL_MS);
    return (React__default.createElement(Box, { sx: { position: "relative", mt: 2 } },
        React__default.createElement(Box, { component: "img", src: purchasingImageSrc || DEFAULT_PURCHASING_IMAGE_SRC, sx: {
                width: 196,
                height: 196,
                mx: "auto",
                mt: 5,
            } }),
        purchasingMessage ? React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center", mt: 1.5 } }, purchasingMessage) : null,
        React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center", mt: 5, mb: 1.5 } }, "Hang tight! We are currently processing your payment."),
        React__default.createElement(Typography, { variant: "body2", sx: { textAlign: "center", mt: 1.5, mb: 5 } }, "Please, don't close or reload the page...")));
};

export { PurchasingView };
//# sourceMappingURL=PurchasingView.js.map
