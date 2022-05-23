import React from "react";
import { Divider, Stack } from "@mui/material";

import { DeliveryWalletSelector } from "../DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector";
import { CheckoutItemCostBreakdown } from "../CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { TaxesState } from "../../../views/Billing/BillingView";
import { Wallet } from "../../../domain/wallet/wallet.interfaces";
import { IDiscount } from "../../../hooks/usePromoCode";

interface CheckoutDeliveryAndItemCostBreakdownProps {
  checkoutItems: CheckoutItem[];
  taxes: null | TaxesState;
  validatePersonalDeliveryAddress: boolean;
  wallets?: Wallet[];
  wallet: null | string | Wallet;
  onWalletChange: (wallet: null | string | Wallet) => void;
  discount: IDiscount
}

export const CheckoutDeliveryAndItemCostBreakdown: React.FC<CheckoutDeliveryAndItemCostBreakdownProps> = ({
  checkoutItems,
  taxes,
  validatePersonalDeliveryAddress,
  wallets,
  wallet,
  onWalletChange,
  discount,
}) => (
  <Stack sx={{ display: "flex", width: theme => ({ xs: "100%", md: `calc(50% - ${ theme.spacing(3.75 / 2) })` }) }}>
    <DeliveryWalletSelector
      validatePersonalAddress={ validatePersonalDeliveryAddress }
      wallets={ wallets }
      wallet={ wallet }
      onWalletChange={ onWalletChange } />

    <Divider sx={{ my: 3.75 }} />

    <CheckoutItemCostBreakdown checkoutItems={ checkoutItems } taxes={ taxes } discount={discount} />
  </Stack>
);
