import { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import { ErrorViewProps } from "../../../views/Error/ErrorView";
export interface PUIStaticErrorOverlayProps extends ErrorViewProps {
    logoSrc?: string;
    logoSx?: SxProps<Theme>;
}
export declare const PUIStaticErrorOverlay: React.FC<PUIStaticErrorOverlayProps>;
