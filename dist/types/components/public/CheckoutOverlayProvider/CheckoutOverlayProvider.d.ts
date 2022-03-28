import React from "react";
import { PUICheckoutProps } from "../CheckoutOverlay/CheckoutOverlay";
import { UseOpenCloseCheckoutModalOptions } from "../useOpenCloseCheckoutModal/useOpenCloseCheckoutModal";
export declare type CheckoutComponentProps = Partial<Omit<PUICheckoutProps, "open" | "onClose" | "loaderMode" | "paymentErrorParam">>;
export declare type CheckoutComponentWithRequiredProps = Partial<PUICheckoutProps> & Pick<PUICheckoutProps, "open" | "onClose" | "loaderMode" | "paymentErrorParam">;
export interface CheckoutOverlayContextProps {
    open: (checkoutComponentProps?: CheckoutComponentProps) => void;
    close: () => void;
    setCheckoutComponentProps: React.Dispatch<React.SetStateAction<CheckoutComponentProps>>;
}
export declare const CheckoutOverlayContext: React.Context<CheckoutOverlayContextProps>;
export interface CheckoutOverlayProviderProps extends UseOpenCloseCheckoutModalOptions {
    checkoutComponent: React.ComponentType<CheckoutComponentWithRequiredProps>;
    doNotRenderPaymentUI?: boolean;
}
export declare const CheckoutOverlayProvider: React.FC<CheckoutOverlayProviderProps>;
export declare function useCheckoutOverlay(): CheckoutOverlayContextProps;
