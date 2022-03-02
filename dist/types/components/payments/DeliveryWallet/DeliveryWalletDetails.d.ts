import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";
import React from "react";
export interface DeliveryWalletDetailsProps {
    walletAddress: string;
    isMultiSig?: boolean;
    dictionary: PUIDictionary;
}
declare const DeliveryWalletDetails: React.FC<DeliveryWalletDetailsProps>;
export default DeliveryWalletDetails;
