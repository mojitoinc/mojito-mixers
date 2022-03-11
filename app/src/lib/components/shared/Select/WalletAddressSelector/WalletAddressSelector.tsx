import React, { useCallback, useEffect } from "react";
import {
  Select,
  SelectOption,
  SelectProps,
} from "../../Select/Select";
import { SelectChangeEvent } from "@mui/material/Select";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";

export interface WalletAddressSelectorProps
  extends Omit<SelectProps, "value" | "options"> {
  wallets: Wallet[];
  selectedAddress: string | null;
  onSelectAddress: (walletAddress: string | null) => void;
}

const mapWalletAddressToSelectOption = (wallet: Wallet) => ({
  value: wallet.address,
  label: `${wallet.name} (${wallet.address})`,
});

const reduceSelectOptionsToMap = (
  optionsMap: Record<string, SelectOption>,
  selectOption: SelectOption,
) => {
  optionsMap[selectOption.value] = selectOption;
  return optionsMap;
};

const NO_WALLET_OPTION = {
  value: "",
  label: "Create new MultiSig wallet"
}

export const WalletAddressSelector: React.FC<WalletAddressSelectorProps> = ({
  label,
  wallets,
  selectedAddress,
  onSelectAddress,
  ...props
}) => {
  const options: SelectOption[] = [NO_WALLET_OPTION, ...wallets.map(mapWalletAddressToSelectOption)];
  const optionsMap: Record<string, SelectOption> = options.reduce(reduceSelectOptionsToMap, {});

  const handleChange = useCallback(
    (e: SelectChangeEvent<string | number>) => {
      onSelectAddress(e.target.value as string);
    },
    [onSelectAddress]
  );

  // If the selected option can't be found among the available ones, we reset the field:
  useEffect(() => {
    if (!selectedAddress) return;

    if (!optionsMap[selectedAddress]) onSelectAddress(null);
  }, [optionsMap, selectedAddress, onSelectAddress]);

  return (
    <Select
      {...props}
      label={label}
      options={options}
      onChange={handleChange}
      value={selectedAddress as string}
      displayEmpty
    />
  );
};
