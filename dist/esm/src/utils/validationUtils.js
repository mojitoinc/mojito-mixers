const requireSchemaWhenKeyIs = (key) => ({
    is: key,
    then: (schema) => schema.required(withRequiredErrorMessage)
});
const withRequiredErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} is required`;
const withInvalidErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} is not valid`;

export { requireSchemaWhenKeyIs, withInvalidErrorMessage, withRequiredErrorMessage };
//# sourceMappingURL=validationUtils.js.map
