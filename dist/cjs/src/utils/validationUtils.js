'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var requireSchemaWhenKeyIs = function (key) { return ({
    is: key,
    then: function (schema) { return schema.required(withRequiredErrorMessage); }
}); };
var withRequiredErrorMessage = function (_a) {
    var fieldLabel = _a.label;
    return "".concat(fieldLabel, " is required");
};
var withInvalidErrorMessage = function (_a) {
    var fieldLabel = _a.label;
    return "".concat(fieldLabel, " is not valid");
};

exports.requireSchemaWhenKeyIs = requireSchemaWhenKeyIs;
exports.withInvalidErrorMessage = withInvalidErrorMessage;
exports.withRequiredErrorMessage = withRequiredErrorMessage;
//# sourceMappingURL=validationUtils.js.map
