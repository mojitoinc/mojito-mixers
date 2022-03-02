import React from "react";
import { Stack, Typography } from "@mui/material";

import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { CheckoutItemList } from "../CheckoutItemCost/List/CheckoutItemList";
import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";

export interface PurchaseConfirmationItemDetailsProps {
  checkoutItems: CheckoutItem[];
  dictionary: PUIDictionary;
}

export const PurchaseConfirmationItemDetails: React.FC<PurchaseConfirmationItemDetailsProps> = ({
  checkoutItems,
  dictionary,
}) => {
  return (
    <Stack sx={{ display: "flex", flex: 1, pt: 2.5 }}>
      <Typography variant="body2">You purchased</Typography>

      <CheckoutItemList sx={{ mt: 3 }} checkoutItems={ checkoutItems } />

      <Typography sx={{ mt: 6 }}>Purchase confirmed!</Typography>

      { dictionary.purchaseInstructions.map((line, i) => (
        <Typography key={ i } sx={{ mt: 1 }}>{ line }</Typography>
      )) }
    </Stack>
  );
};
