import React from "react";
import { SelectOption, SelectProps } from "../../Select/Select";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";
export declare const NEW_WALLET_OPTION: SelectOption<string>;
export declare const CUSTOM_WALLET_OPTION: SelectOption<string>;
export interface WalletAddressSelectorProps extends Omit<SelectProps, "value" | "options"> {
    wallets?: Wallet[];
    wallet: null | string | Wallet;
    onSelectWallet: (wallet: null | string | Wallet) => void;
}
export declare const WalletAddressSelector: React.FC<WalletAddressSelectorProps>;
