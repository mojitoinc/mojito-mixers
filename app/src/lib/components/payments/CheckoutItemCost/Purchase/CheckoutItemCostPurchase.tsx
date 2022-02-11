import { Grid, Divider } from "@mui/material";
import React from "react";
import { CheckoutItemCostTotal } from "../Total/CheckoutItemCostTotal";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { BillingInfoFragment } from "../../BillingInfo/Fragment/BillingInfoFragment";
import { SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "../../../../domain/circle/circle.interfaces";
import { useCheckoutItemsCostTotal } from "../../../../hooks/useCheckoutItemCostTotal";

export interface CheckoutItemCostPurchaseProps {
  checkoutItems: CheckoutItem[];
  selectedPaymentMethodBillingInfo: SavedPaymentMethod | SavedPaymentMethodBillingInfo;
}

export const CheckoutItemCostPurchase: React.FC<CheckoutItemCostPurchaseProps> = ({
  checkoutItems,
  selectedPaymentMethodBillingInfo,
}) => {
  const { total, fees } = useCheckoutItemsCostTotal(checkoutItems);

  return (<>
    <Grid
      container
      item
      direction="column"
      sx={{ display: "flex", pb: 2 }}>
      <BillingInfoFragment savedPaymentMethod={ selectedPaymentMethodBillingInfo } />
      <CheckoutItemCostTotal total={ total } taxes={ 0 } fees={ fees } />
    </Grid>

    <Divider />
  </>);
};
