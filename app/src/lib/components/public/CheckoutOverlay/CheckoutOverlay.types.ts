import { CheckoutItemInfo } from "../../../domain/product/product.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { CheckoutModalStep } from "./CheckoutOverlay.hooks";

export type FlowType = "" | "3DS" | "Plaid" | "Coinbase";


// INFO:

export interface CheckoutModalInfoCommon {
  url?: string;
  fromLocalhost?: boolean;
  orgID: string;
  invoiceID: string;
  invoiceCountdownStart: number;
  billingInfo: string | BillingInfo;
}

export interface CheckoutModalInfo3DS extends CheckoutModalInfoCommon {
  processorPaymentID: string;
  paymentID: string;
  paymentInfo: string;
  checkoutItems: CheckoutItemInfo[];
}

export interface CheckoutModalInfoPlaid extends CheckoutModalInfoCommon {
  linkToken: string;
}

export type CheckoutModalInfo = CheckoutModalInfo3DS | CheckoutModalInfoPlaid;


// STATE:

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

export type CheckoutModalStatePlaid = CheckoutModalStateCommon & CheckoutModalInfoPlaid;

export type CheckoutModalStateCombined = CheckoutModalState3DS & CheckoutModalStatePlaid;
