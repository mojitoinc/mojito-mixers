import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import React from "react";
import { CheckoutModalError, SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
export interface PurchasingViewProps {
    purchasingImageSrc?: string;
    purchasingMessages?: false | string[];
    orgID: string;
    invoiceID: string;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    walletAddress: string | null;
    onPurchaseSuccess: (circlePaymentID: string, paymentID: string, redirectURL: string) => void;
    onPurchaseError: (error: string | CheckoutModalError) => void;
    onDialogBlocked: (blocked: boolean) => void;
    debug?: boolean;
}
export declare const PurchasingView: React.FC<PurchasingViewProps>;
