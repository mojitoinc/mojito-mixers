import { Divider, Stack } from "@mui/material";
import React from "react";
import { CheckoutItemCostTotal } from "../Total/CheckoutItemCostTotal";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { useCheckoutItemsCostTotal } from "../../../../hooks/useCheckoutItemCostTotal";
import { CheckoutItemList } from "../List/CheckoutItemList";
import { TaxesState } from "../../../../views/Billing/BillingView";

export interface CheckoutItemCostBreakdownProps {
  checkoutItems: CheckoutItem[];
  taxes: null | TaxesState;
}

export const CheckoutItemCostBreakdown: React.FC<CheckoutItemCostBreakdownProps> = ({
  checkoutItems,
  taxes,
}) => {
  const firstCheckoutItem = checkoutItems[0];
  const { total, fees } = useCheckoutItemsCostTotal(checkoutItems);

  return (
    <Stack sx={{ display: "flex", flex: 1 }}>
      <CheckoutItemList
        checkoutItems={ checkoutItems }
        withSeparators
        showPrices />

      <Divider sx={{ mt: 3.75, mb: 1.5 }} />

      <CheckoutItemCostTotal
        withDetails
        total={ total }
        fees={ fees === 0 && firstCheckoutItem.lotType === "buyNow" ? null : fees }
        taxes={ taxes } />
    </Stack>
  );
};
