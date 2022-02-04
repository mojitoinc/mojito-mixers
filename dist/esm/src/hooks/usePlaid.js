import { useRef, useCallback, useEffect } from 'react';
import { usePreparePaymentMethodQuery } from '../queries/graphqlGenerated.js';
import { usePlaidLink } from 'react-plaid-link';
import { getPlaidOAuthFlowState, clearPlaidInfo, persistPlaidOAuthStateUsed, persistPlaidInfo } from '../domain/plaid/plaid.utils.js';

function isUsePlaidOptionsStartFlow(options) {
    return options.hasOwnProperty("selectedBillingInfo");
}
function isUsePlaidOptionsContinueFlow(options) {
    return options.hasOwnProperty("onSubmit");
}
// Load the initial OAuth flow state from localStorage to initialize the ref. Note `getPlaidOAuthFlowState` will
// automatically discard the saved data if it's invalid (`continueOAuthFlow && savedStateUsed`):
var INITIAL_PLAID_OAUTH_FLOW_STATE = getPlaidOAuthFlowState();
function continuePlaidOAuthFlow() {
    return INITIAL_PLAID_OAUTH_FLOW_STATE.continueOAuthFlow && !INITIAL_PLAID_OAUTH_FLOW_STATE.savedStateUsed;
}
function usePlaid(options) {
    var _a;
    var selectedBillingInfo = isUsePlaidOptionsStartFlow(options) ? options.selectedBillingInfo : null;
    var onSubmit = isUsePlaidOptionsContinueFlow(options) ? options.onSubmit : null;
    var plaidOAuthFlowStateRef = useRef(INITIAL_PLAID_OAUTH_FLOW_STATE);
    var _b = plaidOAuthFlowStateRef.current || {}, savedLinkToken = _b.linkToken, receivedRedirectUri = _b.receivedRedirectUri, continueOAuthFlow = _b.continueOAuthFlow;
    var _c = usePreparePaymentMethodQuery({
        skip: continueOAuthFlow || onSubmit !== null,
    }), isPreparePaymentMethodLoading = _c.loading, preparePaymentMethodError = _c.error, preparePaymentMethodData = _c.data;
    var linkToken = (continueOAuthFlow ? savedLinkToken : (_a = preparePaymentMethodData === null || preparePaymentMethodData === void 0 ? void 0 : preparePaymentMethodData.preparePaymentMethod) === null || _a === void 0 ? void 0 : _a.linkToken) || "";
    var onSuccess = useCallback(function (public_token, metadata) {
        // Reset in case purchase fails and we need to try again:
        plaidOAuthFlowStateRef.current = INITIAL_PLAID_OAUTH_FLOW_STATE = clearPlaidInfo();
        if (!onSubmit)
            return;
        // TODO: Verify this data:
        onSubmit({
            type: "ACH",
            accountId: metadata.accounts[0].id || metadata.account_id,
            publicToken: public_token,
        });
    }, [onSubmit]);
    var onExit = useCallback(function (error) {
        // `onExit` will be called after `onSuccess`, but we don't want to do anything in that case unless there's an error:
        if (plaidOAuthFlowStateRef.current === INITIAL_PLAID_OAUTH_FLOW_STATE && !error)
            return;
        // Reset in case purchase fails and we need to try again.
        plaidOAuthFlowStateRef.current = INITIAL_PLAID_OAUTH_FLOW_STATE = clearPlaidInfo();
        if (!onSubmit)
            return;
        // TODO: We could pass the error:
        onSubmit();
    }, [onSubmit]);
    var onEvent = useCallback(function (eventName) {
        if (eventName !== "ERROR")
            return;
        // When an error happens in Plaid (can be simulated in the first screen of the test banks), users are given an option
        // to retry. When clicking it, an "ERROR" event will be triggered, and we ned to use this to mark the persisted Plaid
        // OAuth state as not used so that it is not deleted when we come back from this new attempt:
        persistPlaidOAuthStateUsed(false);
    }, []);
    var config = {
        env: "sandbox",
        token: linkToken,
        receivedRedirectUri: receivedRedirectUri,
        onSuccess: onSuccess,
        onExit: onExit,
        onEvent: onEvent,
    };
    var _d = usePlaidLink(config), plaidLinkOpen = _d.open, plaidLinkReady = _d.ready, plaidLinkError = _d.error;
    useEffect(function () {
        if ((preparePaymentMethodError || plaidLinkError) && onSubmit)
            onSubmit();
    }, [preparePaymentMethodError, plaidLinkError, onSubmit]);
    useEffect(function () {
        if (continueOAuthFlow && plaidLinkReady) {
            console.log("Open plaid link automatically...");
            plaidLinkOpen();
            // If the user aborts the Plaid OAuth flow after it's been resumed (e.g. by not selecting an account), the
            // persisted data will remain in localStorage. However, we are marking it as used so that this flow is not resumed again:
            persistPlaidOAuthStateUsed();
        }
    }, [continueOAuthFlow, plaidLinkReady, plaidLinkOpen]);
    var handlePlaidLinkClicked = useCallback(function () {
        // TODO: Handle errors properly:
        // TODO: This could be clicked before the link is ready:
        if (!plaidLinkReady || isPreparePaymentMethodLoading || !linkToken || !selectedBillingInfo)
            return;
        console.log("Open plain link manually", linkToken);
        persistPlaidInfo({
            url: window.location.pathname,
            linkToken: linkToken,
            selectedBillingInfo: selectedBillingInfo,
        });
        plaidLinkOpen();
    }, [plaidLinkReady, isPreparePaymentMethodLoading, linkToken, selectedBillingInfo, plaidLinkOpen]);
    return handlePlaidLinkClicked;
}
var PlaidFlow = function (_a) {
    var onSubmit = _a.onSubmit;
    usePlaid({ onSubmit: onSubmit });
    return null;
};

export { INITIAL_PLAID_OAUTH_FLOW_STATE, PlaidFlow, continuePlaidOAuthFlow, isUsePlaidOptionsContinueFlow, isUsePlaidOptionsStartFlow, usePlaid };
//# sourceMappingURL=usePlaid.js.map
