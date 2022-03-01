import React from "react";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { TaxesState } from "../../../../views/Billing/BillingView";
export interface CheckoutItemCostBreakdownProps {
    checkoutItems: CheckoutItem[];
    taxes: TaxesState;
}
export declare const CheckoutItemCostBreakdown: React.FC<CheckoutItemCostBreakdownProps>;
