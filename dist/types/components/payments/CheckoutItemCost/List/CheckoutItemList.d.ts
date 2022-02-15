import React from "react";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { SxProps, Theme } from "@mui/system";
interface CheckoutItemListProps {
    sx?: SxProps<Theme>;
    checkoutItems: CheckoutItem[];
    withSeparators?: boolean;
    showPrices?: boolean;
}
export declare const CheckoutItemList: React.FC<CheckoutItemListProps>;
export {};
