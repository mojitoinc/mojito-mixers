import { PLAID_OAUTH_FLOW_INFO_KEY, PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY, PLAID_OAUTH_FLOW_STATE_USED_KEY, PLAID_OAUTH_FLOW_URL_SEARCH } from "../../config/config";
import { isLocalhost, isLocalhostOrStaging, urlToPathnameWhenPossible } from "../url/url.utils";

const debug = isLocalhostOrStaging();

/*
export interface PlaidInfo {
  // TODO: Do we need to store product info?
  url?: string;
  linkToken: string;
  selectedBillingInfo: string | BillingInfo;
  timestamp?: number;
}

export interface PlaidOAuthFlowState extends PlaidInfo {
  receivedRedirectUri?: string;
  continueOAuthFlow: boolean;
  savedStateUsed: boolean;
}

const FALLBACK_PLAID_OAUTH_FLOW_STATE: PlaidOAuthFlowState = {
  url: "",
  linkToken: "",
  selectedBillingInfo: "",
  continueOAuthFlow: false,
  savedStateUsed: false,
};

export function persistPlaidInfo(info: PlaidInfo) {
  if (!process.browser) return;

  try {
    localStorage.setItem(PLAID_OAUTH_FLOW_INFO_KEY, JSON.stringify({
      ...info,
      url: info.url || getUrlWithoutParams(),
      timestamp: info.timestamp || Date.now(),
    }));
  } catch (err) {
    if (debug) console.log(err);
  }
}

export function persistPlaidReceivedRedirectUri(receivedRedirectUri: string) {
  localStorage.setItem(PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY, receivedRedirectUri);
}

export function persistPlaidOAuthStateUsed(used = true) {
  localStorage.setItem(PLAID_OAUTH_FLOW_STATE_USED_KEY, `${ used }`);
}

export function clearPlaidInfo(isExpired?: boolean) {
  if (debug) console.log(`💾 Clearing ${ isExpired ? "expired " : "" }state (Plaid)...`);

  if (process.browser) {
    localStorage.removeItem(PLAID_OAUTH_FLOW_INFO_KEY);
    localStorage.removeItem(PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY);
    localStorage.removeItem(PLAID_OAUTH_FLOW_STATE_USED_KEY);
  }

  return FALLBACK_PLAID_OAUTH_FLOW_STATE;
}

function isExpired(timestamp?: number) {
  return timestamp !== undefined && Date.now() - timestamp > PLAID_STORAGE_EXPIRATION_MS;
}
*/

export function getPlaidOAuthFlowState(): PlaidOAuthFlowState {
  if (!process.browser) {
    return FALLBACK_PLAID_OAUTH_FLOW_STATE;
  }

  let savedPlaidInfo: Partial<PlaidInfo> = {};
  let savedReceivedRedirectUri = "";
  let savedStateUsed = false;

  try {
    savedPlaidInfo = JSON.parse(localStorage.getItem(PLAID_OAUTH_FLOW_INFO_KEY) || "{}") || {};
    savedReceivedRedirectUri = localStorage.getItem(PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY) || "";
    savedStateUsed = localStorage.getItem(PLAID_OAUTH_FLOW_STATE_USED_KEY) === "true" || false;
  } catch (err) {
    if (debug) console.log(err);
  }

  const {
    url = "",
    linkToken = "",
    selectedBillingInfo = "",
    timestamp,
  } = savedPlaidInfo || {};

  const receivedRedirectUri = savedReceivedRedirectUri || (window.location.search.startsWith(PLAID_OAUTH_FLOW_URL_SEARCH) ? window.location.href : undefined);
  // const receivedRedirectUri = savedReceivedRedirectUri || window.location.href || "";

  // In dev, this works fine even if there's nothing in localStorage, which helps with testing across some other domain and localhost:
  const hasLocalhostOrigin = process.env.NODE_ENV === "development" && !isLocalhost();
  const continueOAuthFlow = hasLocalhostOrigin || !!(url && linkToken && selectedBillingInfo && receivedRedirectUri);

  if ((continueOAuthFlow && savedStateUsed) || (!continueOAuthFlow && localStorage.getItem(PLAID_OAUTH_FLOW_INFO_KEY)) || isExpired(timestamp)) {
    return clearPlaidInfo();
  }

  return {
    // The URL of the page where we initially opened the modal:
    url: urlToPathnameWhenPossible(url || (hasLocalhostOrigin ? "http://localhost:3000" : "")),

    // The Link token from the first Link initialization:
    linkToken,

    // The billing info selected / entered before starting the Plaid OAuth flow:
    selectedBillingInfo,

    // The redirect URI with an OAuth state ID parameter:
    receivedRedirectUri,

    // Whether we need to continue the previous OAuth flow:
    continueOAuthFlow,

    // Wether we already tried to resume the previous OAuth flow:
    savedStateUsed,
  };
}
