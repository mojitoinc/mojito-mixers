import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { CheckoutModalError, CheckoutModalStep } from "./CheckoutOverlay.hooks";
export interface CheckoutModalInfo {
    url?: string;
    invoiceID: string;
    circlePaymentID: string;
    paymentID: string;
    billingInfo: string | BillingInfo;
    paymentInfo: string | PaymentMethod;
    timestamp?: number;
}
export interface CheckoutModalState3DS extends CheckoutModalInfo {
    receivedRedirectUri?: string;
    continue3DSFlow: boolean;
    purchaseSuccess: boolean;
    purchaseError: boolean;
    savedStateUsed: boolean;
}
export declare function persistCheckoutModalInfo(info: CheckoutModalInfo): void;
export declare function persistReceivedRedirectUri3DS(receivedRedirectUri: string): void;
export declare function persistCheckoutModalInfoUsed(used?: boolean): void;
export declare function clearPersistedInfo(isExpired?: boolean): CheckoutModalState3DS;
export declare function getCheckoutModalState(): CheckoutModalState3DS;
export declare function continueCheckout(noClear?: boolean): [boolean, CheckoutModalState3DS];
export interface ContinueFlowsReturn {
    checkoutStep: CheckoutModalStep | "";
    checkoutError?: CheckoutModalError;
    invoiceID: string;
    circlePaymentID: string;
    paymentID: string;
    billingInfo: string | BillingInfo;
    paymentInfo: string | PaymentMethod;
}
export declare function continueFlows(noClear?: boolean): ContinueFlowsReturn;
