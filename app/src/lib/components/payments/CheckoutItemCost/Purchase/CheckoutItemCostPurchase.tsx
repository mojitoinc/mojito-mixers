import { Grid, Divider } from "@mui/material";
import React from "react";
import { CheckoutItemCostTotal } from "../Total/CheckoutItemCostTotal";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { BillingInfoFragment } from "../../BillingInfo/Fragment/BillingInfoFragment";
import { SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "../../../../domain/circle/circle.interfaces";
import { useCheckoutItemsCostTotal } from "../../../../hooks/useCheckoutItemCostTotal";
import { IDiscount } from "../../../../hooks/usePromoCode";

export interface CheckoutItemCostPurchaseProps {
  checkoutItems: CheckoutItem[];
  selectedPaymentMethodBillingInfo: SavedPaymentMethod | SavedPaymentMethodBillingInfo;
  discount: IDiscount;
}

export const CheckoutItemCostPurchase: React.FC<CheckoutItemCostPurchaseProps> = ({
  checkoutItems,
  selectedPaymentMethodBillingInfo,
  discount,
}) => {
  const firstCheckoutItem = checkoutItems[0];
  const { subtotal, fees, taxRate, taxAmount } = useCheckoutItemsCostTotal(checkoutItems, discount);

  return (
    <>
      <Grid
        container
        item
        direction="column"
        sx={{ display: "flex", pb: 2 }}>

        <BillingInfoFragment savedPaymentMethod={ selectedPaymentMethodBillingInfo } />

        <CheckoutItemCostTotal
          subtotal={ subtotal }
          discount={ discount }
          fees={ fees === 0 && firstCheckoutItem.lotType === "buyNow" ? null : fees }
          taxes={{ status: "complete", taxRate, taxAmount }} />

      </Grid>

      <Divider />
    </>
  );
};
