import { SvgIconProps } from "@mui/material";
import { SxProps } from "@mui/system";
import React from "react";
import { Theme } from "@mui/material/styles";
export declare const CREDIT_CARD_ICON_SX: SxProps<Theme>;
export declare const SelectIcon: (props: SvgIconProps) => JSX.Element;
export declare const CreditCardIcon: React.FC<SvgIconProps & {
    network: string;
}>;
