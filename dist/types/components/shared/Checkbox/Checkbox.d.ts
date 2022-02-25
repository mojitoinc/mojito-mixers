import { CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";
import React from "react";
import { Control } from "react-hook-form";
export interface CheckboxProps extends MuiCheckboxProps {
    label: string | number | React.ReactElement;
    error?: boolean;
    helperText?: React.ReactNode;
}
export declare const Checkbox: React.FC<CheckboxProps>;
export declare type ControlledCheckboxProps = CheckboxProps & {
    name: string;
    control: Control<any>;
};
export declare const ControlledCheckbox: React.FC<ControlledCheckboxProps>;
