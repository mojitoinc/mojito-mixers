import React, { useCallback, useEffect } from "react";
import { Control, Controller, FieldError } from "react-hook-form";
import {
  EMPTY_OPTION,
  Select,
  SelectOption,
  SelectProps
} from "../../Select/Select";
import { SelectChangeEvent } from "@mui/material/Select";
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

  const handleChange = useCallback(
    (e: SelectChangeEvent<string | number>) => {
      onSelectCountry(optionsMap[e.target.value]);
    },
    [optionsMap, onSelectCountry]
  );

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

    if ((selectedValue && selectedLabel) || (!selectedValue && !selectedLabel))
      return;

    const option = selectedValue
      ? optionsMap[selectedValue]
      : options.find((option) => option.label === selectedLabel);

    setTimeout(() => onSelectCountry(option || EMPTY_OPTION));
  }, [value, optionsMap, options, onSelectCountry]);

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

export type ControlledCountrySelectorProps = Omit<SelectProps, "value" | "options"> & { name: string; control: Control<any>; };

export const ControlledCountrySelector: React.FC<ControlledCountrySelectorProps> = ({
  name,
  control,
  label,
}) => (
  <Controller
    name={name}
    control={control}
    render={({ field: { name, onChange, ref, ...field }, fieldState }) => {
      const error = fieldState?.error;
      const fieldError = error ? (error.hasOwnProperty("message") ? error.message : (error as unknown as { value: FieldError }).value?.message) || "" : "";

      return (
        <CountrySelector
          id={name}
          name={name}
          label={label}
          onSelectCountry={onChange}
          fullWidth
          inputRef={ref}
          error={!!fieldError}
          helperText={fieldError}
          {...field}
        />
      );
    }}
  />
);
