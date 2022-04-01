import { Typography } from "@mui/material";
import React from "react";
import { DisplayBox } from "../../DisplayBox/DisplayBox";
import { InputGroupLabel } from "../../../shared/InputGroupLabel/InputGroupLabel";
import { TextField } from "../../../shared/TextField/TextField";
import { withInvalidErrorMessage } from "../../../../utils/validationUtils";
import { isCustomWalletAddress, isValidWalletAddress } from "../../../../domain/wallet/wallet.utils";
import { useCallback } from "react";
import { WalletAddressSelector } from "../../../shared/Select/WalletAddressSelector/WalletAddressSelector";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";
import { useDictionary } from "../../../../hooks/useDictionary";
import { InjectedConnector } from '@web3-react/injected-connector';
import { useWeb3React } from "@web3-react/core";
import { SecondaryButton } from "../../../shared/SecondaryButton/SecondaryButton";

export const injected = new InjectedConnector({
  // See https://piyopiyo.medium.com/list-of-ethereums-major-network-and-chain-ids-2bc58e928508
  supportedChainIds: [1, 3, 4, 5, 42],
});

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
  const { active, account, library, connector, activate, deactivate } = useWeb3React();

  // console.log(library, connector);

  const connect = useCallback(async () => {
    try {
      await activate(injected)
    } catch (ex) {
      console.log(ex)
    }
  }, [activate]);

  const disconnect = useCallback(async () => {
    try {
      deactivate()
    } catch (ex) {
      console.log(ex)
    }
  }, [deactivate]);

  /*
  useEffect(() => {
    connect();
  }, [connect]);
  */

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
      <DisplayBox sx={{ mt: 2.5, mb: 1.5 }}>
        { active ? (<>
          <Typography sx={{ mb: 0.5 }}>Connected with:</Typography>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>{account}</Typography>
          <SecondaryButton onClick={ disconnect }>Disconnect</SecondaryButton>
        </>) : (<>
          <Typography sx={{ mb: 1 }}>Not connected</Typography>
          <SecondaryButton onClick={ connect }>Connect</SecondaryButton>
        </>) }
      </DisplayBox>

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

        { isCustomWalletAddress(wallet) && (<>
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
        </>) }
      </DisplayBox>
    </>
  );
};
