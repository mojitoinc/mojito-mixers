/// <reference types="react" />
import { SvgIconProps, Theme } from "@mui/material";
import { SxProps } from "@mui/system";
export declare const CREDIT_CARD_ICON_SX: SxProps<Theme>;
export declare const SelectIcon: (props: SvgIconProps) => JSX.Element;
export interface CreditCardIconProps extends SvgIconProps {
    network?: string;
}
export declare const CreditCardIcon: ({ network, ...props }: {
    [x: string]: any;
    network: any;
}) => JSX.Element;
