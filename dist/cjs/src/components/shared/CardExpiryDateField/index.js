'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var reactPaymentInputs = require('react-payment-inputs');
var TextField = require('../TextField/TextField.js');
var useCallbackRef = require('use-callback-ref');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CardExpiryDateField = function (props) {
    var getExpiryDateProps = reactPaymentInputs.usePaymentInputs().getExpiryDateProps;
    var _a = getExpiryDateProps({
        placeholder: props.placeholder,
        onChange: props.onChange,
        onBlur: props.onBlur,
    }), ref = _a.ref, paymentInputProps = tslib_es6.__rest(_a, ["ref"]);
    var inputRef = useCallbackRef.useMergeRefs([props.inputRef, ref]);
    return (React__default["default"].createElement(TextField.TextField, tslib_es6.__assign({}, props, paymentInputProps, { inputRef: inputRef })));
};
var ControlledCardExpiryDateField = TextField.controlledFieldFrom(CardExpiryDateField);

exports.CardExpiryDateField = CardExpiryDateField;
exports.ControlledCardExpiryDateField = ControlledCardExpiryDateField;
//# sourceMappingURL=index.js.map
