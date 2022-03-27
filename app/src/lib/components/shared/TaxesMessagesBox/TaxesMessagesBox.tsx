import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import { TaxesState } from "../../../views/Billing/BillingView";

export type TaxesMessagesBoxVariant = "form" | "selector";

export interface TaxesMessagesBoxProps extends BoxProps {
  variant: TaxesMessagesBoxVariant;
  taxes: null | TaxesState;
  zipCode?: string;
}

export const TaxesMessagesBox: React.FC<TaxesMessagesBoxProps> = ({
  variant,
  taxes,
  zipCode,
  sx,
  ...props
}) => {
  if (taxes === null || taxes.status !== "error") return null;

  let message: React.ReactNode = "";

  if (zipCode && taxes.zipCodeRange && taxes.zipCodeRange !== zipCode) {
    message = <>The zip code you entered does not match the zip codes for this address: { taxes.zipCodeRange }.</>;
  } else {
    message = `Please, ${ variant === "form" ? "enter" : "select" } a valid address to calculate taxes.`;
  }

  return (
    <Box { ...props }>
      <Typography variant="caption" component="p" sx={{ color: theme => theme.palette.warning.dark, ...sx }}>
        { message }
      </Typography>
    </Box>
  );
}
