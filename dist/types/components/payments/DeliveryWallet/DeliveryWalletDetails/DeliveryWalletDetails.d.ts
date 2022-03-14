import { PUIDictionary } from "../../../../domain/dictionary/dictionary.interfaces";
import React from "react";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";
export interface DeliveryWalletDetailsProps {
    wallet: null | string | Wallet;
    dictionary: PUIDictionary;
}
export declare const DeliveryWalletDetails: React.FC<DeliveryWalletDetailsProps>;
