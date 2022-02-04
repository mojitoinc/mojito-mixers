import {
  TextField as MUITextField,
  TextFieldProps as MUITextFieldProps
} from "@mui/material";
import { Controller } from "react-hook-form";
import React from "react";

export const controlledFieldFrom =
  (FieldComponent: React.ComponentType<any>) =>
  ({ name, label, control, ...props }) =>
    (
      <Controller
        name={name}
        control={control}
        render={({ field: { name, ref, ...field }, fieldState: { error } }) => (
          <FieldComponent
            id={name}
            name={name}
            label={label}
            fullWidth
            inputRef={ref}
            error={!!error}
            helperText={error?.message}
            {...props}
            {...field}
          />
        )}
      />
    );

export type TextFieldProps = MUITextFieldProps;

export const TextField: React.FC<TextFieldProps> = (props) => (
  <MUITextField
    fullWidth
    variant="filled"
    margin="normal"
    {...props}
    InputProps={
      {
        ...props.InputProps,
        disableUnderline: true
      } as any
    }
    InputLabelProps={{
      ...props.InputLabelProps,
      shrink: true
    }}
  />
);

export const ControlledTextField = controlledFieldFrom(TextField);
