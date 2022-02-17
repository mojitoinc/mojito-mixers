
import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction, useState, useCallback } from "react";
import { CircleFieldErrors } from "../../../domain/circle/circle.utils";
import { ERROR_PURCHASE } from "../../../domain/errors/errors.constants";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { INITIAL_PLAID_OAUTH_FLOW_STATE } from "../../../hooks/usePlaid";
import { resetStepperProgress } from "../CheckoutStepper/CheckoutStepper";

export type CheckoutModalErrorAt = "authentication" | "billing" | "payment" | "purchasing";

export interface CheckoutModalError {
  at?: CheckoutModalErrorAt;
  error?: ApolloError | Error;
  circleFieldErrors?: CircleFieldErrors;
  errorMessage: string;
}

export type CheckoutModalStep = "authentication" | "billing" | "payment" | "purchasing" | "confirmation" | "error";

export interface CheckoutModalStateOptions {
  productConfirmationEnabled?: boolean;
  isAuthenticated?: boolean;
  onError?: (error: CheckoutModalError) => void;
}

export interface CheckoutModalState {
  checkoutStep: CheckoutModalStep;
  checkoutError?: CheckoutModalError;
}

export interface SelectedPaymentMethod {
  billingInfo: string | BillingInfo;
  paymentInfo: string | PaymentMethod;
  cvv: string;
}

export interface CheckoutModalStateReturn extends CheckoutModalState {
  // CheckoutModalState (+ inherited stuff):
  resetModalState: () => void;
  goBack: () => void;
  goNext: () => void;
  goTo: (checkoutStep: CheckoutModalStep, error?: null | string | CheckoutModalError) => void;
  setError: (error: null | string | CheckoutModalError) => void;

  // SelectedPaymentMethod:
  selectedPaymentMethod: SelectedPaymentMethod;
  setSelectedPaymentMethod: Dispatch<SetStateAction<SelectedPaymentMethod>>;
}

export const CHECKOUT_STEPS: CheckoutModalStep[] = ["authentication", "billing", "payment", "purchasing", "confirmation"];

export function useCheckoutModalState({
  productConfirmationEnabled,
  isAuthenticated,
  onError,
}: CheckoutModalStateOptions): CheckoutModalStateReturn {
  const startAt: CheckoutModalStep = !isAuthenticated || productConfirmationEnabled ? "authentication" : "billing";

  const [{
    checkoutStep,
    checkoutError,
  }, setCheckoutModalState] = useState<CheckoutModalState>({
    checkoutStep: startAt,
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<SelectedPaymentMethod>({
    billingInfo: "",
    paymentInfo: "",
    cvv: "",
  });

  const resetModalState = useCallback(() => {
    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();

    // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
    // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
    const { selectedBillingInfo, continueOAuthFlow, savedStateUsed } = INITIAL_PLAID_OAUTH_FLOW_STATE;

    setCheckoutModalState({ checkoutStep: continueOAuthFlow && !savedStateUsed ? "purchasing" : startAt });

    setSelectedPaymentMethod({
      billingInfo: selectedBillingInfo || "",
      paymentInfo: "",
      cvv: "",
    });
  }, [startAt]);

  const goBack = useCallback(() => {
    setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
      checkoutStep: CHECKOUT_STEPS[Math.max(CHECKOUT_STEPS.indexOf(checkoutStep) - 1, 0)],
      checkoutError,
    }));
  }, []);

  const goNext = useCallback(() => {
    setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
      checkoutStep: CHECKOUT_STEPS[Math.min(CHECKOUT_STEPS.indexOf(checkoutStep) + 1, CHECKOUT_STEPS.length - 1)],
      checkoutError,
    }));
  }, []);

  const goTo = useCallback((checkoutStep: CheckoutModalStep, error?: null | string | CheckoutModalError) => {
    setCheckoutModalState((prevCheckoutModalState) => {
      let checkoutError: CheckoutModalError | undefined;

      if (error === null) checkoutError = undefined;
      else if (!error) checkoutError = prevCheckoutModalState.checkoutError;
      else if (typeof error === "string") checkoutError = { errorMessage: error };
      else checkoutError = error;

      return checkoutError ? { checkoutStep, checkoutError } : { checkoutStep };
    });
  }, []);

  const setError = useCallback((error: string | CheckoutModalError) => {
    const nextCheckoutError: CheckoutModalError = typeof error === "string" ? { errorMessage: error || ERROR_PURCHASE().errorMessage } : error;

    if (onError) onError(nextCheckoutError);

    setCheckoutModalState({
      checkoutStep: "error",
      checkoutError: nextCheckoutError,
    });
  }, [onError]);

  return {
    // CheckoutModalState:
    checkoutStep,
    checkoutError,
    resetModalState,
    goBack,
    goNext,
    goTo,
    setError,

    // SelectedPaymentMethod:
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  };
}
