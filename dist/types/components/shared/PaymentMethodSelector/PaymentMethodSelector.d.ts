import React from "react";
import { PaymentType } from "../../../domain/payment/payment.interfaces";
declare type PaymentMethodSelectorProps = {
    paymentMethods: PaymentType[];
    selectedPaymentMethod: PaymentType;
    onPaymentMethodChange: (paymentMethod: PaymentType) => void;
};
export declare const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps>;
export {};
