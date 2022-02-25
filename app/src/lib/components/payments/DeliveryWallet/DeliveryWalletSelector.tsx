import { Typography } from "@mui/material";

import { DisplayBox } from "../DisplayBox/DisplayBox";
import { Checkbox } from "../../shared/Checkbox/Checkbox";
import { InputGroupLabel } from "../../shared/InputGroupLabel/InputGroupLabel";
import { TextField } from "../../shared/TextField/TextField";
import { withInvalidErrorMessage } from "../../../utils/validationUtils";
import { isValidWalletAddress } from "../../../domain/wallet/wallet.utils";

export interface DeliveryWalletSelectorProps {
  validatePersonalAddress: boolean;
  personalWalletAddress: string;
  onWalletAddressChange: (walletAddress: string) => void;
}

const WALLET_ADDRESS_FIELD_LABEL = "Wallet Address";
const INVALID_WALLET_ADDRESS_MESSAGE = withInvalidErrorMessage({ label: WALLET_ADDRESS_FIELD_LABEL });

export const DeliveryWalletSelector: React.FC<DeliveryWalletSelectorProps> = ({
  validatePersonalAddress,
  personalWalletAddress,
  onWalletAddressChange,
}) => {
  const usePersonalWallet = personalWalletAddress !== null;

  const handleUsePersonalWalletChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => onWalletAddressChange(e.target.checked ? "" : null);

  const handleWalletAddressChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (usePersonalWallet) onWalletAddressChange(e.target.value);
  };

  const isAddressOk = !usePersonalWallet || isValidWalletAddress(personalWalletAddress);
  const showAddressError = validatePersonalAddress && !isAddressOk;

  return (
    <>
      <InputGroupLabel sx={{ mt: 2.5, mb: 1.5 }}>
        Wallet Delivery Address
      </InputGroupLabel>

      <DisplayBox sx={{ border: 0 }}>
        <Typography>
          We will cover gas cost for minting and delivery on both MultiSig and
          personal wallets. Your items will be delivered to a MultiSig wallet by
          default.
        </Typography>
      </DisplayBox>

      <Checkbox
        label="I would like to deliver to a personal wallet"
        onChange={handleUsePersonalWalletChange}
        checked={usePersonalWallet}
      />

      {usePersonalWallet && (
        <>
          <Typography>
            Once minted, this is where your items will be delivered:
            <Typography sx={{ fontWeight: 500 }}>
              (IMPORTANT: Please make sure the wallet address you provide is
              correct)
            </Typography>
          </Typography>

          <TextField
            label={WALLET_ADDRESS_FIELD_LABEL}
            onChange={handleWalletAddressChange}
            value={personalWalletAddress}
            error={showAddressError}
            helperText={showAddressError && INVALID_WALLET_ADDRESS_MESSAGE}
          />
        </>
      )}
    </>
  );
};
