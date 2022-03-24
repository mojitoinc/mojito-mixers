import index from '../../../node_modules/react-payment-inputs/es/images/index.js';
import { getExpiryDateError } from 'react-payment-inputs';
import { CREDIT_CARD_NETWORKS, getCardTypeByValue } from '../react-payment-inputs/react-payment-inputs.utils.js';

function getCreditCardNetworkFromNumber(cardNumber) {
    var _a;
    return ((_a = getCardTypeByValue(cardNumber)) === null || _a === void 0 ? void 0 : _a.type) || "";
}
function getCreditCardNetworkFromLabel(network = "") {
    if (!network)
        return "";
    const creditCardNetwork = network.toLowerCase().replace(/\s/g, "");
    return CREDIT_CARD_NETWORKS.includes(creditCardNetwork) ? creditCardNetwork : "";
}
function getCreditCardNetworkImageFromLabel(network = "") {
    return getCreditCardNetworkFromLabel(network) || "placeholder";
}
function standaloneGetCardImageProps(network = "") {
    // See https://github.com/medipass/react-payment-inputs/blob/master/src/usePaymentInputs.js#L452
    const creditCardNetworkImage = getCreditCardNetworkImageFromLabel(network);
    return {
        "aria-label": network,
        children: index[creditCardNetworkImage] || index.placeholder,
        width: "1.5em",
        height: "1em",
        viewBox: "0 0 24 16",
    };
}
const getExpiryDateIsValid = (expiryDate) => !getExpiryDateError(expiryDate);
const getCvvIsValid = (cvv = "", network = "", networks = [], required = true) => {
    // if (required && !cvv) return false;
    // if (!required && !cvv) return true;
    const cvvLength = cvv.length;
    let cvvExpectedLength = "3 or 4";
    if ((!network && networks.length > 0 && !networks.includes("amex")) || network !== "amex") {
        cvvExpectedLength = 3;
    }
    else if ((!network && networks.length === 1 && networks.includes("amex")) || network === "amex") {
        cvvExpectedLength = 4;
    }
    return cvv ? {
        cvvLength,
        cvvExpectedLength,
        isCvvValid: cvvLength === cvvExpectedLength || ((cvvLength === 3 || cvvLength === 4) && cvvExpectedLength === "3 or 4"),
    } : {
        cvvLength,
        cvvExpectedLength,
        isCvvValid: !required,
    };
};

export { getCreditCardNetworkFromLabel, getCreditCardNetworkFromNumber, getCreditCardNetworkImageFromLabel, getCvvIsValid, getExpiryDateIsValid, standaloneGetCardImageProps };
//# sourceMappingURL=payment.utils.js.map
