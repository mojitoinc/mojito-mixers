import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction, useState, useCallback } from "react";
import { CircleFieldErrors, parseCircleError } from "../../../domain/circle/circle.utils";
import { ERROR_GENERIC, MappedError, MAPPED_ERRORS } from "../../../domain/errors/errors.constants";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { CheckoutItemInfo } from "../../../domain/product/product.interfaces";
import { Wallet } from "../../../domain/wallet/wallet.interfaces";
import { isValidWalletAddress } from "../../../domain/wallet/wallet.utils";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { fullTrim } from "../../../utils/formatUtils";
import { TaxesState } from "../../../views/Billing/BillingView";
import { resetStepperProgress } from "../../payments/CheckoutStepper/CheckoutStepper";
import { CheckoutModalStateCombined } from "./CheckoutOverlay.types";
import { getCheckoutModalState } from "./CheckoutOverlay.utils";

export type CheckoutModalErrorAt = "close" | "reset" | "authentication" | "billing" | "payment" | "purchasing";

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
  orgID: string;
  invoiceID?: string | null;
  paymentIdParam?: string;
  productConfirmationEnabled?: boolean;
  vertexEnabled?: boolean;
  isAuthenticated?: boolean;
  onError?: (error: CheckoutModalError) => void;
  debug?: boolean;
}

export interface CheckoutModalState {
  checkoutStep: CheckoutModalStep;
  checkoutError?: CheckoutModalError;
  isDialogBlocked: boolean;
}

export interface PersistedData {
  orgID: string;
  checkoutItems: CheckoutItemInfo[];
  goToMarketplaceHref: string;
}

export interface SelectedPaymentMethod {
  billingInfo: string | BillingInfo;
  paymentInfo: string | PaymentMethod | null;
  cvv: string;
}

export interface PurchaseState {
  invoiceID: string | null;
  invoiceCountdownStart: number | null;
  taxes: null | TaxesState;
  wallet: null | string | Wallet;
  processorPaymentID: string;
  paymentID: string;
}

export interface CheckoutModalStateReturn extends CheckoutModalState, PersistedData, PurchaseState {
  // CheckoutModalState (+ inherited stuff):
  startAt: CheckoutModalStep;
  initModalState: () => CheckoutModalStateCombined;
  goBack: () => void;
  goNext: () => void;
  goTo: (checkoutStep?: CheckoutModalStep, checkoutError?: CheckoutModalError) => void;
  setError: (error?: string | CheckoutModalError) => void;
  setIsDialogBlocked: (isDialogBlocked: boolean) => void;

  // SelectedPaymentMethod:
  selectedPaymentMethod: SelectedPaymentMethod;
  setSelectedPaymentMethod: Dispatch<SetStateAction<SelectedPaymentMethod>>;

  // PurchaseState (+ inherited stuff):
  setInvoiceID: (invoiceID: string | null, invoiceCountdownStart: number | null) => void;
  setTaxes: (taxes: TaxesState) => void;
  setWalletAddress: (wallet: null | string | Wallet) => void;
  setPayments: (processorPaymentID: string, paymentID: string) => void;
}

export const CHECKOUT_STEPS: CheckoutModalStep[] = ["authentication", "billing", "payment", "purchasing", "confirmation"];

const WALLET_ADDRESS_FIELD_STEPS = ["billing", "payment"];

export function useCheckoutModalState({
  orgID: parentOrgID,
  invoiceID: parentInvoiceID = null,
  paymentIdParam,
  productConfirmationEnabled,
  vertexEnabled,
  isAuthenticated,
  onError,
  debug,
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

  const [persistedData, setPersistedData] = useState<PersistedData>({
    orgID: parentOrgID,
    checkoutItems: [],
    goToMarketplaceHref: "",
  });

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<SelectedPaymentMethod>({
    billingInfo: "",
    paymentInfo: "",
    cvv: "",
  });

  const [{
    invoiceID,
    invoiceCountdownStart,
    taxes,
    wallet,
    processorPaymentID,
    paymentID,
  }, setPurchaseState] = useState<PurchaseState>({
    invoiceID: parentInvoiceID || null,
    invoiceCountdownStart: null,
    taxes: vertexEnabled ? { status: "incomplete" } : null,
    wallet: null,
    processorPaymentID: "",
    paymentID: "",
  });

  const initModalState = useCallback(() => {
    if (debug) console.log("\n⚙️ Init Modal State!\n\n");

    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();

    // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
    // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
    const checkoutModalState = getCheckoutModalState({ paymentIdParam });

    setCheckoutModalState({
      checkoutStep: checkoutModalState.checkoutStep || startAt,
      isDialogBlocked: false,
    });

    setPersistedData({
      orgID: checkoutModalState.orgID,
      checkoutItems: checkoutModalState.checkoutItems,
      goToMarketplaceHref: checkoutModalState.url || "",
    });

    // setCheckoutModalState({ checkoutStep: "error", checkoutError: { errorMessage: "test" } });
    // setCheckoutModalState({ checkoutStep: "purchasing" });

    setSelectedPaymentMethod({
      billingInfo: checkoutModalState.billingInfo || "",
      paymentInfo: checkoutModalState.paymentInfo || "",
      cvv: "",
    });

    setPurchaseState({
      invoiceID: parentInvoiceID || (checkoutModalState.invoiceID || ""),
      invoiceCountdownStart: parentInvoiceID ? Date.now() : (checkoutModalState.invoiceCountdownStart || null),
      taxes: vertexEnabled ? { status: "incomplete" } : null,
      wallet: null, // Wallet is added from invoice: `setWalletAddress(nextWallet || destinationAddress)`
      processorPaymentID: checkoutModalState.processorPaymentID || "",
      paymentID: checkoutModalState.paymentID || "",
    });

    return checkoutModalState;
  }, [debug, startAt, parentInvoiceID, paymentIdParam, vertexEnabled]);

  const goBack = useCallback(() => {
    setCheckoutModalState(({ checkoutStep: prevCheckoutStep, checkoutError: prevCheckoutError }) => ({
      checkoutStep: CHECKOUT_STEPS[Math.max(CHECKOUT_STEPS.indexOf(prevCheckoutStep) - 1, 0)],
      checkoutError: prevCheckoutError,
      isDialogBlocked: false,
    }));
  }, []);

  const goNext = useCallback(() => {
    if (!isValidWalletAddress(wallet) && WALLET_ADDRESS_FIELD_STEPS.includes(checkoutStep)) return;

    setCheckoutModalState(({ checkoutStep: prevCheckoutStep, checkoutError: prevCheckoutError }) => ({
      checkoutStep: CHECKOUT_STEPS[Math.min(CHECKOUT_STEPS.indexOf(prevCheckoutStep) + 1, CHECKOUT_STEPS.length - 1)],
      checkoutError: prevCheckoutError,
      isDialogBlocked: false,
    }));
  }, [checkoutStep, wallet]);

  const goTo = useCallback((nextCheckoutStep: CheckoutModalStep = startAt, nextCheckoutError?: CheckoutModalError) => {
    setCheckoutModalState((prevCheckoutModalState) => {
      return nextCheckoutError
        ? { checkoutStep: nextCheckoutStep, checkoutError: nextCheckoutError, isDialogBlocked: false }
        : { checkoutStep: nextCheckoutStep, checkoutError: prevCheckoutModalState.checkoutError, isDialogBlocked: false };
    });
  }, [startAt]);

  const setError = useCallback((errorParam: undefined | string | CheckoutModalError) => {
    const nextCheckoutError: CheckoutModalError = typeof errorParam === "object" ? errorParam : {
      errorMessage: errorParam || ERROR_GENERIC.errorMessage,
    };

    const { error } = nextCheckoutError;

    if (error) {
      const circleFieldErrors = parseCircleError(error);

      if (circleFieldErrors && Object.keys(circleFieldErrors).length > 2) {
        // There's already some specific errors from Circle:
        nextCheckoutError.circleFieldErrors = circleFieldErrors;
      } else if (circleFieldErrors) {
        // If only 2 keys are present, those are firstAt and summary, so we need to try to map the generic error to a
        // more specific one:

        const errorMessageParts = circleFieldErrors.summary.split(": ").reverse();

        const mappedErrorObject: MappedError | undefined = Object
          .values(errorMessageParts)
          .map(errorMessagePart => MAPPED_ERRORS[fullTrim(errorMessagePart)])
          .find(mappedError => !!mappedError);

        if (mappedErrorObject) {
          const { errorLocation, fieldName } = mappedErrorObject;

          const errorInForms = (errorLocation === "billing" || errorLocation === "payment") && fieldName;

          if (errorInForms) {
            nextCheckoutError.circleFieldErrors = {
              firstAt: errorLocation,
              summary: mappedErrorObject.errorMessage,
              [errorLocation]: {
                [fieldName]: mappedErrorObject.errorMessage,
              },
            };
          } else {
            nextCheckoutError.at = mappedErrorObject.errorLocation || nextCheckoutError.at;
            nextCheckoutError.errorMessage = mappedErrorObject.errorMessage || nextCheckoutError.errorMessage;
          }
        }
      }
    }

    if (onError) onError(nextCheckoutError);

    setCheckoutModalState({
      checkoutStep: "error",
      checkoutError: nextCheckoutError,
      isDialogBlocked: false,
    });
  }, [onError]);

  const setIsDialogBlocked = useCallback((nextIsDialogBlocked: boolean) => {
    setCheckoutModalState(prevCheckoutModalState => ({ ...prevCheckoutModalState, isDialogBlocked: nextIsDialogBlocked }));
  }, []);

  const setInvoiceID = useCallback((nextInvoiceID: string | null, nextInvoiceCountdownStart: number | null) => {
    setPurchaseState(prevPurchaseState => ({
      ...prevPurchaseState,
      invoiceID: nextInvoiceID,
      invoiceCountdownStart: nextInvoiceCountdownStart,
      processorPaymentID: "",
      paymentID: "",
    }));
  }, []);

  const setTaxes = useCallback((nextTaxes: TaxesState) => {
    setPurchaseState(prevPurchaseState => ({ ...prevPurchaseState, taxes: nextTaxes }));
  }, []);

  const setWalletAddress = useCallback((nextWallet: null | string | Wallet) => {
    setPurchaseState(prevPurchaseState => ({ ...prevPurchaseState, wallet: nextWallet }));
  }, []);

  const setPayments = useCallback((nextProcessorPaymentID: string, nextPaymentID: string) => {
    setPurchaseState(prevPurchaseState => ({ ...prevPurchaseState, processorPaymentID: nextProcessorPaymentID, paymentID: nextPaymentID }));
  }, []);

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

    // Data that can be persisted:
    orgID: persistedData.orgID || parentOrgID,
    checkoutItems: persistedData.checkoutItems,
    goToMarketplaceHref: persistedData.goToMarketplaceHref,

    // SelectedPaymentMethod:
    selectedPaymentMethod,
    setSelectedPaymentMethod,

    // PurchaseState:
    invoiceID,
    invoiceCountdownStart,
    setInvoiceID,
    taxes,
    setTaxes,
    wallet,
    setWalletAddress,
    processorPaymentID,
    paymentID,
    setPayments,
  };
}
