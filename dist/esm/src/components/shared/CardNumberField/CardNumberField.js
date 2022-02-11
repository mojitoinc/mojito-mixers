import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { InputAdornment } from '@mui/material';
import React__default from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import index from '../../../../node_modules/react-payment-inputs/es/images/index.js';
import { useMergeRefs } from 'use-callback-ref';
import { CreditCardIcon } from '../Icons/Icons.js';
import { TextField, controlledFieldFrom } from '../TextField/TextField.js';

const CardNumberField = (props) => {
    const { getCardImageProps, getCardNumberProps } = usePaymentInputs();
    const _a = getCardNumberProps({
        placeholder: props.placeholder,
        onChange: props.onChange,
        onBlur: props.onBlur,
    }), { ref } = _a, paymentInputProps = __rest(_a, ["ref"]);
    const inputRef = useMergeRefs([props.inputRef, ref]);
    return (React__default.createElement(TextField, Object.assign({}, props, paymentInputProps, { inputRef: inputRef, InputProps: Object.assign(Object.assign({}, props.InputProps), { endAdornment: (React__default.createElement(InputAdornment, { position: "end" },
                React__default.createElement(CreditCardIcon, Object.assign({}, getCardImageProps({ images: index }))))) }) })));
};
const ControlledCardNumberField = controlledFieldFrom(CardNumberField);

export { CardNumberField, ControlledCardNumberField };
//# sourceMappingURL=CardNumberField.js.map
