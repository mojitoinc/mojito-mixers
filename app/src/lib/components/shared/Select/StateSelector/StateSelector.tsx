import React, { useCallback, useEffect } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  EMPTY_OPTION,
  Select,
  SelectOption,
  SelectProps
} from "../../../shared/Select/Select";
import { SelectChangeEvent } from "@mui/material/Select";
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
  const { options, optionsMap } = useCountryOptions(countryCode);

  const handleChange = useCallback(
    (e: SelectChangeEvent<string | number>) => {
      onSelectState(optionsMap[e.target.value]);
    },
    [optionsMap, onSelectState]
  );

  const isDisabled = disabled || !countryCode || options.length === 0;

  // If the selected option can't be found among the available ones, we reset the field:
  useEffect(() => {
    const stateCode = value.value;

    if (isDisabled || !stateCode) return;

    if (!optionsMap[stateCode]) onSelectState(EMPTY_OPTION);
  }, [value, isDisabled, optionsMap, onSelectState]);

  // If the selected option only has one property set, we try to find a match:
  useEffect(() => {
    const { value: selectedValue, label: selectedLabel } = value;


    if (
      (selectedValue && selectedLabel) ||
      (!selectedValue && !selectedLabel) ||
      options.length === 0
    ) {
      if (!countryCode && value.value !== '') {
        onSelectState(EMPTY_OPTION)
      }
      return;
    }

    const option = selectedValue
      ? optionsMap[selectedValue]
      : options.find((option) => option.label === selectedLabel);

    setTimeout(() => onSelectState(option || EMPTY_OPTION));
  }, [value, optionsMap, options, onSelectState, countryCode]);

  return (
    <Select
      {...props}
      label={label}
      options={options}
      onChange={handleChange}
      value={value.value}
      disabled={isDisabled}
    />
  );
};

export type ControlledStateSelectorProps = Omit<SelectProps, "value" | "options"> & { name: string; control: Control<any>; countryCode: string | number; };

export const ControlledStateSelector: React.FC<ControlledStateSelectorProps> = ({
  name,
  control,
  label,
  countryCode,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { name, onChange, ref, ...field }, fieldState }) => {
      const error = fieldState?.error;
      const fieldError = error ? (error.hasOwnProperty("message") ? error.message : (error as unknown as { value: FieldError }).value?.message) || "" : "";

      return (
        <StateSelector
          id={name}
          name={name}
          //autocomplete property is getting passed since it is necessary to pass a 'region' value in order to be recognized by the chrome's autofill feature
          autoComplete="region"
          label={label}
          onSelectState={onChange}
          fullWidth
          countryCode={countryCode}
          inputRef={ref}
          error={!!fieldError}
          helperText={fieldError}
          {...field}
        />
      );
    }}
  />
);
