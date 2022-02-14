import { Divider, Stack } from "@mui/material";
import React from "react";
import { CheckoutItemCostTotal } from "../Total/CheckoutItemCostTotal";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { useCheckoutItemsCostTotal } from "../../../../hooks/useCheckoutItemCostTotal";
import { CheckoutItemList } from "../List/CheckoutItemList";

export interface CheckoutItemCostBreakdownProps {
  checkoutItems: CheckoutItem[];
}

export const CheckoutItemCostBreakdown: React.FC<
  CheckoutItemCostBreakdownProps
> = ({ checkoutItems }) => {
  const { total, fees } = useCheckoutItemsCostTotal(checkoutItems);

  return (
    <Stack sx={{ display: "flex", flex: 1, py: 5 }}>
      <CheckoutItemList
        checkoutItems={checkoutItems}
        withSeparators
        showPrices
      />
      <Divider sx={{ mt: 3.75, mb: 1.5 }} />
      <CheckoutItemCostTotal withDetails total={total} taxes={0} fees={fees} />
    </Stack>
  );
};
