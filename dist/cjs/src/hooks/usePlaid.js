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
} // Load the initial OAuth flow state from localStorage to initialize the ref. Note `getPlaidOAuthFlowState` will
// automatically discard the saved data if it's invalid (`continueOAuthFlow && savedStateUsed`):

exports.INITIAL_PLAID_OAUTH_FLOW_STATE = plaid_utils.getPlaidOAuthFlowState();
function continuePlaidOAuthFlow() {
  return exports.INITIAL_PLAID_OAUTH_FLOW_STATE.continueOAuthFlow && !exports.INITIAL_PLAID_OAUTH_FLOW_STATE.savedStateUsed;
}
function usePlaid(options) {
  var _a;

  var selectedBillingInfo = isUsePlaidOptionsStartFlow(options) ? options.selectedBillingInfo : null;
  var onSubmit = isUsePlaidOptionsContinueFlow(options) ? options.onSubmit : null;
  var plaidOAuthFlowStateRef = React.useRef(exports.INITIAL_PLAID_OAUTH_FLOW_STATE);

  var _b = plaidOAuthFlowStateRef.current || {},
      savedLinkToken = _b.linkToken,
      receivedRedirectUri = _b.receivedRedirectUri,
      continueOAuthFlow = _b.continueOAuthFlow;

  var _c = graphqlGenerated.usePreparePaymentMethodQuery({
    skip: continueOAuthFlow || onSubmit !== null
  }),
      isPreparePaymentMethodLoading = _c.loading,
      preparePaymentMethodError = _c.error,
      preparePaymentMethodData = _c.data;

  var linkToken = (continueOAuthFlow ? savedLinkToken : (_a = preparePaymentMethodData === null || preparePaymentMethodData === void 0 ? void 0 : preparePaymentMethodData.preparePaymentMethod) === null || _a === void 0 ? void 0 : _a.linkToken) || "";
  var onSuccess = React.useCallback(function (public_token, metadata) {
    // Reset in case purchase fails and we need to try again:
    plaidOAuthFlowStateRef.current = exports.INITIAL_PLAID_OAUTH_FLOW_STATE = plaid_utils.clearPlaidInfo();
    if (!onSubmit) return; // TODO: Verify this data:

    onSubmit({
      type: "ACH",
      accountId: metadata.accounts[0].id || metadata.account_id,
      publicToken: public_token
    });
  }, [onSubmit]);
  var onExit = React.useCallback(function (error) {
    // `onExit` will be called after `onSuccess`, but we don't want to do anything in that case unless there's an error:
    if (plaidOAuthFlowStateRef.current === exports.INITIAL_PLAID_OAUTH_FLOW_STATE && !error) return; // Reset in case purchase fails and we need to try again.

    plaidOAuthFlowStateRef.current = exports.INITIAL_PLAID_OAUTH_FLOW_STATE = plaid_utils.clearPlaidInfo();
    if (!onSubmit) return; // TODO: We could pass the error:

    onSubmit();
  }, [onSubmit]);
  var onEvent = React.useCallback(function (eventName) {
    if (eventName !== "ERROR") return; // When an error happens in Plaid (can be simulated in the first screen of the test banks), users are given an option
    // to retry. When clicking it, an "ERROR" event will be triggered, and we ned to use this to mark the persisted Plaid
    // OAuth state as not used so that it is not deleted when we come back from this new attempt:

    plaid_utils.persistPlaidOAuthStateUsed(false);
  }, []);
  var config = {
    env: "sandbox",
    token: linkToken,
    receivedRedirectUri: receivedRedirectUri,
    onSuccess: onSuccess,
    onExit: onExit,
    onEvent: onEvent
  };

  var _d = reactPlaidLink.usePlaidLink(config),
      plaidLinkOpen = _d.open,
      plaidLinkReady = _d.ready,
      plaidLinkError = _d.error;

  React.useEffect(function () {
    if ((preparePaymentMethodError || plaidLinkError) && onSubmit) onSubmit();
  }, [preparePaymentMethodError, plaidLinkError, onSubmit]);
  React.useEffect(function () {
    if (continueOAuthFlow && plaidLinkReady) {
      console.log("Open plaid link automatically...");
      plaidLinkOpen(); // If the user aborts the Plaid OAuth flow after it's been resumed (e.g. by not selecting an account), the
      // persisted data will remain in localStorage. However, we are marking it as used so that this flow is not resumed again:

      plaid_utils.persistPlaidOAuthStateUsed();
    }
  }, [continueOAuthFlow, plaidLinkReady, plaidLinkOpen]);
  var handlePlaidLinkClicked = React.useCallback(function () {
    // TODO: Handle errors properly:
    // TODO: This could be clicked before the link is ready:
    if (!plaidLinkReady || isPreparePaymentMethodLoading || !linkToken || !selectedBillingInfo) return;
    console.log("Open plain link manually", linkToken);
    plaid_utils.persistPlaidInfo({
      url: window.location.pathname,
      linkToken: linkToken,
      selectedBillingInfo: selectedBillingInfo
    });
    plaidLinkOpen();
  }, [plaidLinkReady, isPreparePaymentMethodLoading, linkToken, selectedBillingInfo, plaidLinkOpen]);
  return handlePlaidLinkClicked;
}
var PlaidFlow = function PlaidFlow(_a) {
  var onSubmit = _a.onSubmit;
  usePlaid({
    onSubmit: onSubmit
  });
  return null;
};

exports.PlaidFlow = PlaidFlow;
exports.continuePlaidOAuthFlow = continuePlaidOAuthFlow;
exports.isUsePlaidOptionsContinueFlow = isUsePlaidOptionsContinueFlow;
exports.isUsePlaidOptionsStartFlow = isUsePlaidOptionsStartFlow;
exports.usePlaid = usePlaid;
//# sourceMappingURL=usePlaid.js.map
