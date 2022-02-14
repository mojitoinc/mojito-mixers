import React from "react";
export interface CheckoutItemCostTotalProps {
    total: number;
    taxes: number;
    fees: number;
    withDetails?: boolean;
}
export declare const CheckoutItemCostTotal: React.FC<CheckoutItemCostTotalProps>;
