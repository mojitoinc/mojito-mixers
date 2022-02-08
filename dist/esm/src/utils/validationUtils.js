var requireSchemaWhenKeyIs = function requireSchemaWhenKeyIs(key) {
  return {
    is: key,
    then: function then(schema) {
      return schema.required(withRequiredErrorMessage);
    }
  };
};
var withRequiredErrorMessage = function withRequiredErrorMessage(_a) {
  var fieldLabel = _a.label;
  return "".concat(fieldLabel, " is required");
};
var withInvalidErrorMessage = function withInvalidErrorMessage(_a) {
  var fieldLabel = _a.label;
  return "".concat(fieldLabel, " is not valid");
};

export { requireSchemaWhenKeyIs, withInvalidErrorMessage, withRequiredErrorMessage };
//# sourceMappingURL=validationUtils.js.map
