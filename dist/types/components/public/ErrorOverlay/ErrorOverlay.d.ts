import { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import { FullScreenOverlayFunctionalProps } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ThemeProviderProps } from "../../shared/ProvidersInjector/ProvidersInjector";
export interface PUIErrorOverlayProps extends FullScreenOverlayFunctionalProps {
    logoSrc?: string;
    logoSx?: SxProps<Theme>;
    errorImageSrc: string;
    onRedirect: (pathnameOrUrl: string) => void;
}
export declare type PUIErrorProps = PUIErrorOverlayProps & ThemeProviderProps;
export declare const PUIErrorOverlay: React.FC<PUIErrorOverlayProps>;
export declare const PUIError: React.FC<PUIErrorProps>;
