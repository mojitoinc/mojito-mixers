import { __rest, __assign } from '../../../../node_modules/tslib/tslib.es6.js';
import { InputAdornment } from '@mui/material';
import React__default from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import index from '../../../../node_modules/react-payment-inputs/es/images/index.js';
import { useMergeRefs } from 'use-callback-ref';
import { CreditCardIcon } from '../Icons/Icons.js';
import { TextField, controlledFieldFrom } from '../TextField/TextField.js';

var CardNumberField = function (props) {
    var _a = usePaymentInputs(), getCardImageProps = _a.getCardImageProps, getCardNumberProps = _a.getCardNumberProps;
    var _b = getCardNumberProps({
        placeholder: props.placeholder,
        onChange: props.onChange,
        onBlur: props.onBlur,
    }), ref = _b.ref, paymentInputProps = __rest(_b, ["ref"]);
    var inputRef = useMergeRefs([props.inputRef, ref]);
    return (React__default.createElement(TextField, __assign({}, props, paymentInputProps, { inputRef: inputRef, InputProps: __assign(__assign({}, props.InputProps), { endAdornment: (React__default.createElement(InputAdornment, { position: "end" },
                React__default.createElement(CreditCardIcon, __assign({}, getCardImageProps({ images: index }))))) }) })));
};
var ControlledCardNumberField = controlledFieldFrom(CardNumberField);

export { CardNumberField, ControlledCardNumberField };
//# sourceMappingURL=CardNumberField.js.map
