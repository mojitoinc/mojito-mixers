import { useMemo } from "react";
import { CheckoutItem } from "../domain/product/product.interfaces";

export const useCheckoutItemsCostTotal = (checkoutItems: CheckoutItem[]) => {
  const { total, fees } = useMemo(
    () =>
      checkoutItems
        .map(({ price, fee }) => ({ price, fee }))
        .reduce(
          ({ total, fees }, { price, fee }) => ({
            total: total + price,
            fees: fees + fee,
          }),
          { total: 0, fees: 0 }
        ),
    [checkoutItems]
  );

  return { total, fees };
};
