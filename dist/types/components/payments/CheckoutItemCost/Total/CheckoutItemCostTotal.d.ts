import React from "react";
import { TaxesState } from "../../../../views/Billing/BillingView";
export interface CheckoutItemCostTotalProps {
    total: number;
    fees: number | null;
    taxes: null | TaxesState;
    withDetails?: boolean;
}
export declare const CheckoutItemCostTotal: React.FC<CheckoutItemCostTotalProps>;
