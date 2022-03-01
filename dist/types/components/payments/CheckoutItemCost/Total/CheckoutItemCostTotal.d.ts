import React from "react";
import { TaxesState } from "../../../../views/Billing/BillingView";
export interface CheckoutItemCostTotalProps {
    total: number;
    taxes: TaxesState;
    fees: number;
    withDetails?: boolean;
}
export declare const CheckoutItemCostTotal: React.FC<CheckoutItemCostTotalProps>;
