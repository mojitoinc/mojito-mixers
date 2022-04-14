import { CheckoutModalState3DS, CheckoutModalStatePlaid } from "./CheckoutOverlay.types";

export const FALLBACK_MODAL_STATE_3DS: CheckoutModalState3DS = {
  // CheckoutModalInfoCommon:
  // url: "",
  invoiceID: "",
  invoiceCountdownStart: 0,
  billingInfo: "",

  // CheckoutModalInfo3DS:
  // processorPaymentID: "",
  // paymentID: "",
  paymentInfo: "",
  checkoutItems: [],

  // CheckoutModalStateCommon:
  // receivedRedirectUri: "",
  savedStateUsed: false,
  continuePlaid: false,

  // CheckoutModalState3DS:
  purchaseSuccess: false,
  purchaseError: false,
};

export const FALLBACK_MODAL_STATE_PLAID: CheckoutModalStatePlaid = {
  // CheckoutModalInfoCommon:
  // url: "",
  invoiceID: "",
  invoiceCountdownStart: 0,
  billingInfo: "",

  // CheckoutModalInfoPlaid:
  linkToken: "",

  // CheckoutModalStateCommon:
  // receivedRedirectUri: "",
  savedStateUsed: false,
  continuePlaid: false,
};
