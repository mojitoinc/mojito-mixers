import React from "react";
import { Divider, Stack } from "@mui/material";

import { DeliveryWalletSelector } from "../DeliveryWallet/DeliveryWalletSelector";
import { CheckoutItemCostBreakdown } from "../CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown";

import { CheckoutItem } from "../../../domain/product/product.interfaces";

interface CheckoutDeliveryAndItemCostBreakdownProps {
  checkoutItems: CheckoutItem[];
  validatePersonalDeliveryAddress: boolean;
  personalWalletAddressForDelivery: string;
  usePersonalWallet: boolean;
  onUsePersonalWalletChange: (state: boolean) => void
  onPersonalWalletAddressChange: (personalWalletAddress: string) => void;
}

export const CheckoutDeliveryAndItemCostBreakdown: React.FC<
  CheckoutDeliveryAndItemCostBreakdownProps
> = ({
  checkoutItems,
  validatePersonalDeliveryAddress,
  personalWalletAddressForDelivery,
  onPersonalWalletAddressChange,
  usePersonalWallet,
  onUsePersonalWalletChange,
}) => (
    <Stack sx={{ display: "flex", flex: 1 }}>
      <DeliveryWalletSelector
        validatePersonalAddress={validatePersonalDeliveryAddress}
        personalWalletAddress={personalWalletAddressForDelivery}
        onWalletAddressChange={onPersonalWalletAddressChange}
        onUsePersonalWalletChange={onUsePersonalWalletChange}
        usePersonalWallet={usePersonalWallet}
      />
      <Divider sx={{ my: 3.75 }} />
      <CheckoutItemCostBreakdown checkoutItems={checkoutItems} />
    </Stack>
  );
