import { Box, Typography } from "@mui/material";
import React from "react";
import { Number } from "../../../shared/Number";

export interface CheckoutItemCostTotalProps {
  total: number;
  taxes: number;
  fees: number;
}

export const CheckoutItemCostTotal: React.FC<CheckoutItemCostTotalProps> = ({
  total,
  taxes,
  fees
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", mt: { xs: 3, sm: 0.5 } }}
    >
      <Box sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
        <Typography>Your purchase</Typography>
        <Typography>
          <Number suffix=" USD">{total}</Number>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          pt: 1,
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <Typography sx={(theme) => ({ color: theme.palette.grey["500"] })}>
          Taxes
        </Typography>
        <Typography>
          <Number suffix=" USD">{taxes}</Number>
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          pt: 1,
          flex: 1,
          justifyContent: "space-between"
        }}
      >
        <Typography sx={(theme) => ({ color: theme.palette.grey["500"] })}>
          Fees
        </Typography>
        <Typography>
          <Number suffix=" USD">{fees}</Number>
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          mt: 3,
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center"
        }}
      >
        <Typography sx={{ fontWeight: "500" }}>Total Amount (USD)</Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "500",
            color: "success.main"
          }}
        >
          <Number suffix=" USD">{total + taxes + fees}</Number>
        </Typography>
      </Box>
    </Box>
  );
};
