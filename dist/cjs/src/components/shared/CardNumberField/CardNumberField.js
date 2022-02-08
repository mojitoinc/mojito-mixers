'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var reactPaymentInputs = require('react-payment-inputs');
var index = require('../../../../node_modules/react-payment-inputs/es/images/index.js');
var useCallbackRef = require('use-callback-ref');
var Icons = require('../Icons/Icons.js');
var TextField = require('../TextField/TextField.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CardNumberField = function (props) {
    var _a = reactPaymentInputs.usePaymentInputs(), getCardImageProps = _a.getCardImageProps, getCardNumberProps = _a.getCardNumberProps;
    var _b = getCardNumberProps({
        placeholder: props.placeholder,
        onChange: props.onChange,
        onBlur: props.onBlur,
    }), ref = _b.ref, paymentInputProps = tslib_es6.__rest(_b, ["ref"]);
    var inputRef = useCallbackRef.useMergeRefs([props.inputRef, ref]);
    return (React__default["default"].createElement(TextField.TextField, tslib_es6.__assign({}, props, paymentInputProps, { inputRef: inputRef, InputProps: tslib_es6.__assign(tslib_es6.__assign({}, props.InputProps), { endAdornment: (React__default["default"].createElement(material.InputAdornment, { position: "end" },
                React__default["default"].createElement(Icons.CreditCardIcon, tslib_es6.__assign({}, getCardImageProps({ images: index["default"] }))))) }) })));
};
var ControlledCardNumberField = TextField.controlledFieldFrom(CardNumberField);

exports.CardNumberField = CardNumberField;
exports.ControlledCardNumberField = ControlledCardNumberField;
//# sourceMappingURL=CardNumberField.js.map
