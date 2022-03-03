
import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction, useState, useCallback } from "react";
import { CircleFieldErrors } from "../../../domain/circle/circle.utils";
import { ERROR_PURCHASE } from "../../../domain/errors/errors.constants";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
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

// navigate:"billing" | "payment" | "purchasing"->before redirection= event:payment-> after redirect:confirmation

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
  walletAddress: string | null;
  circlePaymentID: string;
  paymentID: string;
}

export interface CheckoutModalStateReturn extends CheckoutModalState, PurchaseState {
  // CheckoutModalState (+ inherited stuff):
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
  setWalletAddress: (walletAddress: string | null) => void;
  setPayments: (paymentReferenceNumber: string, paymentID: string) => void;
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
    walletAddress,
    circlePaymentID,
    paymentID,
  }, setPurchaseState] = useState<PurchaseState>({
    invoiceID: initialInvoiceID || null,
    taxes: { status: "incomplete" },
    walletAddress: null,
    circlePaymentID: "",
    paymentID: ""
  });

  const initModalState = useCallback(() => {
    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();

    // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
    // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
    const savedFlow = continueFlows();

    // if (savedFlow.checkoutStep !== "") {
    //   clearPersistedInfo();
    //   clearPlaidInfo();
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
      walletAddress: null,
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
    if (!isValidWalletAddress(walletAddress) && WALLET_ADDRESS_FIELD_STEPS.includes(checkoutStep)) return;

    setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
      checkoutStep: CHECKOUT_STEPS[Math.min(CHECKOUT_STEPS.indexOf(checkoutStep) + 1, CHECKOUT_STEPS.length - 1)],
      checkoutError,
      isDialogBlocked: false,
    }));
  }, [checkoutStep, walletAddress]);

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
    setPurchaseState((prevPurchasState) => ({ ...prevPurchasState, invoiceID, paymentReferenceNumber: "", paymentID: "" }));
  }, []);

  const setTaxes = useCallback((taxes: TaxesState) => {
    setPurchaseState((prevPurchasState) => ({ ...prevPurchasState, taxes }));
  }, []);

  const setWalletAddress = useCallback((walletAddress: string | null) => {
    setPurchaseState((prevPurchasState) => ({ ...prevPurchasState, walletAddress }));
  }, []);

  const setPayments = useCallback((circlePaymentID: string, paymentID: string) => {
    setPurchaseState((prevPurchasState) => ({ ...prevPurchasState, circlePaymentID, paymentID }));
  }, [])



  return {
    // CheckoutModalState:
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
    walletAddress,
    setWalletAddress,
    setPayments,
    circlePaymentID,
    paymentID,
  };
}
