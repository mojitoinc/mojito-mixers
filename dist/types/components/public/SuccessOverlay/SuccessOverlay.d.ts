import React from "react";
import { ThemeProviderProps } from "../../shared/ProvidersInjector/ProvidersInjector";
import { PUIStaticSuccessOverlayProps } from "./StaticSuccessOverlay";
export interface PUISuccessOverlayProps extends PUIStaticSuccessOverlayProps {
    onRedirect: (pathnameOrUrl: string) => void;
}
export declare type PUISuccessProps = PUISuccessOverlayProps & ThemeProviderProps;
export declare const PUISuccessOverlay: React.FC<PUISuccessOverlayProps>;
export declare const PUISuccess: React.FC<PUISuccessProps>;
