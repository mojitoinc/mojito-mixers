import React from "react";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { TaxesState } from "../../../views/Billing/BillingView";
import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";
interface CheckoutDeliveryAndItemCostBreakdownProps {
    checkoutItems: CheckoutItem[];
    taxes: TaxesState;
    validatePersonalDeliveryAddress: boolean;
    walletAddress: string | null;
    onWalletAddressChange: (walletAddress: string | null) => void;
    dictionary: PUIDictionary;
}
export declare const CheckoutDeliveryAndItemCostBreakdown: React.FC<CheckoutDeliveryAndItemCostBreakdownProps>;
export {};
