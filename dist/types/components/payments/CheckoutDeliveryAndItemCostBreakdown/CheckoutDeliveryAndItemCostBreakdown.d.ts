import React from "react";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { TaxesState } from "../../../views/Billing/BillingView";
import { Wallet } from "../../../domain/wallet/wallet.interfaces";
interface CheckoutDeliveryAndItemCostBreakdownProps {
    checkoutItems: CheckoutItem[];
    taxes: null | TaxesState;
    validatePersonalDeliveryAddress: boolean;
    wallets?: Wallet[];
    wallet: null | string | Wallet;
    onWalletChange: (wallet: null | string | Wallet) => void;
}
export declare const CheckoutDeliveryAndItemCostBreakdown: React.FC<CheckoutDeliveryAndItemCostBreakdownProps>;
export {};
