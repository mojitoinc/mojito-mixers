import { TextFieldProps } from "@mui/material";
import React from "react";
import { usePaymentInputs } from "react-payment-inputs";
import { useMergeRefs } from "use-callback-ref";
import { ReactRef } from "use-callback-ref/dist/es5/types";
import { TextField, controlledFieldFrom } from "../TextField/TextField";

export const CardExpiryDateField: React.FC<TextFieldProps> = ({
  placeholder,
  onChange,
  onBlur,
  inputRef: parentInputRef,
  ...props
}) => {
  const { getExpiryDateProps } = usePaymentInputs();

  const { ref, ...paymentInputProps } = getExpiryDateProps({
    placeholder,
    onChange,
    onBlur,
  });

  const inputRef = useMergeRefs([parentInputRef, ref].filter(Boolean) as ReactRef<any>[]);

  return (
    <TextField
      { ...props }
      { ...paymentInputProps }
      inputRef={ inputRef } />
  );
};

export const ControlledCardExpiryDateField = controlledFieldFrom(CardExpiryDateField);
