import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import React from "react";
import { CheckoutModalError, SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { Wallet } from "../../domain/wallet/wallet.interfaces";
export interface PurchasingViewProps {
    threeDSEnabled?: boolean;
    purchasingImageSrc?: string;
    purchasingMessages?: false | string[];
    orgID: string;
    invoiceID: string;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    wallet: null | string | Wallet;
    onPurchaseSuccess: (circlePaymentID: string, paymentID: string, redirectURL: string) => void;
    onPurchaseError: (error?: string | CheckoutModalError) => void;
    onDialogBlocked: (blocked: boolean) => void;
    debug?: boolean;
}
export declare const PurchasingView: React.FC<PurchasingViewProps>;
