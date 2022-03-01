import { Box, SxProps, Theme, Tooltip, Typography } from "@mui/material";
import React from "react";
import { formatTaxRate } from "../../../../utils/formatUtils";
import { TaxesState } from "../../../../views/Billing/BillingView";
import { Number } from "../../../shared/Number/Number";

const TAX_RATE_PLACEHOLDER_SX: SxProps<Theme> = {
  background: theme => theme.palette.grey[100],
  borderRadius: "128px",
  color: "transparent",
  fontSize: "10px",
  margin: "0 0 0 2px",
  userSelect: "none",
};

const TAX_AMOUNT_PLACEHOLDER_SX: SxProps<Theme> = {
  ...TAX_RATE_PLACEHOLDER_SX,
  margin: "0 2px 0 0",
};

const TOTAL_PLACEHOLDER_SX: SxProps<Theme> = {
  background: theme => theme.palette.success.light,
  borderRadius: "128px",
  color: "transparent",
  fontFamily: theme => theme.typography.subtitle1.fontFamily,
  fontSize: "14px",
  margin: "0 4px 0 0",
  userSelect: "none",
};


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
  let taxRateElement: React.ReactNode = null;
  let taxAmountElement: React.ReactNode = null;
  let totalElement: React.ReactNode = null;

  if (status === "loading") {
    taxRateElement = <Tooltip title="Calculating taxes..."><span>(<Box component="span" sx={ TAX_RATE_PLACEHOLDER_SX }>00.00</Box> %)</span></Tooltip>;
    taxAmountElement = <Tooltip title="Calculating taxes..."><span><Box component="span" sx={ TAX_AMOUNT_PLACEHOLDER_SX }>{ `${ (total + fees) * 0.10 | 0 }`.replace(/./, "0") }.00</Box> USD</span></Tooltip>;
    totalElement = <Tooltip title="Calculating total..."><span><Box component="span" sx={ TOTAL_PLACEHOLDER_SX }>{ `${ (total + fees) * 1.10 | 0 }`.replace(/./, "0") }.00</Box> USD</span></Tooltip>;
  } else if (status === "complete" && taxAmount !== undefined ) {
    taxRateElement = `(${ formatTaxRate(taxRate) })`;
    taxAmountElement = <Number suffix=" USD">{taxAmount}</Number>;
    totalElement = <Number suffix=" USD">{total + fees + taxAmount}</Number>
  } else {
    taxRateElement = <Tooltip title="Enter a valid address to calculate the taxes"><span>(- %)</span></Tooltip>;
    taxAmountElement = <Tooltip title="Enter a valid address to calculate the taxes"><span>- USD</span></Tooltip>;
    totalElement = <Tooltip title="Enter a valid address to calculate the total"><span>- USD</span></Tooltip>;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", mt: { xs: 3, sm: 0.5 } }}>
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
            <Typography sx={(theme) => ({ color: theme.palette.grey["500"] })}>
              Taxes { taxRateElement }
            </Typography>

            <Typography>
              { taxAmountElement }
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
          }}>
          { totalElement }
        </Typography>
      </Box>
    </Box>
  );
};
