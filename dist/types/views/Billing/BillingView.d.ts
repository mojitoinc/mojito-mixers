import React from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { BillingInfo } from "../../forms/BillingInfoForm";
import { CheckoutModalError } from "../../components/payments/CheckoutModal/CheckoutModal.hooks";
export interface BillingViewProps {
    checkoutItems: CheckoutItem[];
    savedPaymentMethods: SavedPaymentMethod[];
    selectedBillingInfo: string | BillingInfo;
    checkoutError?: CheckoutModalError;
    onBillingInfoSelected: (data: string | BillingInfo) => void;
    onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => Promise<void>;
    onNext: () => void;
    onClose: () => void;
    debug?: boolean;
}
export declare const BillingView: React.FC<BillingViewProps>;
