'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var index = require('../../../node_modules/react-payment-inputs/es/images/index.js');
var reactPaymentInputs = require('react-payment-inputs');

function standaloneGetCardImageProps(network = "") {
    // See https://github.com/medipass/react-payment-inputs/blob/master/src/usePaymentInputs.js#L452
    const paymentInputsNetwork = (network.toLowerCase().replace(/\s/g, "") || "placeholder");
    return {
        "aria-label": network,
        children: index["default"][paymentInputsNetwork] || index["default"].placeholder,
        width: "1.5em",
        height: "1em",
        viewBox: "0 0 24 16",
    };
}
const getCardNumberIsValid = (cardNumber) => !reactPaymentInputs.getCardNumberError(cardNumber);
const getExpiryDateIsvalid = (expiryDate) => !reactPaymentInputs.getExpiryDateError(expiryDate);
const getCVCIsValid = (cvc) => !!cvc && (cvc.length === 3 || cvc.length === 4);

exports.getCVCIsValid = getCVCIsValid;
exports.getCardNumberIsValid = getCardNumberIsValid;
exports.getExpiryDateIsvalid = getExpiryDateIsvalid;
exports.standaloneGetCardImageProps = standaloneGetCardImageProps;
//# sourceMappingURL=payment.utils.js.map
