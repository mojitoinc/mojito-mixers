import React from "react";
import { PUIDictionary } from "../../../../domain/dictionary/dictionary.interfaces";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";
export interface DeliveryWalletSelectorProps {
    validatePersonalAddress: boolean;
    wallets?: Wallet[];
    wallet: null | string | Wallet;
    onWalletChange: (wallet: null | string | Wallet) => void;
    dictionary: PUIDictionary;
}
export declare const DeliveryWalletSelector: React.FC<DeliveryWalletSelectorProps>;
