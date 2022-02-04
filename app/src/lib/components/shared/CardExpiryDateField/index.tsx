import { TextFieldProps } from "@mui/material";
import React from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { TextField, controlledFieldFrom } from "../TextField/TextField";
import { useMergeRefs } from "use-callback-ref";

export const CardExpiryDateField: React.FC<TextFieldProps> = (props) => {
  const { getExpiryDateProps } = usePaymentInputs();
  const { ref, ...paymentInputProps } = getExpiryDateProps({
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

export const ControlledCardExpiryDateField = controlledFieldFrom(CardExpiryDateField);
