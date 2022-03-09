'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const requireSchemaWhenKeyIs = (key) => ({
    is: key,
    then: (schema) => schema.required(withRequiredErrorMessage)
});
const withRequiredErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} is required.`;
const withInvalidErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} is not valid.`;
const withFullNameErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} must have at least first and last name.`;
const withPhoneErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} must be a valid phone number.`;

exports.requireSchemaWhenKeyIs = requireSchemaWhenKeyIs;
exports.withFullNameErrorMessage = withFullNameErrorMessage;
exports.withInvalidErrorMessage = withInvalidErrorMessage;
exports.withPhoneErrorMessage = withPhoneErrorMessage;
exports.withRequiredErrorMessage = withRequiredErrorMessage;
//# sourceMappingURL=validationUtils.js.map
