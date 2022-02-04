import React from "react";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "../../../../domain/circle/circle.interfaces";
export interface CheckoutItemCostPurchaseProps {
    checkoutItem: CheckoutItem;
    selectedPaymentMethodBillingInfo: SavedPaymentMethod | SavedPaymentMethodBillingInfo;
}
export declare const CheckoutItemCostPurchase: React.FC<CheckoutItemCostPurchaseProps>;
