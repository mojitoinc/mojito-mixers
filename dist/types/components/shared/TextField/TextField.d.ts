import { TextFieldProps as MUITextFieldProps } from "@mui/material";
import { Control } from "react-hook-form";
import React from "react";
export declare type TextFieldProps = MUITextFieldProps;
export declare type ControlledFieldProps = TextFieldProps & {
    name: string;
    control: Control<any>;
};
export declare const controlledFieldFrom: (FieldComponent: React.ComponentType<TextFieldProps>) => React.FC<ControlledFieldProps>;
export declare const TextField: React.FC<TextFieldProps>;
export declare const ControlledTextField: React.FC<ControlledFieldProps>;
