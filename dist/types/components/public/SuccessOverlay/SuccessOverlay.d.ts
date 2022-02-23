import { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import { FullScreenOverlayFunctionalProps } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ProviderInjectorProps } from "../../shared/ProvidersInjector/ProvidersInjector";
export interface PUISuccessOverlayProps extends FullScreenOverlayFunctionalProps {
    logoSrc?: string;
    logoSx?: SxProps<Theme>;
    successImageSrc: string;
    onRedirect: (pathnameOrUrl: string) => void;
}
export declare type PUISuccessProps = PUISuccessOverlayProps & ProviderInjectorProps;
export declare const PUISuccessOverlay: React.FC<PUISuccessOverlayProps>;
export declare const PUISuccess: React.FC<PUISuccessProps>;
