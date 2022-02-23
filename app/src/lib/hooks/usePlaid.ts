
import { useCallback, useEffect, useRef } from "react";
import { usePreparePaymentMethodQuery } from "../queries/graphqlGenerated";
import { PlaidLinkOnEvent, PlaidLinkOnExit, PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { clearPlaidInfo, getPlaidOAuthFlowState, persistPlaidInfo, persistPlaidOAuthStateUsed, PlaidOAuthFlowState } from "../domain/plaid/plaid.utils";
import { BillingInfo } from "../forms/BillingInfoForm";
import { PaymentMethod } from "../domain/payment/payment.interfaces";

export interface UsePlaidOptionsStartFlow {
  selectedBillingInfo: string | BillingInfo;
}

export interface UsePlaidOptionsContinueFlow {
  onSubmit: (data?: PaymentMethod) => void;
}

export type UsePlaidOptions = UsePlaidOptionsStartFlow | UsePlaidOptionsContinueFlow;

export function isUsePlaidOptionsStartFlow(options: UsePlaidOptions): options is UsePlaidOptionsStartFlow {
  return options.hasOwnProperty("selectedBillingInfo");
}

export function isUsePlaidOptionsContinueFlow(options: UsePlaidOptions): options is UsePlaidOptionsContinueFlow {
  return options.hasOwnProperty("onSubmit");
}

// Load the initial OAuth flow state from localStorage to initialize the ref. Note `getPlaidOAuthFlowState` will
// automatically discard the saved data if it's invalid (`continueOAuthFlow && savedStateUsed`):
export let INITIAL_PLAID_OAUTH_FLOW_STATE = getPlaidOAuthFlowState();

export function continuePlaidOAuthFlow() {
  return INITIAL_PLAID_OAUTH_FLOW_STATE.continueOAuthFlow && !INITIAL_PLAID_OAUTH_FLOW_STATE.savedStateUsed;;
}

export function usePlaid(options: UsePlaidOptions) {
  const selectedBillingInfo = isUsePlaidOptionsStartFlow(options) ? options.selectedBillingInfo : null;
  const onSubmit = isUsePlaidOptionsContinueFlow(options) ? options.onSubmit : null;
  const plaidOAuthFlowStateRef = useRef<PlaidOAuthFlowState>(INITIAL_PLAID_OAUTH_FLOW_STATE);

  const {
    linkToken: savedLinkToken,
    receivedRedirectUri,
    continueOAuthFlow,
  } = plaidOAuthFlowStateRef.current || {};

  const {
    loading: isPreparePaymentMethodLoading,
    error: preparePaymentMethodError,
    data: preparePaymentMethodData,
  } = usePreparePaymentMethodQuery({
    skip: continueOAuthFlow || onSubmit !== null,
  });

  const linkToken = (continueOAuthFlow ? savedLinkToken : preparePaymentMethodData?.preparePaymentMethod?.linkToken) || "";

  const onSuccess = useCallback<PlaidLinkOnSuccess>((public_token, metadata) => {
    // Reset in case purchase fails and we need to try again:
    plaidOAuthFlowStateRef.current = INITIAL_PLAID_OAUTH_FLOW_STATE = clearPlaidInfo();

    if (!onSubmit) return;

    // TODO: Verify this data:
    onSubmit({
      type: "ACH",
      accountId: metadata.accounts[0].id || (metadata as any).account_id,
      publicToken: public_token,
    });
  }, [onSubmit]);

  const onExit = useCallback<PlaidLinkOnExit>((error) => {
    // `onExit` will be called after `onSuccess`, but we don't want to do anything in that case unless there's an error:
    if (plaidOAuthFlowStateRef.current === INITIAL_PLAID_OAUTH_FLOW_STATE && !error) return;

    // Reset in case purchase fails and we need to try again.
    plaidOAuthFlowStateRef.current = INITIAL_PLAID_OAUTH_FLOW_STATE = clearPlaidInfo();

    if (!onSubmit) return;

    // TODO: We could pass the error:
    onSubmit();
  }, [onSubmit]);

  const onEvent = useCallback<PlaidLinkOnEvent>((eventName) => {
    if (eventName !== "ERROR") return;

    // When an error happens in Plaid (can be simulated in the first screen of the test banks), users are given an option
    // to retry. When clicking it, an "ERROR" event will be triggered, and we need to use this to mark the persisted Plaid
    // OAuth state as not used so that it is not deleted when we come back from this new attempt:
    persistPlaidOAuthStateUsed(false);
  }, []);

  const config: PlaidLinkOptions = {
    env: "sandbox", // TODO: Move to env variable and document the /oauth page
    token: linkToken,
    receivedRedirectUri,
    onSuccess,
    onExit,
    onEvent,
  };

  const {
    open: plaidLinkOpen,
    ready: plaidLinkReady,
    error: plaidLinkError,
  } = usePlaidLink(config);

  useEffect(() => {
    if ((preparePaymentMethodError || plaidLinkError) && onSubmit) onSubmit();
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
    if (!plaidLinkReady || isPreparePaymentMethodLoading || !linkToken || !selectedBillingInfo) return;

    console.log("Open plain link manually", linkToken);

    persistPlaidInfo({
      linkToken,
      selectedBillingInfo,
    });

    plaidLinkOpen();
  }, [plaidLinkReady, isPreparePaymentMethodLoading, linkToken, selectedBillingInfo, plaidLinkOpen]);

  return handlePlaidLinkClicked;
}

export const PlaidFlow: React.FC<UsePlaidOptionsContinueFlow> = ({
  onSubmit,
}) => {
  usePlaid({ onSubmit });

  return null;
}
