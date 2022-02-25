import React from "react";
import { Control } from "react-hook-form";
import { SelectOption, SelectProps } from "../../../shared/Select/Select";
export interface StateSelectorProps extends Omit<SelectProps, "value" | "options"> {
    value: SelectOption;
    onSelectState: (selectedOption: SelectOption) => void;
    countryCode: string | number;
}
export declare const StateSelector: React.FC<StateSelectorProps>;
export declare type ControlledStateSelectorProps = Omit<SelectProps, "value" | "options"> & {
    name: string;
    control: Control<any>;
    countryCode: string | number;
};
export declare const ControlledStateSelector: React.FC<ControlledStateSelectorProps>;
