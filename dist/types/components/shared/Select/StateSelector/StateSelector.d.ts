import React from "react";
import { SelectOption, SelectProps } from "../../../shared/Select/Select";
export interface StateSelectorProps extends Omit<SelectProps, "value" | "options"> {
    value: SelectOption;
    onSelectState: (selectedOption: SelectOption) => void;
    countryCode: string;
}
export declare const StateSelector: React.FC<StateSelectorProps>;
export declare const ControlledStateSelector: ({ name, control, label, countryCode, }: {
    name: any;
    control: any;
    label: any;
    countryCode: any;
}) => JSX.Element;
