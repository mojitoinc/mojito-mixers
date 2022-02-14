import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import React from "react";
import { SelectedPaymentMethod } from "../../components/payments/CheckoutModal/CheckoutModal";
import { CheckoutItem } from "../..";
export interface PurchasingViewProps {
    purchasingImageSrc?: string;
    purchasingMessages?: false | string[];
    orgID: string;
    invoiceID?: string;
    checkoutItems: CheckoutItem[];
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    onPurchaseSuccess: (paymentReferenceNumber: string) => void;
    onPurchaseError: (error: string) => void;
    onDialogBlocked: (blocked: boolean) => void;
    debug?: boolean;
}
export declare const PurchasingView: React.FC<PurchasingViewProps>;
