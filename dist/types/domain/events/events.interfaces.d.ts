import { PaymentType } from "../payment/payment.interfaces";
import { CheckoutItem } from "../product/product.interfaces";
declare type ShippingMethod = "custom wallet" | "multisig wallet";
export interface CheckoutEventData {
    step: number;
    stepName: string;
    departmentCategory: "NFT";
    paymentType?: PaymentType;
    shippingMethod: ShippingMethod;
    checkoutItems: CheckoutItem[];
    currency: "USD";
    revenue: number;
    fees: number;
    tax?: number;
    total: number;
    circlePaymentID?: string;
    paymentID?: string;
}
export declare type CheckoutModalNavigateType = "navigate:authentication" | "navigate:billing" | "navigate:payment" | "navigate:purchasing" | "navigate:confirmation" | "navigate:error";
export declare type CheckoutModalEventType = "event:paymentSuccess" | "event:paymentError";
export declare type CheckoutEventType = CheckoutModalNavigateType | CheckoutModalEventType;
export {};
