import React, { useCallback, useEffect } from "react";
import { Control, Controller, FieldError, Path } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { EMPTY_OPTION, isSelectOption, Select, SelectOption, SelectProps } from "../Select";
import { useCountryOptions } from "../../../../hooks/useCountryOptions";

export interface CountrySelectorProps extends Omit<SelectProps, "value" | "options"> {
  value: SelectOption;
  onSelectCountry: (selectedOption: SelectOption) => void;
}

export const CountrySelector: React.FC<CountrySelectorProps> = ({
  label,
  value,
  disabled,
  onSelectCountry,
  ...props
}) => {
  const { options, optionsMap } = useCountryOptions();

  const handleChange = useCallback((e: SelectChangeEvent<string | number>) => {
    onSelectCountry(optionsMap[e.target.value]);
  }, [optionsMap, onSelectCountry]);

  const isDisabled = disabled || options.length === 0;

  // If the selected option can't be found among the available ones, we reset the field:
  useEffect(() => {
    const countryCode = value.value;

    if (isDisabled || !countryCode) return;

    if (!optionsMap[countryCode]) onSelectCountry(EMPTY_OPTION);
  }, [value, isDisabled, optionsMap, onSelectCountry]);

  // If the selected option only has one property set, we try to find a match:
  useEffect(() => {
    const { value: selectedValue, label: selectedLabel } = value;

    if ((selectedValue && selectedLabel) || (!selectedValue && !selectedLabel) || options.length === 0) return;

    const option = selectedValue
      ? optionsMap[selectedValue]
      : options.find(opt => opt.label === selectedLabel);

    setTimeout(() => onSelectCountry(option || EMPTY_OPTION));
  }, [value, optionsMap, options, onSelectCountry]);

  const selectedValue = value.value;

  return (
    <Select
      { ...props }
      // See https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill
      autoComplete={ props.autoComplete || "country" }
      label={ label }
      options={ options }
      onChange={ handleChange }
      value={ optionsMap[selectedValue] ? selectedValue : "" }
      disabled={ isDisabled } />
  );
};

export type ControlledCountrySelectorProps<TFieldValues = any, TContext = any> = Omit<SelectProps, "value" | "options"> & {
  name: Path<TFieldValues>;
  control: Control<TFieldValues, TContext>;
};

// eslint-disable-next-line react/function-component-definition
export function ControlledCountrySelector <TFieldValues = any, TContext = any>({
  name: parentName,
  control,
  label,
}: ControlledCountrySelectorProps<TFieldValues, TContext>) {
  return (
    <Controller<TFieldValues>
      name={ parentName }
      control={ control }
      render={ ({ field: { name, value, onChange, onBlur, ref }, fieldState }) => {
        const error = fieldState?.error;
        const fieldError = error ? (error.hasOwnProperty("message") ? error.message : (error as unknown as { value: FieldError }).value?.message) || "" : "";

        return (
          <CountrySelector
            id={ name }
            name={ name }
            value={ isSelectOption(value) ? value : EMPTY_OPTION }
            autoComplete="country"
            label={ label }
            onSelectCountry={ onChange }
            onBlur={ onBlur }
            fullWidth
            inputRef={ ref }
            error={ !!fieldError }
            helperText={ fieldError } />
        );
      } } />
  );
}
