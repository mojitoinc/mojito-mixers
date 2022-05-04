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
    const reduceResult = checkoutItems.reduce((resultAcc, checkoutItem) => {
      // result.total += checkoutItem.unitPrice * checkoutItem.units;
      resultAcc.total += checkoutItem.totalPrice;
      resultAcc.fees += checkoutItem.fee;
      resultAcc.taxAmount += checkoutItem.taxes;

      return resultAcc;
    }, to<UseCheckoutItemsCostTotalReduceResult>({ total: 0, fees: 0, taxAmount: 0 }));

    return { ...reduceResult, taxRate: 100 * reduceResult.taxAmount / (reduceResult.total || 1) };
  }, [checkoutItems]);
};
