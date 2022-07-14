import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps,
} from "@mui/material";
import { Control, Controller, Path } from "react-hook-form";
import React from "react";

export type TextFieldProps = MUITextFieldProps;

export type ControlledFieldProps<TFieldValues = any, TContext = any> = TextFieldProps & {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, TContext>;
};

export function controlledFieldFrom(FieldComponent: React.ComponentType<TextFieldProps>) {
  // eslint-disable-next-line react/function-component-definition
  function ControlledField<TFieldValues = any, TContext = any>({
    name: parentName,
    label,
    control,
    ...props
  }: ControlledFieldProps<TFieldValues, TContext>) {
    return (
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
  }

  return ControlledField;
}


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
