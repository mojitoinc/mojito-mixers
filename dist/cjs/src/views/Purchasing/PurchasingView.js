'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var useFullPayment = require('../../hooks/useFullPayment.js');
var material = require('@mui/material');
var corre = require('@swyg/corre');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DEFAULT_PURCHASING_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif";
const PURCHASING_MIN_WAIT_MS = 3000;
const PURCHASING_MESSAGES_INTERVAL_MS = 5000;
const PURCHASING_MESSAGES_DEFAULT = [
    "Muddling mint and lime.",
    "Topping up with club soda.",
    "Adding rum, lime juice and ice.",
    "Shaking things up!",
];
const PurchasingView = ({ purchasingImageSrc, purchasingMessages: customPurchasingMessages, orgID, invoiceID, lotID, lotType, savedPaymentMethods, selectedPaymentMethod, onPurchaseSuccess, onPurchaseError, onDialogBlocked, debug, }) => {
    let purchasingMessages = customPurchasingMessages;
    if (purchasingMessages === false) {
        purchasingMessages = [];
    }
    else if (purchasingMessages === undefined || purchasingMessages.length === 0) {
        purchasingMessages = PURCHASING_MESSAGES_DEFAULT;
    }
    const [hasWaited, setHasWaited] = React.useState(false);
    const [purchasingMessageIndex, setPurchasingMessageIndex] = React.useState(0);
    const purchasingMessage = purchasingMessages[purchasingMessageIndex];
    const [paymentState, fullPayment] = useFullPayment.useFullPayment({
        orgID,
        invoiceID,
        lotID,
        lotType,
        savedPaymentMethods,
        selectedPaymentMethod,
        debug,
    });
    const calledRef = React.useRef(false);
    React.useEffect(() => {
        if (calledRef.current)
            return;
        calledRef.current = true;
        fullPayment();
    }, [fullPayment]);
    React.useEffect(() => {
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
    }, [paymentState, hasWaited, onPurchaseError, onDialogBlocked, onPurchaseSuccess]);
    corre.useTimeout(() => {
        setHasWaited(true);
    }, PURCHASING_MIN_WAIT_MS);
    corre.useInterval(() => {
        setPurchasingMessageIndex(prevWaitMessageIndex => Math.min(prevWaitMessageIndex + 1, PURCHASING_MESSAGES_DEFAULT.length - 1));
    }, PURCHASING_MESSAGES_INTERVAL_MS);
    return (React__default["default"].createElement(material.Box, { sx: { position: "relative", mt: 2 } },
        React__default["default"].createElement(material.Box, { component: "img", src: purchasingImageSrc || DEFAULT_PURCHASING_IMAGE_SRC, sx: {
                width: 196,
                height: 196,
                mx: "auto",
                mt: 5,
            } }),
        purchasingMessage ? React__default["default"].createElement(material.Typography, { variant: "body2", sx: { textAlign: "center", mt: 1.5 } }, purchasingMessage) : null,
        React__default["default"].createElement(material.Typography, { variant: "body2", sx: { textAlign: "center", mt: 5, mb: 1.5 } }, "Hang tight! We are currently processing your payment."),
        React__default["default"].createElement(material.Typography, { variant: "body2", sx: { textAlign: "center", mt: 1.5, mb: 5 } }, "Please, don't close or reload the page...")));
};

exports.PurchasingView = PurchasingView;
//# sourceMappingURL=PurchasingView.js.map
