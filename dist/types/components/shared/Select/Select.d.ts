import { SelectProps as MuiSelectProps } from "@mui/material";
import React from "react";
export interface SelectOption {
    value: string | number;
    label: string;
}
export interface SelectProps extends MuiSelectProps<string | number> {
    label: React.ReactNode;
    options: SelectOption[];
    helperText?: string;
}
export declare const EMPTY_OPTION: SelectOption;
export declare const Select: React.FC<SelectProps>;
