import { Typography } from "@mui/material";

import { DisplayBox } from "../DisplayBox/DisplayBox";
import { Checkbox } from "../../shared/Checkbox/Checkbox";
import { InputGroupLabel } from "../../shared/InputGroupLabel/InputGroupLabel";
import { TextField } from "../../shared/TextField/TextField";

export interface DeliveryWalletSelectorProps {
  usePersonalWallet: boolean;
  personalWalletAddress: string;
  onUsePersonalWalletChange: (usePersonalWallet: boolean) => void;
  onWalletAddressChange: (walletAddress: string) => void;
}

export const DeliveryWalletSelector: React.FC<DeliveryWalletSelectorProps> = ({
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
            label="Wallet Address"
            onChange={handleWalletAddressChange}
            value={personalWalletAddress}
          />
        </>
      )}
    </>
  );
};
