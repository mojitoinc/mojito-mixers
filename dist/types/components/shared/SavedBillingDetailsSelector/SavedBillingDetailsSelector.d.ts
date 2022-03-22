import React from "react";
import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import { TaxesState } from "../../../views/Billing/BillingView";
import { ConsentType } from "../ConsentText/ConsentText";
export interface SavedBillingDetailsSelectorProps {
    showLoader: boolean;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethodAddressId?: string;
    taxes: null | TaxesState;
    onNew: () => void;
    onEdit: (billingInfoId: string) => void;
    onDelete: (billingInfoId: string) => Promise<void>;
    onPick: (billingInfoId: string) => void;
    onNext: () => void;
    onClose: () => void;
    onAttemptSubmit: () => void;
    consentType?: ConsentType;
}
export declare const SavedBillingDetailsSelector: React.FC<SavedBillingDetailsSelectorProps>;
