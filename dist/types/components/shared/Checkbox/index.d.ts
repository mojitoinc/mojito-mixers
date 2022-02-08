import { CheckboxProps as MuiCheckboxProps } from "@mui/material/Checkbox";
import React from "react";
export interface CheckboxProps extends MuiCheckboxProps {
    label: string | number | React.ReactElement;
    error?: boolean;
    helperText?: React.ReactNode;
}
export declare const Checkbox: React.FC<CheckboxProps>;
export declare const ControlledCheckbox: ({ name, control, label, }: {
    name: any;
    control: any;
    label: any;
}) => JSX.Element;
