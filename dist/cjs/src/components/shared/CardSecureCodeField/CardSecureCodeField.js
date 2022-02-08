'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var reactPaymentInputs = require('react-payment-inputs');
var TextField = require('../TextField/TextField.js');
var useCallbackRef = require('use-callback-ref');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CardSecureCodeField = function CardSecureCodeField(props) {
  var getCVCProps = reactPaymentInputs.usePaymentInputs().getCVCProps;

  var _a = getCVCProps({
    placeholder: props.placeholder,
    onChange: props.onChange,
    onBlur: props.onBlur
  }),
      ref = _a.ref,
      paymentInputProps = tslib_es6.__rest(_a, ["ref"]);

  var inputRef = useCallbackRef.useMergeRefs([props.inputRef, ref]);
  return /*#__PURE__*/React__default["default"].createElement(TextField.TextField, tslib_es6.__assign({}, props, paymentInputProps, {
    inputRef: inputRef
  }));
};
var ControlledCardSecureCodeField = TextField.controlledFieldFrom(CardSecureCodeField);

exports.CardSecureCodeField = CardSecureCodeField;
exports.ControlledCardSecureCodeField = ControlledCardSecureCodeField;
//# sourceMappingURL=CardSecureCodeField.js.map
