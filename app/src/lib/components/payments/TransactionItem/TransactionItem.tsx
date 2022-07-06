import VisibilityIcon from "@mui/icons-material/Visibility";
import { BoxProps, Typography, SxProps, Theme } from "@mui/material";
import React from "react";
import { ReadOnlyHashField } from "../../shared/ReadOnlyField/ReadOnlyField";
import { SecondaryButton } from "../../shared/SecondaryButton/SecondaryButton";
import { DisplayBox } from "../DisplayBox/DisplayBox";

export interface TransactionItemProps {
  hash: string;
  boxProps?: BoxProps;
}

const ROOT_SX: SxProps<Theme> = {
  display: "flex",
  flexDirection: "column",
};

const HASH_INPUT_LABEL_SX: SxProps<Theme> = {
  fontWeight: 500,
};

const ETHERSCAN_BUTTON_SX: SxProps<Theme> = {
  ml: "auto",
  mt: 2,
};

export const TransactionItem: React.FC<TransactionItemProps> = ({
  hash,
  boxProps,
}) => {
  return (
    <DisplayBox { ...boxProps } sx={{ ...ROOT_SX, ...boxProps?.sx }}>
      <Typography variant="body1" sx={ HASH_INPUT_LABEL_SX }>
        Transactions Hash:
      </Typography>

      <ReadOnlyHashField value={ hash } margin="none" />

      <SecondaryButton
        startIcon={ <VisibilityIcon /> }
        href={ `https://etherscan.io/tx/${ hash }/` }
        target="_blank"
        rel="noopener noreferrer"
        sx={ ETHERSCAN_BUTTON_SX }>
        View on Etherscan
      </SecondaryButton>
    </DisplayBox>
  );
};
