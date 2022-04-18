import { CheckoutItemInfo } from "../../../domain/product/product.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { CheckoutModalStep } from "./CheckoutOverlay.hooks";
export declare type FlowType = "" | "3DS" | "Plaid";
export interface CheckoutModalInfoCommon {
    url?: string;
    fromLocalhost?: boolean;
    invoiceID: string;
    invoiceCountdownStart: number;
    billingInfo: string | BillingInfo;
}
export interface CheckoutModalInfo3DS extends CheckoutModalInfoCommon {
    processorPaymentID: string;
    paymentID: string;
    paymentInfo: string | null;
    checkoutItems: CheckoutItemInfo[];
}
export interface CheckoutModalInfoPlaid extends CheckoutModalInfoCommon {
    linkToken: string;
}
export declare type CheckoutModalInfo = CheckoutModalInfo3DS | CheckoutModalInfoPlaid;
export interface CheckoutModalStateCommon extends CheckoutModalInfoCommon {
    flowType: FlowType;
    checkoutStep: CheckoutModalStep | "";
    receivedRedirectUri?: string;
    savedInfoUsed: boolean;
    continueFlow: boolean;
}
export interface CheckoutModalState3DS extends CheckoutModalStateCommon, CheckoutModalInfo3DS {
    purchaseSuccess: boolean;
    purchaseError: boolean;
}
export declare type CheckoutModalStatePlaid = CheckoutModalStateCommon & CheckoutModalInfoPlaid;
export declare type CheckoutModalStateCombined = CheckoutModalState3DS & CheckoutModalStatePlaid;
