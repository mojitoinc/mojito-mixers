import React from "react";
import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";
export interface DeliveryWalletSelectorProps {
    validatePersonalAddress: boolean;
    walletAddress: string | null;
    onWalletAddressChange: (walletAddress: string | null) => void;
    dictionary: PUIDictionary;
}
export declare const DeliveryWalletSelector: React.FC<DeliveryWalletSelectorProps>;
