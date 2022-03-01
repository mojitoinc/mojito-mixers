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
  personalWalletAddressForDelivery: string | null;
  onPersonalWalletAddressChange: (personalWalletAddress: string | null) => void;
}

export const CheckoutDeliveryAndItemCostBreakdown: React.FC<CheckoutDeliveryAndItemCostBreakdownProps> = ({
  checkoutItems,
  taxes,
  validatePersonalDeliveryAddress,
  personalWalletAddressForDelivery,
  onPersonalWalletAddressChange,
}) => (
  <Stack sx={{ display: "flex", flex: 1 }}>
    <DeliveryWalletSelector
      validatePersonalAddress={ validatePersonalDeliveryAddress }
      personalWalletAddress={ personalWalletAddressForDelivery }
      onWalletAddressChange={ onPersonalWalletAddressChange } />

    <Divider sx={{ my: 3.75 }} />

    <CheckoutItemCostBreakdown checkoutItems={ checkoutItems } taxes={ taxes } />
  </Stack>
);
