import { BoxProps } from "@mui/material";
import React from "react";
export interface DebugBoxProps extends BoxProps {
    compact?: boolean;
}
export declare const DebugBox: React.FC<DebugBoxProps>;
