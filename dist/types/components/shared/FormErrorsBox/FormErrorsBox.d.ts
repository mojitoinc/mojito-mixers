import { BoxProps } from "@mui/material";
import React from "react";
export interface FormErrorsBoxProps extends BoxProps {
    error: string;
}
export declare const FormErrorsBox: React.FC<FormErrorsBoxProps>;
