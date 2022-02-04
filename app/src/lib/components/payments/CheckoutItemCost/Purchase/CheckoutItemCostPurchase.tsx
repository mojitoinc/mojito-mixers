import { Grid, Divider } from "@mui/material";
import React from "react";
import { CheckoutItemCostTotal } from "../Total/CheckoutItemCostTotal";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { BillingInfoFragment } from "../../BillingInfo/Fragment/BillingInfoFragment";
import { SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "../../../../domain/circle/circle.interfaces";

export interface CheckoutItemCostPurchaseProps {
  checkoutItem: CheckoutItem;
  selectedPaymentMethodBillingInfo: SavedPaymentMethod | SavedPaymentMethodBillingInfo;
}

export const CheckoutItemCostPurchase: React.FC<CheckoutItemCostPurchaseProps> = ({
  checkoutItem: {
    price,
    fee,
  },
  selectedPaymentMethodBillingInfo,
}) => {
  return (<>
    <Grid
      container
      item
      direction="column"
      sx={{ display: "flex", pb: 2 }}>
      <BillingInfoFragment savedPaymentMethod={ selectedPaymentMethodBillingInfo } />
      <CheckoutItemCostTotal price={ price } fee={ fee } />
    </Grid>

    <Divider />
  </>);
};
