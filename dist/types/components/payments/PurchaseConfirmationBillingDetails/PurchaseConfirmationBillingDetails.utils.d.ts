import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import { PaymentMethod, PaymentType } from "../../../domain/payment/payment.interfaces";
export interface GetFormattedPaymentMethodReturn {
    isMasked: boolean;
    paymentType: PaymentType;
    displayValue: string;
    network: string;
}
export declare function getFormattedPaymentMethod(paymentMethodInfo: PaymentMethod | SavedPaymentMethod): GetFormattedPaymentMethodReturn;
