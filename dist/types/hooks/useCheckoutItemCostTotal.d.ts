import { CheckoutItem } from "../domain/product/product.interfaces";
export interface UseCheckoutItemsCostTotalResult {
    total: number;
    fees: number;
}
export declare const useCheckoutItemsCostTotal: (checkoutItems: CheckoutItem[]) => UseCheckoutItemsCostTotalResult;
