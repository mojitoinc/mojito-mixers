import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { Control, Controller } from "react-hook-form";
import React from "react";

export type TextFieldProps = MUITextFieldProps;

export type ControlledFieldProps = TextFieldProps & { name: string; control: Control<any>; };

export const controlledFieldFrom = (FieldComponent: React.ComponentType<TextFieldProps>) => {
  const ControlledField: React.FC<ControlledFieldProps> = ({
    name: parentName,
    label,
    control,
    ...props
  }) => (
    <Controller
      name={ parentName }
      control={ control }
      render={ ({ field: { name, ref, ...field }, fieldState: { error } }) => (
        <FieldComponent
          id={ name }
          name={ name }
          label={ label }
          fullWidth
          inputRef={ ref }
          error={ !!error }
          helperText={ error?.message }
          { ...props }
          { ...field } />
      ) } />
  );

  return ControlledField;
};


export const TextField: React.FC<TextFieldProps> = ({
  InputProps,
  InputLabelProps,
  ...props
}) => (
  <MUITextField
    fullWidth
    variant="filled"
    margin="normal"
    { ...props }
    InputProps={{
      ...InputProps,
      disableUnderline: true,
    } as any}
    InputLabelProps={{
      ...InputLabelProps,
      shrink: true,
    }} />
);

export const ControlledTextField = controlledFieldFrom(TextField);
