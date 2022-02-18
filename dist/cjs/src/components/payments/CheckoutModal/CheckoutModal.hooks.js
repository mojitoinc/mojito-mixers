'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var errors_constants = require('../../../domain/errors/errors.constants.js');
var usePlaid = require('../../../hooks/usePlaid.js');
var CheckoutStepper = require('../CheckoutStepper/CheckoutStepper.js');

const CHECKOUT_STEPS = ["authentication", "billing", "payment", "purchasing", "confirmation"];
function useCheckoutModalState({ productConfirmationEnabled, isAuthenticated, onError, }) {
    const startAt = !isAuthenticated || productConfirmationEnabled ? "authentication" : "billing";
    const [{ checkoutStep, checkoutError, }, setCheckoutModalState] = React.useState({
        checkoutStep: startAt,
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState({
        billingInfo: "",
        paymentInfo: "",
        cvv: "",
    });
    const resetModalState = React.useCallback(() => {
        // Make sure the progress tracker in BillingView and PaymentView is properly animated:
        CheckoutStepper.resetStepperProgress();
        // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
        // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
        const { selectedBillingInfo, continueOAuthFlow, savedStateUsed } = usePlaid.INITIAL_PLAID_OAUTH_FLOW_STATE;
        setCheckoutModalState({ checkoutStep: continueOAuthFlow && !savedStateUsed ? "purchasing" : startAt });
        setSelectedPaymentMethod({
            billingInfo: selectedBillingInfo || "",
            paymentInfo: "",
            cvv: "",
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

exports.CHECKOUT_STEPS = CHECKOUT_STEPS;
exports.useCheckoutModalState = useCheckoutModalState;
//# sourceMappingURL=CheckoutModal.hooks.js.map
