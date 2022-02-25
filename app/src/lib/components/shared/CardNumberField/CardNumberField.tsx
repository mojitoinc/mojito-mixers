import { InputAdornment } from "@mui/material";
import React from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";
import { useMergeRefs } from "use-callback-ref";
import { CreditCardIcon } from "../Icons/Icons";
import { TextField, TextFieldProps, controlledFieldFrom } from "../TextField/TextField";
import { ReactRef } from "use-callback-ref/dist/es5/types";

export const CardNumberField: React.FC<TextFieldProps> = (props) => {
  const { getCardImageProps, getCardNumberProps } = usePaymentInputs();
  const { ref, ...paymentInputProps } = getCardNumberProps({
    placeholder: props.placeholder,
    onChange: props.onChange,
    onBlur: props.onBlur,
  });
  const inputRef = useMergeRefs([props.inputRef, ref].filter(Boolean) as ReactRef<any>[]);

  return (
    <TextField
      { ...props }
      { ...paymentInputProps }
      inputRef={ inputRef }
      InputProps={{
        ...props.InputProps,
        endAdornment: (
          <InputAdornment position="end">
            <CreditCardIcon {...getCardImageProps({ images })} />
          </InputAdornment>
        ),
      }} />
  );
};

export const ControlledCardNumberField = controlledFieldFrom(CardNumberField);
