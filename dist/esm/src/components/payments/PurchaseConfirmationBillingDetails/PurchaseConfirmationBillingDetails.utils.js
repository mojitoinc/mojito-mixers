import { ACH_MASK_PREFIX, CREDIT_CARD_MASK_PREFIX } from '../../../domain/payment/payment.constants.js';

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
            displayValue = `${ACH_MASK_PREFIX} ${paymentMethodInfo.accountNumber}`;
        }
        else {
            paymentType = "CreditCard";
            displayValue = `${CREDIT_CARD_MASK_PREFIX} ${paymentMethodInfo.last4Digit}`;
            network = paymentMethodInfo.network;
        }
    }
    else if (paymentMethodInfo === null) {
        isMasked = true;
        displayValue = `${CREDIT_CARD_MASK_PREFIX} XXXX`;
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

export { getFormattedPaymentMethod };
//# sourceMappingURL=PurchaseConfirmationBillingDetails.utils.js.map
