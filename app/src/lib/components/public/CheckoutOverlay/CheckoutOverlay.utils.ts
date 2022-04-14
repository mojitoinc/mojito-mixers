import { THREEDS_FLOW_INFO_KEY, THREEDS_FLOW_SEARCH_PARAM_SUCCESS, THREEDS_STORAGE_EXPIRATION_MIN, CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY, CHECKOUT_MODAL_INFO_USED_KEY, CHECKOUT_MODAL_INFO_KEY } from "../../../config/config";
import { getUrlWithoutParams, isLocalhost, isLocalhostOrStaging, urlToPathnameWhenPossible } from "../../../domain/url/url.utils";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { continuePlaidOAuthFlow, INITIAL_PLAID_OAUTH_FLOW_STATE } from "../../../hooks/usePlaid";
import { cookieStorage } from "../../../utils/storageUtils";
import { FALLBACK_MODAL_STATE_3DS, FALLBACK_MODAL_STATE_PLAID } from "./CheckoutOverlay.constants";
import { CheckoutModalStep } from "./CheckoutOverlay.hooks";
import { CheckoutModalInfo, CheckoutModalState3DS, CheckoutModalStatePlaid, FlowType } from "./CheckoutOverlay.types";

/*
  TODO:
  - Combine 3DS and Plaid logic here.
  - Persist product data.
  - For 3DS, load confirmation in /success and redirect once users clicks something.
  - For Plaid, maybe add a URL param or read cookies?

*/

const debug = isLocalhostOrStaging();

export function persistCheckoutModalInfo(info: CheckoutModalInfo) {
  if (!process.browser) return;

  try {
    // This key is shared for both 3DS and Plaid...:
    // TODO: But it should include the paymentID or lotID or something:
    cookieStorage.setItem(CHECKOUT_MODAL_INFO_KEY, {
      ...info,
      url: info.url || getUrlWithoutParams(),
    }, {
      // domain: "",
      // path: "",
      // secure: !isLocalhost(),
      // expires: { minutes: THREEDS_STORAGE_EXPIRATION_MIN },
      // TODO: Use PLAID_STORAGE_EXPIRATION_MS instead?
      expirationDate: new Date(Date.now() + THREEDS_STORAGE_EXPIRATION_MIN * 60000)
    });
  } catch (err) {
    if (debug) console.log(err);
  }
}

export function persistCheckoutModalInfoRedirectURI(redirectUri: string) {
  cookieStorage.setItem(CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY, redirectUri);
}

export function persistCheckoutModalInfoUsed(used = true) {
  cookieStorage.setItem(CHECKOUT_MODAL_INFO_USED_KEY, used);
}

export function clearPersistedInfo() {
  if (debug) console.log(`💾 Clearing state...`);

  if (process.browser) {
    cookieStorage.removeItem(CHECKOUT_MODAL_INFO_KEY);
    cookieStorage.removeItem(CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY);
    cookieStorage.removeItem(CHECKOUT_MODAL_INFO_USED_KEY);
  }
}

export function isInitiallyOpen() {
  return continueFlows(true).checkoutStep !== "";
}

export function getCheckoutModalState(flowType: "3DS"): CheckoutModalState3DS
export function getCheckoutModalState(flowType: "Plaid"): CheckoutModalStatePlaid
export function getCheckoutModalState(flowType: FlowType): CheckoutModalState3DS | CheckoutModalStatePlaid {
  const defaultModalState = flowType === "3DS" ? FALLBACK_MODAL_STATE_3DS : FALLBACK_MODAL_STATE_PLAID;

  if (!process.browser) return defaultModalState;

  let savedModalInfo: Partial<CheckoutModalState3DS> = {};
  let savedReceivedRedirectUri = "";
  let savedInfoUsed = false;

  try {
    savedModalInfo = cookieStorage.getItem(CHECKOUT_MODAL_INFO_KEY) || {};
    savedReceivedRedirectUri = cookieStorage.getItem(CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY) || "";
    savedInfoUsed = cookieStorage.getItem(CHECKOUT_MODAL_INFO_USED_KEY) || false;
  } catch (err) {
    if (debug) console.log(err);
  }

  const {
    url = "",
    invoiceID = "",
    invoiceCountdownStart = -1,
    // processorPaymentID = "",
    // paymentID = "",
    billingInfo = "",
    paymentInfo = "",
  } = savedModalInfo || {};

  // Swap to test error flow:
  // const receivedRedirectUri = "localhost:3000/payments/error";
  const receivedRedirectUri = savedReceivedRedirectUri || (window.location.search.startsWith(THREEDS_FLOW_SEARCH_PARAM_SUCCESS) ? window.location.href : undefined);

  // In dev, this works fine even if there's nothing in cookieStorage, which helps with testing across some other domain and localhost:
  const hasLocalhostOrigin = process.env.NODE_ENV === "development" && !isLocalhost();
  const continue3DSFlow = hasLocalhostOrigin || !!(url && invoiceID && processorPaymentID && paymentID && billingInfo && (paymentInfo || paymentInfo === null) && receivedRedirectUri);

  if ((continue3DSFlow && savedInfoUsed) || (!continue3DSFlow && cookieStorage.getItem(THREEDS_FLOW_INFO_KEY))) {
    clearPersistedInfo();


    // TODO: Or FALLBACK_PLAID_OAUTH_FLOW_STATE
    return FALLBACK_MODAL_STATE;
  }

  return {
    // The URL of the page where we initially opened the modal:
    url: urlToPathnameWhenPossible(url || (hasLocalhostOrigin ? "http://localhost:3000" : "")),

    // The invoiceID we need to re-load the products and units:
    invoiceID,
    invoiceCountdownStart: invoiceCountdownStart === -1 ? Date.now() : invoiceCountdownStart,

    // The reference number of the payment:
    // processorPaymentID,
    // paymentID,

    // The billing & payment info selected / entered before starting the 3DS flow:
    billingInfo,
    paymentInfo,

    // The redirect URI with params:
    receivedRedirectUri,

    // Whether we need to resume the 3DS flow and show the confirmation or error screens:
    continue3DSFlow,
    purchaseSuccess: continue3DSFlow && !!receivedRedirectUri && (receivedRedirectUri.includes("success") || receivedRedirectUri.includes(THREEDS_FLOW_SEARCH_PARAM_SUCCESS)),
    purchaseError: continue3DSFlow && !!receivedRedirectUri && (receivedRedirectUri.includes("error") || receivedRedirectUri.includes("failure")),

    // Wether we already tried to resume the previous OAuth flow:
    savedInfoUsed,
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
  flowType: FlowType;
  checkoutStep: CheckoutModalStep | "";
  invoiceID: string;
  invoiceCountdownStart: number;
  processorPaymentID: string;
  paymentID: string;
  billingInfo: string | BillingInfo;
  paymentInfo: string | null;
}

export function continueFlows(noClear = false) {
  const [continue3DSFlow, savedCheckoutModalState] = continueCheckout(noClear);
  const continueOAuthFlow = continuePlaidOAuthFlow();
  const continueFlowsReturn: ContinueFlowsReturn = {
    flowType: "",
    checkoutStep: "",
    invoiceID: "",
    invoiceCountdownStart: -1,
    processorPaymentID: "",
    paymentID: "",
    billingInfo: "",
    paymentInfo: "",
  };

  // Uncomment to test error flow:
  // savedCheckoutModalState.purchaseSuccess = false;
  // savedCheckoutModalState.purchaseError = true;

  if (continue3DSFlow) {
    if (savedCheckoutModalState.purchaseSuccess && !savedCheckoutModalState.purchaseError) {
      continueFlowsReturn.checkoutStep = "confirmation";
    } else {
      // By the time we come back from 3DS' error page to the Payment UI, we have already seen the error, so we go
      // straight to the PaymentView to review the payment information:
      continueFlowsReturn.checkoutStep = "payment";
    }

    continueFlowsReturn.flowType = "3DS";
    continueFlowsReturn.invoiceID = savedCheckoutModalState.invoiceID;
    continueFlowsReturn.invoiceCountdownStart = savedCheckoutModalState.invoiceCountdownStart === -1 ? Date.now() : savedCheckoutModalState.invoiceCountdownStart;
    // continueFlowsReturn.processorPaymentID = savedCheckoutModalState.processorPaymentID;
    // continueFlowsReturn.paymentID = savedCheckoutModalState.paymentID;
    continueFlowsReturn.billingInfo = savedCheckoutModalState.billingInfo;
    continueFlowsReturn.paymentInfo = savedCheckoutModalState.paymentInfo;
  } else if (continueOAuthFlow) {
    if (debug) console.log("💾 Continue Plaid OAuth Flow...", INITIAL_PLAID_OAUTH_FLOW_STATE);

    continueFlowsReturn.flowType = "Plaid";
    continueFlowsReturn.checkoutStep = "purchasing";
    continueFlowsReturn.billingInfo = INITIAL_PLAID_OAUTH_FLOW_STATE.selectedBillingInfo;
    // continueFlowsReturn.paymentInfo = INITIAL_PLAID_OAUTH_FLOW_STATE.paymentInfo;
  }

  return continueFlowsReturn;
}
