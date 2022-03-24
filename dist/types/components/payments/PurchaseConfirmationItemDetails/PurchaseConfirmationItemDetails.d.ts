import React from "react";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
export interface PurchaseConfirmationItemDetailsProps {
    checkoutItems: CheckoutItem[];
}
export declare const PurchaseConfirmationItemDetails: React.FC<PurchaseConfirmationItemDetailsProps>;
