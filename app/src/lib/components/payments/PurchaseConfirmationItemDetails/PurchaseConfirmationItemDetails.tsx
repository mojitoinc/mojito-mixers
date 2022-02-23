import React from "react";
import { Stack, Typography } from "@mui/material";

import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { CheckoutItemList } from "../CheckoutItemCost/List/CheckoutItemList";

export interface PurchaseConfirmationItemDetailsProps {
  checkoutItems: CheckoutItem[];
  purchaseInstructions: React.ReactNode;
}

export const PurchaseConfirmationItemDetails: React.FC<
  PurchaseConfirmationItemDetailsProps
> = ({ checkoutItems, purchaseInstructions }) => {
  const checkoutItem = checkoutItems[0];

  return (
    <Stack sx={{ display: "flex", flex: 1, pt: 2.5 }}>
      <Typography variant="body2">You purchased</Typography>
      <CheckoutItemList sx={{ mt: 3 }} checkoutItems={checkoutItems} />
      <Typography sx={{ mt: 6 }}>{checkoutItem.name}</Typography>
      <Typography sx={{ mt: 0.5 }}>{checkoutItem.description}</Typography>
      <Typography sx={{ mt: 0.5 }}>{purchaseInstructions}</Typography>
    </Stack>
  );
};
