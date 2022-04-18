'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var payment_constants = require('../../../domain/payment/payment.constants.js');

function isSavedPaymentMethod(paymentMethodInfo) {
    return !!paymentMethodInfo && paymentMethodInfo.hasOwnProperty("id");
}
function getFormattedPaymentMethod(paymentMethodInfo) {
    let isMasked = false;
    let paymentType = "CreditCard";
    let displayValue = "";
    let network = "";
    if (isSavedPaymentMethod(paymentMethodInfo)) {
        isMasked = true;
        if (paymentMethodInfo.type === "ACH") {
            paymentType = "ACH";
            displayValue = `${payment_constants.ACH_MASK_PREFIX} ${paymentMethodInfo.accountNumber}`;
        }
        else {
            paymentType = "CreditCard";
            displayValue = `${payment_constants.CREDIT_CARD_MASK_PREFIX} ${paymentMethodInfo.last4Digit}`;
            network = paymentMethodInfo.network;
        }
    }
    else if (paymentMethodInfo === null) {
        isMasked = true;
        displayValue = `${payment_constants.CREDIT_CARD_MASK_PREFIX} XXXX`;
    }
    else {
        displayValue = paymentMethodInfo.cardNumber;
    }
    return {
        isMasked,
        paymentType,
        displayValue,
        network,
    };
}

exports.getFormattedPaymentMethod = getFormattedPaymentMethod;
//# sourceMappingURL=PurchaseConfirmationBillingDetails.utils.js.map
