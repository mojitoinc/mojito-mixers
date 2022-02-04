import { TextFieldProps as MUITextFieldProps } from "@mui/material";
import React from "react";
export declare const controlledFieldFrom: (FieldComponent: React.ComponentType<any>) => ({ name, label, control, ...props }: {
    [x: string]: any;
    name: any;
    label: any;
    control: any;
}) => JSX.Element;
export declare type TextFieldProps = MUITextFieldProps;
export declare const TextField: React.FC<TextFieldProps>;
export declare const ControlledTextField: ({ name, label, control, ...props }: {
    [x: string]: any;
    name: any;
    label: any;
    control: any;
}) => JSX.Element;
