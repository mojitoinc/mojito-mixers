import React from "react";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { BillingInfo } from "../../forms/BillingInfoForm";
export interface BillingViewProps {
    checkoutItems: CheckoutItem[];
    savedPaymentMethods: SavedPaymentMethod[];
    selectedBillingInfo: string | BillingInfo;
    onBillingInfoSelected: (data: string | BillingInfo) => void;
    onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => Promise<void>;
    onNext: () => void;
    onClose: () => void;
    debug?: boolean;
}
export declare const BillingView: React.FC<BillingViewProps>;
