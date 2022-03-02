import React from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { PUIDictionary } from "../../domain/dictionary/dictionary.interfaces";
export interface ConfirmationViewProps {
    checkoutItems: CheckoutItem[];
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    paymentReferenceNumber: string;
    onGoToCollection?: () => void;
    onNext: () => void;
    dictionary: PUIDictionary;
}
export declare const ConfirmationView: React.FC<ConfirmationViewProps>;
