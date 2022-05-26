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
  invoiceID: string | null;
}

export const CheckoutItemCostPurchase: React.FC<CheckoutItemCostPurchaseProps> = ({
  checkoutItems,
  selectedPaymentMethodBillingInfo,
  invoiceID,
}) => {
  const firstCheckoutItem = checkoutItems[0];
  const { total, fees, taxRate, taxAmount } = useCheckoutItemsCostTotal(checkoutItems);

  return (
    <>
      <Grid
        container
        item
        direction="column"
        sx={{ display: "flex", pb: 2 }}>

        <BillingInfoFragment savedPaymentMethod={ selectedPaymentMethodBillingInfo } />

        <CheckoutItemCostTotal
          invoiceID={ invoiceID }
          total={ total }
          fees={ fees === 0 && firstCheckoutItem.lotType === "buyNow" ? null : fees }
          taxes={{ status: "complete", taxRate, taxAmount }} />

      </Grid>

      <Divider />
    </>
  );
};
