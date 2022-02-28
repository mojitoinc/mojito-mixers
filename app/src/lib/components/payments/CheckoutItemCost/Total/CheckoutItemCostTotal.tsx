import { Box, Typography } from "@mui/material";
import React from "react";
import { TaxesState } from "../../../../views/Billing/BillingView";
import { Number } from "../../../shared/Number/Number";

export interface CheckoutItemCostTotalProps {
  total: number;
  taxes: TaxesState;
  fees: number;
  withDetails?: boolean;
}

export const CheckoutItemCostTotal: React.FC<CheckoutItemCostTotalProps> = ({
  total,
  taxes: {
    status,
    taxAmount = 0,
    taxRate = 0,
  },
  fees,
  withDetails = false,
}) => {
  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", mt: { xs: 3, sm: 0.5 } }}
    >
      {withDetails && (
        <>
          <Box
            sx={{ display: "flex", flex: 1, justifyContent: "space-between" }}
          >
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
              justifyContent: "space-between",
            }}
          >
            { /* TODO: Format tax rate function */ }
            { /* TODO: TaxMessagesBox component */ }

            <Typography sx={(theme) => ({ color: theme.palette.grey["500"] })}>
              Taxes{ taxRate > 0 ? ` (${ taxRate }%)` : "" }
            </Typography>

            <Typography>
              { status === "loading" ? (
                <Box component="span"><Box component="span">....</Box> USD</Box>
              ) : (
                status === "complete" && taxAmount !== undefined ? (
                  <Number suffix=" USD">{taxAmount}</Number>
                ) : (
                  <Box component="span"><Box component="span">....</Box> USD</Box>
                )
              ) }
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              pt: 1,
              flex: 1,
              justifyContent: "space-between",
            }}
          >
            <Typography sx={(theme) => ({ color: theme.palette.grey["500"] })}>
              Fees
            </Typography>
            <Typography>
              <Number suffix=" USD">{fees}</Number>
            </Typography>
          </Box>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          mt: 3,
          flex: 1,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontWeight: "500" }}>
          {withDetails ? "Total Amount (USD)" : "Total Amount Paid (USD)"}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: "500",
            color: "success.main",
          }}
        >
          <Number suffix=" USD">{total + taxAmount + fees}</Number>
        </Typography>
      </Box>
    </Box>
  );
};
