import { useMemo } from "react";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { to } from "../utils/typescriptUtils";

export interface UseCheckoutItemsCostTotalReduceResult {
  total: number;
  fees: number;
  taxAmount: number;
}

export interface UseCheckoutItemsCostTotalResult extends UseCheckoutItemsCostTotalReduceResult {
  taxRate: number;
}

export const useCheckoutItemsCostTotal = (checkoutItems: CheckoutItem[]): UseCheckoutItemsCostTotalResult => {
  return useMemo(() => {
    const reduceResult = checkoutItems.reduce((result, checkoutItem) => {
      // result.total += checkoutItem.unitPrice * checkoutItem.units;
      result.total += checkoutItem.totalPrice;
      result.fees += checkoutItem.fee;
      result.taxAmount += checkoutItem.taxes;

      return result;
    }, to<UseCheckoutItemsCostTotalReduceResult>({ total: 0, fees: 0, taxAmount: 0 }));

    return { ...reduceResult, taxRate: 100 * reduceResult.taxAmount / reduceResult.total };
  }, [checkoutItems]);
};
