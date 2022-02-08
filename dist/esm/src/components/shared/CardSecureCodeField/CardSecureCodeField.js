import { __rest, __assign } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import { controlledFieldFrom, TextField } from '../TextField/TextField.js';
import { useMergeRefs } from 'use-callback-ref';

var CardSecureCodeField = function CardSecureCodeField(props) {
  var getCVCProps = usePaymentInputs().getCVCProps;

  var _a = getCVCProps({
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
var ControlledCardSecureCodeField = controlledFieldFrom(CardSecureCodeField);

export { CardSecureCodeField, ControlledCardSecureCodeField };
//# sourceMappingURL=CardSecureCodeField.js.map
