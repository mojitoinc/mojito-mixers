'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var payment_constants = require('../../../domain/payment/payment.constants.js');

function isSavedPaymentMethod(paymentMethodInfo) {
    return paymentMethodInfo.hasOwnProperty("id");
}
function getFormattedPaymentMethod(paymentMethodInfo) {
    var isMasked = false;
    var paymentType = "CreditCard";
    var displayValue = "";
    var network = "";
    if (isSavedPaymentMethod(paymentMethodInfo)) {
        isMasked = true;
        if (paymentMethodInfo.type === "ACH") {
            paymentType = "ACH";
            displayValue = "".concat(payment_constants.ACH_MASK_PREFIX, " ").concat(paymentMethodInfo.accountNumber);
        }
        else {
            paymentType = "CreditCard";
            displayValue = "".concat(payment_constants.CREDIT_CARD_MASK_PREFIX, " ").concat(paymentMethodInfo.last4Digit);
            network = paymentMethodInfo.network;
        }
    }
    else {
        displayValue = paymentMethodInfo.cardNumber;
    }
    return {
        isMasked: isMasked,
        paymentType: paymentType,
        displayValue: displayValue,
        network: network,
    };
}

exports.getFormattedPaymentMethod = getFormattedPaymentMethod;
//# sourceMappingURL=PurchaseConfirmationBillingDetails.utils.js.map
