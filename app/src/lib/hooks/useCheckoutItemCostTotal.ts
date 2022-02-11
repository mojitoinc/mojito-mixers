import { useMemo } from "react";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { to } from "../utils/typescriptUtils";

export interface UseCheckoutItemsCostTotalResult {
  total: number;
  fees: number;
}

export const useCheckoutItemsCostTotal = (checkoutItems: CheckoutItem[]): UseCheckoutItemsCostTotalResult => {
  return useMemo(() => {
    return checkoutItems.reduce((result, checkoutItem) => {
      result.total += checkoutItem.unitPrice * checkoutItem.units;
      result.fees += checkoutItem.fee;

      return result;
    }, to<UseCheckoutItemsCostTotalResult>({ total: 0, fees: 0 }));
  }, [checkoutItems]);
};
