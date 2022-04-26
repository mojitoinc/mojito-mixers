import { THREEDS_FLOW_SEARCH_PARAM_SUCCESS, THREEDS_STORAGE_EXPIRATION_MIN, CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY, CHECKOUT_MODAL_INFO_USED_KEY, CHECKOUT_MODAL_INFO_KEY, PLAID_OAUTH_FLOW_URL_SEARCH } from "../../../config/config";
import { getUrlWithoutParams, isLocalhost, isLocalhostOrStaging, urlToPathnameWhenPossible } from "../../../domain/url/url.utils";
import { cookieStorage } from "../../../utils/storageUtils";
import { FALLBACK_MODAL_STATE_COMMON } from "./CheckoutOverlay.constants";
import { CheckoutModalInfo, CheckoutModalInfo3DS, CheckoutModalInfoPlaid, CheckoutModalStateCombined, CheckoutModalStateCommon } from "./CheckoutOverlay.types";

const debug = isLocalhostOrStaging();

export function persistCheckoutModalInfo(info: CheckoutModalInfo) {
  if (!process.browser) return;

  try {
    // This key is shared for both 3DS and Plaid...:
    // TODO: But it should include the paymentID or lotID or something:
    cookieStorage.setItem(CHECKOUT_MODAL_INFO_KEY, {
      ...info,
      url: info.url || getUrlWithoutParams(),
      fromLocalhost: info.fromLocalhost ?? isLocalhost(),
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
  return getCheckoutModalState(true).checkoutStep !== "";
}

export function isCheckoutModalInfo3DS(checkoutModalInfo: Partial<CheckoutModalInfo3DS | CheckoutModalInfoPlaid>): checkoutModalInfo is CheckoutModalInfo3DS {
  return !!(checkoutModalInfo as any).paymentInfo && !!(checkoutModalInfo as any).checkoutItems;
}

export function isCheckoutModalInfoPlaid(checkoutModalInfo: Partial<CheckoutModalInfo3DS | CheckoutModalInfoPlaid>): checkoutModalInfo is CheckoutModalInfoPlaid {
  return !!(checkoutModalInfo as any).linkToken;
}

export function getCheckoutModalState(noClear?: boolean): CheckoutModalStateCombined {
  let modalState = FALLBACK_MODAL_STATE_COMMON;

  if (!process.browser) return modalState;

  let savedModalInfo: Partial<CheckoutModalInfo> = {};
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
    fromLocalhost = false,
    orgID = "",
    invoiceID = "",
    invoiceCountdownStart = -1,
    billingInfo = "",
  } = savedModalInfo;

  // Swap to test error flow:
  // const receivedRedirectUri = "localhost:3000/payments/error";
  const receivedRedirectUri = savedReceivedRedirectUri || window.location.href;

  // In dev, this works fine even if there's nothing in cookieStorage, which helps with testing across some other domain and localhost:
  let isValid = fromLocalhost || !!(url && orgID && invoiceID && billingInfo && receivedRedirectUri);

  if (isValid && !savedInfoUsed) {
    if (!noClear) clearPersistedInfo();

    const commonModalState: CheckoutModalStateCommon = {
      // The URL of the page where we initially opened the modal:
      url: urlToPathnameWhenPossible(url || (fromLocalhost ? "http://localhost:3000" : "")),
      fromLocalhost,

      // The orgID and invoiceID we need to re-load the products and units and resume the checkout:
      orgID,
      invoiceID,
      invoiceCountdownStart: invoiceCountdownStart === -1 ? Date.now() : invoiceCountdownStart,

      // The billing info selected / entered before starting the flow:
      billingInfo,

      // Where we left off:
      flowType: "",
      checkoutStep: "",

      // The redirect URI with params:
      receivedRedirectUri,

      // Wether we already tried to resume the previous OAuth flow:
      savedInfoUsed,

      // Whether we need to resume the 3DS flow and show the confirmation or error screens:
      continueFlow: true,
    };

    if (isCheckoutModalInfo3DS(savedModalInfo)) {
      const {
        processorPaymentID,
        paymentID,
        paymentInfo,
        checkoutItems = [],
      } = savedModalInfo;

      isValid &&=
        // TODO: URL param (paymentID) should match stored one.
        window.location.search.startsWith(THREEDS_FLOW_SEARCH_PARAM_SUCCESS) &&
        processorPaymentID !== undefined &&
        paymentID !== undefined &&
        paymentInfo !== undefined &&
        checkoutItems.length > 0;

      if (isValid) {
        const purchaseError = receivedRedirectUri.includes("error") || receivedRedirectUri.includes("failure");
        const purchaseSuccess = !purchaseError && (receivedRedirectUri.includes("success") || receivedRedirectUri.includes(THREEDS_FLOW_SEARCH_PARAM_SUCCESS));

        modalState = {
          ...FALLBACK_MODAL_STATE_COMMON,
          ...commonModalState,

          flowType: "3DS",
          checkoutStep: purchaseSuccess ? "confirmation" : "payment",

          // The reference number of the payment:
          processorPaymentID,
          paymentID,

          // The payment info id selected before starting the 3DS flow:
          paymentInfo,

          // Item info to display in the confirmation view:
          checkoutItems,

          // 3DS status:
          purchaseSuccess,
          purchaseError,
        };
      }
    }

    if (isCheckoutModalInfoPlaid(savedModalInfo)) {
      const {
        linkToken
      } = savedModalInfo;

      isValid &&=
        window.location.search.startsWith(PLAID_OAUTH_FLOW_URL_SEARCH) &&
        !!linkToken;

      if (isValid) {
        modalState = {
          ...FALLBACK_MODAL_STATE_COMMON,
          ...commonModalState,

          flowType: "Plaid",
          checkoutStep: "purchasing",

          // The Link token from the first Link initialization:
          linkToken,
        };
      }
    }
  }

  if ((isValid && savedInfoUsed) || (!isValid && cookieStorage.getItem(CHECKOUT_MODAL_INFO_KEY))) {
    if (debug) console.log("💾 Discard saved flow...", modalState);

    clearPersistedInfo();
  } else if (debug) {
    console.log("💾 Continue saved flow...", modalState);
  }

  return modalState;
}
