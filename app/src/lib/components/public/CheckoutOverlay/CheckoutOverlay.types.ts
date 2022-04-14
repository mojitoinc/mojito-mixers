import { CheckoutItemInfo } from "../../../domain/product/product.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";

export type FlowType = "3DS" | "Plaid";


// INFO:

export interface CheckoutModalInfoCommon {
  url?: string;
  invoiceID: string;
  invoiceCountdownStart: number;
  billingInfo: string | BillingInfo;
}

export interface CheckoutModalInfo3DS extends CheckoutModalInfoCommon {
  // processorPaymentID: string; // TODO: This might be needed to match confirmation screens (use it in the localStorage key).
  // paymentID: string;
  paymentInfo: string | null;
  checkoutItems: CheckoutItemInfo[];
}

export interface CheckoutModalInfoPlaid extends CheckoutModalInfoCommon {
  linkToken: string;
}

export type CheckoutModalInfo = CheckoutModalInfo3DS | CheckoutModalInfoPlaid;


// STATE:

export interface CheckoutModalStateCommon {
  receivedRedirectUri?: string;
  savedStateUsed: boolean;
  continueFlow: boolean;
}

export interface CheckoutModalState3DS extends CheckoutModalStateCommon, CheckoutModalInfo3DS {
  purchaseSuccess: boolean;
  purchaseError: boolean;
}

export type CheckoutModalStatePlaid = CheckoutModalStateCommon & CheckoutModalInfoPlaid;

