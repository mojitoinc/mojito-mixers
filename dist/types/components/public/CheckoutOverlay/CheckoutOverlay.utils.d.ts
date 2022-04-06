import { BillingInfo } from "../../../forms/BillingInfoForm";
import { CheckoutModalStep } from "./CheckoutOverlay.hooks";
export interface CheckoutModalInfo {
    url?: string;
    invoiceID: string;
    invoiceCountdownStart: number;
    processorPaymentID: string;
    paymentID: string;
    billingInfo: string | BillingInfo;
    paymentInfo: string | null;
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
export declare function isInitiallyOpen(): boolean;
export declare function getCheckoutModalState(): CheckoutModalState3DS;
export declare function continueCheckout(noClear?: boolean): [boolean, CheckoutModalState3DS];
export declare type FlowType = "" | "3DS" | "Plaid";
export interface ContinueFlowsReturn {
    flowType: FlowType;
    checkoutStep: CheckoutModalStep | "";
    invoiceID: string;
    invoiceCountdownStart: number;
    processorPaymentID: string;
    paymentID: string;
    billingInfo: string | BillingInfo;
    paymentInfo: string | null;
}
export declare function continueFlows(noClear?: boolean): ContinueFlowsReturn;
