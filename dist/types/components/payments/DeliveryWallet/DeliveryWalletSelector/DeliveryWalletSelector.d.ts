import React from "react";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";
export interface DeliveryWalletSelectorProps {
    validatePersonalAddress: boolean;
    wallets?: Wallet[];
    wallet: null | string | Wallet;
    onWalletChange: (wallet: null | string | Wallet) => void;
}
export declare const DeliveryWalletSelector: React.FC<DeliveryWalletSelectorProps>;
