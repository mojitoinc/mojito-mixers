'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var errors_constants = require('../../../domain/errors/errors.constants.js');
var wallet_utils = require('../../../domain/wallet/wallet.utils.js');
var CheckoutStepper = require('../../payments/CheckoutStepper/CheckoutStepper.js');
var CheckoutOverlay_utils = require('./CheckoutOverlay.utils.js');

exports.CheckoutModalStepIndex = void 0;
(function (CheckoutModalStepIndex) {
    CheckoutModalStepIndex[CheckoutModalStepIndex["authentication"] = 0] = "authentication";
    CheckoutModalStepIndex[CheckoutModalStepIndex["billing"] = 1] = "billing";
    CheckoutModalStepIndex[CheckoutModalStepIndex["payment"] = 2] = "payment";
    CheckoutModalStepIndex[CheckoutModalStepIndex["purchasing"] = 3] = "purchasing";
    CheckoutModalStepIndex[CheckoutModalStepIndex["confirmation"] = 4] = "confirmation";
    CheckoutModalStepIndex[CheckoutModalStepIndex["error"] = 5] = "error";
})(exports.CheckoutModalStepIndex || (exports.CheckoutModalStepIndex = {}));
const CHECKOUT_STEPS = ["authentication", "billing", "payment", "purchasing", "confirmation"];
const WALLET_ADDRESS_FIELD_STEPS = ["billing", "payment"];
function useCheckoutModalState({ invoiceID: initialInvoiceID = null, productConfirmationEnabled, isAuthenticated, onError, }) {
    const startAt = !isAuthenticated || productConfirmationEnabled ? "authentication" : "billing";
    const [{ checkoutStep, checkoutError, isDialogBlocked, }, setCheckoutModalState] = React.useState({
        checkoutStep: startAt,
        isDialogBlocked: false,
    });
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState({
        billingInfo: "",
        paymentInfo: "",
        cvv: "",
    });
    const [{ invoiceID, taxes, wallet, circlePaymentID, paymentID, }, setPurchaseState] = React.useState({
        invoiceID: initialInvoiceID || null,
        taxes: { status: "incomplete" },
        wallet: null,
        circlePaymentID: "",
        paymentID: ""
    });
    const initModalState = React.useCallback(() => {
        // Make sure the progress tracker in BillingView and PaymentView is properly animated:
        CheckoutStepper.resetStepperProgress();
        // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
        // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
        const savedFlow = CheckoutOverlay_utils.continueFlows();
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
    const goBack = React.useCallback(() => {
        setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
            checkoutStep: CHECKOUT_STEPS[Math.max(CHECKOUT_STEPS.indexOf(checkoutStep) - 1, 0)],
            checkoutError,
            isDialogBlocked: false,
        }));
    }, []);
    const goNext = React.useCallback(() => {
        if (!wallet_utils.isValidWalletAddress(wallet) && WALLET_ADDRESS_FIELD_STEPS.includes(checkoutStep))
            return;
        setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
            checkoutStep: CHECKOUT_STEPS[Math.min(CHECKOUT_STEPS.indexOf(checkoutStep) + 1, CHECKOUT_STEPS.length - 1)],
            checkoutError,
            isDialogBlocked: false,
        }));
    }, [checkoutStep, wallet]);
    const goTo = React.useCallback((checkoutStep = startAt, error) => {
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
            return checkoutError ? { checkoutStep, checkoutError, isDialogBlocked: false } : { checkoutStep, isDialogBlocked: false };
        });
    }, [startAt]);
    const setError = React.useCallback((error) => {
        const nextCheckoutError = typeof error === "string" ? { errorMessage: error || errors_constants.ERROR_PURCHASE().errorMessage } : error;
        if (onError)
            onError(nextCheckoutError);
        setCheckoutModalState({
            checkoutStep: "error",
            checkoutError: nextCheckoutError,
            isDialogBlocked: false,
        });
    }, [onError]);
    const setIsDialogBlocked = React.useCallback((isDialogBlocked) => {
        setCheckoutModalState(({ checkoutStep, checkoutError }) => ({
            checkoutStep,
            checkoutError,
            isDialogBlocked,
        }));
    }, []);
    const setInvoiceID = React.useCallback((invoiceID) => {
        setPurchaseState((prevPurchaseState) => (Object.assign(Object.assign({}, prevPurchaseState), { invoiceID, circlePaymentID: "", paymentID: "" })));
    }, []);
    const setTaxes = React.useCallback((taxes) => {
        setPurchaseState((prevPurchaseState) => (Object.assign(Object.assign({}, prevPurchaseState), { taxes })));
    }, []);
    const setWalletAddress = React.useCallback((wallet) => {
        setPurchaseState((prevPurchaseState) => (Object.assign(Object.assign({}, prevPurchaseState), { wallet })));
    }, []);
    const setPayments = React.useCallback((circlePaymentID, paymentID) => {
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

exports.CHECKOUT_STEPS = CHECKOUT_STEPS;
exports.useCheckoutModalState = useCheckoutModalState;
//# sourceMappingURL=CheckoutOverlay.hooks.js.map
