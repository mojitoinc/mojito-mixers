
import { useCallback, useEffect, useRef } from "react";
import { usePreparePaymentMethodQuery } from "../queries/graphqlGenerated";
import { PlaidLinkOnEvent, PlaidLinkOnExit, PlaidLinkOnSuccess, PlaidLinkOptions, usePlaidLink } from "react-plaid-link";
import { BillingInfo } from "../forms/BillingInfoForm";
import { PaymentMethod } from "../domain/payment/payment.interfaces";
import { isLocalhostOrStaging } from "../domain/url/url.utils";
import { clearPersistedInfo, getCheckoutModalState, isCheckoutModalInfoPlaid, persistCheckoutModalInfo, persistCheckoutModalInfoUsed } from "../components/public/CheckoutOverlay/CheckoutOverlay.utils";
import { CheckoutModalStatePlaid } from "../components/public/CheckoutOverlay/CheckoutOverlay.types";
import { FALLBACK_MODAL_STATE_COMMON } from "../components/public/CheckoutOverlay/CheckoutOverlay.constants";
import { ApolloError } from "@apollo/client";

export interface UsePlaidOptionsStartFlow {
  orgID: string;
  invoiceID: string;
  invoiceCountdownStart: number;
  selectedBillingInfo: string | BillingInfo;
  skip: boolean;
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
// automatically discard the saved data if it's invalid (`continueFlow && savedStateUsed`):
export let INITIAL_PLAID_OAUTH_FLOW_STATE = getCheckoutModalState({ noClear: true });

export function continuePlaidOAuthFlow() {
  return INITIAL_PLAID_OAUTH_FLOW_STATE.continueFlow && !INITIAL_PLAID_OAUTH_FLOW_STATE.savedInfoUsed && isCheckoutModalInfoPlaid(INITIAL_PLAID_OAUTH_FLOW_STATE);
}

export interface UsePlaidReturn {
  loading: boolean;
  error?: ApolloError;
  openLink: () => void;
  refetchLink: () => void;
}

export function usePlaid(options: UsePlaidOptions): UsePlaidReturn {
  let orgID: string | null = null;
  let invoiceID: string | null = null;
  let invoiceCountdownStart: number | null = null;
  let selectedBillingInfo: string | BillingInfo | null = null;
  let skip = false;
  let onSubmit: ((data?: PaymentMethod) => void) | null = null;

  if (isUsePlaidOptionsStartFlow(options)) {
    orgID = options.orgID;
    invoiceID = options.invoiceID;
    invoiceCountdownStart = options.invoiceCountdownStart;
    selectedBillingInfo = options.selectedBillingInfo;
    skip = options.skip || !orgID;
  } else if (isUsePlaidOptionsContinueFlow(options) ) {
    onSubmit = options.onSubmit;
    skip = true;
  }

  const plaidOAuthFlowStateRef = useRef<CheckoutModalStatePlaid>(INITIAL_PLAID_OAUTH_FLOW_STATE);

  const {
    linkToken: savedLinkToken,
    receivedRedirectUri,
    continueFlow,
  } = plaidOAuthFlowStateRef.current || {};

  const {
    loading: isPreparePaymentMethodLoading,
    error: preparePaymentMethodError,
    data: preparePaymentMethodData,
    refetch: refetchLink,
  } = usePreparePaymentMethodQuery({
    variables: { orgID },
    skip,
  });

  useEffect(() => {
    if (!isLocalhostOrStaging()) return;

    if (isPreparePaymentMethodLoading) {
      console.log("🏦 Loading Plaid Link...");
    } else if (preparePaymentMethodError) {
      console.log("🏚️ Plaid Link Error: ", preparePaymentMethodError);
    }
  }, [isPreparePaymentMethodLoading, preparePaymentMethodError])

  const linkToken = (continueFlow ? savedLinkToken : preparePaymentMethodData?.preparePaymentMethod?.linkToken) || "";

  const onSuccess = useCallback<PlaidLinkOnSuccess>((public_token, metadata) => {
    // Reset in case purchase fails and we need to try again:
    clearPersistedInfo();

    plaidOAuthFlowStateRef.current = INITIAL_PLAID_OAUTH_FLOW_STATE = FALLBACK_MODAL_STATE_COMMON;

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
    clearPersistedInfo();

    plaidOAuthFlowStateRef.current = INITIAL_PLAID_OAUTH_FLOW_STATE = FALLBACK_MODAL_STATE_COMMON;

    if (!onSubmit) return;

    // TODO: We could pass the error:
    onSubmit();
  }, [onSubmit]);

  const onEvent = useCallback<PlaidLinkOnEvent>((eventName) => {
    if (eventName !== "ERROR") return;

    // When an error happens in Plaid (can be simulated in the first screen of the test banks), users are given an option
    // to retry. When clicking it, an "ERROR" event will be triggered, and we need to use this to mark the persisted Plaid
    // OAuth state as not used so that it is not deleted when we come back from this new attempt:
    persistCheckoutModalInfoUsed(false);
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
    if (continueFlow && plaidLinkReady) {
      if (isLocalhostOrStaging()) console.log("Open plaid link automatically...");

      plaidLinkOpen();

      // If the user aborts the Plaid OAuth flow after it's been resumed (e.g. by not selecting an account), the
      // persisted data will remain in localStorage. However, we are marking it as used so that this flow is not resumed again:
      persistCheckoutModalInfoUsed();
    }
  }, [continueFlow, plaidLinkReady, plaidLinkOpen]);

  const openLink = useCallback(() => {
    if (!plaidLinkReady || isPreparePaymentMethodLoading || !orgID || !invoiceID || !invoiceCountdownStart || !selectedBillingInfo || !linkToken) return;

    if (isLocalhostOrStaging()) console.log("Open plain link manually", linkToken);

    persistCheckoutModalInfo({
      orgID,
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
    orgID,
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

export const PlaidFlow: React.FC<UsePlaidOptionsContinueFlow> = ({
  onSubmit,
}) => {
  usePlaid({ onSubmit });

  return null;
}
