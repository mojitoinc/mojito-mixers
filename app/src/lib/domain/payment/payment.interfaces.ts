export type PaymentType = "CreditCard" |  "ACH" | "Wire" | "Crypto";

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
