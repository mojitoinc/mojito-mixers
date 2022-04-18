import { CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY, CHECKOUT_MODAL_INFO_USED_KEY, CHECKOUT_MODAL_INFO_KEY, THREEDS_FLOW_SEARCH_PARAM_SUCCESS, PLAID_OAUTH_FLOW_URL_SEARCH, THREEDS_STORAGE_EXPIRATION_MIN } from '../../../config/config.js';
import { isLocalhostOrStaging, urlToPathnameWhenPossible, getUrlWithoutParams, isLocalhost } from '../../../domain/url/url.utils.js';
import { cookieStorage } from '../../../utils/storageUtils.js';
import { FALLBACK_MODAL_STATE_COMMON } from './CheckoutOverlay.constants.js';

const debug = isLocalhostOrStaging();
function persistCheckoutModalInfo(info) {
    var _a;
    if (!process.browser)
        return;
    try {
        // This key is shared for both 3DS and Plaid...:
        // TODO: But it should include the paymentID or lotID or something:
        cookieStorage.setItem(CHECKOUT_MODAL_INFO_KEY, Object.assign(Object.assign({}, info), { url: info.url || getUrlWithoutParams(), fromLocalhost: (_a = info.fromLocalhost) !== null && _a !== void 0 ? _a : isLocalhost() }), {
            // domain: "",
            // path: "",
            // secure: !isLocalhost(),
            // expires: { minutes: THREEDS_STORAGE_EXPIRATION_MIN },
            // TODO: Use PLAID_STORAGE_EXPIRATION_MS instead?
            expirationDate: new Date(Date.now() + THREEDS_STORAGE_EXPIRATION_MIN * 60000)
        });
    }
    catch (err) {
        if (debug)
            console.log(err);
    }
}
function persistCheckoutModalInfoRedirectURI(redirectUri) {
    cookieStorage.setItem(CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY, redirectUri);
}
function persistCheckoutModalInfoUsed(used = true) {
    cookieStorage.setItem(CHECKOUT_MODAL_INFO_USED_KEY, used);
}
function clearPersistedInfo() {
    if (debug)
        console.log(`💾 Clearing state...`);
    if (process.browser) {
        cookieStorage.removeItem(CHECKOUT_MODAL_INFO_KEY);
        cookieStorage.removeItem(CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY);
        cookieStorage.removeItem(CHECKOUT_MODAL_INFO_USED_KEY);
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
    let modalState = FALLBACK_MODAL_STATE_COMMON;
    if (!process.browser)
        return modalState;
    let savedModalInfo = {};
    let savedReceivedRedirectUri = "";
    let savedInfoUsed = false;
    try {
        savedModalInfo = cookieStorage.getItem(CHECKOUT_MODAL_INFO_KEY) || {};
        savedReceivedRedirectUri = cookieStorage.getItem(CHECKOUT_MODAL_INFO_REDIRECT_URI_KEY) || "";
        savedInfoUsed = cookieStorage.getItem(CHECKOUT_MODAL_INFO_USED_KEY) || false;
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
            url: urlToPathnameWhenPossible(url || (fromLocalhost ? "http://localhost:3000" : "")),
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
            window.location.search.startsWith(THREEDS_FLOW_SEARCH_PARAM_SUCCESS) &&
                processorPaymentID !== undefined &&
                paymentID !== undefined &&
                paymentInfo !== undefined &&
                checkoutItems.length > 0);
            if (isValid) {
                const purchaseError = receivedRedirectUri.includes("error") || receivedRedirectUri.includes("failure");
                const purchaseSuccess = !purchaseError && (receivedRedirectUri.includes("success") || receivedRedirectUri.includes(THREEDS_FLOW_SEARCH_PARAM_SUCCESS));
                modalState = Object.assign(Object.assign(Object.assign({}, FALLBACK_MODAL_STATE_COMMON), commonModalState), { flowType: "3DS", checkoutStep: purchaseSuccess ? "confirmation" : "payment", 
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
            isValid && (isValid = window.location.search.startsWith(PLAID_OAUTH_FLOW_URL_SEARCH) &&
                !!linkToken);
            if (isValid) {
                modalState = Object.assign(Object.assign(Object.assign({}, FALLBACK_MODAL_STATE_COMMON), commonModalState), { flowType: "Plaid", checkoutStep: "purchasing", 
                    // The Link token from the first Link initialization:
                    linkToken });
            }
        }
    }
    if ((isValid && savedInfoUsed) || (!isValid && cookieStorage.getItem(CHECKOUT_MODAL_INFO_KEY))) {
        if (debug)
            console.log("💾 Discard saved flow...", modalState);
        clearPersistedInfo();
    }
    else if (debug) {
        console.log("💾 Continue saved flow...", modalState);
    }
    return modalState;
}

export { clearPersistedInfo, getCheckoutModalState, isCheckoutModalInfo3DS, isCheckoutModalInfoPlaid, isInitiallyOpen, persistCheckoutModalInfo, persistCheckoutModalInfoRedirectURI, persistCheckoutModalInfoUsed };
//# sourceMappingURL=CheckoutOverlay.utils.js.map
