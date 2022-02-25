import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import { controlledFieldFrom, TextField } from '../TextField/TextField.js';
import { useMergeRefs } from 'use-callback-ref';

const CardExpiryDateField = (props) => {
    const { getExpiryDateProps } = usePaymentInputs();
    const _a = getExpiryDateProps({
        placeholder: props.placeholder,
        onChange: props.onChange,
        onBlur: props.onBlur,
    }), { ref } = _a, paymentInputProps = __rest(_a, ["ref"]);
    const inputRef = useMergeRefs([props.inputRef, ref].filter(Boolean));
    return (React__default.createElement(TextField, Object.assign({}, props, paymentInputProps, { inputRef: inputRef })));
};
const ControlledCardExpiryDateField = controlledFieldFrom(CardExpiryDateField);

export { CardExpiryDateField, ControlledCardExpiryDateField };
//# sourceMappingURL=CardExpiryDateField.js.map
