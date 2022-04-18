'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var graphqlGenerated = require('../queries/graphqlGenerated.js');
var reactPlaidLink = require('react-plaid-link');
var url_utils = require('../domain/url/url.utils.js');
var CheckoutOverlay_utils = require('../components/public/CheckoutOverlay/CheckoutOverlay.utils.js');
var CheckoutOverlay_constants = require('../components/public/CheckoutOverlay/CheckoutOverlay.constants.js');

function isUsePlaidOptionsStartFlow(options) {
    return options.hasOwnProperty("selectedBillingInfo");
}
function isUsePlaidOptionsContinueFlow(options) {
    return options.hasOwnProperty("onSubmit");
}
// Load the initial OAuth flow state from localStorage to initialize the ref. Note `getPlaidOAuthFlowState` will
// automatically discard the saved data if it's invalid (`continueFlow && savedStateUsed`):
exports.INITIAL_PLAID_OAUTH_FLOW_STATE = CheckoutOverlay_utils.getCheckoutModalState(true);
function continuePlaidOAuthFlow() {
    return exports.INITIAL_PLAID_OAUTH_FLOW_STATE.continueFlow && !exports.INITIAL_PLAID_OAUTH_FLOW_STATE.savedInfoUsed && CheckoutOverlay_utils.isCheckoutModalInfoPlaid(exports.INITIAL_PLAID_OAUTH_FLOW_STATE);
}
function usePlaid(options) {
    var _a;
    let orgID = null;
    let invoiceID = null;
    let invoiceCountdownStart = null;
    let selectedBillingInfo = null;
    let skip = false;
    let onSubmit = null;
    if (isUsePlaidOptionsStartFlow(options)) {
        orgID = options.orgID;
        invoiceID = options.invoiceID;
        invoiceCountdownStart = options.invoiceCountdownStart;
        selectedBillingInfo = options.selectedBillingInfo;
        skip = options.skip || !orgID;
    }
    else if (isUsePlaidOptionsContinueFlow(options)) {
        onSubmit = options.onSubmit;
        skip = true;
    }
    const plaidOAuthFlowStateRef = React.useRef(exports.INITIAL_PLAID_OAUTH_FLOW_STATE);
    const { linkToken: savedLinkToken, receivedRedirectUri, continueFlow, } = plaidOAuthFlowStateRef.current || {};
    const { loading: isPreparePaymentMethodLoading, error: preparePaymentMethodError, data: preparePaymentMethodData, refetch: refetchLink, } = graphqlGenerated.usePreparePaymentMethodQuery({
        variables: { orgID },
        skip,
    });
    React.useEffect(() => {
        if (!url_utils.isLocalhostOrStaging())
            return;
        if (isPreparePaymentMethodLoading) {
            console.log("🏦 Loading Plaid Link...");
        }
        else if (preparePaymentMethodError) {
            console.log("🏚️ Plaid Link Error: ", preparePaymentMethodError);
        }
    }, [isPreparePaymentMethodLoading, preparePaymentMethodError]);
    const linkToken = (continueFlow ? savedLinkToken : (_a = preparePaymentMethodData === null || preparePaymentMethodData === void 0 ? void 0 : preparePaymentMethodData.preparePaymentMethod) === null || _a === void 0 ? void 0 : _a.linkToken) || "";
    const onSuccess = React.useCallback((public_token, metadata) => {
        // Reset in case purchase fails and we need to try again:
        CheckoutOverlay_utils.clearPersistedInfo();
        plaidOAuthFlowStateRef.current = exports.INITIAL_PLAID_OAUTH_FLOW_STATE = CheckoutOverlay_constants.FALLBACK_MODAL_STATE_COMMON;
        if (!onSubmit)
            return;
        // TODO: Verify this data:
        onSubmit({
            type: "ACH",
            accountId: metadata.accounts[0].id || metadata.account_id,
            publicToken: public_token,
        });
    }, [onSubmit]);
    const onExit = React.useCallback((error) => {
        // `onExit` will be called after `onSuccess`, but we don't want to do anything in that case unless there's an error:
        if (plaidOAuthFlowStateRef.current === exports.INITIAL_PLAID_OAUTH_FLOW_STATE && !error)
            return;
        // Reset in case purchase fails and we need to try again.
        CheckoutOverlay_utils.clearPersistedInfo();
        plaidOAuthFlowStateRef.current = exports.INITIAL_PLAID_OAUTH_FLOW_STATE = CheckoutOverlay_constants.FALLBACK_MODAL_STATE_COMMON;
        if (!onSubmit)
            return;
        // TODO: We could pass the error:
        onSubmit();
    }, [onSubmit]);
    const onEvent = React.useCallback((eventName) => {
        if (eventName !== "ERROR")
            return;
        // When an error happens in Plaid (can be simulated in the first screen of the test banks), users are given an option
        // to retry. When clicking it, an "ERROR" event will be triggered, and we need to use this to mark the persisted Plaid
        // OAuth state as not used so that it is not deleted when we come back from this new attempt:
        CheckoutOverlay_utils.persistCheckoutModalInfoUsed(false);
    }, []);
    const config = {
        env: "sandbox",
        token: linkToken,
        receivedRedirectUri,
        onSuccess,
        onExit,
        onEvent,
    };
    const { open: plaidLinkOpen, ready: plaidLinkReady, error: plaidLinkError, } = reactPlaidLink.usePlaidLink(config);
    React.useEffect(() => {
        if ((preparePaymentMethodError || plaidLinkError) && onSubmit)
            onSubmit();
    }, [preparePaymentMethodError, plaidLinkError, onSubmit]);
    React.useEffect(() => {
        if (continueFlow && plaidLinkReady) {
            if (url_utils.isLocalhostOrStaging())
                console.log("Open plaid link automatically...");
            plaidLinkOpen();
            // If the user aborts the Plaid OAuth flow after it's been resumed (e.g. by not selecting an account), the
            // persisted data will remain in localStorage. However, we are marking it as used so that this flow is not resumed again:
            CheckoutOverlay_utils.persistCheckoutModalInfoUsed();
        }
    }, [continueFlow, plaidLinkReady, plaidLinkOpen]);
    const openLink = React.useCallback(() => {
        if (!plaidLinkReady || isPreparePaymentMethodLoading || !invoiceID || !invoiceCountdownStart || !selectedBillingInfo || !linkToken)
            return;
        if (url_utils.isLocalhostOrStaging())
            console.log("Open plain link manually", linkToken);
        CheckoutOverlay_utils.persistCheckoutModalInfo({
            invoiceID,
            invoiceCountdownStart,
            billingInfo: selectedBillingInfo,
            linkToken,
        });
        plaidLinkOpen();
    }, [
        plaidLinkReady,
        isPreparePaymentMethodLoading,
        linkToken,
        selectedBillingInfo,
        invoiceID,
        invoiceCountdownStart,
        plaidLinkOpen,
    ]);
    return {
        loading: isPreparePaymentMethodLoading,
        error: preparePaymentMethodError,
        openLink,
        refetchLink,
    };
}
const PlaidFlow = ({ onSubmit, }) => {
    usePlaid({ onSubmit });
    return null;
};

exports.PlaidFlow = PlaidFlow;
exports.continuePlaidOAuthFlow = continuePlaidOAuthFlow;
exports.isUsePlaidOptionsContinueFlow = isUsePlaidOptionsContinueFlow;
exports.isUsePlaidOptionsStartFlow = isUsePlaidOptionsStartFlow;
exports.usePlaid = usePlaid;
//# sourceMappingURL=usePlaid.js.map
