import { Select as MuiSelect, SelectProps as MuiSelectProps, InputLabel, MenuItem, FormControl, FormHelperText, useMediaQuery, useTheme } from "@mui/material";
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

export const EMPTY_OPTION: SelectOption = {
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
  margin = "normal",
  ...props
}) => {

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const selectOptions = matches ? [EMPTY_OPTION, ...options] : options;
  const mapOption = ({ value, label }: SelectOption) => matches ?
    <option key={label} value={value}>
      {label}
    </option> :
    <MenuItem key={label} value={value}>
      {label}
    </MenuItem>;


  return <FormControl fullWidth margin="normal" variant="filled" disabled={disabled} error={error}>
    <InputLabel required={required} htmlFor={id} disabled={disabled} shrink>
      {label}
    </InputLabel>
    <MuiSelect
      {...props}
      id={id}
      disabled={disabled}
      native={matches}
      IconComponent={SelectIcon}
      disableUnderline
      autoComplete={props.autoComplete || props.name}>
      {selectOptions.map(mapOption)}
    </MuiSelect>
    {helperText && <FormHelperText>{helperText}</FormHelperText>}
  </FormControl>
}
