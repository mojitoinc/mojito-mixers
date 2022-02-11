'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var graphqlGenerated = require('../queries/graphqlGenerated.js');
var reactPlaidLink = require('react-plaid-link');
var plaid_utils = require('../domain/plaid/plaid.utils.js');

function isUsePlaidOptionsStartFlow(options) {
    return options.hasOwnProperty("selectedBillingInfo");
}
function isUsePlaidOptionsContinueFlow(options) {
    return options.hasOwnProperty("onSubmit");
}
// Load the initial OAuth flow state from localStorage to initialize the ref. Note `getPlaidOAuthFlowState` will
// automatically discard the saved data if it's invalid (`continueOAuthFlow && savedStateUsed`):
exports.INITIAL_PLAID_OAUTH_FLOW_STATE = plaid_utils.getPlaidOAuthFlowState();
function continuePlaidOAuthFlow() {
    return exports.INITIAL_PLAID_OAUTH_FLOW_STATE.continueOAuthFlow && !exports.INITIAL_PLAID_OAUTH_FLOW_STATE.savedStateUsed;
}
function usePlaid(options) {
    var _a;
    const selectedBillingInfo = isUsePlaidOptionsStartFlow(options) ? options.selectedBillingInfo : null;
    const onSubmit = isUsePlaidOptionsContinueFlow(options) ? options.onSubmit : null;
    const plaidOAuthFlowStateRef = React.useRef(exports.INITIAL_PLAID_OAUTH_FLOW_STATE);
    const { linkToken: savedLinkToken, receivedRedirectUri, continueOAuthFlow, } = plaidOAuthFlowStateRef.current || {};
    const { loading: isPreparePaymentMethodLoading, error: preparePaymentMethodError, data: preparePaymentMethodData, } = graphqlGenerated.usePreparePaymentMethodQuery({
        skip: continueOAuthFlow || onSubmit !== null,
    });
    const linkToken = (continueOAuthFlow ? savedLinkToken : (_a = preparePaymentMethodData === null || preparePaymentMethodData === void 0 ? void 0 : preparePaymentMethodData.preparePaymentMethod) === null || _a === void 0 ? void 0 : _a.linkToken) || "";
    const onSuccess = React.useCallback((public_token, metadata) => {
        // Reset in case purchase fails and we need to try again:
        plaidOAuthFlowStateRef.current = exports.INITIAL_PLAID_OAUTH_FLOW_STATE = plaid_utils.clearPlaidInfo();
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
        plaidOAuthFlowStateRef.current = exports.INITIAL_PLAID_OAUTH_FLOW_STATE = plaid_utils.clearPlaidInfo();
        if (!onSubmit)
            return;
        // TODO: We could pass the error:
        onSubmit();
    }, [onSubmit]);
    const onEvent = React.useCallback((eventName) => {
        if (eventName !== "ERROR")
            return;
        // When an error happens in Plaid (can be simulated in the first screen of the test banks), users are given an option
        // to retry. When clicking it, an "ERROR" event will be triggered, and we ned to use this to mark the persisted Plaid
        // OAuth state as not used so that it is not deleted when we come back from this new attempt:
        plaid_utils.persistPlaidOAuthStateUsed(false);
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
        if (continueOAuthFlow && plaidLinkReady) {
            console.log("Open plaid link automatically...");
            plaidLinkOpen();
            // If the user aborts the Plaid OAuth flow after it's been resumed (e.g. by not selecting an account), the
            // persisted data will remain in localStorage. However, we are marking it as used so that this flow is not resumed again:
            plaid_utils.persistPlaidOAuthStateUsed();
        }
    }, [continueOAuthFlow, plaidLinkReady, plaidLinkOpen]);
    const handlePlaidLinkClicked = React.useCallback(() => {
        // TODO: Handle errors properly:
        // TODO: This could be clicked before the link is ready:
        if (!plaidLinkReady || isPreparePaymentMethodLoading || !linkToken || !selectedBillingInfo)
            return;
        console.log("Open plain link manually", linkToken);
        plaid_utils.persistPlaidInfo({
            url: window.location.pathname,
            linkToken,
            selectedBillingInfo,
        });
        plaidLinkOpen();
    }, [plaidLinkReady, isPreparePaymentMethodLoading, linkToken, selectedBillingInfo, plaidLinkOpen]);
    return handlePlaidLinkClicked;
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
