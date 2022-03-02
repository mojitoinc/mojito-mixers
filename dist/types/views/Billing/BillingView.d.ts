import React from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { BillingInfo } from "../../forms/BillingInfoForm";
import { CheckoutModalError } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { PUIDictionary } from "../../domain/dictionary/dictionary.interfaces";
export declare type TaxStatus = "incomplete" | "loading" | "complete" | "error";
export interface TaxesState {
    status: TaxStatus;
    taxRate?: number;
    taxAmount?: number;
}
export interface BillingViewProps {
    checkoutItems: CheckoutItem[];
    savedPaymentMethods: SavedPaymentMethod[];
    selectedBillingInfo: string | BillingInfo;
    walletAddress: string | null;
    checkoutError?: CheckoutModalError;
    onBillingInfoSelected: (data: string | BillingInfo) => void;
    onTaxesChange: (taxes: TaxesState) => void;
    onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => Promise<void>;
    onWalletAddressChange: (personalWalletAddress: string | null) => void;
    onNext: () => void;
    onClose: () => void;
    dictionary: PUIDictionary;
    debug?: boolean;
}
export declare const BillingView: React.FC<BillingViewProps>;
