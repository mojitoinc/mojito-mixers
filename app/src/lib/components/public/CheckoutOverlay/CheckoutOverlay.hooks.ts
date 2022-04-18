
import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction, useState, useCallback } from "react";
import { CircleFieldErrors, parseCircleError } from "../../../domain/circle/circle.utils";
import { ERROR_GENERIC, MappedError, MAPPED_ERRORS } from "../../../domain/errors/errors.constants";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { Wallet } from "../../../domain/wallet/wallet.interfaces";
import { isValidWalletAddress } from "../../../domain/wallet/wallet.utils";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { fullTrim } from "../../../utils/formatUtils";
import { TaxesState } from "../../../views/Billing/BillingView";
import { resetStepperProgress } from "../../payments/CheckoutStepper/CheckoutStepper";
import { getCheckoutModalState } from "./CheckoutOverlay.utils";

// TODO: Add a "close" value here:
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

export interface CheckoutModalStateReturn extends CheckoutModalState, PurchaseState {
  // CheckoutModalState (+ inherited stuff):
  startAt: CheckoutModalStep;
  initModalState: () => void;
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
  invoiceID: initialInvoiceID = null,
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
    invoiceID: initialInvoiceID || null,
    invoiceCountdownStart: null,
    taxes: vertexEnabled ? { status: "incomplete" } : null,
    wallet: null,
    processorPaymentID: "",
    paymentID: ""
  });

  const initModalState = useCallback(() => {
    if (debug) console.log("\n⚙️ Init Modal State!\n\n");

    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();

    // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
    // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
    const checkoutModalState = getCheckoutModalState();

    setCheckoutModalState({
      checkoutStep: checkoutModalState.checkoutStep || startAt,
      isDialogBlocked: false,
    });

    // setCheckoutModalState({ checkoutStep: "error", checkoutError: { errorMessage: "test" } });
    // setCheckoutModalState({ checkoutStep: "purchasing" });

    setSelectedPaymentMethod({
      billingInfo: checkoutModalState.billingInfo || "",
      paymentInfo: checkoutModalState.paymentInfo || "",
      cvv: "",
    });

    setPurchaseState({
      invoiceID: initialInvoiceID ? initialInvoiceID : (checkoutModalState.invoiceID || ""),
      invoiceCountdownStart: initialInvoiceID ? Date.now() : (checkoutModalState.invoiceCountdownStart || null),
      taxes: vertexEnabled ? { status: "incomplete" } : null,
      wallet: null, // Wallet is added from invoice: `setWalletAddress(wallet || destinationAddress)`
      processorPaymentID: checkoutModalState.processorPaymentID || "",
      paymentID: checkoutModalState.paymentID || ""
    });
  }, [debug, startAt, initialInvoiceID, vertexEnabled]);

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

  const goTo = useCallback((checkoutStep: CheckoutModalStep = startAt, checkoutError?: CheckoutModalError) => {
    setCheckoutModalState((prevCheckoutModalState) => {
      return checkoutError
        ? { checkoutStep, checkoutError, isDialogBlocked: false }
        : { checkoutStep, checkoutError: prevCheckoutModalState.checkoutError, isDialogBlocked: false };
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

        let mappedErrorObject: MappedError | undefined;

        const errorMessageParts = circleFieldErrors.summary.split(": ").reverse();

        for (const errorMessagePart of errorMessageParts) {
          mappedErrorObject = MAPPED_ERRORS[fullTrim(errorMessagePart)];

          if (mappedErrorObject) break;
        }

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

  const setIsDialogBlocked = useCallback((isDialogBlocked: boolean) => {
    setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
      checkoutStep,
      checkoutError,
      isDialogBlocked,
    }));
  }, []);

  const setInvoiceID = useCallback((invoiceID: string | null, invoiceCountdownStart: number | null) => {
    setPurchaseState((prevPurchaseState) => ({ ...prevPurchaseState, invoiceID, invoiceCountdownStart, processorPaymentID: "", paymentID: "" }));
  }, []);

  const setTaxes = useCallback((taxes: TaxesState) => {
    setPurchaseState((prevPurchaseState) => ({ ...prevPurchaseState, taxes }));
  }, []);

  const setWalletAddress = useCallback((wallet: null | string | Wallet) => {
    setPurchaseState((prevPurchaseState) => ({ ...prevPurchaseState, wallet }));
  }, []);

  const setPayments = useCallback((processorPaymentID: string, paymentID: string) => {
    setPurchaseState((prevPurchaseState) => ({ ...prevPurchaseState, processorPaymentID, paymentID }));
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
