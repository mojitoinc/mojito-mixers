import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";
import React from "react";
export interface Wallet {
    id: string;
    name: string;
    address: string;
}
export interface DeliveryWalletDetailsProps {
    walletAddress: string;
    wallets?: Wallet[];
    dictionary: PUIDictionary;
}
declare const DeliveryWalletDetails: React.FC<DeliveryWalletDetailsProps>;
export default DeliveryWalletDetails;
