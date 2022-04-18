import React from "react";
import { PaymentMethod, PaymentType } from "../domain/payment/payment.interfaces";
import { ConsentType } from "../components/shared/ConsentText/ConsentText";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { CreditCardNetwork } from "../domain/react-payment-inputs/react-payment-inputs.utils";
import { ApolloError } from "@apollo/client";
export interface PaymentMethodFormProps {
    acceptedPaymentTypes: PaymentType[];
    acceptedCreditCardNetworks?: CreditCardNetwork[];
    defaultValues?: PaymentMethod;
    checkoutError?: CheckoutModalError;
    plaidLoading: boolean;
    plaidError?: ApolloError;
    onPlaidLinkClicked: () => void;
    refetchPlaidLink: () => void;
    onSaved?: () => void;
    onClose: () => void;
    onSubmit: (data: PaymentMethod) => void;
    onAttemptSubmit: () => void;
    consentType?: ConsentType;
    debug?: boolean;
}
export declare const PaymentMethodForm: React.FC<PaymentMethodFormProps>;
