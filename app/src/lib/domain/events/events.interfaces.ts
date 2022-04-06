import { PaymentType } from "../payment/payment.interfaces";
import { CheckoutItem } from "../product/product.interfaces";

type ShippingMethod = "custom wallet" | "multisig wallet";

export interface CheckoutEventData {
  // auth0ID: string; // Not added, already on the parent.
  // checkoutType: string; // Not added, already on the parent.
  // customerId: string; // Not added, already on the parent.

  // Location:
  step: number;
  stepName: string;

  // Purchase:
  departmentCategory: "NFT";
  paymentType?: PaymentType; // "CreditCard" | "ACH" | "Wire" | "Crypto"
  shippingMethod: ShippingMethod; // "custom wallet" | "multisig wallet"
  checkoutItems: CheckoutItem[]; // Provided as this might be a mix of the checkoutItems prop and some additional data from the invoice.

  // Payment:
  currency: "USD";
  revenue: number; // Revenue (subtotal) associated with the transaction, excluding shipping and taxes.
  fees: number;
  tax?: number;
  total: number; // Total value of the order with discounts, taxes and fees.

  // Order:
  processorPaymentID?: string; // Can be used as orderID.
  paymentID?: string; // Can be used as orderID.
}

export type CheckoutModalNavigateType = "navigate:authentication" | "navigate:billing" | "navigate:payment" | "navigate:purchasing" | "navigate:confirmation" | "navigate:error";
export type CheckoutModalEventType = "event:paymentSuccess" | "event:paymentError";
export type CheckoutEventType = CheckoutModalNavigateType | CheckoutModalEventType;
