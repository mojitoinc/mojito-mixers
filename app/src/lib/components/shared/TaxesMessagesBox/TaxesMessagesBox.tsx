import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import { TaxesState } from "../../../views/Billing/BillingView";

export type TaxesMessagesBoxVariant = "form" | "selector";

export interface TaxesMessagesBoxProps extends BoxProps {
  variant: TaxesMessagesBoxVariant;
  taxes: TaxesState;
}

export const TaxesMessagesBox: React.FC<TaxesMessagesBoxProps> = ({
  variant,
  taxes: { status },
  sx,
  ...props
}) => {
  if (status === "loading" || status === "complete") return null;

  return (
    <Box { ...props }>
      <Typography variant="caption" component="p" sx={{
        color: theme => status === "incomplete" || status === "error" ? theme.palette.warning.dark : theme.palette.text.primary,
        ...sx
      }}>
        { status === "incomplete" ? `Please, ${ variant === "form" ? "enter" : "select" } a valid address to calculate taxes.` : "Invalid address." }
      </Typography>
    </Box>
  );
}
