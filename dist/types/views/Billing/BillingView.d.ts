import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { BillingInfo } from "../../forms/BillingInfoForm";
import React from "react";
export interface BillingViewProps {
    checkoutItem: CheckoutItem;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedBillingInfo: string | BillingInfo;
    onBillingInfoSelected: (data: string | BillingInfo) => void;
    onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => Promise<void>;
    onNext: () => void;
    onClose: () => void;
}
export declare const BillingView: React.FC<BillingViewProps>;
