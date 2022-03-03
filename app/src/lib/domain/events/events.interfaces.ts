import { CheckoutItem } from "../..";

export interface CheckoutDetails {
  customerId?: string;
  departmenCategory: "NFT";
  paymentMethod: "ACH" | "CreditCard" | undefined;
  revenue: number;
  shippingMethod: "custom wallet" | "multisig wallet";
  step: number;
  stepName: string;
}

export interface OrderDetails extends CheckoutDetails {
  currency: "USD",
  fees: number;
  total: number;
  products: CheckoutItem[],
  tax: number;
  circlePaymentID: string;
  paymentID: string;
}
