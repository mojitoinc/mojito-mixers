import { CheckoutItem } from "../../../domain/product/product.interfaces";
import React from "react";
export interface PurchaseConfirmationItemDetailsProps {
    checkoutItem: CheckoutItem;
    purchaseInstructions: string;
}
export declare const PurchaseConfirmationItemDetails: React.FC<PurchaseConfirmationItemDetailsProps>;
