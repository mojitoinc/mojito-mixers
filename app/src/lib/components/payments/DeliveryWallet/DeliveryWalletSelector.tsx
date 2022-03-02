import { Typography } from "@mui/material";

import { DisplayBox } from "../DisplayBox/DisplayBox";
import { Checkbox } from "../../shared/Checkbox/Checkbox";
import { InputGroupLabel } from "../../shared/InputGroupLabel/InputGroupLabel";
import { TextField } from "../../shared/TextField/TextField";
import { withInvalidErrorMessage } from "../../../utils/validationUtils";
import { isValidWalletAddress } from "../../../domain/wallet/wallet.utils";
import { ChangeEvent, useCallback } from "react";
import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";

export interface DeliveryWalletSelectorProps {
  validatePersonalAddress: boolean;
  walletAddress: string | null;
  onWalletAddressChange: (walletAddress: string | null) => void;
  dictionary: PUIDictionary;
}

const WALLET_ADDRESS_FIELD_LABEL = "Wallet Address";
const INVALID_WALLET_ADDRESS_MESSAGE = withInvalidErrorMessage({ label: WALLET_ADDRESS_FIELD_LABEL });

export const DeliveryWalletSelector: React.FC<DeliveryWalletSelectorProps> = ({
  validatePersonalAddress,
  walletAddress,
  onWalletAddressChange,
  dictionary,
}) => {

  const handleCheckboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    onWalletAddressChange(e.target.checked ? "" : null);
  }, [onWalletAddressChange])

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onWalletAddressChange(e.target.value);
  }, [onWalletAddressChange]);

  const usePersonalWallet = typeof walletAddress === "string";
  const isAddressOk = isValidWalletAddress(walletAddress);
  const showAddressError = validatePersonalAddress && !isAddressOk;

  return (<>
    <InputGroupLabel sx={{ mt: 2.5, mb: 1.5 }}>
      Wallet Delivery Address
    </InputGroupLabel>

    <DisplayBox sx={{ border: 0, mb: 0.5 }}>
      <Typography>{ dictionary.walletInfo }</Typography>
    </DisplayBox>

    <Checkbox
      label="I would like to deliver to a self-hosted wallet (such as Metamask or Rainbow Wallet)"
      onChange={ handleCheckboxChange }
      checked={ usePersonalWallet }
      sx={{ mb: "-13px" }} />

    { usePersonalWallet && (<>
      <Typography variant="body1" sx={{ mt: "13px" }}>
        Once minted, this is where your items will be delivered:
      </Typography>

      <Typography variant="body2" sx={{ mt: 0.5, mb: 1 }}>
        (IMPORTANT: Please make sure the wallet address you provide is correct)
      </Typography>

      <TextField
        margin="none"
        label={ WALLET_ADDRESS_FIELD_LABEL }
        onChange={ handleInputChange }
        value={ walletAddress }
        error={ showAddressError }
        helperText={ showAddressError && INVALID_WALLET_ADDRESS_MESSAGE } />
    </>) }
  </>);
};
