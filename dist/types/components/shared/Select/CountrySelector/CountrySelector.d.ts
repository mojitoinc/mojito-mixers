import React from "react";
import { SelectOption, SelectProps } from "../../Select/Select";
export interface CountrySelectorProps extends Omit<SelectProps, "value" | "options"> {
    value: SelectOption;
    onSelectCountry: (selectedOption: SelectOption) => void;
}
export declare const CountrySelector: React.FC<CountrySelectorProps>;
export declare const ControlledCountrySelector: ({ name, control, label, }: {
    name: any;
    control: any;
    label: any;
}) => JSX.Element;
