import React from "react";
export interface DeliveryWalletSelectorProps {
    validatePersonalAddress: boolean;
    walletAddress: string | null;
    onWalletAddressChange: (walletAddress: string | null) => void;
}
export declare const DeliveryWalletSelector: React.FC<DeliveryWalletSelectorProps>;
