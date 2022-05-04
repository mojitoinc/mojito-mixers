import { CheckoutModalStateCombined } from "./CheckoutOverlay.types";

export const FALLBACK_MODAL_STATE_COMMON: CheckoutModalStateCombined = {

  // CheckoutModalInfoCommon:
  url: "",
  fromLocalhost: false,
  orgID: "",
  invoiceID: "",
  invoiceCountdownStart: 0,
  billingInfo: "",

  // CheckoutModalStateCommon:
  flowType: "",
  checkoutStep: "",
  receivedRedirectUri: "",
  savedInfoUsed: false,
  continueFlow: false,

  // CheckoutModalInfo3DS:
  processorPaymentID: "",
  paymentID: "",
  paymentInfo: "",
  checkoutItems: [],

  // CheckoutModalState3DS:
  purchaseSuccess: false,
  purchaseError: false,

  // CheckoutModalInfoPlaid:
  linkToken: "",
};
