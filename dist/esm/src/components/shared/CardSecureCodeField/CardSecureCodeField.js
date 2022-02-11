import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import React__default from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import { controlledFieldFrom, TextField } from '../TextField/TextField.js';
import { useMergeRefs } from 'use-callback-ref';

const CardSecureCodeField = (props) => {
    const { getCVCProps } = usePaymentInputs();
    const _a = getCVCProps({
        placeholder: props.placeholder,
        onChange: props.onChange,
        onBlur: props.onBlur,
    }), { ref } = _a, paymentInputProps = __rest(_a, ["ref"]);
    const inputRef = useMergeRefs([props.inputRef, ref]);
    return (React__default.createElement(TextField, Object.assign({}, props, paymentInputProps, { inputRef: inputRef })));
};
const ControlledCardSecureCodeField = controlledFieldFrom(CardSecureCodeField);

export { CardSecureCodeField, ControlledCardSecureCodeField };
//# sourceMappingURL=CardSecureCodeField.js.map
