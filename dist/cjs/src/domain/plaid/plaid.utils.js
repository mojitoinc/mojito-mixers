'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var PLAID_OAUTH_FLOW_INFO_KEY = "PLAID_OAUTH_FLOW_INFO";
var PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY = "PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY";
var PLAID_OAUTH_STATE_USED_KEY = "PLAID_OAUTH_STATE_USED_KEY";
var PLAID_OAUTH_FLOW_URL_SEARCH = "?oauth_state_id=";
function persistPlaidInfo(info) {
  if (!process.browser) return;

  try {
    localStorage.setItem(PLAID_OAUTH_FLOW_INFO_KEY, JSON.stringify(info));
  } catch (err) {
    console.log(err);
  }
}
function persistPlaidReceivedRedirectUri(receivedRedirectUri) {
  localStorage.setItem(PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY, receivedRedirectUri);
}
function persistPlaidOAuthStateUsed(used) {
  if (used === void 0) {
    used = true;
  }

  localStorage.setItem(PLAID_OAUTH_STATE_USED_KEY, "".concat(used));
}
function clearPlaidInfo() {
  if (process.browser) {
    localStorage.removeItem(PLAID_OAUTH_FLOW_INFO_KEY);
    localStorage.removeItem(PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY);
    localStorage.removeItem(PLAID_OAUTH_STATE_USED_KEY);
  }

  return FALLBACK_PLAID_OAUTH_FLOW_STATE;
}
var FALLBACK_PLAID_OAUTH_FLOW_STATE = {
  url: "",
  linkToken: "",
  selectedBillingInfo: "",
  continueOAuthFlow: false,
  savedStateUsed: false
};
function getPlaidOAuthFlowState() {
  if (!process.browser) {
    return FALLBACK_PLAID_OAUTH_FLOW_STATE;
  }

  var savedPlaidInfo = {};
  var savedReceivedRedirectUri = "";
  var savedStateUsed = false;

  try {
    savedPlaidInfo = JSON.parse(localStorage.getItem(PLAID_OAUTH_FLOW_INFO_KEY) || "{}") || {};
    savedReceivedRedirectUri = localStorage.getItem(PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY) || "";
    savedStateUsed = localStorage.getItem(PLAID_OAUTH_STATE_USED_KEY) === "true" || false;
  } catch (err) {
    console.log(err);
  }

  var _a = savedPlaidInfo || {},
      _b = _a.url,
      url = _b === void 0 ? "" : _b,
      _c = _a.linkToken,
      linkToken = _c === void 0 ? "" : _c,
      _d = _a.selectedBillingInfo,
      selectedBillingInfo = _d === void 0 ? "" : _d;

  var receivedRedirectUri = savedReceivedRedirectUri || (window.location.search.startsWith(PLAID_OAUTH_FLOW_URL_SEARCH) ? window.location.href : undefined); // const receivedRedirectUri = savedReceivedRedirectUri || window.location.href || "";

  var continueOAuthFlow = !!(url && linkToken && selectedBillingInfo && receivedRedirectUri);
  if (continueOAuthFlow && savedStateUsed || !continueOAuthFlow && savedPlaidInfo) return clearPlaidInfo();
  return {
    // The URL of the page where we initially opened the modal:
    url: url,
    // The Link token from the first Link initialization:
    linkToken: linkToken,
    // The billing info selected / entered before starting the Plaid OAuth flow:
    selectedBillingInfo: selectedBillingInfo,
    // The redirect URI with an OAuth state ID parameter:
    receivedRedirectUri: receivedRedirectUri,
    // Whether we need to continue the previous OAuth flow:
    continueOAuthFlow: continueOAuthFlow,
    // Wether we already tried to resume the previous OAuth flow:
    savedStateUsed: savedStateUsed
  };
}

exports.clearPlaidInfo = clearPlaidInfo;
exports.getPlaidOAuthFlowState = getPlaidOAuthFlowState;
exports.persistPlaidInfo = persistPlaidInfo;
exports.persistPlaidOAuthStateUsed = persistPlaidOAuthStateUsed;
exports.persistPlaidReceivedRedirectUri = persistPlaidReceivedRedirectUri;
//# sourceMappingURL=plaid.utils.js.map
