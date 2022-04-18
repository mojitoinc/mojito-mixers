'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var config = require('../../../config/config.js');
var url_utils = require('../../../domain/url/url.utils.js');
var storageUtils = require('../../../utils/storageUtils.js');
var CheckoutOverlay_constants = require('./CheckoutOverlay.constants.js');

const debug = url_utils.isLocalhostOrStaging();
function persistCheckoutModalInfo(info) {
    var _a;
    if (!process.browser)
        return;
    try {
        // This key is shared for both 3DS and Plaid...:
        // TODO: But it should include the paymentID or lotID or something:
        storageUtils.cookieStorage.setItem(config.CHECKOUT_MODAL_INFO_KEY, Object.assign(Object.assign({}, info), { url: info.url || url_utils.getUrlWithoutParams(), fromLocalhost: (_a = info.fromLocalhost) !== null && _a !== void 0 ? _a : url_utils.isLocalhost() }), {
            // domain: "",
            // path: "",
            // secure: !isLocalhost(),
            // expires: { minutes: THREEDS_STORAGE_EXPIRATION_MIN },
            // TODO: Use PLAID_STORAGE_EXPIRATION_MS instead?
            expirationDate: new Date(Date.now() + config.THREEDS_STORAGE_EXPIRATION_MIN * 60000)
        });
    }
    catch (err) {
        if (debug)
            console.log(err);
    }
}
function persistCheckoutModalInfoRedirectURI(redirectUri) {
    storageUtils.cookieStorage.setItem(config.CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY, redirectUri);
}
function persistCheckoutModalInfoUsed(used = true) {
    storageUtils.cookieStorage.setItem(config.CHECKOUT_MODAL_INFO_USED_KEY, used);
}
function clearPersistedInfo() {
    if (debug)
        console.log(`💾 Clearing state...`);
    if (process.browser) {
        storageUtils.cookieStorage.removeItem(config.CHECKOUT_MODAL_INFO_KEY);
        storageUtils.cookieStorage.removeItem(config.CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY);
        storageUtils.cookieStorage.removeItem(config.CHECKOUT_MODAL_INFO_USED_KEY);
    }
}
function isInitiallyOpen() {
    return getCheckoutModalState(true).checkoutStep !== "";
}
function isCheckoutModalInfo3DS(checkoutModalInfo) {
    return !!checkoutModalInfo.paymentInfo && !!checkoutModalInfo.checkoutItems;
}
function isCheckoutModalInfoPlaid(checkoutModalInfo) {
    return !!checkoutModalInfo.linkToken;
}
function getCheckoutModalState(noClear) {
    let modalState = CheckoutOverlay_constants.FALLBACK_MODAL_STATE_COMMON;
    if (!process.browser)
        return modalState;
    let savedModalInfo = {};
    let savedReceivedRedirectUri = "";
    let savedInfoUsed = false;
    try {
        savedModalInfo = storageUtils.cookieStorage.getItem(config.CHECKOUT_MODAL_INFO_KEY) || {};
        savedReceivedRedirectUri = storageUtils.cookieStorage.getItem(config.CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY) || "";
        savedInfoUsed = storageUtils.cookieStorage.getItem(config.CHECKOUT_MODAL_INFO_USED_KEY) || false;
    }
    catch (err) {
        if (debug)
            console.log(err);
    }
    const { url = "", fromLocalhost = false, invoiceID = "", invoiceCountdownStart = -1, billingInfo = "", } = savedModalInfo;
    // Swap to test error flow:
    // const receivedRedirectUri = "localhost:3000/payments/error";
    const receivedRedirectUri = savedReceivedRedirectUri || window.location.href;
    // In dev, this works fine even if there's nothing in cookieStorage, which helps with testing across some other domain and localhost:
    let isValid = fromLocalhost || !!(url && invoiceID && billingInfo && receivedRedirectUri);
    if (isValid && !savedInfoUsed) {
        if (!noClear)
            clearPersistedInfo();
        const commonModalState = {
            // The URL of the page where we initially opened the modal:
            url: url_utils.urlToPathnameWhenPossible(url || (fromLocalhost ? "http://localhost:3000" : "")),
            fromLocalhost,
            // The invoiceID we need to re-load the products and units:
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
            const { processorPaymentID, paymentID, paymentInfo, checkoutItems = [], } = savedModalInfo;
            isValid && (isValid = 
            // TODO: URL param (paymentID) should match stored one.
            window.location.search.startsWith(config.THREEDS_FLOW_SEARCH_PARAM_SUCCESS) &&
                processorPaymentID !== undefined &&
                paymentID !== undefined &&
                paymentInfo !== undefined &&
                checkoutItems.length > 0);
            if (isValid) {
                const purchaseError = receivedRedirectUri.includes("error") || receivedRedirectUri.includes("failure");
                const purchaseSuccess = !purchaseError && (receivedRedirectUri.includes("success") || receivedRedirectUri.includes(config.THREEDS_FLOW_SEARCH_PARAM_SUCCESS));
                modalState = Object.assign(Object.assign(Object.assign({}, CheckoutOverlay_constants.FALLBACK_MODAL_STATE_COMMON), commonModalState), { flowType: "3DS", checkoutStep: purchaseSuccess ? "confirmation" : "payment", 
                    // The reference number of the payment:
                    processorPaymentID,
                    paymentID,
                    // The payment info id selected before starting the 3DS flow:
                    paymentInfo,
                    // Item info to display in the confirmation view:
                    checkoutItems,
                    // 3DS status:
                    purchaseSuccess,
                    purchaseError });
            }
        }
        if (isCheckoutModalInfoPlaid(savedModalInfo)) {
            const { linkToken } = savedModalInfo;
            isValid && (isValid = window.location.search.startsWith(config.PLAID_OAUTH_FLOW_URL_SEARCH) &&
                !!linkToken);
            if (isValid) {
                modalState = Object.assign(Object.assign(Object.assign({}, CheckoutOverlay_constants.FALLBACK_MODAL_STATE_COMMON), commonModalState), { flowType: "Plaid", checkoutStep: "purchasing", 
                    // The Link token from the first Link initialization:
                    linkToken });
            }
        }
    }
    if ((isValid && savedInfoUsed) || (!isValid && storageUtils.cookieStorage.getItem(config.CHECKOUT_MODAL_INFO_KEY))) {
        if (debug)
            console.log("💾 Discard saved flow...", modalState);
        clearPersistedInfo();
    }
    else if (debug) {
        console.log("💾 Continue saved flow...", modalState);
    }
    return modalState;
}

exports.clearPersistedInfo = clearPersistedInfo;
exports.getCheckoutModalState = getCheckoutModalState;
exports.isCheckoutModalInfo3DS = isCheckoutModalInfo3DS;
exports.isCheckoutModalInfoPlaid = isCheckoutModalInfoPlaid;
exports.isInitiallyOpen = isInitiallyOpen;
exports.persistCheckoutModalInfo = persistCheckoutModalInfo;
exports.persistCheckoutModalInfoRedirectURI = persistCheckoutModalInfoRedirectURI;
exports.persistCheckoutModalInfoUsed = persistCheckoutModalInfoUsed;
//# sourceMappingURL=CheckoutOverlay.utils.js.map
