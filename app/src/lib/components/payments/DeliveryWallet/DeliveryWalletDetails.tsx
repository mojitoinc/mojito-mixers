import { Box, Chip, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CopyButton } from "../../shared/CopyButton/CopyButton";
import { ReadOnlyWalletAddress } from "../../shared/ReadOnlyField/ReadOnlyField";
import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";
import React, { useMemo } from "react";

export interface Wallet {
  id: string;
  name: string;
  address: string;
}

export interface DeliveryWalletDetailsProps {
  walletAddress: string;
  wallets?: Wallet[];
  dictionary: PUIDictionary;
}
const DeliveryWalletDetails: React.FC<DeliveryWalletDetailsProps> = ({
  walletAddress,
  wallets,
  dictionary,
}) => {
  const isMultiSig = useMemo(() => {
    // TODO: We need to filter by network:
    return wallets && wallets.some(({ address }) => address === walletAddress);
  }, [walletAddress, wallets]);

  return (
    <Box pt={2}>
      <Typography variant="body1">Once minted, items will be delivered to:</Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1, mb: walletAddress ? 1 : 0, alignItems: "center" }}>
        <Typography sx={{ fontWeight: "500" }}>{ walletAddress ? "Wallet Address" : "New MultiSig Wallet" }</Typography>

          { (isMultiSig || !walletAddress) && (
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

      { walletAddress && (
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
      ) }
    </Box>
  );
}

export default DeliveryWalletDetails;
