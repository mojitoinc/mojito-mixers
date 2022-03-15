import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import React from "react";
import { ConsentType } from "../ConsentText/ConsentText";
export declare function validateCvv(isCvvRequired: boolean, cvv: string): boolean;
export interface SavedPaymentDetailsSelectorProps {
    showLoader: boolean;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethodId?: string;
    onNew: () => void;
    onDelete: (paymentMethodId: string) => void;
    onPick: (paymentMethodId: string) => void;
    onCvvSelected: (cvv: string) => void;
    onNext: () => void;
    onClose: () => void;
    onAttemptSubmit: () => void;
    consentType?: ConsentType;
}
export declare const SavedPaymentDetailsSelector: React.FC<SavedPaymentDetailsSelectorProps>;
