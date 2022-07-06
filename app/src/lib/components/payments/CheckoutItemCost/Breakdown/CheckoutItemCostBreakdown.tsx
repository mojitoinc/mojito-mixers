import { Divider, Link, Stack, Typography } from "@mui/material";
import React from "react";
import { CheckoutItemCostTotal } from "../Total/CheckoutItemCostTotal";
import { CheckoutItem } from "../../../../domain/product/product.interfaces";
import { useCheckoutItemsCostTotal } from "../../../../hooks/useCheckoutItemCostTotal";
import { CheckoutItemList } from "../List/CheckoutItemList";
import { TaxesState } from "../../../../views/Billing/BillingView";
import { InfoBox } from "../../InfoBox/InfoBox";
import { FiatCurrency, CryptoCurrency } from "../../../../domain/payment/payment.interfaces";
import { joinSentence } from "../../../../utils/formatUtils";

export type CheckoutItemCostBreakdownWarningVariant = "box" | "link";

export interface CheckoutItemCostBreakdownProps {
  checkoutItems: CheckoutItem[];
  taxes: null | TaxesState;
  displayCurrency: FiatCurrency;
  cryptoCurrencies?: CryptoCurrency[];
  onlyCryptoWarningVariant?: CheckoutItemCostBreakdownWarningVariant;
}

export const CheckoutItemCostBreakdown: React.FC<CheckoutItemCostBreakdownProps> = ({
  checkoutItems,
  taxes,
  displayCurrency,
  cryptoCurrencies,
  onlyCryptoWarningVariant,
}) => {
  const firstCheckoutItem = checkoutItems[0];
  const cryptoCurrenciesSentence = cryptoCurrencies ? joinSentence(cryptoCurrencies, "or") : "";
  const { total, fees } = useCheckoutItemsCostTotal(checkoutItems);

  return (
    <Stack sx={{ display: "flex", flex: 1 }}>
      <CheckoutItemList
        checkoutItems={ checkoutItems }
        withSeparators
        displayCurrency={ displayCurrency }
        cryptoCurrencies={ cryptoCurrencies } />

      { onlyCryptoWarningVariant && (
        onlyCryptoWarningVariant === "box" ? (
          <InfoBox sx={{ mt: 3.75 }}>
            <Typography>
              You need to pay with <strong>{ cryptoCurrenciesSentence }</strong> on this marketplace.{ " " }
              <Link href="https://support.opensea.io/hc/en-us/articles/360063498293-What-s-WETH-How-do-I-get-it-/" target="_blank" rel="noopener noreferrer">
                Click here
              </Link>{ " " }
              to learn how to convert your ETH or MATIC.
            </Typography>
          </InfoBox>
        ) : (
          <Typography sx={{ mt: 1, textAlign: "right" }}>
            <Link href="https://support.opensea.io/hc/en-us/articles/360063498293-What-s-WETH-How-do-I-get-it-/" target="_blank" rel="noopener noreferrer">
              What is this currency?
            </Link>
          </Typography>
        )
      ) }

      <Divider sx={{ mt: 3.75, mb: 1.5 }} />

      <CheckoutItemCostTotal
        total={ total }
        fees={ fees === 0 && firstCheckoutItem.lotType === "buyNow" ? null : fees }
        taxes={ taxes }
        displayCurrency={ displayCurrency }
        cryptoCurrencies={ cryptoCurrencies }
        withDetails />
    </Stack>
  );
};
