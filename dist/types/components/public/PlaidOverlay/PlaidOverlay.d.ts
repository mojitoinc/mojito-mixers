import React from "react";
import { ProviderInjectorProps } from "../../shared/ProvidersInjector/ProvidersInjector";
export interface PUIPlaidOverlayProps {
    onRedirect: (pathnameOrUrl: string) => void;
}
export declare type PUISuccessProps = PUIPlaidOverlayProps & ProviderInjectorProps;
export declare const PUIPlaidOverlay: React.FC<PUIPlaidOverlayProps>;
export declare const PUISuccess: React.FC<PUISuccessProps>;
