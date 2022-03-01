import { Box, Chip, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CopyButton } from "../../shared/CopyButton/CopyButton";
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
            <CopyButton
              label="Wallet Address"
              value={ walletAddress } />
          ),
        }} />
    </Box>
  );
}

export default DeliveryWalletDetails;
