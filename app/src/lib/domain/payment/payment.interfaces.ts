import { CheckoutItem } from "../..";
import { SavedPaymentMethod } from "../circle/circle.interfaces";

export type PaymentType = "CreditCard" | "ACH" | "Wire" | "Crypto";

export type PaymentStatus = "processed" | "processing" | "error";

export type CreditCard = {
  type: "CreditCard";
  cardNumber: string;
  expiryDate: string;
  secureCode: string;
  nameOnCard: string;
};

export type AchAccount = {
  type: "ACH";
  accountId: string;
  publicToken: string;
  // accountName: string;
};

export type WireAccount = {
  type: "Wire";
};

export type CryptoAddress = {
  type: "Crypto";
};

export type PaymentMethod = CreditCard | AchAccount | WireAccount | CryptoAddress;

export interface PaymentDetails {
  type: PaymentType;
  status: PaymentStatus;
  cardNumber: string;
  referenceNumber: string;
}

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
