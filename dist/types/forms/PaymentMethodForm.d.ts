import React from "react";
import { PaymentMethod, PaymentType } from "../domain/payment/payment.interfaces";
import { ConsentType } from "../components/shared/ConsentText/ConsentText";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { PUIDictionary } from "../domain/dictionary/dictionary.interfaces";
export interface PaymentMethodFormProps {
    acceptedPaymentTypes: PaymentType[];
    defaultValues?: PaymentMethod;
    checkoutError?: CheckoutModalError;
    onPlaidLinkClicked: () => void;
    onSaved?: () => void;
    onClose: () => void;
    onSubmit: (data: PaymentMethod) => void;
    onAttemptSubmit: () => void;
    consentType?: ConsentType;
    privacyHref?: string;
    termsOfUseHref?: string;
    dictionary: PUIDictionary;
    debug?: boolean;
}
export declare const PaymentMethodForm: React.FC<PaymentMethodFormProps>;
