import React from "react";
import { Stack, Typography } from "@mui/material";

import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { CheckoutItemList } from "../CheckoutItemCost/List/CheckoutItemList";
import { useDictionary } from "../../../hooks/useDictionary";
import { FiatCurrency } from "../../../domain/payment/payment.interfaces";

export interface PurchaseConfirmationItemDetailsProps {
  checkoutItems: CheckoutItem[];
  displayCurrency: FiatCurrency;
}

export const PurchaseConfirmationItemDetails: React.FC<PurchaseConfirmationItemDetailsProps> = ({
  checkoutItems,
  displayCurrency,
}) => {
  const dictionary = useDictionary();

  return (
    <Stack sx={{ display: "flex", flex: 1, pt: 2.5 }}>
      <Typography variant="body2">You purchased</Typography>

      <CheckoutItemList sx={{ mt: 3 }} checkoutItems={ checkoutItems } displayCurrency={ displayCurrency } />

      <Typography sx={{ mt: 6 }}>Purchase confirmed!</Typography>

      { dictionary.purchaseInstructions.map((line, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <Typography key={ i } sx={{ mt: 1 }}>{ line }</Typography>
      )) }
    </Stack>
  );
};
