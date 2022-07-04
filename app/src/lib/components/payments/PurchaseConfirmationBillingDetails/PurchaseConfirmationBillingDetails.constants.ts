import { PaymentType } from "../../../domain/payment/payment.interfaces";

export const PAYMENT_TYPE_LABEL: Record<PaymentType | "", string> = {
  CreditCard: "Credit Card Payment",
  ACH: "ACH Payment",
  Wire: "Wire Payment",
  Crypto: "Crypto Payment",
  Coinbase: "Coinbase Payment",
  "": "Payment",
};
