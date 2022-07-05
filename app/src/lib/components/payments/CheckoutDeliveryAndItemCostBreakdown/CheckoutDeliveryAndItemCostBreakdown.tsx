import React from "react";
import { Divider, Stack } from "@mui/material";

import { DeliveryWalletSelector } from "../DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector";
import { CheckoutItemCostBreakdown } from "../CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { TaxesState } from "../../../views/Billing/BillingView";
import { Wallet } from "../../../domain/wallet/wallet.interfaces";
import { Currency } from "../../../domain/payment/payment.interfaces";

interface CheckoutDeliveryAndItemCostBreakdownProps {
  checkoutItems: CheckoutItem[];
  taxes: null | TaxesState;
  acceptedCurrencies: Currency[];
  validatePersonalDeliveryAddress: boolean;
  wallets?: Wallet[];
  wallet: null | string | Wallet;
  multiSigEnabled: boolean;
  onWalletChange: (wallet: null | string | Wallet) => void;
}

export const CheckoutDeliveryAndItemCostBreakdown: React.FC<CheckoutDeliveryAndItemCostBreakdownProps> = ({
  checkoutItems,
  taxes,
  acceptedCurrencies,
  validatePersonalDeliveryAddress,
  wallets,
  wallet,
  multiSigEnabled,
  onWalletChange,
}) => (
  <Stack sx={{ display: "flex", width: theme => ({ xs: "100%", md: `calc(50% - ${ theme.spacing(3.75 / 2) })` }) }}>
    <DeliveryWalletSelector
      validatePersonalAddress={ validatePersonalDeliveryAddress }
      wallets={ wallets }
      wallet={ wallet }
      multiSigEnabled={ multiSigEnabled }
      onWalletChange={ onWalletChange } />

    <Divider sx={{ my: 3.75 }} />

    <CheckoutItemCostBreakdown
      checkoutItems={ checkoutItems }
      taxes={ taxes }
      acceptedCurrencies={ acceptedCurrencies } />
  </Stack>
);
