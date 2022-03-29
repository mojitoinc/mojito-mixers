import { useRef, useEffect, useCallback } from 'react';
import { usePreparePaymentMethodQuery } from '../queries/graphqlGenerated.js';
import { usePlaidLink } from 'react-plaid-link';
import { getPlaidOAuthFlowState, clearPlaidInfo, persistPlaidOAuthStateUsed, persistPlaidInfo } from '../domain/plaid/plaid.utils.js';
import { isLocalhostOrStaging } from '../domain/url/url.utils.js';

function isUsePlaidOptionsStartFlow(options) {
    return options.hasOwnProperty("selectedBillingInfo");
}
function isUsePlaidOptionsContinueFlow(options) {
    return options.hasOwnProperty("onSubmit");
}
// Load the initial OAuth flow state from localStorage to initialize the ref. Note `getPlaidOAuthFlowState` will
// automatically discard the saved data if it's invalid (`continueOAuthFlow && savedStateUsed`):
let INITIAL_PLAID_OAUTH_FLOW_STATE = getPlaidOAuthFlowState();
function continuePlaidOAuthFlow() {
    return INITIAL_PLAID_OAUTH_FLOW_STATE.continueOAuthFlow && !INITIAL_PLAID_OAUTH_FLOW_STATE.savedStateUsed;
}
function usePlaid(options) {
    var _a;
    const orgID = isUsePlaidOptionsStartFlow(options) ? options.orgID : null;
    const selectedBillingInfo = isUsePlaidOptionsStartFlow(options) ? options.selectedBillingInfo : null;
    const onSubmit = isUsePlaidOptionsContinueFlow(options) ? options.onSubmit : null;
    const plaidOAuthFlowStateRef = useRef(INITIAL_PLAID_OAUTH_FLOW_STATE);
    const { linkToken: savedLinkToken, receivedRedirectUri, continueOAuthFlow, } = plaidOAuthFlowStateRef.current || {};
    const { loading: isPreparePaymentMethodLoading, error: preparePaymentMethodError, data: preparePaymentMethodData, } = usePreparePaymentMethodQuery({
        variables: { orgID },
        skip: continueOAuthFlow || !!onSubmit || !orgID,
    });
    useEffect(() => {
        if (!isLocalhostOrStaging())
            return;
        if (isPreparePaymentMethodLoading) {
            console.log("🏦 Loading Plaid Link...");
        }
        else if (preparePaymentMethodError) {
            console.log("🏚️ Plaid Link Error: ", preparePaymentMethodError);
        }
    }, [isPreparePaymentMethodLoading, preparePaymentMethodError]);
    const linkToken = (continueOAuthFlow ? savedLinkToken : (_a = preparePaymentMethodData === null || preparePaymentMethodData === void 0 ? void 0 : preparePaymentMethodData.preparePaymentMethod) === null || _a === void 0 ? void 0 : _a.linkToken) || "";
    const onSuccess = useCallback((public_token, metadata) => {
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
    const onExit = useCallback((error) => {
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
    const onEvent = useCallback((eventName) => {
        if (eventName !== "ERROR")
            return;
        // When an error happens in Plaid (can be simulated in the first screen of the test banks), users are given an option
        // to retry. When clicking it, an "ERROR" event will be triggered, and we need to use this to mark the persisted Plaid
        // OAuth state as not used so that it is not deleted when we come back from this new attempt:
        persistPlaidOAuthStateUsed(false);
    }, []);
    const config = {
        env: "sandbox",
        token: linkToken,
        receivedRedirectUri,
        onSuccess,
        onExit,
        onEvent,
    };
    const { open: plaidLinkOpen, ready: plaidLinkReady, error: plaidLinkError, } = usePlaidLink(config);
    useEffect(() => {
        if ((preparePaymentMethodError || plaidLinkError) && onSubmit)
            onSubmit();
    }, [preparePaymentMethodError, plaidLinkError, onSubmit]);
    useEffect(() => {
        if (continueOAuthFlow && plaidLinkReady) {
            console.log("Open plaid link automatically...");
            plaidLinkOpen();
            // If the user aborts the Plaid OAuth flow after it's been resumed (e.g. by not selecting an account), the
            // persisted data will remain in localStorage. However, we are marking it as used so that this flow is not resumed again:
            persistPlaidOAuthStateUsed();
        }
    }, [continueOAuthFlow, plaidLinkReady, plaidLinkOpen]);
    const handlePlaidLinkClicked = useCallback(() => {
        // TODO: Handle errors properly:
        // TODO: This could be clicked before the link is ready:
        if (!plaidLinkReady || isPreparePaymentMethodLoading || !linkToken || !selectedBillingInfo)
            return;
        console.log("Open plain link manually", linkToken);
        persistPlaidInfo({
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

export { INITIAL_PLAID_OAUTH_FLOW_STATE, PlaidFlow, continuePlaidOAuthFlow, isUsePlaidOptionsContinueFlow, isUsePlaidOptionsStartFlow, usePlaid };
//# sourceMappingURL=usePlaid.js.map
