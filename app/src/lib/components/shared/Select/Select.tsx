import { Select as MuiSelect, SelectProps as MuiSelectProps, InputLabel, MenuItem, FormControl, FormHelperText, useMediaQuery } from "@mui/material";
import React from "react";
import { useTheme } from "@mui/material/styles";
import { SelectIcon } from "../Icons/Icons";

export interface SelectOption<V = string | number> {
  value: V;
  label: string;
}

export interface SelectProps extends Omit<MuiSelectProps<string | number>, "margin"> {
  label: React.ReactNode;
  options: SelectOption[];
  helperText?: string;
  margin?: "none" | "dense" | "normal";
}

export const EMPTY_OPTION: SelectOption = {
  label: "",
  value: "",
};

const mapOptionMobile = ({ value, label }: SelectOption) => (
  <option key={ label } value={ value }>
    { label }
  </option>
);

const mapOptionDesktop = ({ value, label }: SelectOption) => (
  <MenuItem key={ label } value={ value }>
    { label }
  </MenuItem>
);

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
  const mapOption = matches ? mapOptionMobile : mapOptionDesktop;
  const selectOptions = matches ? [EMPTY_OPTION, ...options] : options;

  return (
    <FormControl fullWidth margin={ margin } variant="filled" disabled={disabled} error={error}>
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
  );
}
