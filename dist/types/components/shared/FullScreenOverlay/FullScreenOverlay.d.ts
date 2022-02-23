import React from "react";
export interface FullScreenOverlayFunctionalProps {
    open?: boolean;
    onClose?: () => void;
    isDialogBlocked?: boolean;
}
interface FullScreenOverlayCommonProps extends FullScreenOverlayFunctionalProps {
    contentKey?: string;
    header?: React.ReactElement;
}
export interface FullScreenOverlayNoColumnsProps extends FullScreenOverlayCommonProps {
    centered?: boolean;
}
export interface FullScreenOverlayWithColumnsProps extends FullScreenOverlayCommonProps {
    leftColumn?: React.ReactElement;
    rightColumn?: React.ReactElement;
    children: never;
}
export declare type FullScreenOverlayProps = FullScreenOverlayNoColumnsProps | FullScreenOverlayWithColumnsProps;
export declare const FullScreenOverlay: React.FC<FullScreenOverlayProps>;
export {};
