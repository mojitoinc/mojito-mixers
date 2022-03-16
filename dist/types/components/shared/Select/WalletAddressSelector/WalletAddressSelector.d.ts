import React from "react";
import { SelectProps } from "../../Select/Select";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";
export interface WalletAddressSelectorProps extends Omit<SelectProps, "value" | "options"> {
    wallets?: Wallet[];
    wallet: null | string | Wallet;
    onSelectWallet: (wallet: null | string | Wallet) => void;
}
export declare const WalletAddressSelector: React.FC<WalletAddressSelectorProps>;
