'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const requireSchemaWhenKeyIs = (key) => ({
    is: key,
    then: (schema) => schema.required(withRequiredErrorMessage)
});
const withRequiredErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} is required`;
const withInvalidErrorMessage = ({ label: fieldLabel }) => `${fieldLabel} is not valid`;

exports.requireSchemaWhenKeyIs = requireSchemaWhenKeyIs;
exports.withInvalidErrorMessage = withInvalidErrorMessage;
exports.withRequiredErrorMessage = withRequiredErrorMessage;
//# sourceMappingURL=validationUtils.js.map
