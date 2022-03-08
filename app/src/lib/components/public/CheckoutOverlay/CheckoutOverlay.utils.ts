import { THREEDS_FLOW_INFO_KEY, THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY, THREEDS_FLOW_STATE_USED_KEY, THREEDS_STORAGE_EXPIRATION_MS, THREEDS_FLOW_URL_SEARCH } from "../../../config/config";
import { ERROR_PURCHASE_3DS } from "../../../domain/errors/errors.constants";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { getUrlWithoutParams, urlToPathnameWhenPossible } from "../../../domain/url/url.utils";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { continuePlaidOAuthFlow, INITIAL_PLAID_OAUTH_FLOW_STATE } from "../../../hooks/usePlaid";
import { CheckoutModalError, CheckoutModalStep } from "./CheckoutOverlay.hooks";

const debug = false;

export interface CheckoutModalInfo {
  url?: string;
  invoiceID: string;
  circlePaymentID: string;
  paymentID: string;
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

const FALLBACK_MODAL_STATE: CheckoutModalState3DS = {
  url: "",
  invoiceID: "",
  circlePaymentID: "",
  paymentID: "",
  billingInfo: "",
  paymentInfo: "",
  continue3DSFlow: false,
  purchaseSuccess: false,
  purchaseError: false,
  savedStateUsed: false,
};

export function persistCheckoutModalInfo(info: CheckoutModalInfo) {
  if (!process.browser) return;

  try {
    localStorage.setItem(THREEDS_FLOW_INFO_KEY, JSON.stringify({
      ...info,
      url: info.url || getUrlWithoutParams(),
      timestamp: info.timestamp || Date.now(),
    }));
  } catch (err) {
    if (debug) console.log(err);
  }
}

export function persistReceivedRedirectUri3DS(receivedRedirectUri: string) {
  localStorage.setItem(THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY, receivedRedirectUri);
}

export function persistCheckoutModalInfoUsed(used = true) {
  localStorage.setItem(THREEDS_FLOW_STATE_USED_KEY, `${used}`);
}

export function clearPersistedInfo(isExpired?: boolean) {
  if (debug) console.log(`💾 Clearing ${isExpired ? "expired " : ""}state (3DS)...`);

  if (process.browser) {
    localStorage.removeItem(THREEDS_FLOW_INFO_KEY);
    localStorage.removeItem(THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY);
    localStorage.removeItem(THREEDS_FLOW_STATE_USED_KEY);
  }

  return FALLBACK_MODAL_STATE;
}

/*
export function persistedInfoCleanUp() {

}
*/

function isExpired(timestamp?: number) {
  return timestamp !== undefined && Date.now() - timestamp > THREEDS_STORAGE_EXPIRATION_MS;
}

export function getCheckoutModalState(): CheckoutModalState3DS {
  if (!process.browser) return FALLBACK_MODAL_STATE;

  let savedPlaidInfo: Partial<CheckoutModalState3DS> = {};
  let savedReceivedRedirectUri = "";
  let savedStateUsed = false;

  try {
    savedPlaidInfo = JSON.parse(localStorage.getItem(THREEDS_FLOW_INFO_KEY) || "{}") || {};
    savedReceivedRedirectUri = localStorage.getItem(THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY) || "";
    savedStateUsed = localStorage.getItem(THREEDS_FLOW_STATE_USED_KEY) === "true" || false;
  } catch (err) {
    if (debug) console.log(err);
  }

  const {
    url = "",
    invoiceID = "",
    circlePaymentID = "",
    paymentID = "",
    billingInfo = "",
    paymentInfo = "",
    timestamp,
  } = savedPlaidInfo || {};

  const receivedRedirectUri = savedReceivedRedirectUri || (window.location.search.startsWith(THREEDS_FLOW_URL_SEARCH) ? window.location.href : undefined);
  // const receivedRedirectUri = savedReceivedRedirectUri || window.location.href || "";

  // In dev, this works fine even if there's nothing in localStorage, which helps with testing across some other domain and localhost:
  const hasLocalhostOrigin = process.env.NODE_ENV === "development" && window.location.hostname !== "localhost";
  const continue3DSFlow = hasLocalhostOrigin || !!(url && invoiceID && circlePaymentID && paymentID && billingInfo && paymentInfo && receivedRedirectUri);

  if ((continue3DSFlow && savedStateUsed) || (!continue3DSFlow && localStorage.getItem(THREEDS_FLOW_INFO_KEY)) || isExpired(timestamp)) {
    return clearPersistedInfo(isExpired(timestamp));
  }

  return {
    // The URL of the page where we initially opened the modal:
    url: urlToPathnameWhenPossible(url || (hasLocalhostOrigin ? "http://localhost:3000" : "")),

    // The invoiceID we need to re-load the products and units:
    invoiceID,

    // The reference number of the payment:
    circlePaymentID,
    paymentID,

    // The billing & payment info selected / entered before starting the 3DS flow:
    billingInfo,
    paymentInfo,

    // The redirect URI with params:
    receivedRedirectUri,

    // Whether we need to resume the 3DS flow and show the confirmation or error screens:
    continue3DSFlow,
    purchaseSuccess: continue3DSFlow && !!receivedRedirectUri && (receivedRedirectUri.includes("success") || receivedRedirectUri.includes(THREEDS_FLOW_URL_SEARCH)),
    purchaseError: continue3DSFlow && !!receivedRedirectUri && receivedRedirectUri.includes("error"),

    // Wether we already tried to resume the previous OAuth flow:
    savedStateUsed,
  };
}

export function continueCheckout(noClear = false): [boolean, CheckoutModalState3DS] {
  const savedCheckoutModalState = getCheckoutModalState();
  const { continue3DSFlow } = savedCheckoutModalState;

  if (continue3DSFlow) {
    if (debug) console.log("💾 Continue 3DS Flow...", savedCheckoutModalState);

    if (!noClear) clearPersistedInfo();
  }

  return [continue3DSFlow, savedCheckoutModalState];
}

export interface ContinueFlowsReturn {
  checkoutStep: CheckoutModalStep | "";
  checkoutError?: CheckoutModalError;
  invoiceID: string;
  circlePaymentID: string;
  paymentID: string;
  billingInfo: string | BillingInfo;
  paymentInfo: string | PaymentMethod;
}

export function continueFlows(noClear = false) {
  const [continue3DSFlow, savedCheckoutModalState] = continueCheckout(noClear);
  const continueOAuthFlow = continuePlaidOAuthFlow();
  const continueFlowsReturn: ContinueFlowsReturn = {
    checkoutStep: "",
    invoiceID: "",
    circlePaymentID: "",
    paymentID: "",
    billingInfo: "",
    paymentInfo: "",
  };

  if (continue3DSFlow) {
    if (savedCheckoutModalState.purchaseSuccess) {
      continueFlowsReturn.checkoutStep = "confirmation";
    } else {
      continueFlowsReturn.checkoutStep = "error";
      continueFlowsReturn.checkoutError = ERROR_PURCHASE_3DS();
    }

    continueFlowsReturn.invoiceID = savedCheckoutModalState.invoiceID;
    continueFlowsReturn.circlePaymentID = savedCheckoutModalState.circlePaymentID;
    continueFlowsReturn.paymentID = savedCheckoutModalState.paymentID;
    continueFlowsReturn.billingInfo = savedCheckoutModalState.billingInfo;
    continueFlowsReturn.paymentInfo = savedCheckoutModalState.paymentInfo;
  } else if (continueOAuthFlow) {
    if (debug) console.log("💾 Continue Plaid OAuth Flow...", INITIAL_PLAID_OAUTH_FLOW_STATE);

    continueFlowsReturn.checkoutStep = "purchasing";
    continueFlowsReturn.billingInfo = INITIAL_PLAID_OAUTH_FLOW_STATE.selectedBillingInfo;
    // continueFlowsReturn.paymentInfo = INITIAL_PLAID_OAUTH_FLOW_STATE.paymentInfo;
  }

  return continueFlowsReturn;
}
