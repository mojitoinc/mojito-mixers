import React from "react";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";
export interface PurchaseConfirmationItemDetailsProps {
    checkoutItems: CheckoutItem[];
    dictionary: PUIDictionary;
}
export declare const PurchaseConfirmationItemDetails: React.FC<PurchaseConfirmationItemDetailsProps>;
