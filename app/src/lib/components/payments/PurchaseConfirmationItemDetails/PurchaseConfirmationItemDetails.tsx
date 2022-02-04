import { Typography, Divider, Box } from "@mui/material";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import React from "react";

export interface PurchaseConfirmationItemDetailsProps {
  checkoutItem: CheckoutItem;
  purchaseInstructions: string;
}

export const PurchaseConfirmationItemDetails: React.FC<PurchaseConfirmationItemDetailsProps> = ({
  checkoutItem,
  purchaseInstructions,
}) => {
  return (
    <Box sx={{ position: "relative", mt: 2.5 }}>
      <Box
        component="img"
        src={ checkoutItem.imageSrc }
        sx={{
          background: theme => checkoutItem.imageBackground || theme.palette.grey["300"],
          width: "100%",
          mb: 5,
        }} />

      <Typography>{ checkoutItem.name }</Typography>
      <Typography sx={{ marginTop: 0.5 }}>{ checkoutItem.description }</Typography>
      <Typography sx={{ marginTop: 0.5 }}>{ purchaseInstructions }</Typography>

      <Divider sx={{ mt: 5 }} />
    </Box>
  );
}
