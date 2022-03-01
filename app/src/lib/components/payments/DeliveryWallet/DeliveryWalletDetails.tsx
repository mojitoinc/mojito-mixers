import { Box, Chip, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Clipboard from "../../shared/ClipBoard/ClipBoard";
import { ReadOnlyWalletAddress } from "../../shared/ReadOnlyField/ReadOnlyField";

export interface DeliveryWalletDetailsProps {
    walletAddress: string,
    isMultiSig?: boolean
}
const DeliveryWalletDetails: React.FC<DeliveryWalletDetailsProps> = ({
  isMultiSig = true,
  walletAddress,
}) => {
  return (
    <Box pt={2}>
      <Typography variant="body1">Once minted, items will be delivered to:</Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", my: 1, alignItems: "center" }}>
        <Typography sx={{ fontWeight: "500" }}>Wallet Address</Typography>

          { isMultiSig && (
            <Chip
              variant="outlined"
              size="small"
              color="info"
              label={ (<>
                MultiSig
                <InfoOutlinedIcon sx={{ fontSize: "16px", ml: 1 }} />
              </>) } />
          ) }
      </Box>


      <ReadOnlyWalletAddress
        value={ walletAddress }
        margin="none"
        InputProps={{
          endAdornment: (
            <Clipboard
              tooltip="Copy Wallet Address"
              value={walletAddress}
              resultTooltip="Wallet Address Copied" />
          ),
        }} />

      <Box width="100%" textAlign="center" mt={ 2 } bgcolor={(theme) => theme.palette.grey["50"]} borderRadius={0.5} py="10px">
        <Typography minWidth="100%" fontWeight={500} variant="overline" width="100%" mr={2}>{ walletAddress }</Typography>
          <Clipboard
              tooltip="Copy Wallet Address"
              value={walletAddress}
              resultTooltip="Wallet Address Copied"
          />
      </Box>
    </Box>
  );
}

export default DeliveryWalletDetails;
