import { Box, Typography } from "@mui/material";
import React from "react";
import { Number } from "../../../shared/Number/Number";

export interface CheckoutItemCostTotalProps {
  price: number;
  fee: number;
}

export const CheckoutItemCostTotal: React.FC<CheckoutItemCostTotalProps> = ({
  price,
  fee,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", mt: { xs: 3, sm: 0.5 } }}>
      <Typography sx={{ fontWeight: "500" }}>Total Amount (USD)</Typography>

      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: "500",
          color: "success.main",
          marginTop: 2,
        }}>

        <Number prefix="$">{ price + fee }</Number>

      </Typography>
    </Box>
  );
};
