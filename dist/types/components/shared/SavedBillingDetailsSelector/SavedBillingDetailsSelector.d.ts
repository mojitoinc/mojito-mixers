import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import React from "react";
import { TaxesState } from "../../../views/Billing/BillingView";
export interface SavedBillingDetailsSelectorProps {
    showLoader: boolean;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethodAddressId?: string;
    taxes: TaxesState;
    onNew: () => void;
    onEdit: (billingInfoId: string) => void;
    onDelete: (billingInfoId: string) => Promise<void>;
    onPick: (billingInfoId: string) => void;
    onNext: () => void;
    onClose: () => void;
    onAttemptSubmit: () => void;
}
export declare const SavedBillingDetailsSelector: React.FC<SavedBillingDetailsSelectorProps>;
