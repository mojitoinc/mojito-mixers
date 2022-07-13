import { Grid, Divider } from "@mui/material";
import React from "react";
import { CheckoutItemCostTotal } from "../Total/CheckoutItemCostTotal";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { BillingInfoFragment } from "../../BillingInfo/Fragment/BillingInfoFragment";
import { SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "../../../../domain/circle/circle.interfaces";
import { useCheckoutItemsCostTotal } from "../../../../hooks/useCheckoutItemCostTotal";
import { FiatCurrency, CryptoCurrency, PaymentType } from "../../../../domain/payment/payment.interfaces";
import { TransactionItem } from "../../TransactionItem/TransactionItem";

export interface CheckoutItemCostPurchaseProps {
  paymentType: PaymentType | "";
  checkoutItems: CheckoutItem[];
  selectedPaymentMethodBillingInfo: SavedPaymentMethod | SavedPaymentMethodBillingInfo;
  displayCurrency: FiatCurrency;
  cryptoCurrencies: CryptoCurrency[];
}

export const CheckoutItemCostPurchase: React.FC<CheckoutItemCostPurchaseProps> = ({
  paymentType,
  checkoutItems,
  selectedPaymentMethodBillingInfo,
  displayCurrency,
  cryptoCurrencies,
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

        { paymentType === "Crypto" ? (
          <TransactionItem hash="0x4352fd61321d9e4f59220079431617eaa25396b3a2c2a5a416806902d1f02dbb" />
        ) : (
          <BillingInfoFragment savedPaymentMethod={ selectedPaymentMethodBillingInfo } />
        ) }

        <CheckoutItemCostTotal
          total={ total }
          fees={ fees === 0 && firstCheckoutItem.lotType === "buyNow" ? null : fees }
          taxes={{ status: "complete", taxRate, taxAmount }}
          displayCurrency={ displayCurrency }
          cryptoCurrencies={ cryptoCurrencies } />

      </Grid>

      <Divider />
    </>
  );
};
