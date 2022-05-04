import { InputAdornment } from "@mui/material";
import React from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { useMergeRefs } from "use-callback-ref";
import { ReactRef } from "use-callback-ref/dist/es5/types";
import { CreditCardIcon } from "../Icons/Icons";
import { TextField, TextFieldProps, controlledFieldFrom } from "../TextField/TextField";

export const CardNumberField: React.FC<TextFieldProps> = ({
  placeholder,
  onChange,
  onBlur,
  inputRef: parentInputRef,
  ...props
}) => {
  const { getCardImageProps, getCardNumberProps } = usePaymentInputs();

  const { ref, ...paymentInputProps } = getCardNumberProps({
    placeholder,
    onChange,
    onBlur,
  });

  const inputRef = useMergeRefs([parentInputRef, ref].filter(Boolean) as ReactRef<any>[]);

  return (
    <TextField
      { ...props }
      { ...paymentInputProps }
      inputRef={ inputRef }
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <CreditCardIcon { ...getCardImageProps({ images }) } />
          </InputAdornment>
        ),
      }} />
  );
};

export const ControlledCardNumberField = controlledFieldFrom(CardNumberField);
