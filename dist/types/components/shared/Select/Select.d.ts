import { SelectProps as MuiSelectProps } from "@mui/material";
import React from "react";
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
export declare const EMPTY_OPTION: SelectOption;
export declare const Select: React.FC<SelectProps>;
