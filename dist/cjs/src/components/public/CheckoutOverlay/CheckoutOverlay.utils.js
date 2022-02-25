'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('../../../config/config.js');
var errors_constants = require('../../../domain/errors/errors.constants.js');
var url_utils = require('../../../domain/url/url.utils.js');
var usePlaid = require('../../../hooks/usePlaid.js');

const FALLBACK_MODAL_STATE = {
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
function persistCheckoutModalInfo(info) {
    if (!process.browser)
        return;
    try {
        localStorage.setItem(config.THREEDS_FLOW_INFO_KEY, JSON.stringify(Object.assign(Object.assign({}, info), { url: info.url || url_utils.getUrlWithoutParams(), timestamp: info.timestamp || Date.now() })));
    }
    catch (err) {
    }
}
function persistReceivedRedirectUri3DS(receivedRedirectUri) {
    localStorage.setItem(config.THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY, receivedRedirectUri);
}
function clearPersistedInfo(isExpired) {
    if (process.browser) {
        localStorage.removeItem(config.THREEDS_FLOW_INFO_KEY);
        localStorage.removeItem(config.THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY);
        localStorage.removeItem(config.THREEDS_FLOW_STATE_USED_KEY);
    }
    return FALLBACK_MODAL_STATE;
}
/*
export function persistedInfoCleanUp() {

}
*/
function isExpired(timestamp) {
    return timestamp !== undefined && Date.now() - timestamp > config.THREEDS_STORAGE_EXPIRATION_MS;
}
function getCheckoutModalState() {
    if (!process.browser)
        return FALLBACK_MODAL_STATE;
    let savedPlaidInfo = {};
    let savedReceivedRedirectUri = "";
    let savedStateUsed = false;
    try {
        savedPlaidInfo = JSON.parse(localStorage.getItem(config.THREEDS_FLOW_INFO_KEY) || "{}") || {};
        savedReceivedRedirectUri = localStorage.getItem(config.THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY) || "";
        savedStateUsed = localStorage.getItem(config.THREEDS_FLOW_STATE_USED_KEY) === "true" || false;
    }
    catch (err) {
    }
    const { url = "", invoiceID = "", paymentReferenceNumber = "", billingInfo = "", paymentInfo = "", timestamp, } = savedPlaidInfo || {};
    const receivedRedirectUri = savedReceivedRedirectUri || (window.location.search.startsWith(config.THREEDS_FLOW_URL_SEARCH) ? window.location.href : undefined);
    // const receivedRedirectUri = savedReceivedRedirectUri || window.location.href || "";
    // In dev, this works fine even if there's nothing in localStorage, which helps with testing across some other domain and localhost:
    const hasLocalhostOrigin = process.env.NODE_ENV === "development" && window.location.hostname !== "localhost";
    const continue3DSFlow = hasLocalhostOrigin || !!(url && invoiceID && paymentReferenceNumber && billingInfo && paymentInfo && receivedRedirectUri);
    if ((continue3DSFlow && savedStateUsed) || (!continue3DSFlow && localStorage.getItem(config.THREEDS_FLOW_INFO_KEY)) || isExpired(timestamp)) {
        return clearPersistedInfo();
    }
    return {
        // The URL of the page where we initially opened the modal:
        url: url_utils.urlToPathnameWhenPossible(url || (hasLocalhostOrigin ? "http://localhost:3000" : "")),
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
        purchaseSuccess: continue3DSFlow && !!receivedRedirectUri && (receivedRedirectUri.includes("success") || receivedRedirectUri.includes(config.THREEDS_FLOW_URL_SEARCH)),
        purchaseError: continue3DSFlow && !!receivedRedirectUri && receivedRedirectUri.includes("error"),
        // Wether we already tried to resume the previous OAuth flow:
        savedStateUsed,
    };
}
// if (process.browser) localStorage.setItem("THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY", "https://metaverse-staging.sothebys.com/payments/success?paymentId=408db30b-3a5b-44b1-96f1-a1e4aa8dac1e")
function continueCheckout(noClear = false) {
    const savedCheckoutModalState = getCheckoutModalState();
    const { continue3DSFlow } = savedCheckoutModalState;
    if (continue3DSFlow) {
        if (!noClear)
            clearPersistedInfo();
    }
    return [continue3DSFlow, savedCheckoutModalState];
}
function continueFlows(noClear = false) {
    const [continue3DSFlow, savedCheckoutModalState] = continueCheckout(noClear);
    const continueOAuthFlow = usePlaid.continuePlaidOAuthFlow();
    const continueFlowsReturn = {
        checkoutStep: "",
        invoiceID: "",
        billingInfo: "",
        paymentInfo: "",
        paymentReferenceNumber: "",
    };
    if (continue3DSFlow) {
        if (savedCheckoutModalState.purchaseSuccess) {
            continueFlowsReturn.checkoutStep = "confirmation";
        }
        else {
            continueFlowsReturn.checkoutStep = "error";
            continueFlowsReturn.checkoutError = errors_constants.ERROR_PURCHASE_3DS();
        }
        continueFlowsReturn.invoiceID = savedCheckoutModalState.invoiceID;
        continueFlowsReturn.billingInfo = savedCheckoutModalState.billingInfo;
        continueFlowsReturn.paymentInfo = savedCheckoutModalState.paymentInfo;
        continueFlowsReturn.paymentReferenceNumber = savedCheckoutModalState.paymentReferenceNumber;
    }
    else if (continueOAuthFlow) {
        continueFlowsReturn.checkoutStep = "purchasing";
        continueFlowsReturn.billingInfo = usePlaid.INITIAL_PLAID_OAUTH_FLOW_STATE.selectedBillingInfo;
        // continueFlowsReturn.paymentInfo = INITIAL_PLAID_OAUTH_FLOW_STATE.paymentInfo;
    }
    return continueFlowsReturn;
}

exports.clearPersistedInfo = clearPersistedInfo;
exports.continueCheckout = continueCheckout;
exports.continueFlows = continueFlows;
exports.getCheckoutModalState = getCheckoutModalState;
exports.persistCheckoutModalInfo = persistCheckoutModalInfo;
exports.persistReceivedRedirectUri3DS = persistReceivedRedirectUri3DS;
//# sourceMappingURL=CheckoutOverlay.utils.js.map
