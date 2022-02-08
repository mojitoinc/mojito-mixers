import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import React from "react";
import { ConsentType } from "../ConsentText/ConsentText";
export interface SavedPaymentDetailsSelectorProps {
    showLoader: boolean;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethodId?: string;
    onNew: () => void;
    onDelete: (paymentMethodId: string) => void;
    onPick: (paymentMethodId: string) => void;
    onNext: () => void;
    onClose: () => void;
    consentType: ConsentType;
    privacyHref: string;
    termsOfUseHref: string;
}
export declare const SavedPaymentDetailsSelector: React.FC<SavedPaymentDetailsSelectorProps>;
