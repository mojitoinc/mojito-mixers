import { CheckoutItem } from "../domain/product/product.interfaces";
export interface UseCheckoutItemsCostTotalReduceResult {
    total: number;
    fees: number;
    taxAmount: number;
}
export interface UseCheckoutItemsCostTotalResult extends UseCheckoutItemsCostTotalReduceResult {
    taxRate: number;
}
export declare const useCheckoutItemsCostTotal: (checkoutItems: CheckoutItem[]) => UseCheckoutItemsCostTotalResult;
