import { CheckoutItem } from "../..";

export interface CheckoutEventData {
  customerId?: string;
  departmenCategory: "NFT";
  paymentMethod: "ACH" | "CreditCard" | undefined;
  revenue: number;
  shippingMethod: "custom wallet" | "multisig wallet";
  step: number;
  stepName: string;
  currency: "USD",
  fees: number;
  total: number;
  products: CheckoutItem[],
  tax: number;
  circlePaymentID: string;
  paymentID: string;
}
export type CheckoutModalNavigateType = "navigate:authentication" | "navigate:billing" | "navigate:payment" | "navigate:purchasing" | "navigate:confirmation" | "navigate:error";
export type CheckoutModalEventType = "event:payment";

export type CheckoutEventType = CheckoutModalNavigateType | CheckoutModalEventType
