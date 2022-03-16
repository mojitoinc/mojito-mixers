import React, { useCallback, useEffect, useMemo } from "react";
import {
  Select,
  SelectOption,
  SelectProps,
} from "../../Select/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";
import { isNewWalletAddress, isSpecialWalletAddressValue } from "../../../../domain/wallet/wallet.utils";
import { CUSTOM_WALLET_OPTION, NEW_WALLET_OPTION } from "../../../../domain/wallet/wallet.constants";

const mapWalletAddressToSelectOption = (wallet: Wallet) => ({
  value: wallet.id,
  label: `${ wallet.name } (${ wallet.address })`,
});

const reduceWalletsByID = (walletsMap: Record<string, Wallet>, wallet: Wallet) => {
  walletsMap[wallet.id] = wallet;

  return walletsMap;
};

const reduceWalletsByAddress = (walletsMap: Record<string, Wallet>, wallet: Wallet) => {
  walletsMap[wallet.address] = wallet;

  return walletsMap;
};

export interface WalletAddressSelectorProps extends Omit<SelectProps, "value" | "options"> {
  wallets?: Wallet[];
  wallet: null | string | Wallet;
  onSelectWallet: (wallet: null | string | Wallet) => void;
}

export const WalletAddressSelector: React.FC<WalletAddressSelectorProps> = ({
  label,
  wallets,
  wallet,
  onSelectWallet,
  disabled: parentDisabled,
  error,
  helperText,
  ...props
}) => {
  const { options, walletsByID, walletsByAddress } = useMemo(() => {
    const options: SelectOption[] = [NEW_WALLET_OPTION, CUSTOM_WALLET_OPTION, ...(wallets || []).map(mapWalletAddressToSelectOption)];
    const walletsByID: Record<string, Wallet> = (wallets || []).reduce(reduceWalletsByID, {});
    const walletsByAddress: Record<string, Wallet> = (wallets || []).reduce(reduceWalletsByAddress, {});

    return { options, walletsByID, walletsByAddress };
  }, [wallets]);

  const handleChange = useCallback((e: SelectChangeEvent<string | number>) => {
    const value = e.target.value as string;
    const maybeWallet = walletsByID[value];

    onSelectWallet(maybeWallet || value);
  }, [onSelectWallet, walletsByID]);


  // Filter out incorrect values or select MultiSig option if manually entered:

  useEffect(() => {
    if (typeof wallet === "string") {
      const maybeWallet = walletsByAddress[wallet];

      // Check if the manually entered value matches a MultiSig wallet:
      if (maybeWallet) onSelectWallet(maybeWallet);

      return;
    }

    if (wallet && !walletsByID[wallet.id]) onSelectWallet(NEW_WALLET_OPTION.value);
  }, [wallet, walletsByID, walletsByAddress, onSelectWallet]);


  // Init (first-load only):

  useEffect(() => {
    if (wallets === undefined || wallet !== null) return;

    onSelectWallet(wallets[0] || NEW_WALLET_OPTION.value);
  }, [wallets, wallet, onSelectWallet]);


  // Select display value:

  const selectValue = typeof wallet === "string"
    ? (isSpecialWalletAddressValue(wallet) ? wallet : CUSTOM_WALLET_OPTION.value)
    : (wallet?.id || NEW_WALLET_OPTION.value);

  const disabled = parentDisabled || wallets === undefined || wallet === null;
  const showError = !isNewWalletAddress(wallet);

  return (
    <Select
      {...props}
      label={label}
      options={options}
      onChange={handleChange}
      value={ selectValue }
      disabled={ disabled }
      error={ showError ? error : undefined }
      helperText={ showError ? helperText : undefined}
      displayEmpty
    />
  );
};
