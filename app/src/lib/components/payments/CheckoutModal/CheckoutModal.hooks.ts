
import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction, useState, useCallback } from "react";
import { SelectedPaymentMethod } from "./CheckoutModal";

export type CheckoutModalErrorAt = "loading" | "billing" | "payment" | "purchasing";

export interface CheckoutModalError {
  error: ApolloError | Error;
  errorMessage: string;
  at: CheckoutModalErrorAt;
}

export type CheckoutModalStep = "authentication" | "billing" | "payment" | "purchasing" | "confirmation";

export interface CheckoutModalState {
  checkoutStep: CheckoutModalStep;
  checkoutError?: CheckoutModalError;
}

export interface CheckoutModalStateReturn extends CheckoutModalState {
  // CheckoutModalState (+ inherited stuff):
  setCheckoutModalState: Dispatch<SetStateAction<CheckoutModalState>>;

  // SelectedPaymentMethod:
  selectedPaymentMethod: SelectedPaymentMethod;
  setSelectedPaymentMethod: Dispatch<SetStateAction<SelectedPaymentMethod>>;
}

export const CHECKOUT_STEPS: CheckoutModalStep[] = ["authentication", "billing", "payment", "purchasing", "confirmation"];

export function useCheckoutModalState(): CheckoutModalStateReturn {
  const [{
    checkoutStep,
    checkoutError,
  }, setCheckoutModalState] = useState<CheckoutModalState>({
    checkoutStep: 0,
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<SelectedPaymentMethod>({
    billingInfo: "",
    paymentInfo: "",
  });


  const startAt = !isAuthenticated || productConfirmationEnabled ? 0 : 1;

  const resetModalState = useCallback(() => {
    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();

    // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
    // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
    const { selectedBillingInfo, continueOAuthFlow, savedStateUsed } = INITIAL_PLAID_OAUTH_FLOW_STATE;

    setPaymentError("");
    setCheckoutStepIndex(continueOAuthFlow && !savedStateUsed ? 3 : startAt);
    setSelectedPaymentMethod({ billingInfo: selectedBillingInfo || "", paymentInfo: "" });
  }, [startAt]);

  const goBack = useCallback(() => {
    setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
      checkoutError,
      checkoutStep: CHECKOUT_STEPS[Math.max(CHECKOUT_STEPS.indexOf(checkoutStep) - 1, 0)],
    }));
  }, []);

  const goNext = useCallback(() => {
    setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
      checkoutError,
      checkoutStep: CHECKOUT_STEPS[Math.min(CHECKOUT_STEPS.indexOf(checkoutStep) + 1, CHECKOUT_STEPS.length - 1)],
    }));
  }, []);

  const goTo = useCallback((nextCheckoutStep: CheckoutModalStep) => {
    setCheckoutModalState((prevState) => ({ ...prevState, checkoutStep: nextCheckoutStep }));
  }, []);



  return {
    // CheckoutModalState:
    checkoutStep,
    checkoutError,
    setCheckoutModalState,

    // SelectedPaymentMethod:
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  };
}
