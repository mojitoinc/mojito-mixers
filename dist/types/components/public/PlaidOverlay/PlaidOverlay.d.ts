import React from "react";
import { ThemeProviderProps } from "../../shared/ProvidersInjector/ProvidersInjector";
export interface PUIPlaidOverlayProps {
    onRedirect: (pathnameOrUrl: string) => void;
}
export declare type PUISuccessProps = PUIPlaidOverlayProps & ThemeProviderProps;
export declare const PUIPlaidOverlay: React.FC<PUIPlaidOverlayProps>;
export declare const PUIPlaid: React.FC<PUISuccessProps>;
