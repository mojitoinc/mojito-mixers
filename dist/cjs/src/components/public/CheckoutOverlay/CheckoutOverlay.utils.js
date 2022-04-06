'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('../../../config/config.js');
var url_utils = require('../../../domain/url/url.utils.js');
var usePlaid = require('../../../hooks/usePlaid.js');

const debug = url_utils.isLocalhostOrStaging();
const FALLBACK_MODAL_STATE = {
    url: "",
    invoiceID: "",
    invoiceCountdownStart: 0,
    processorPaymentID: "",
    paymentID: "",
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
        if (debug)
            console.log(err);
    }
}
function persistReceivedRedirectUri3DS(receivedRedirectUri) {
    localStorage.setItem(config.THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY, receivedRedirectUri);
}
function clearPersistedInfo(isExpired) {
    if (debug)
        console.log(`💾 Clearing ${isExpired ? "expired " : ""}state (3DS)...`);
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
function isInitiallyOpen() {
    return continueFlows(true).checkoutStep !== "";
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
        if (debug)
            console.log(err);
    }
    const { url = "", invoiceID = "", invoiceCountdownStart = -1, processorPaymentID = "", paymentID = "", billingInfo = "", paymentInfo = "", timestamp, } = savedPlaidInfo || {};
    // Swap to test error flow:
    // const receivedRedirectUri = "localhost:3000/payments/error";
    const receivedRedirectUri = savedReceivedRedirectUri || (window.location.search.startsWith(config.THREEDS_FLOW_SEARCH_PARAM_SUCCESS) ? window.location.href : undefined);
    // In dev, this works fine even if there's nothing in localStorage, which helps with testing across some other domain and localhost:
    const hasLocalhostOrigin = process.env.NODE_ENV === "development" && !url_utils.isLocalhost();
    const continue3DSFlow = hasLocalhostOrigin || !!(url && invoiceID && processorPaymentID && paymentID && billingInfo && (paymentInfo || paymentInfo === null) && receivedRedirectUri);
    if ((continue3DSFlow && savedStateUsed) || (!continue3DSFlow && localStorage.getItem(config.THREEDS_FLOW_INFO_KEY)) || isExpired(timestamp)) {
        return clearPersistedInfo(isExpired(timestamp));
    }
    return {
        // The URL of the page where we initially opened the modal:
        url: url_utils.urlToPathnameWhenPossible(url || (hasLocalhostOrigin ? "http://localhost:3000" : "")),
        // The invoiceID we need to re-load the products and units:
        invoiceID,
        invoiceCountdownStart: invoiceCountdownStart === -1 ? Date.now() : invoiceCountdownStart,
        // The reference number of the payment:
        processorPaymentID,
        paymentID,
        // The billing & payment info selected / entered before starting the 3DS flow:
        billingInfo,
        paymentInfo,
        // The redirect URI with params:
        receivedRedirectUri,
        // Whether we need to resume the 3DS flow and show the confirmation or error screens:
        continue3DSFlow,
        purchaseSuccess: continue3DSFlow && !!receivedRedirectUri && (receivedRedirectUri.includes("success") || receivedRedirectUri.includes(config.THREEDS_FLOW_SEARCH_PARAM_SUCCESS)),
        purchaseError: continue3DSFlow && !!receivedRedirectUri && (receivedRedirectUri.includes("error") || receivedRedirectUri.includes("failure")),
        // Wether we already tried to resume the previous OAuth flow:
        savedStateUsed,
    };
}
function continueCheckout(noClear = false) {
    const savedCheckoutModalState = getCheckoutModalState();
    const { continue3DSFlow } = savedCheckoutModalState;
    if (continue3DSFlow) {
        if (debug)
            console.log("💾 Continue 3DS Flow...", savedCheckoutModalState);
        if (!noClear)
            clearPersistedInfo();
    }
    return [continue3DSFlow, savedCheckoutModalState];
}
function continueFlows(noClear = false) {
    const [continue3DSFlow, savedCheckoutModalState] = continueCheckout(noClear);
    const continueOAuthFlow = usePlaid.continuePlaidOAuthFlow();
    const continueFlowsReturn = {
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
        }
        else {
            // By the time we come back from 3DS' error page to the Payment UI, we have already seen the error, so we go
            // straight to the PaymentView to review the payment information:
            continueFlowsReturn.checkoutStep = "payment";
        }
        continueFlowsReturn.flowType = "3DS";
        continueFlowsReturn.invoiceID = savedCheckoutModalState.invoiceID;
        continueFlowsReturn.invoiceCountdownStart = savedCheckoutModalState.invoiceCountdownStart === -1 ? Date.now() : savedCheckoutModalState.invoiceCountdownStart;
        continueFlowsReturn.processorPaymentID = savedCheckoutModalState.processorPaymentID;
        continueFlowsReturn.paymentID = savedCheckoutModalState.paymentID;
        continueFlowsReturn.billingInfo = savedCheckoutModalState.billingInfo;
        continueFlowsReturn.paymentInfo = savedCheckoutModalState.paymentInfo;
    }
    else if (continueOAuthFlow) {
        if (debug)
            console.log("💾 Continue Plaid OAuth Flow...", usePlaid.INITIAL_PLAID_OAUTH_FLOW_STATE);
        continueFlowsReturn.flowType = "Plaid";
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
exports.isInitiallyOpen = isInitiallyOpen;
exports.persistCheckoutModalInfo = persistCheckoutModalInfo;
exports.persistReceivedRedirectUri3DS = persistReceivedRedirectUri3DS;
//# sourceMappingURL=CheckoutOverlay.utils.js.map
