'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('../../config/config.js');
var url_utils = require('../url/url.utils.js');

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
        localStorage.setItem(config.PLAID_OAUTH_FLOW_INFO_KEY, JSON.stringify(Object.assign(Object.assign({}, info), { url: info.url || url_utils.getUrlWithoutParams(), timestamp: info.timestamp || Date.now() })));
    }
    catch (err) {
    }
}
function persistPlaidReceivedRedirectUri(receivedRedirectUri) {
    localStorage.setItem(config.PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY, receivedRedirectUri);
}
function persistPlaidOAuthStateUsed(used = true) {
    localStorage.setItem(config.PLAID_OAUTH_FLOW_STATE_USED_KEY, `${used}`);
}
function clearPlaidInfo(isExpired) {
    if (process.browser) {
        localStorage.removeItem(config.PLAID_OAUTH_FLOW_INFO_KEY);
        localStorage.removeItem(config.PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY);
        localStorage.removeItem(config.PLAID_OAUTH_FLOW_STATE_USED_KEY);
    }
    return FALLBACK_PLAID_OAUTH_FLOW_STATE;
}
/*
export function persistedInfoCleanUp() {

}
*/
function isExpired(timestamp) {
    return timestamp !== undefined && Date.now() - timestamp > config.PLAID_STORAGE_EXPIRATION_MS;
}
function getPlaidOAuthFlowState() {
    if (!process.browser) {
        return FALLBACK_PLAID_OAUTH_FLOW_STATE;
    }
    let savedPlaidInfo = {};
    let savedReceivedRedirectUri = "";
    let savedStateUsed = false;
    try {
        savedPlaidInfo = JSON.parse(localStorage.getItem(config.PLAID_OAUTH_FLOW_INFO_KEY) || "{}") || {};
        savedReceivedRedirectUri = localStorage.getItem(config.PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY) || "";
        savedStateUsed = localStorage.getItem(config.PLAID_OAUTH_FLOW_STATE_USED_KEY) === "true" || false;
    }
    catch (err) {
    }
    const { url = "", linkToken = "", selectedBillingInfo = "", timestamp, } = savedPlaidInfo || {};
    const receivedRedirectUri = savedReceivedRedirectUri || (window.location.search.startsWith(config.PLAID_OAUTH_FLOW_URL_SEARCH) ? window.location.href : undefined);
    // const receivedRedirectUri = savedReceivedRedirectUri || window.location.href || "";
    // In dev, this works fine even if there's nothing in localStorage, which helps with testing across some other domain and localhost:
    const hasLocalhostOrigin = process.env.NODE_ENV === "development" && !url_utils.isLocalhost();
    const continueOAuthFlow = hasLocalhostOrigin || !!(url && linkToken && selectedBillingInfo && receivedRedirectUri);
    if ((continueOAuthFlow && savedStateUsed) || (!continueOAuthFlow && localStorage.getItem(config.PLAID_OAUTH_FLOW_INFO_KEY)) || isExpired(timestamp)) {
        return clearPlaidInfo();
    }
    return {
        // The URL of the page where we initially opened the modal:
        url: url_utils.urlToPathnameWhenPossible(url || (hasLocalhostOrigin ? "http://localhost:3000" : "")),
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

exports.clearPlaidInfo = clearPlaidInfo;
exports.getPlaidOAuthFlowState = getPlaidOAuthFlowState;
exports.persistPlaidInfo = persistPlaidInfo;
exports.persistPlaidOAuthStateUsed = persistPlaidOAuthStateUsed;
exports.persistPlaidReceivedRedirectUri = persistPlaidReceivedRedirectUri;
//# sourceMappingURL=plaid.utils.js.map
