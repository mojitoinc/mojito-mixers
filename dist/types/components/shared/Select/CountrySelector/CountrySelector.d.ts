import React from "react";
import { Control } from "react-hook-form";
import { SelectOption, SelectProps } from "../../Select/Select";
export interface CountrySelectorProps extends Omit<SelectProps, "value" | "options"> {
    value: SelectOption;
    onSelectCountry: (selectedOption: SelectOption) => void;
}
export declare const CountrySelector: React.FC<CountrySelectorProps>;
export declare type ControlledCountrySelectorProps = Omit<SelectProps, "value" | "options"> & {
    name: string;
    control: Control<any>;
};
export declare const ControlledCountrySelector: React.FC<ControlledCountrySelectorProps>;
