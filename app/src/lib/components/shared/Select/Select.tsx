import { Select as MuiSelect, SelectProps as MuiSelectProps, InputLabel, MenuItem, FormControl, FormHelperText } from "@mui/material";
import { SelectIcon } from "../Icons/Icons";
import React from "react";

export interface SelectOption<V = string | number> {
  value: V;
  label: string;
};

export interface SelectProps extends Omit<MuiSelectProps<string | number>, "margin"> {
  label: React.ReactNode;
  options: SelectOption[];
  helperText?: string;
  margin?: "none" | "dense" | "normal";
};

export const EMPTY_OPTION: SelectOption= {
  label: "",
  value: "",
};

export const Select: React.FC<SelectProps> = ({
  id,
  label,
  required,
  disabled,
  options = [],
  helperText,
  error,
  margin,
  ...props
}) => (
  <FormControl fullWidth margin={ margin } variant="filled" disabled={ disabled } error={ error }>
    <InputLabel required={ required } htmlFor={id} disabled={ disabled } shrink>
      {label}
    </InputLabel>
    <MuiSelect
      id={id}
      disabled={disabled}
      IconComponent={SelectIcon}
      disableUnderline
      {...props}>
      {options.map(({ value, label }) => (
        <MenuItem key={label} value={value}>
          {label}
        </MenuItem>
      ))}
    </MuiSelect>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
);
