import { urlToPathnameWhenPossible, getUrlWithoutParams } from '../url/url.utils.js';

const STORAGE_EXPIRATION_MS = 1000 * 60 * 5; // 15 minutes.
const PLAID_OAUTH_FLOW_INFO_KEY = "PLAID_OAUTH_FLOW_INFO";
const PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY = "PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY";
const PLAID_OAUTH_STATE_USED_KEY = "PLAID_OAUTH_STATE_USED_KEY";
const PLAID_OAUTH_FLOW_URL_SEARCH = "?oauth_state_id=";
const FALLBACK_PLAID_OAUTH_FLOW_STATE = {
    url: "",
    linkToken: "",
    selectedBillingInfo: "",
    continueOAuthFlow: false,
    savedStateUsed: false,
};
function persistPlaidInfo(info) {
    if (!process.browser)
        return;
    try {
        localStorage.setItem(PLAID_OAUTH_FLOW_INFO_KEY, JSON.stringify(Object.assign(Object.assign({}, info), { url: info.url || getUrlWithoutParams(), timestamp: info.timestamp || Date.now() })));
    }
    catch (err) {
    }
}
function persistPlaidReceivedRedirectUri(receivedRedirectUri) {
    localStorage.setItem(PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY, receivedRedirectUri);
}
function persistPlaidOAuthStateUsed(used = true) {
    localStorage.setItem(PLAID_OAUTH_STATE_USED_KEY, `${used}`);
}
function clearPlaidInfo(isExpired) {
    if (process.browser) {
        localStorage.removeItem(PLAID_OAUTH_FLOW_INFO_KEY);
        localStorage.removeItem(PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY);
        localStorage.removeItem(PLAID_OAUTH_STATE_USED_KEY);
    }
    return FALLBACK_PLAID_OAUTH_FLOW_STATE;
}
/*
export function persistedInfoCleanUp() {

}
*/
function isExpired(timestamp) {
    return timestamp !== undefined && Date.now() - timestamp > STORAGE_EXPIRATION_MS;
}
function getPlaidOAuthFlowState() {
    if (!process.browser) {
        return FALLBACK_PLAID_OAUTH_FLOW_STATE;
    }
    let savedPlaidInfo = {};
    let savedReceivedRedirectUri = "";
    let savedStateUsed = false;
    try {
        savedPlaidInfo = JSON.parse(localStorage.getItem(PLAID_OAUTH_FLOW_INFO_KEY) || "{}") || {};
        savedReceivedRedirectUri = localStorage.getItem(PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY) || "";
        savedStateUsed = localStorage.getItem(PLAID_OAUTH_STATE_USED_KEY) === "true" || false;
    }
    catch (err) {
    }
    const { url = "", linkToken = "", selectedBillingInfo = "", timestamp, } = savedPlaidInfo || {};
    const receivedRedirectUri = savedReceivedRedirectUri || (window.location.search.startsWith(PLAID_OAUTH_FLOW_URL_SEARCH) ? window.location.href : undefined);
    // const receivedRedirectUri = savedReceivedRedirectUri || window.location.href || "";
    // In dev, this works fine even if there's nothing in localStorage, which helps with testing across some other domain and localhost:
    const continueOAuthFlow = (process.env.NODE_ENV === "development" && window.location.hostname !== "localhost") ||
        !!(url && linkToken && selectedBillingInfo && receivedRedirectUri);
    if ((continueOAuthFlow && savedStateUsed) || (!continueOAuthFlow && localStorage.getItem(PLAID_OAUTH_FLOW_INFO_KEY)) || isExpired(timestamp)) {
        return clearPlaidInfo();
    }
    return {
        // The URL of the page where we initially opened the modal:
        url: urlToPathnameWhenPossible(url),
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

export { clearPlaidInfo, getPlaidOAuthFlowState, persistPlaidInfo, persistPlaidOAuthStateUsed, persistPlaidReceivedRedirectUri };
//# sourceMappingURL=plaid.utils.js.map
