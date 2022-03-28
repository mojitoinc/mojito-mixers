import React from "react";
import { CheckoutModalError } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
export interface ErrorViewProps {
    checkoutError?: CheckoutModalError;
    errorImageSrc?: string;
    onFixError?: (errorMessage: string) => Promise<false>;
    onClose?: () => void;
    debug?: boolean;
}
export declare const ErrorView: React.FC<ErrorViewProps>;
