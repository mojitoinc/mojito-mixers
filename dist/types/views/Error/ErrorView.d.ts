import React from "react";
import { CheckoutModalError } from "../../components/payments/CheckoutModal/CheckoutModal.hooks";
export interface ErrorViewProps {
    checkoutError: CheckoutModalError;
    errorImageSrc?: string;
    onFixError: () => Promise<false>;
    onClose: () => void;
    debug?: boolean;
}
export declare const ErrorView: React.FC<ErrorViewProps>;
