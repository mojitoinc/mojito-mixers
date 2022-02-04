import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import React from "react";
import { SelectedPaymentMethod } from "../../components/payments/CheckoutModal/CheckoutModal";
export interface ConfirmationViewProps {
    checkoutItem: CheckoutItem;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    paymentReferenceNumber: string;
    purchaseInstructions: string;
    onNext: () => void;
    onClose: () => void;
}
export declare const ConfirmationView: React.FC<ConfirmationViewProps>;
