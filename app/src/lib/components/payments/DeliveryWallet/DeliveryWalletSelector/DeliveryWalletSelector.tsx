import { Typography } from "@mui/material";
import React, { useCallback } from "react";
import { DisplayBox } from "../../DisplayBox/DisplayBox";
import { InputGroupLabel } from "../../../shared/InputGroupLabel/InputGroupLabel";
import { TextField } from "../../../shared/TextField/TextField";
import { withInvalidErrorMessage } from "../../../../utils/validationUtils";
import { isCustomWalletAddress, isValidWalletAddress } from "../../../../domain/wallet/wallet.utils";
import { WalletAddressSelector } from "../../../shared/Select/WalletAddressSelector/WalletAddressSelector";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";
import { useDictionary } from "../../../../hooks/useDictionary";

export interface DeliveryWalletSelectorProps {
  validatePersonalAddress: boolean;
  wallets?: Wallet[];
  wallet: null | string | Wallet;
  onWalletChange: (wallet: null | string | Wallet) => void;
}

const WALLET_ADDRESS_FIELD_LABEL = "Wallet Address";

const INVALID_WALLET_ADDRESS_MESSAGE = withInvalidErrorMessage({
  label: WALLET_ADDRESS_FIELD_LABEL,
});

export const DeliveryWalletSelector: React.FC<DeliveryWalletSelectorProps> = ({
  validatePersonalAddress,
  wallets,
  wallet,
  onWalletChange,
}) => {
  const dictionary = useDictionary();

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onWalletChange(e.target.value);
  }, [onWalletChange]);

  const handleSelectWallet = useCallback((nextWallet: null | string | Wallet) => {
    onWalletChange(nextWallet);
  }, [onWalletChange]);

  const isAddressOk = isValidWalletAddress(wallet);
  const showAddressError = validatePersonalAddress && !isAddressOk;

  return (
    <>
      <InputGroupLabel sx={{ mt: 2.5, mb: 1.5 }}>
        Wallet Delivery Address
      </InputGroupLabel>

      <DisplayBox>
        <Typography sx={{ mb: 1.5 }}>{dictionary.walletInfo}</Typography>

        <WalletAddressSelector
          margin="none"
          label="Wallet"
          wallets={ wallets }
          wallet={ wallet }
          onSelectWallet={ handleSelectWallet }
          error={ showAddressError }
          helperText={ showAddressError ? INVALID_WALLET_ADDRESS_MESSAGE : undefined } />

        { isCustomWalletAddress(wallet) && (
          <>
            <Typography variant="body1" sx={{ my: 1.5 }}>
              Once minted, this is where your items will be delivered:
            </Typography>

            <TextField
              margin="none"
              label={ WALLET_ADDRESS_FIELD_LABEL }
              onChange={ handleInputChange }
              value={ wallet }
              error={ showAddressError }
              helperText={ showAddressError ? INVALID_WALLET_ADDRESS_MESSAGE : undefined } />

            <Typography variant="body2" sx={{ mt: 1.5 }}>
              (IMPORTANT: Please make sure the wallet address you provide is correct)
            </Typography>
          </>
        ) }
      </DisplayBox>
    </>
  );
};
