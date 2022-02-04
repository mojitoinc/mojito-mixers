import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import React from "react";
import { SelectedPaymentMethod } from "../../components/payments/CheckoutModal/CheckoutModal";
import { LotType } from "../../domain/product/product.interfaces";
export interface PurchasingViewProps {
    purchasingImageSrc?: string;
    purchasingMessages?: false | string[];
    orgID: string;
    invoiceID?: string;
    lotID: string;
    lotType: LotType;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    onPurchaseSuccess: (paymentReferenceNumber: string) => void;
    onPurchaseError: (error: string) => void;
    onNext: () => void;
    onDialogBlocked: (blocked: boolean) => void;
}
export declare const PurchasingView: React.FC<PurchasingViewProps>;
