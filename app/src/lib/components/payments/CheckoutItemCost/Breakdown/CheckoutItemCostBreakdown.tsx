import { Divider, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { CheckoutItemCostTotal } from "../Total/CheckoutItemCostTotal";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { useCheckoutItemsCostTotal } from "../../../../hooks/useCheckoutItemCostTotal";
import { CheckoutItemList } from "../List/CheckoutItemList";
import { TaxesState } from "../../../../views/Billing/BillingView";
import { InfoBox } from "../../InfoBox/InfoBox";
import { Currency } from "../../../../domain/payment/payment.interfaces";

export interface CheckoutItemCostBreakdownProps {
  checkoutItems: CheckoutItem[];
  taxes: null | TaxesState;
  acceptedCurrencies: Currency[];
}

export const CheckoutItemCostBreakdown: React.FC<CheckoutItemCostBreakdownProps> = ({
  checkoutItems,
  taxes,
  acceptedCurrencies,
}) => {
  const firstCheckoutItem = checkoutItems[0];
  const { total, fees } = useCheckoutItemsCostTotal(checkoutItems);

  return (
    <Stack sx={{ display: "flex", flex: 1 }}>
      <CheckoutItemList
        checkoutItems={ checkoutItems }
        withSeparators
        showPrices />

      { acceptedCurrencies.sort().join(", ") === "WETH, WMATIC" && (
        <InfoBox sx={{ mt: 3.75 }}>
          <Typography>
            You need to pay with <strong>WETH or WMATIC</strong> on this marketplace.{ " " }
            <Link href="https://support.opensea.io/hc/en-us/articles/360063498293-What-s-WETH-How-do-I-get-it-/" target="_blank" rel="noopener noreferrer">
              Click here
            </Link>{ " " }
            to learn how to convert your ETH or MATIC.
          </Typography>
        </InfoBox>
      ) }

      <Divider sx={{ mt: 3.75, mb: 1.5 }} />

      <CheckoutItemCostTotal
        withDetails
        total={ total }
        fees={ fees === 0 && firstCheckoutItem.lotType === "buyNow" ? null : fees }
        taxes={ taxes } />
    </Stack>
  );
};
