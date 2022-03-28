import { useState, useCallback } from 'react';
import { parseCircleError } from '../../../domain/circle/circle.utils.js';
import { MAPPED_ERRORS, ERROR_GENERIC } from '../../../domain/errors/errors.constants.js';
import { isValidWalletAddress } from '../../../domain/wallet/wallet.utils.js';
import { fullTrim } from '../../../utils/formatUtils.js';
import { resetStepperProgress } from '../../payments/CheckoutStepper/CheckoutStepper.js';
import { continueFlows } from './CheckoutOverlay.utils.js';

var CheckoutModalStepIndex;
(function (CheckoutModalStepIndex) {
    CheckoutModalStepIndex[CheckoutModalStepIndex["authentication"] = 0] = "authentication";
    CheckoutModalStepIndex[CheckoutModalStepIndex["billing"] = 1] = "billing";
    CheckoutModalStepIndex[CheckoutModalStepIndex["payment"] = 2] = "payment";
    CheckoutModalStepIndex[CheckoutModalStepIndex["purchasing"] = 3] = "purchasing";
    CheckoutModalStepIndex[CheckoutModalStepIndex["confirmation"] = 4] = "confirmation";
    CheckoutModalStepIndex[CheckoutModalStepIndex["error"] = 5] = "error";
})(CheckoutModalStepIndex || (CheckoutModalStepIndex = {}));
const CHECKOUT_STEPS = ["authentication", "billing", "payment", "purchasing", "confirmation"];
const WALLET_ADDRESS_FIELD_STEPS = ["billing", "payment"];
function useCheckoutModalState({ invoiceID: initialInvoiceID = null, productConfirmationEnabled, vertexEnabled, isAuthenticated, onError, debug, }) {
    const startAt = !isAuthenticated || productConfirmationEnabled ? "authentication" : "billing";
    const [{ checkoutStep, checkoutError, isDialogBlocked, }, setCheckoutModalState] = useState({
        checkoutStep: startAt,
        isDialogBlocked: false,
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
        billingInfo: "",
        paymentInfo: "",
        cvv: "",
    });
    const [{ invoiceID, taxes, wallet, circlePaymentID, paymentID, }, setPurchaseState] = useState({
        invoiceID: initialInvoiceID || null,
        taxes: vertexEnabled ? { status: "incomplete" } : null,
        wallet: null,
        circlePaymentID: "",
        paymentID: ""
    });
    const initModalState = useCallback(() => {
        if (debug)
            console.log("\n⚙️ Init Modal State!\n\n");
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
            // checkoutError: savedFlow.checkoutError,
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
            taxes: vertexEnabled ? { status: "incomplete" } : null,
            wallet: null,
            circlePaymentID: savedFlow.circlePaymentID || "",
            paymentID: savedFlow.paymentID || ""
        });
    }, [debug, startAt, vertexEnabled]);
    const goBack = useCallback(() => {
        setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
            checkoutStep: CHECKOUT_STEPS[Math.max(CHECKOUT_STEPS.indexOf(checkoutStep) - 1, 0)],
            checkoutError,
            isDialogBlocked: false,
        }));
    }, []);
    const goNext = useCallback(() => {
        if (!isValidWalletAddress(wallet) && WALLET_ADDRESS_FIELD_STEPS.includes(checkoutStep))
            return;
        setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
            checkoutStep: CHECKOUT_STEPS[Math.min(CHECKOUT_STEPS.indexOf(checkoutStep) + 1, CHECKOUT_STEPS.length - 1)],
            checkoutError,
            isDialogBlocked: false,
        }));
    }, [checkoutStep, wallet]);
    const goTo = useCallback((checkoutStep = startAt, checkoutError) => {
        setCheckoutModalState((prevCheckoutModalState) => {
            return checkoutError
                ? { checkoutStep, checkoutError, isDialogBlocked: false }
                : { checkoutStep, checkoutError: prevCheckoutModalState.checkoutError, isDialogBlocked: false };
        });
    }, [startAt]);
    const setError = useCallback((errorParam) => {
        const nextCheckoutError = typeof errorParam === "object" ? errorParam : {
            errorMessage: errorParam || ERROR_GENERIC.errorMessage,
        };
        const { error } = nextCheckoutError;
        if (error) {
            const circleFieldErrors = parseCircleError(error);
            if (circleFieldErrors && Object.keys(circleFieldErrors).length > 2) {
                // There's already some specific errors from Circle:
                nextCheckoutError.circleFieldErrors = circleFieldErrors;
            }
            else if (circleFieldErrors) {
                // If only 2 keys are present, those are firstAt and summary, so we need to try to map the generic error to a
                // more specific one:
                let mappedErrorObject;
                const errorMessageParts = circleFieldErrors.summary.split(": ").reverse();
                for (const errorMessagePart of errorMessageParts) {
                    mappedErrorObject = MAPPED_ERRORS[fullTrim(errorMessagePart)];
                    if (mappedErrorObject)
                        break;
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
                    }
                    else {
                        nextCheckoutError.at = mappedErrorObject.errorLocation || nextCheckoutError.at;
                        nextCheckoutError.errorMessage = mappedErrorObject.errorMessage || nextCheckoutError.errorMessage;
                    }
                }
            }
        }
        if (onError)
            onError(nextCheckoutError);
        setCheckoutModalState({
            checkoutStep: "error",
            checkoutError: nextCheckoutError,
            isDialogBlocked: false,
        });
    }, [onError]);
    const setIsDialogBlocked = useCallback((isDialogBlocked) => {
        setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
            checkoutStep,
            checkoutError,
            isDialogBlocked,
        }));
    }, []);
    const setInvoiceID = useCallback((invoiceID) => {
        setPurchaseState((prevPurchaseState) => (Object.assign(Object.assign({}, prevPurchaseState), { invoiceID, circlePaymentID: "", paymentID: "" })));
    }, []);
    const setTaxes = useCallback((taxes) => {
        setPurchaseState((prevPurchaseState) => (Object.assign(Object.assign({}, prevPurchaseState), { taxes })));
    }, []);
    const setWalletAddress = useCallback((wallet) => {
        setPurchaseState((prevPurchaseState) => (Object.assign(Object.assign({}, prevPurchaseState), { wallet })));
    }, []);
    const setPayments = useCallback((circlePaymentID, paymentID) => {
        setPurchaseState((prevPurchaseState) => (Object.assign(Object.assign({}, prevPurchaseState), { circlePaymentID, paymentID })));
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

export { CHECKOUT_STEPS, CheckoutModalStepIndex, useCheckoutModalState };
//# sourceMappingURL=CheckoutOverlay.hooks.js.map
