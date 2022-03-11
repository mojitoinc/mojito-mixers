import { Typography } from "@mui/material";
import React, { useState } from "react";
import { DisplayBox } from "../../DisplayBox/DisplayBox";
import { Checkbox } from "../../../shared/Checkbox/Checkbox";
import { InputGroupLabel } from "../../../shared/InputGroupLabel/InputGroupLabel";
import { TextField } from "../../../shared/TextField/TextField";
import { withInvalidErrorMessage } from "../../../../utils/validationUtils";
import { isValidWalletAddress } from "../../../../domain/wallet/wallet.utils";
import { ChangeEvent, useCallback } from "react";
import { PUIDictionary } from "../../../../domain/dictionary/dictionary.interfaces";
import { WalletAddressSelector } from "../../../shared/Select/WalletAddressSelector/WalletAddressSelector";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";

export interface DeliveryWalletSelectorProps {
  validatePersonalAddress: boolean;
  walletAddress: string | null;
  wallets?: Wallet[];
  onWalletAddressChange: (walletAddress: string | null) => void;
  dictionary: PUIDictionary;
}

const WALLET_ADDRESS_FIELD_LABEL = "Wallet Address";
const INVALID_WALLET_ADDRESS_MESSAGE = withInvalidErrorMessage({
  label: WALLET_ADDRESS_FIELD_LABEL,
});

export const DeliveryWalletSelector: React.FC<DeliveryWalletSelectorProps> = ({
  validatePersonalAddress,
  walletAddress,
  wallets,
  onWalletAddressChange,
  dictionary,
}) => {
  const hasWallets = wallets && wallets.length > 0;
  const selectedWalletAddress = hasWallets
    ? wallets.find((wallet) => wallet.address === walletAddress)
    : undefined;

  const [usePersonalWallet, setUsePersonalWallet] = useState(
    !selectedWalletAddress && walletAddress !== null
  );

  const handleCheckboxChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setUsePersonalWallet((usePersonalWallet) => !usePersonalWallet);
      onWalletAddressChange(e.target.checked ? "" : null);
    },
    [onWalletAddressChange]
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onWalletAddressChange(e.target.value);
    },
    [onWalletAddressChange]
  );

  const handleSelectWallet = useCallback(
    (walletAddress) => {
      onWalletAddressChange(walletAddress != "" ? walletAddress : null);
    },
    [onWalletAddressChange]
  );

  const isAddressOk = isValidWalletAddress(walletAddress);
  const showAddressError = validatePersonalAddress && !isAddressOk;

  return (
    <>
      <InputGroupLabel sx={{ mt: 2.5, mb: 1.5 }}>
        Wallet Delivery Address
      </InputGroupLabel>

      <DisplayBox sx={{ border: 0, mb: 0.5 }}>
        <Typography>{dictionary.walletInfo}</Typography>
      </DisplayBox>

      <Checkbox
        label="I have a wallet, and would like to deliver it there (such as Metamask or Rainbow)"
        onChange={handleCheckboxChange}
        checked={usePersonalWallet}
        sx={{ mb: "-13px" }}
      />

      {usePersonalWallet && (
        <>
          <Typography variant="body1" sx={{ mt: "13px" }}>
            Once minted, this is where your items will be delivered:
          </Typography>

          <Typography variant="body2" sx={{ mt: 0.5, mb: 1 }}>
            (IMPORTANT: Please make sure the wallet address you provide is
            correct)
          </Typography>

          <TextField
            margin="none"
            label={WALLET_ADDRESS_FIELD_LABEL}
            onChange={handleInputChange}
            value={walletAddress}
            error={showAddressError}
            helperText={showAddressError && INVALID_WALLET_ADDRESS_MESSAGE}
          />
        </>
      )}

      {!usePersonalWallet && hasWallets && (
        <WalletAddressSelector
          label="Wallet"
          wallets={wallets}
          selectedAddress={walletAddress || ""}
          onSelectAddress={handleSelectWallet}
        />
      )}

      {!usePersonalWallet && !hasWallets && (
        <Typography variant="body1" sx={{ mt: "13px" }}>
          A new MultiSig wallet will be created.
        </Typography>
      )}
    </>
  );
};
