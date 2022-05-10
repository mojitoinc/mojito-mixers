import React, { useCallback, useEffect, useRef } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import { SelectChangeEvent } from "@mui/material";
import { EMPTY_OPTION, Select, SelectOption, SelectProps } from "../Select";
import { useCountryOptions } from "../../../../hooks/useCountryOptions";

export interface StateSelectorProps extends Omit<SelectProps, "value" | "options"> {
  value: SelectOption;
  onSelectState: (selectedOption: SelectOption) => void;
  countryCode: string | number;
}

export const StateSelector: React.FC<StateSelectorProps> = ({
  label,
  value,
  disabled,
  onSelectState,
  countryCode,
  ...props
}) => {
  const optionFromCountryRef = useRef<string | number>(countryCode);

  const { options, optionsMap } = useCountryOptions(countryCode);

  const handleChange = useCallback((e: SelectChangeEvent<string | number>) => {
    optionFromCountryRef.current = countryCode;

    onSelectState(optionsMap[e.target.value]);
  }, [countryCode, optionsMap, onSelectState]);

  const isDisabled = disabled || !countryCode || options.length === 0;

  // If the selected option can't be found among the available ones, or if the selected country code changes, we reset
  // the field (note the optionFromCountryRef takes care of handling states of different countries that have the same
  // code, such as Andorra and Anguilla):
  useEffect(() => {
    const stateCode = value.value;

    if (isDisabled || !stateCode) return;

    const optionFromCountry = optionFromCountryRef.current;

    if (!optionsMap[stateCode] || (optionFromCountry && optionFromCountry !== countryCode)) onSelectState(EMPTY_OPTION);
  }, [value, isDisabled, optionsMap, onSelectState, countryCode]);

  // If the selected option only has one property set, we try to find a match:
  useEffect(() => {
    const { value: selectedValue, label: selectedLabel } = value;

    if ((selectedValue && selectedLabel) || (!selectedValue && !selectedLabel) || options.length === 0) return;

    const option = (
      selectedValue
        ? optionsMap[selectedValue]
        : options.find(opt => opt.label === selectedLabel)
    ) || EMPTY_OPTION;

    onSelectState(optionFromCountryRef.current === countryCode ? option : EMPTY_OPTION);
  }, [value, optionsMap, options, onSelectState, countryCode]);

  const selectedValue = value.value;

  return (
    <Select
      { ...props }
      // See https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill:
      autoComplete={ props.autoComplete || "region" }
      label={ label }
      options={ options }
      onChange={ handleChange }
      value={ optionsMap[selectedValue] ? selectedValue : "" }
      disabled={ isDisabled } />
  );
};

export type ControlledStateSelectorProps = Omit<SelectProps, "value" | "options"> & { name: string; control: Control<any>; countryCode: string | number; };

export const ControlledStateSelector: React.FC<ControlledStateSelectorProps> = ({
  name: parentName,
  control,
  label,
  countryCode,
}) => (
  <Controller
    name={ parentName }
    control={ control }
    render={ ({ field: { name, onChange, ref, ...field }, fieldState }) => {
      const error = fieldState?.error;
      const fieldError = error ? (error.hasOwnProperty("message") ? error.message : (error as unknown as { value: FieldError }).value?.message) || "" : "";

      return (
        <StateSelector
          id={ name }
          name={ name }
          label={ label }
          onSelectState={ onChange }
          fullWidth
          countryCode={ countryCode }
          inputRef={ ref }
          error={ !!fieldError }
          helperText={ fieldError }
          { ...field } />
      );
    } } />
);
