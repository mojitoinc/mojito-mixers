import React from "react";
import { Wallet } from "../../../../domain/wallet/wallet.interfaces";
export interface DeliveryWalletDetailsProps {
    wallet: null | string | Wallet;
}
export declare const DeliveryWalletDetails: React.FC<DeliveryWalletDetailsProps>;
