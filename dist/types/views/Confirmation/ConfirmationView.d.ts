import React from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { PUIDictionary } from "../../domain/dictionary/dictionary.interfaces";
import { Wallet } from "../../components/payments/DeliveryWallet/DeliveryWalletDetails";
export interface ConfirmationViewProps {
    checkoutItems: CheckoutItem[];
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    circlePaymentID: string;
    walletAddress: string;
    wallets?: Wallet[];
    onGoToCollection?: () => void;
    onNext: () => void;
    dictionary: PUIDictionary;
}
export declare const ConfirmationView: React.FC<ConfirmationViewProps>;
