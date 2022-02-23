import React from "react";
export interface FullScreenOverlayFunctionalProps {
    open?: boolean;
    onClose?: () => void;
    isDialogBlocked?: boolean;
    dialogRootRef?: React.RefObject<HTMLDivElement>;
}
interface FullScreenOverlayCommonProps extends FullScreenOverlayFunctionalProps {
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
