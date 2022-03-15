import index from '../../../node_modules/react-payment-inputs/es/images/index.js';
import { getCardNumberError, getExpiryDateError } from 'react-payment-inputs';

function standaloneGetCardImageProps(network = "") {
    // See https://github.com/medipass/react-payment-inputs/blob/master/src/usePaymentInputs.js#L452
    const paymentInputsNetwork = (network.toLowerCase().replace(/\s/g, "") || "placeholder");
    return {
        "aria-label": network,
        children: index[paymentInputsNetwork] || index.placeholder,
        width: "1.5em",
        height: "1em",
        viewBox: "0 0 24 16",
    };
}
const getCardNumberIsValid = (cardNumber) => !getCardNumberError(cardNumber);
const getExpiryDateIsvalid = (expiryDate) => !getExpiryDateError(expiryDate);
const getCVCIsValid = (cvc) => !!cvc && (cvc.length === 3 || cvc.length === 4);

export { getCVCIsValid, getCardNumberIsValid, getExpiryDateIsvalid, standaloneGetCardImageProps };
//# sourceMappingURL=payment.utils.js.map
