export declare type PaymentType = "CreditCard" | "ACH" | "Wire" | "Crypto";
export declare type PaymentStatus = "processed" | "processing" | "error";
export declare type CreditCard = {
    type: "CreditCard";
    cardNumber: string;
    expiryDate: string;
    secureCode: string;
    nameOnCard: string;
};
export declare type AchAccount = {
    type: "ACH";
    accountId: string;
    publicToken: string;
};
export declare type WireAccount = {
    type: "Wire";
};
export declare type CryptoAddress = {
    type: "Crypto";
};
export declare type PaymentMethod = CreditCard | AchAccount | WireAccount | CryptoAddress;
export interface PaymentDetails {
    type: PaymentType;
    status: PaymentStatus;
    cardNumber: string;
    referenceNumber: string;
}
