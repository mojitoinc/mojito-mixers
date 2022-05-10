import React, { useCallback, useEffect } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { EMPTY_OPTION, Select, SelectOption, SelectProps } from "../Select";
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

export type ControlledCountrySelectorProps = Omit<SelectProps, "value" | "options"> & { name: string; control: Control<any>; };

export const ControlledCountrySelector: React.FC<ControlledCountrySelectorProps> = ({
  name: parentName,
  control,
  label,
}) => (
  <Controller
    name={ parentName }
    control={ control }
    render={ ({ field: { name, onChange, ref, ...field }, fieldState }) => {
      const error = fieldState?.error;
      const fieldError = error ? (error.hasOwnProperty("message") ? error.message : (error as unknown as { value: FieldError }).value?.message) || "" : "";

      return (
        <CountrySelector
          id={ name }
          name={ name }
          autoComplete="country"
          label={ label }
          onSelectCountry={ onChange }
          fullWidth
          inputRef={ ref }
          error={ !!fieldError }
          helperText={ fieldError }
          { ...field } />
      );
    } } />
);
