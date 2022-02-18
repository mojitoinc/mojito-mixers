import { useState, useCallback } from 'react';
import { ERROR_PURCHASE } from '../../../domain/errors/errors.constants.js';
import { INITIAL_PLAID_OAUTH_FLOW_STATE } from '../../../hooks/usePlaid.js';
import { resetStepperProgress } from '../CheckoutStepper/CheckoutStepper.js';

const CHECKOUT_STEPS = ["authentication", "billing", "payment", "purchasing", "confirmation"];
function useCheckoutModalState({ productConfirmationEnabled, isAuthenticated, onError, }) {
    const startAt = !isAuthenticated || productConfirmationEnabled ? "authentication" : "billing";
    const [{ checkoutStep, checkoutError, }, setCheckoutModalState] = useState({
        checkoutStep: startAt,
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
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
    const goTo = useCallback((checkoutStep, error) => {
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
    const setError = useCallback((error) => {
        const nextCheckoutError = typeof error === "string" ? { errorMessage: error || ERROR_PURCHASE().errorMessage } : error;
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

export { CHECKOUT_STEPS, useCheckoutModalState };
//# sourceMappingURL=CheckoutModal.hooks.js.map
