import React from "react";
import { Divider, Stack } from "@mui/material";

import { DeliveryWalletSelector } from "../DeliveryWallet/DeliveryWalletSelector";
import { CheckoutItemCostBreakdown } from "../CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { TaxesState } from "../../../views/Billing/BillingView";

interface CheckoutDeliveryAndItemCostBreakdownProps {
  checkoutItems: CheckoutItem[];
  taxes: TaxesState;
  validatePersonalDeliveryAddress: boolean;
  walletAddress: string | null;
  onWalletAddressChange: (walletAddress: string | null) => void;
}

export const CheckoutDeliveryAndItemCostBreakdown: React.FC<CheckoutDeliveryAndItemCostBreakdownProps> = ({
  checkoutItems,
  taxes,
  validatePersonalDeliveryAddress,
  walletAddress,
  onWalletAddressChange,
}) => (
    <Stack sx={{ display: "flex", flex: 1 }}>
      <DeliveryWalletSelector
        validatePersonalAddress={ validatePersonalDeliveryAddress }
        walletAddress={ walletAddress }
        onWalletAddressChange={ onWalletAddressChange } />

      <Divider sx={{ my: 3.75 }} />

      <CheckoutItemCostBreakdown checkoutItems={ checkoutItems } taxes={ taxes } />
    </Stack>
  );
