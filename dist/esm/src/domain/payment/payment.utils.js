import index from '../../../node_modules/react-payment-inputs/es/images/index.js';

const DEFAULT_CARD_FORMAT = /(\d{1,4})/g;
const MONTH_REGEX = /(0[1-9]|1[0-2])/;
const CARD_TYPES = [
    {
        displayName: "Visa",
        type: "visa",
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^4/,
        gaps: [4, 8, 12],
        lengths: [16, 18, 19],
        code: {
            name: "CVV",
            length: 3,
        },
    },
    {
        displayName: "Mastercard",
        type: "mastercard",
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            length: 3,
        },
    },
    {
        displayName: "American Express",
        type: "amex",
        format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
        startPattern: /^3[47]/,
        gaps: [4, 10],
        lengths: [15],
        code: {
            name: "CID",
            length: 4,
        },
    },
    {
        displayName: "Diners Club",
        type: "dinersclub",
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^(36|38|30[0-5])/,
        gaps: [4, 10],
        lengths: [14, 16, 19],
        code: {
            name: "CVV",
            length: 3,
        },
    },
    {
        displayName: "Discover",
        type: "discover",
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^(6011|65|64[4-9]|622)/,
        gaps: [4, 8, 12],
        lengths: [16, 19],
        code: {
            name: "CID",
            length: 3,
        },
    },
    {
        displayName: "JCB",
        type: "jcb",
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^35/,
        gaps: [4, 8, 12],
        lengths: [16, 17, 18, 19],
        code: {
            name: "CVV",
            length: 3,
        },
    },
    {
        displayName: "UnionPay",
        type: "unionpay",
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^62/,
        gaps: [4, 8, 12],
        lengths: [14, 15, 16, 17, 18, 19],
        code: {
            name: "CVN",
            length: 3,
        },
    },
    {
        displayName: "Maestro",
        type: "maestro",
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
        gaps: [4, 8, 12],
        lengths: [12, 13, 14, 15, 16, 17, 18, 19],
        code: {
            name: "CVC",
            length: 3,
        },
    },
    {
        displayName: "Elo",
        type: "elo",
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVE",
            length: 3,
        },
    },
    {
        displayName: "Hipercard",
        type: "hipercard",
        format: DEFAULT_CARD_FORMAT,
        startPattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
        gaps: [4, 8, 12],
        lengths: [16],
        code: {
            name: "CVC",
            length: 3,
        },
    },
];
const imagesMap = index;
function standaloneGetCardImageProps(network = "placeholder") {
    const cardType = network.toLowerCase();
    // See https://github.com/medipass/react-payment-inputs/blob/master/src/usePaymentInputs.js#L452
    return {
        "aria-label": network || "Placeholder card",
        children: imagesMap[cardType] || imagesMap.placeholder,
        width: "1.5em",
        height: "1em",
        viewBox: "0 0 24 16",
    };
}
// TODO: Remove function and use the ones exported from react-payment-inputs when PR gets merged
// https://github.com/medipass/react-payment-inputs/pull/81
const getCardTypeByValue = (value) => CARD_TYPES.filter((cardType) => cardType.startPattern.test(value))[0];
const validateLuhn = (cardNumber) => {
    return (cardNumber
        .split("")
        .reverse()
        .map((digit) => parseInt(digit, 10))
        .map((digit, idx) => (idx % 2 ? digit * 2 : digit))
        .map((digit) => (digit > 9 ? (digit % 10) + 1 : digit))
        .reduce((accum, digit) => (accum += digit)) %
        10 ===
        0);
};
const getCardNumberIsValid = (cardNumber) => {
    if (!cardNumber)
        return false;
    const rawCardNumber = cardNumber.replace(/\s/g, "");
    const cardType = getCardTypeByValue(rawCardNumber);
    if (cardType && cardType.lengths) {
        const doesCardNumberMatchLength = cardType.lengths.includes(rawCardNumber.length);
        if (doesCardNumberMatchLength) {
            const isLuhnValid = validateLuhn(rawCardNumber);
            if (isLuhnValid)
                return true;
        }
    }
    return false;
};
const getExpiryDateIsvalid = (expiryDate) => {
    if (!expiryDate)
        return false;
    const rawExpiryDate = expiryDate.replace(" / ", "").replace("/", "");
    if (rawExpiryDate.length !== 4)
        return false;
    const month = rawExpiryDate.slice(0, 2);
    const year = `20${rawExpiryDate.slice(2, 4)}`;
    const monthIsOnValidRange = MONTH_REGEX.test(month);
    const yearIsOnValidRange = parseInt(year) >= new Date().getFullYear();
    const dateIsOnValidRange = parseInt(year) !== new Date().getFullYear() ||
        parseInt(month) >= new Date().getMonth() + 1;
    return monthIsOnValidRange && yearIsOnValidRange && dateIsOnValidRange;
};
const getCVCIsValid = (cvc, cardNumber) => {
    if (!cvc || cvc.length < 3)
        return false;
    const rawCardNumber = cardNumber.replace(/\s/g, "");
    const cardType = getCardTypeByValue(rawCardNumber);
    if (cardType && cvc.length !== cardType.code.length)
        return false;
    return true;
};

export { CARD_TYPES, DEFAULT_CARD_FORMAT, getCVCIsValid, getCardNumberIsValid, getExpiryDateIsvalid, standaloneGetCardImageProps };
//# sourceMappingURL=payment.utils.js.map
