import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import React from "react";
import { ConsentType } from "../ConsentText/ConsentText";
import { CreditCardNetwork } from "../../../domain/react-payment-inputs/react-payment-inputs.utils";
export interface SavedPaymentDetailsSelectorProps {
    showLoader: boolean;
    acceptedCreditCardNetworks?: CreditCardNetwork[];
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
