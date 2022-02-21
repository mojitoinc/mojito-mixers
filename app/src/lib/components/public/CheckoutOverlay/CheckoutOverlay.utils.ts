import { ERROR_PURCHASE_3DS } from "../../../domain/errors/errors.constants";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { continuePlaidOAuthFlow, INITIAL_PLAID_OAUTH_FLOW_STATE } from "../../../hooks/usePlaid";
import { CheckoutModalError, CheckoutModalStep } from "./CheckoutOverlay.hooks";

const THREEDS_STORAGE_EXPIRATION_MS = 1000 * 60; // One minute.
const THREEDS_FLOW_INFO_KEY = "THREEDS_FLOW_INFO";
const THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY = "THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY";
const THREEDS_STATE_USED_KEY = "THREEDS_STATE_USED_KEY";
const THREEDS_FLOW_URL_SEARCH = "?paymentId=";

export interface CheckoutModalInfo {
  url: string;
  invoiceID: string; // TODO: Use this to load the products again.
  paymentReferenceNumber: string;
  billingInfo: string | BillingInfo;
  paymentInfo: string | PaymentMethod;
  timestamp?: number;
}

export interface CheckoutModalState3DS extends CheckoutModalInfo {
  receivedRedirectUri?: string;
  continue3DSFlow: boolean;
  purchaseSuccess: boolean;
  purchaseError: boolean;
  savedStateUsed: boolean;
}

const FALLBACK_PLAID_OAUTH_FLOW_STATE: CheckoutModalState3DS = {
  url: "",
  invoiceID: "",
  paymentReferenceNumber: "",
  billingInfo: "",
  paymentInfo: "",
  continue3DSFlow: false,
  purchaseSuccess: false,
  purchaseError: false,
  savedStateUsed: false,
};

export function persistCheckoutModalInfo(info: CheckoutModalInfo) {
  if (!process.browser) return;

  console.log("Storing state:", info);

  try {
    localStorage.setItem(THREEDS_FLOW_INFO_KEY, JSON.stringify({
      ...info,
      timestamp: info.timestamp || Date.now(),
    }));
  } catch (err) {
    console.log(err);
  }
}

export function persistReceivedRedirectUri3DS(receivedRedirectUri: string) {
  localStorage.setItem(THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY, receivedRedirectUri);
}

export function persistCheckoutModalInfoUsed(used = true) {
  localStorage.setItem(THREEDS_STATE_USED_KEY, `${ used }`);
}

export function clearPersistedInfo(isExpired?: boolean) {
  console.log(`Clearing ${ isExpired ? "expired " : "" }state (3DS)...`);

  if (process.browser) {
    localStorage.removeItem(THREEDS_FLOW_INFO_KEY);
    localStorage.removeItem(THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY);
    localStorage.removeItem(THREEDS_STATE_USED_KEY);
  }

  return FALLBACK_PLAID_OAUTH_FLOW_STATE;
}

/*
export function persistedInfoCleanUp() {

}
*/

function isExpired(timestamp?: number) {
  return timestamp !== undefined && Date.now() - timestamp > THREEDS_STORAGE_EXPIRATION_MS;
}

export function getCheckoutModalState(): CheckoutModalState3DS {
  if (!process.browser) {
    return FALLBACK_PLAID_OAUTH_FLOW_STATE;
  }

  let savedPlaidInfo: Partial<CheckoutModalState3DS> = {};
  let savedReceivedRedirectUri = "";
  let savedStateUsed = false;

  try {
    savedPlaidInfo = JSON.parse(localStorage.getItem(THREEDS_FLOW_INFO_KEY) || "{}") || {};
    savedReceivedRedirectUri = localStorage.getItem(THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY) || "";
    savedStateUsed = localStorage.getItem(THREEDS_STATE_USED_KEY) === "true" || false;
  } catch (err) {
    console.log(err);
  }

  const {
    url = "",
    invoiceID = "",
    paymentReferenceNumber = "",
    billingInfo = "",
    paymentInfo = "",
    timestamp,
  } = savedPlaidInfo || {};

  const receivedRedirectUri = savedReceivedRedirectUri || (window.location.search.startsWith(THREEDS_FLOW_URL_SEARCH) ? window.location.href : undefined);
  // const receivedRedirectUri = savedReceivedRedirectUri || window.location.href || "";

  const continue3DSFlow = !!(url && invoiceID && paymentReferenceNumber && billingInfo && paymentInfo && receivedRedirectUri);

  if ((continue3DSFlow && savedStateUsed) || (!continue3DSFlow && localStorage.getItem(THREEDS_FLOW_INFO_KEY)) || isExpired(timestamp)) {
    return clearPersistedInfo(isExpired(timestamp));
  }

  return {
    // The URL of the page where we initially opened the modal:
    url,

    // The invoiceID we need to re-load the products and units:
    invoiceID,

    // The reference number of the payment:
    paymentReferenceNumber,

    // The billing & payment info selected / entered before starting the 3DS flow:
    billingInfo,
    paymentInfo,

    // The redirect URI with params:
    receivedRedirectUri,

    // Whether we need to resume the 3DS flow and show the confirmation or error screens:
    continue3DSFlow,
    purchaseSuccess: continue3DSFlow && receivedRedirectUri && receivedRedirectUri.includes("success"),
    purchaseError: continue3DSFlow && receivedRedirectUri && receivedRedirectUri.includes("error"),

    // Wether we already tried to resume the previous OAuth flow:
    savedStateUsed,
  };
}

// if (process.browser) localStorage.setItem("THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY", "https://metaverse-staging.sothebys.com/payments/error?paymentId=408db30b-3a5b-44b1-96f1-a1e4aa8dac1e")

// Load the initial checkout modal state from localStorage to initialize the ref. Note `();` will
// automatically discard the saved data if it's invalid or expired:
// eslint-disable-next-line prefer-const
export let INITIAL_CHECKOUT_MODAL_STATE = getCheckoutModalState();

export function continueCheckout() {
  return INITIAL_CHECKOUT_MODAL_STATE.continue3DSFlow && !INITIAL_CHECKOUT_MODAL_STATE.savedStateUsed;;
}

export interface ContinueFlowsReturn {
  checkoutStep: CheckoutModalStep | "";
  checkoutError?: CheckoutModalError;
  billingInfo: string | BillingInfo;
  paymentInfo: string | PaymentMethod;
}

export function continueFlows() {
  const continue3DSFlow = continueCheckout();
  const continueOAuthFlow = continuePlaidOAuthFlow();
  const continueFlowsReturn: ContinueFlowsReturn = {
    checkoutStep: "",
    billingInfo: "",
    paymentInfo: "",
  };

  if (continue3DSFlow) {
    if (INITIAL_CHECKOUT_MODAL_STATE.purchaseSuccess) {
      continueFlowsReturn.checkoutStep = "confirmation";
    } else {
      continueFlowsReturn.checkoutStep = "error";
      continueFlowsReturn.checkoutError = ERROR_PURCHASE_3DS();
    }

    continueFlowsReturn.billingInfo = INITIAL_CHECKOUT_MODAL_STATE.billingInfo;
    continueFlowsReturn.paymentInfo = INITIAL_CHECKOUT_MODAL_STATE.paymentInfo;
  } else if (continueOAuthFlow) {
    continueFlowsReturn.checkoutStep = "purchasing";
    continueFlowsReturn.billingInfo = INITIAL_PLAID_OAUTH_FLOW_STATE.selectedBillingInfo;
    // continueFlowsReturn.paymentInfo = INITIAL_PLAID_OAUTH_FLOW_STATE.paymentInfo;
  }

  if (continue3DSFlow || continueOAuthFlow) console.log("Continue flows:", continueFlowsReturn);

  return continueFlowsReturn;
}
