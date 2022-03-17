
import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction, useState, useCallback } from "react";
import { CircleFieldErrors } from "../../../domain/circle/circle.utils";
import { ERROR_PURCHASE } from "../../../domain/errors/errors.constants";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { Wallet } from "../../../domain/wallet/wallet.interfaces";
import { isValidWalletAddress } from "../../../domain/wallet/wallet.utils";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { TaxesState } from "../../../views/Billing/BillingView";
import { resetStepperProgress } from "../../payments/CheckoutStepper/CheckoutStepper";
import { continueFlows } from "./CheckoutOverlay.utils";

export type CheckoutModalErrorAt = "reset" | "authentication" | "billing" | "payment" | "purchasing";

export interface CheckoutModalError {
  at?: CheckoutModalErrorAt;
  error?: ApolloError | Error;
  circleFieldErrors?: CircleFieldErrors;
  errorMessage: string;
}

export type CheckoutModalStep = "authentication" | "billing" | "payment" | "purchasing" | "confirmation" | "error";

export enum CheckoutModalStepIndex {
  authentication,
  billing,
  payment,
  purchasing,
  confirmation,
  error
}

export interface CheckoutModalStateOptions {
  invoiceID?: string | null;
  productConfirmationEnabled?: boolean;
  isAuthenticated?: boolean;
  onError?: (error: CheckoutModalError) => void;
}

export interface CheckoutModalState {
  checkoutStep: CheckoutModalStep;
  checkoutError?: CheckoutModalError;
  isDialogBlocked: boolean;
}

export interface SelectedPaymentMethod {
  billingInfo: string | BillingInfo;
  paymentInfo: string | PaymentMethod;
  cvv: string;
}

export interface PurchaseState {
  invoiceID: string | null;
  taxes: TaxesState;
  wallet: null | string | Wallet;
  circlePaymentID: string;
  paymentID: string;
}

export interface CheckoutModalStateReturn extends CheckoutModalState, PurchaseState {
  // CheckoutModalState (+ inherited stuff):
  startAt: CheckoutModalStep;
  initModalState: () => void;
  goBack: () => void;
  goNext: () => void;
  goTo: (checkoutStep?: CheckoutModalStep, error?: null | string | CheckoutModalError) => void;
  setError: (error: string | CheckoutModalError) => void;
  setIsDialogBlocked: (isDialogBlocked: boolean) => void;

  // SelectedPaymentMethod:
  selectedPaymentMethod: SelectedPaymentMethod;
  setSelectedPaymentMethod: Dispatch<SetStateAction<SelectedPaymentMethod>>;

  // PurchaseState (+ inherited stuff):
  setInvoiceID: (invoiceID: string | null) => void;
  setTaxes: (taxes: TaxesState) => void;
  setWalletAddress: (wallet: null | string | Wallet) => void;
  setPayments: (circlePaymentID: string, paymentID: string) => void;
}

export const CHECKOUT_STEPS: CheckoutModalStep[] = ["authentication", "billing", "payment", "purchasing", "confirmation"];

const WALLET_ADDRESS_FIELD_STEPS = ["billing", "payment"];

export function useCheckoutModalState({
  invoiceID: initialInvoiceID = null,
  productConfirmationEnabled,
  isAuthenticated,
  onError,
}: CheckoutModalStateOptions): CheckoutModalStateReturn {
  const startAt: CheckoutModalStep = !isAuthenticated || productConfirmationEnabled ? "authentication" : "billing";

  const [{
    checkoutStep,
    checkoutError,
    isDialogBlocked,
  }, setCheckoutModalState] = useState<CheckoutModalState>({
    checkoutStep: startAt,
    isDialogBlocked: false,
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<SelectedPaymentMethod>({
    billingInfo: "",
    paymentInfo: "",
    cvv: "",
  });

  const [{
    invoiceID,
    taxes,
    wallet,
    circlePaymentID,
    paymentID,
  }, setPurchaseState] = useState<PurchaseState>({
    invoiceID: initialInvoiceID || null,
    taxes: { status: "incomplete" },
    wallet: null,
    circlePaymentID: "",
    paymentID: ""
  });

  const initModalState = useCallback(() => {
    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();

    // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
    // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
    const savedFlow = continueFlows();

    // if (savedFlow.flowType === "3DS") {
    //   continueCheckout() already calls clearPersistedInfo().
    //   clearPersistedInfo();
    // } else if (savedFlow.flowType === "Plaid") {
    //   This is handled in PaymentView.tsx, in the usePlaid() hook call.
    //   clearPlaidInfo();
    // } else if (savedFlow.checkoutStep !== "") {
    //   TODO: Clear both as this is some kind of indeterminate / error state?
    // }

    setCheckoutModalState({
      checkoutStep: savedFlow.checkoutStep || startAt,
      checkoutError: savedFlow.checkoutError,
      isDialogBlocked: false,
    });

    // setCheckoutModalState({ checkoutStep: "error", checkoutError: { errorMessage: "test" } });
    // setCheckoutModalState({ checkoutStep: "purchasing" });

    setSelectedPaymentMethod({
      billingInfo: savedFlow.billingInfo || "",
      paymentInfo: savedFlow.paymentInfo || "",
      cvv: "",
    });

    setPurchaseState({
      invoiceID: savedFlow.invoiceID || "",
      taxes: { status: "incomplete" },
      wallet: null,
      circlePaymentID: savedFlow.circlePaymentID || "",
      paymentID: savedFlow.paymentID || ""
    });
  }, [startAt]);

  const goBack = useCallback(() => {
    setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
      checkoutStep: CHECKOUT_STEPS[Math.max(CHECKOUT_STEPS.indexOf(checkoutStep) - 1, 0)],
      checkoutError,
      isDialogBlocked: false,
    }));
  }, []);

  const goNext = useCallback(() => {
    if (!isValidWalletAddress(wallet) && WALLET_ADDRESS_FIELD_STEPS.includes(checkoutStep)) return;

    setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
      checkoutStep: CHECKOUT_STEPS[Math.min(CHECKOUT_STEPS.indexOf(checkoutStep) + 1, CHECKOUT_STEPS.length - 1)],
      checkoutError,
      isDialogBlocked: false,
    }));
  }, [checkoutStep, wallet]);

  const goTo = useCallback((checkoutStep: CheckoutModalStep = startAt, error?: null | string | CheckoutModalError) => {
    setCheckoutModalState((prevCheckoutModalState) => {
      let checkoutError: CheckoutModalError | undefined;

      if (error === null) checkoutError = undefined;
      else if (!error) checkoutError = prevCheckoutModalState.checkoutError;
      else if (typeof error === "string") checkoutError = { errorMessage: error };
      else checkoutError = error;

      return checkoutError ? { checkoutStep, checkoutError, isDialogBlocked: false } : { checkoutStep, isDialogBlocked: false };
    });
  }, [startAt]);

  const setError = useCallback((error: string | CheckoutModalError) => {
    const nextCheckoutError: CheckoutModalError = typeof error === "string" ? { errorMessage: error || ERROR_PURCHASE().errorMessage } : error;

    if (onError) onError(nextCheckoutError);

    setCheckoutModalState({
      checkoutStep: "error",
      checkoutError: nextCheckoutError,
      isDialogBlocked: false,
    });
  }, [onError]);

  const setIsDialogBlocked = useCallback((isDialogBlocked: boolean) => {
    setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
      checkoutStep,
      checkoutError,
      isDialogBlocked,
    }));
  }, []);

  const setInvoiceID = useCallback((invoiceID: string | null) => {
    setPurchaseState((prevPurchaseState) => ({ ...prevPurchaseState, invoiceID, circlePaymentID: "", paymentID: "" }));
  }, []);

  const setTaxes = useCallback((taxes: TaxesState) => {
    setPurchaseState((prevPurchaseState) => ({ ...prevPurchaseState, taxes }));
  }, []);

  const setWalletAddress = useCallback((wallet: null | string | Wallet) => {
    setPurchaseState((prevPurchaseState) => ({ ...prevPurchaseState, wallet }));
  }, []);

  const setPayments = useCallback((circlePaymentID: string, paymentID: string) => {
    setPurchaseState((prevPurchaseState) => ({ ...prevPurchaseState, circlePaymentID, paymentID }));
  }, [])



  return {
    // CheckoutModalState:
    startAt,
    checkoutStep,
    checkoutError,
    isDialogBlocked,
    initModalState,
    goBack,
    goNext,
    goTo,
    setError,
    setIsDialogBlocked,

    // SelectedPaymentMethod:
    selectedPaymentMethod,
    setSelectedPaymentMethod,

    // PurchaseState:
    invoiceID,
    setInvoiceID,
    taxes,
    setTaxes,
    wallet,
    setWalletAddress,
    circlePaymentID,
    paymentID,
    setPayments,
  };
}
