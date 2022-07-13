import { Chip, Tooltip, BoxProps, Typography, Divider, SxProps, Box, Theme } from "@mui/material";
import React from "react";
import { DisplayBox } from "../DisplayBox/DisplayBox";

export type ConnectedWalletItemStatus = "connected" | "disconnected";

export interface ConnectedWalletItemProps {
  address: string;
  status: ConnectedWalletItemStatus;
  balance: Record<string, number>
  boxProps?: BoxProps;
}

const ADDRESS_LINE_SX: SxProps<Theme> = {
  display: "flex",
  alignItems: "center",
  fontWeight: 500,
};

const ADDRESS_START_SX: SxProps<Theme> = {
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
  flex: "0 1 auto",
};

const ADDRESS_END_SX: SxProps<Theme> = {
  flex: "0 0 auto",
  pr: 2,
};

const BALANCE_LINE_X: SxProps<Theme> = {
  display: "flex",
  mt: 1,
};

export const ConnectedWalletItem: React.FC<ConnectedWalletItemProps> = ({
  address,
  status,
  balance,
  boxProps,
}) => {
  const labelElement = status === "connected" ? (
    <Chip size="small" color="success" label="Connected" variant="outlined" component="span" sx={{ ml: "auto" }} />
  ) : (
    <Tooltip title="You must connect your wallet to proceed.">
      <Chip size="small" color="error" label="Disconnected" variant="outlined" component="span" sx={{ ml: "auto" }} />
    </Tooltip>
  );

  return (
    <DisplayBox { ...boxProps }>
      <Typography variant="body1" sx={ ADDRESS_LINE_SX }>
        <Box component="span" sx={ ADDRESS_START_SX }>Wallet Address: { address.slice(0, -4) }</Box>
        <Box component="span" sx={ ADDRESS_END_SX }>{ address.slice(-4) }</Box>

        { labelElement }
      </Typography>

      <Divider sx={{ my: 2 }} />

      { Object.entries(balance).map(([currency, value], i) => (
        <Typography key={ currency } variant="body1" sx={{ ...BALANCE_LINE_X, fontWeight: i === 0 ? "500" : "inherit" }}>
          <Box sx={{ mr: "auto" }} component="span">{ currency } Balance:</Box>
          { value } { currency }
        </Typography>
      )) }
    </DisplayBox>
  );
};
