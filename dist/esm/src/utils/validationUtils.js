import { getCardNameByType } from '../domain/react-payment-inputs/react-payment-inputs.utils.js';

const requireSchemaWhenKeyIs = (key) => ({
    is: key,
    then: (schema) => schema.required(withRequiredErrorMessage)
});
const withRequiredErrorMessage = ({ label }) => `${label} is required.`;
const withInvalidErrorMessage = ({ label }) => `${label} is not valid.`;
const withFullNameErrorMessage = ({ label }) => `${label} must have at least first and last name.`;
const withPhoneErrorMessage = ({ label }) => `${label} must be a valid phone number.`;
const withInvalidCardNumber = ({ label }) => `${label} is invalid.`;
const withInvalidCVV = ({ cvvLabel, cvvExpectedLength }) => {
    return `${cvvLabel} must have ${cvvExpectedLength} digits.`;
};
const withInvalidCreditCardNetwork = ({ acceptedCreditCardNetworks }) => {
    const [acceptedCreditCardName, ...otherAcceptedCreditCardNames] = acceptedCreditCardNetworks.map((acceptedCreditCardNetwork) => {
        return getCardNameByType(acceptedCreditCardNetwork);
    });
    return `Only ${otherAcceptedCreditCardNames.join(", ")}${otherAcceptedCreditCardNames.length ? " and " : ""}${acceptedCreditCardName} ${acceptedCreditCardNetworks.length === 1 ? "is" : "are"} accepted.`;
};

export { requireSchemaWhenKeyIs, withFullNameErrorMessage, withInvalidCVV, withInvalidCardNumber, withInvalidCreditCardNetwork, withInvalidErrorMessage, withPhoneErrorMessage, withRequiredErrorMessage };
//# sourceMappingURL=validationUtils.js.map
