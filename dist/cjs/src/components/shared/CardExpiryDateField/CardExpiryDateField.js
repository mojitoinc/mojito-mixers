'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var reactPaymentInputs = require('react-payment-inputs');
var TextField = require('../TextField/TextField.js');
var useCallbackRef = require('use-callback-ref');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CardExpiryDateField = (props) => {
    const { getExpiryDateProps } = reactPaymentInputs.usePaymentInputs();
    const _a = getExpiryDateProps({
        placeholder: props.placeholder,
        onChange: props.onChange,
        onBlur: props.onBlur,
    }), { ref } = _a, paymentInputProps = tslib_es6.__rest(_a, ["ref"]);
    const inputRef = useCallbackRef.useMergeRefs([props.inputRef, ref].filter(Boolean));
    return (React__default["default"].createElement(TextField.TextField, Object.assign({}, props, paymentInputProps, { inputRef: inputRef })));
};
const ControlledCardExpiryDateField = TextField.controlledFieldFrom(CardExpiryDateField);

exports.CardExpiryDateField = CardExpiryDateField;
exports.ControlledCardExpiryDateField = ControlledCardExpiryDateField;
//# sourceMappingURL=CardExpiryDateField.js.map
