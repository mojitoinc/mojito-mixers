import { getCardNameByType } from '../domain/react-payment-inputs/react-payment-inputs.utils.js';

const requireSchemaWhenKeyIs = (key) => ({
    is: key,
    then: (schema) => schema.required(withRequiredErrorMessage)
});
const withRequiredErrorMessage = ({ label }) => `${label} is required.`;
const withInvalidErrorMessage = ({ label }) => `${label} is not valid.`;
const withFullNameErrorMessage = ({ label }) => `${label} must have at least first and last name.`;
const withFullNameCharsetErrorMessage = ({ label }) => `${label} contains invalid characters.`;
const withPhoneErrorMessage = ({ label }) => `${label} must be a valid phone number.`;
const withInvalidAddress = ({ variant }) => `Please, ${variant === "form" ? "enter" : "select"} a valid address to calculate taxes.`;
const withInvalidZipCode = ({ label }) => `The ${label} you entered does not match the address.`;
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

export { requireSchemaWhenKeyIs, withFullNameCharsetErrorMessage, withFullNameErrorMessage, withInvalidAddress, withInvalidCVV, withInvalidCardNumber, withInvalidCreditCardNetwork, withInvalidErrorMessage, withInvalidZipCode, withPhoneErrorMessage, withRequiredErrorMessage };
//# sourceMappingURL=validationUtils.js.map
