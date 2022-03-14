import React from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { PUIDictionary } from "../../domain/dictionary/dictionary.interfaces";
import { Wallet } from "../../domain/wallet/wallet.interfaces";
export interface ConfirmationViewProps {
    checkoutItems: CheckoutItem[];
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    circlePaymentID: string;
    wallet: null | string | Wallet;
    onGoToCollection?: () => void;
    onNext: () => void;
    dictionary: PUIDictionary;
}
export declare const ConfirmationView: React.FC<ConfirmationViewProps>;
