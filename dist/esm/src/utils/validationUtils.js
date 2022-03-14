const requireSchemaWhenKeyIs = (key) => ({
    is: key,
    then: (schema) => schema.required(withRequiredErrorMessage)
});
const withRequiredErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} is required.`;
const withInvalidErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} is not valid.`;
const withFullNameErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} must have at least first and last name.`;
const withPhoneErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} must be a valid phone number.`;

export { requireSchemaWhenKeyIs, withFullNameErrorMessage, withInvalidErrorMessage, withPhoneErrorMessage, withRequiredErrorMessage };
//# sourceMappingURL=validationUtils.js.map
