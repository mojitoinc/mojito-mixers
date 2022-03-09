import { Box, Chip, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CopyButton } from "../../shared/CopyButton/CopyButton";
import { ReadOnlyWalletAddress } from "../../shared/ReadOnlyField/ReadOnlyField";
import React from "react";
import { useDictionary } from "../../../hooks/useDictionary";

export interface DeliveryWalletDetailsProps {
  walletAddress: string;
  isMultiSig?: boolean;
}
const DeliveryWalletDetails: React.FC<DeliveryWalletDetailsProps> = ({
  isMultiSig = true,
  walletAddress,
}) => {
  const dictionary = useDictionary();

  return (
    <Box pt={2}>
      <Typography variant="body1">Once minted, items will be delivered to:</Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1, alignItems: "center" }}>
        <Typography sx={{ fontWeight: "500" }}>Wallet Address</Typography>

          { isMultiSig && (
            <Tooltip title={ dictionary.walletMultiSigTooltip }>
              <Chip
                variant="outlined"
                size="small"
                color="info"
                label={ (<>
                  MultiSig
                  <InfoOutlinedIcon sx={{ fontSize: "16px", ml: 1 }} />
                </>) } />
            </Tooltip>
          ) }
      </Box>

      <ReadOnlyWalletAddress
        value={ walletAddress }
        margin="none"
        InputProps={{
          endAdornment: (
            <CopyButton
              label="Wallet Address"
              value={ walletAddress } />
          ),
        }} />
    </Box>
  );
}

export default DeliveryWalletDetails;
