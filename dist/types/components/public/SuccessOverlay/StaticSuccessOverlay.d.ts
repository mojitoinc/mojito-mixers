import { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import { SuccessViewProps } from "../../../views/Success/SuccessView";
export interface PUIStaticSuccessOverlayProps extends SuccessViewProps {
    logoSrc?: string;
    logoSx?: SxProps<Theme>;
}
export declare const PUIStaticSuccessOverlay: React.FC<PUIStaticSuccessOverlayProps>;
