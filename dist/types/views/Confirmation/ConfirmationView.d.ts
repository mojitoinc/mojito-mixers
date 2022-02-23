import React from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
export interface ConfirmationViewProps {
    checkoutItems: CheckoutItem[];
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    paymentReferenceNumber: string;
    purchaseInstructions: React.ReactFragment[];
    onNext: () => void;
}
export declare const ConfirmationView: React.FC<ConfirmationViewProps>;
