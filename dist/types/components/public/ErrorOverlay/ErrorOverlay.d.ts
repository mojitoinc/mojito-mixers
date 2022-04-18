import React from "react";
import { ProvidersInjectorProps } from "../../shared/ProvidersInjector/ProvidersInjector";
import { PUIStaticErrorOverlayProps } from "./StaticErrorOverlay";
export interface PUIErrorOverlayProps extends PUIStaticErrorOverlayProps {
    onRedirect: (pathnameOrUrl: string) => void;
}
export declare type PUIErrorProps = PUIErrorOverlayProps & ProvidersInjectorProps;
export declare const PUIErrorOverlay: React.FC<PUIErrorOverlayProps>;
export declare const PUIError: React.FC<PUIErrorProps>;
