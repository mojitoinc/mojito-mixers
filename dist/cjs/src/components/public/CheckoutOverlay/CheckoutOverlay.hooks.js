'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var errors_constants = require('../../../domain/errors/errors.constants.js');
var CheckoutStepper = require('../../payments/CheckoutStepper/CheckoutStepper.js');
var CheckoutOverlay_utils = require('./CheckoutOverlay.utils.js');

const CHECKOUT_STEPS = ["authentication", "billing", "payment", "purchasing", "confirmation"];
function useCheckoutModalState({ invoiceID: initialInvoiceID = null, productConfirmationEnabled, isAuthenticated, onError, }) {
    const startAt = !isAuthenticated || productConfirmationEnabled ? "authentication" : "billing";
    const [{ checkoutStep, checkoutError, }, setCheckoutModalState] = React.useState({
        checkoutStep: startAt,
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState({
        billingInfo: "",
        paymentInfo: "",
        cvv: "",
    });
    const [{ invoiceID, paymentReferenceNumber, }, setPurchaseState] = React.useState({
        invoiceID: initialInvoiceID || null,
        paymentReferenceNumber: "",
    });
    const initModalState = React.useCallback(() => {
        // Make sure the progress tracker in BillingView and PaymentView is properly animated:
        CheckoutStepper.resetStepperProgress();
        // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
        // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
        const savedFlow = CheckoutOverlay_utils.continueFlows();
        // if (savedFlow.checkoutStep !== "") {
        //   clearPersistedInfo();
        //   clearPlaidInfo();
        // }
        setCheckoutModalState({
            checkoutStep: savedFlow.checkoutStep || startAt,
            checkoutError: savedFlow.checkoutError,
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
            paymentReferenceNumber: savedFlow.paymentReferenceNumber || "",
        });
    }, [startAt]);
    const goBack = React.useCallback(() => {
        setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
            checkoutStep: CHECKOUT_STEPS[Math.max(CHECKOUT_STEPS.indexOf(checkoutStep) - 1, 0)],
            checkoutError,
        }));
    }, []);
    const goNext = React.useCallback(() => {
        setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
            checkoutStep: CHECKOUT_STEPS[Math.min(CHECKOUT_STEPS.indexOf(checkoutStep) + 1, CHECKOUT_STEPS.length - 1)],
            checkoutError,
        }));
    }, []);
    const goTo = React.useCallback((checkoutStep, error) => {
        setCheckoutModalState((prevCheckoutModalState) => {
            let checkoutError;
            if (error === null)
                checkoutError = undefined;
            else if (!error)
                checkoutError = prevCheckoutModalState.checkoutError;
            else if (typeof error === "string")
                checkoutError = { errorMessage: error };
            else
                checkoutError = error;
            return checkoutError ? { checkoutStep, checkoutError } : { checkoutStep };
        });
    }, []);
    const setError = React.useCallback((error) => {
        const nextCheckoutError = typeof error === "string" ? { errorMessage: error || errors_constants.ERROR_PURCHASE().errorMessage } : error;
        if (onError)
            onError(nextCheckoutError);
        setCheckoutModalState({
            checkoutStep: "error",
            checkoutError: nextCheckoutError,
        });
    }, [onError]);
    const setInvoiceID = React.useCallback((invoiceID) => {
        setPurchaseState({ invoiceID, paymentReferenceNumber: "" });
    }, []);
    const setPaymentReferenceNumber = React.useCallback((paymentReferenceNumber) => {
        setPurchaseState(({ invoiceID }) => ({ invoiceID, paymentReferenceNumber }));
    }, []);
    return {
        // CheckoutModalState:
        checkoutStep,
        checkoutError,
        initModalState,
        goBack,
        goNext,
        goTo,
        setError,
        // SelectedPaymentMethod:
        selectedPaymentMethod,
        setSelectedPaymentMethod,
        // PurchaseState:
        invoiceID,
        paymentReferenceNumber,
        setInvoiceID,
        setPaymentReferenceNumber,
    };
}

exports.CHECKOUT_STEPS = CHECKOUT_STEPS;
exports.useCheckoutModalState = useCheckoutModalState;
//# sourceMappingURL=CheckoutOverlay.hooks.js.map
