import { __rest, __assign } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import { controlledFieldFrom, TextField } from '../TextField/TextField.js';
import { useMergeRefs } from 'use-callback-ref';

var CardExpiryDateField = function CardExpiryDateField(props) {
  var getExpiryDateProps = usePaymentInputs().getExpiryDateProps;

  var _a = getExpiryDateProps({
    placeholder: props.placeholder,
    onChange: props.onChange,
    onBlur: props.onBlur
  }),
      ref = _a.ref,
      paymentInputProps = __rest(_a, ["ref"]);

  var inputRef = useMergeRefs([props.inputRef, ref]);
  return /*#__PURE__*/React__default.createElement(TextField, __assign({}, props, paymentInputProps, {
    inputRef: inputRef
  }));
};
var ControlledCardExpiryDateField = controlledFieldFrom(CardExpiryDateField);

export { CardExpiryDateField, ControlledCardExpiryDateField };
//# sourceMappingURL=CardExpiryDateField.js.map
