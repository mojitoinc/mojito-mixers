import React from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { TextField, TextFieldProps, controlledFieldFrom } from "../TextField/TextField";
import { useMergeRefs } from "use-callback-ref";

export const CardSecureCodeField: React.FC<TextFieldProps> = (props) => {
  const { getCVCProps } = usePaymentInputs();
  const { ref, ...paymentInputProps } = getCVCProps({
    placeholder: props.placeholder,
    onChange: props.onChange,
    onBlur: props.onBlur,
  });
  const inputRef = useMergeRefs([props.inputRef, ref]);

  return (
    <TextField
      { ...props }
      { ...paymentInputProps }
      inputRef={ inputRef } />
  );
};

export const ControlledCardSecureCodeField = controlledFieldFrom(CardSecureCodeField);
