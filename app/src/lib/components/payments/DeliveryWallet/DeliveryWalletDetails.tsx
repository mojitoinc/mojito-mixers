import { Box, Chip, Typography } from "@mui/material";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import Clipboard from "../../shared/ClipBoard/ClipBoard";

export interface DeliveryWalletDetailsProps {
    walletAdress: string,
    isMultiSig?: boolean
}
const DeliveryWalletDetails: React.FC<DeliveryWalletDetailsProps> = ({
    isMultiSig = true,
    walletAdress
}) => {
    return <Box pt={2}>
        <Typography variant="caption">Once minted, items will be delivered to:</Typography>
        <Box display="flex" justifyContent="space-between" pt={1} alignItems="center">

            <Typography sx={{ fontWeight: "500" }}>
                Wallet Address
            </Typography>
            {isMultiSig &&
                <Chip
                    variant="outlined"
                    size="small"
                    color="info"
                    label={(<>
                        MultiSig
                        <InfoOutlinedIcon sx={{ height: "15px" }} />
                    </>)} />
            }

        </Box>
        <Box width="100%" textAlign="center" mt={2} bgcolor={(theme) => theme.palette.grey["50"]} borderRadius={0.5} py="10px">
            <Typography minWidth="100%" fontWeight={500} variant="overline" width="100%" mr={2}>
                {walletAdress}
            </Typography>
            <Clipboard
                tooltip="Copy Wallet Address"
                value={walletAdress}
                resultTooltip="Wallet Address Copied"
            />
        </Box>
    </Box >;
}

export default DeliveryWalletDetails;