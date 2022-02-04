import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import React from "react";
export interface SavedBillingDetailsSelectorProps {
    showLoader: boolean;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethodAddressId?: string;
    onNew: () => void;
    onEdit: (billingInfoId: string) => void;
    onDelete: (billingInfoId: string) => Promise<void>;
    onPick: (billingInfoId: string) => void;
    onNext: () => void;
    onClose: () => void;
}
export declare const SavedBillingDetailsSelector: React.FC<SavedBillingDetailsSelectorProps>;
