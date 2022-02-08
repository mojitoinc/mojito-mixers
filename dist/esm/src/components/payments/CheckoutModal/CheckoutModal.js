import { __awaiter } from '../../../../node_modules/tslib/tslib.es6.js';
import { Backdrop, Box, CircularProgress, Dialog, DialogContent } from '@mui/material';
import React__default, { useMemo, useRef, useState, useEffect, useCallback, Fragment } from 'react';
import { transformRawSavedPaymentMethods, savedPaymentMethodToBillingInfo } from '../../../domain/circle/circle.utils.js';
import { useMeQuery, useDeletePaymentMethodMutation, useGetPaymentMethodListQuery } from '../../../queries/graphqlGenerated.js';
import { AuthenticationView } from '../../../views/Authentication/AuthenticationView.js';
import { BillingView } from '../../../views/Billing/BillingView.js';
import { ConfirmationView } from '../../../views/Confirmation/ConfirmationView.js';
import { PaymentView } from '../../../views/Payment/PaymentView.js';
import { CheckoutModalHeader } from '../CheckoutModalHeader/CheckoutModalHeader.js';
import { PurchasingView } from '../../../views/Purchasing/PurchasingView.js';
import { ErrorView } from '../../../views/Error/ErrorView.js';
import { useShakeAnimation } from '../../../utils/animationUtils.js';
import { resetStepperProgress } from '../CheckoutStepper/CheckoutStepper.js';
import { continuePlaidOAuthFlow, PlaidFlow, INITIAL_PLAID_OAUTH_FLOW_STATE } from '../../../hooks/usePlaid.js';
import createTheme from '../../../../node_modules/@mui/material/styles/createTheme.js';
import { ThemeProvider } from '@mui/system';

const SELECTOR_DIALOG_SCROLLABLE = "[role=presentation]";
const CHECKOUT_STEPS = ["authentication", "billing", "payment", "purchasing", "confirmation"];
const CheckoutModal = ({ 
// Modal:
open, onClose, 
// Flow:
guestCheckoutEnabled, productConfirmationEnabled, 
// Personalization:
theme: parentTheme, themeOptions, logoSrc, logoSx, loaderImageSrc, purchasingImageSrc, purchasingMessages, errorImageSrc, userFormat, acceptedPaymentTypes, paymentLimits, // Not implemented yet. Used to show payment limits for some payment types.
purchaseInstructions, 
// Legal:
consentType, // Not implemented yet. Used to let the app control where to log errors to (e.g. Sentry).
privacyHref, termsOfUseHref, 
// Data:
orgID, invoiceID, checkoutItem, 
// Authentication:
onLogin, isAuthenticated, isAuthenticatedLoading, 
// Other Events:
debug, onError, // Not implemented yet. Used to let the app control where to log errors to (e.g. Sentry).
onMarketingOptInChange, // Not implemented yet. Used to let user subscribe / unsubscribe to marketing updates.
 }) => {
    var _a;
    const { data: meData, loading: meLoading, error: meError } = useMeQuery({ skip: !isAuthenticated });
    const [deletePaymentMethod] = useDeletePaymentMethodMutation();
    const { data: paymentMethodsData, loading: paymentMethodsLoading, error: paymentMethodsError, refetch: refetchPaymentMethods, } = useGetPaymentMethodListQuery({
        skip: !isAuthenticated,
        variables: {
            orgID,
        },
    });
    const isDialogLoading = isAuthenticatedLoading || meLoading || paymentMethodsLoading;
    const isPlaidFlowLoading = continuePlaidOAuthFlow();
    const startAt = !isAuthenticated || productConfirmationEnabled ? 0 : 1;
    const rawSavedPaymentMethods = paymentMethodsData === null || paymentMethodsData === void 0 ? void 0 : paymentMethodsData.getPaymentMethodList;
    const savedPaymentMethods = useMemo(() => transformRawSavedPaymentMethods(rawSavedPaymentMethods), [rawSavedPaymentMethods]);
    const dialogRootRef = useRef(null);
    const paperRef = useRef(null);
    const [paymentError, setPaymentError] = useState("");
    const [checkoutStepIndex, setCheckoutStepIndex] = useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState({
        billingInfo: "",
        paymentInfo: "",
    });
    const checkoutStep = CHECKOUT_STEPS[checkoutStepIndex];
    useEffect(() => {
        var _a;
        const dialogScrollable = (_a = dialogRootRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(SELECTOR_DIALOG_SCROLLABLE);
        // Scroll to top on step change:
        if (checkoutStep && dialogScrollable)
            dialogScrollable.scrollTop = 0;
    }, [checkoutStep]);
    const resetModalState = useCallback(() => {
        // Make sure the progress tracker in BillingView and PaymentView is properly animated:
        resetStepperProgress();
        // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
        // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
        const { selectedBillingInfo, continueOAuthFlow, savedStateUsed } = INITIAL_PLAID_OAUTH_FLOW_STATE;
        setPaymentError("");
        setCheckoutStepIndex(continueOAuthFlow && !savedStateUsed ? 3 : startAt);
        setSelectedPaymentMethod({ billingInfo: selectedBillingInfo || "", paymentInfo: "" });
    }, [startAt]);
    useEffect(() => {
        if (isDialogLoading || !open)
            return;
        resetModalState();
    }, [isDialogLoading, open, resetModalState]);
    useEffect(() => {
        if (!checkoutStep)
            onClose();
    }, [checkoutStep, onClose]);
    useEffect(() => {
        // TODO: After an error, a payment method might have been created anyway. Reload them.
        // TODO: Refetch these when coming back from error screen:
        if (meError)
            setPaymentError("User could not be loaded.");
        if (paymentMethodsError)
            setPaymentError("Payment methods could not be loaded.");
    }, [meError, paymentMethodsError, checkoutItem, invoiceID]);
    const handlePrevClicked = useCallback(() => {
        setCheckoutStepIndex((prevCheckoutStepIndex) => prevCheckoutStepIndex - 1);
    }, []);
    const handleNextClicked = useCallback(() => {
        setCheckoutStepIndex(prevCheckoutStepIndex => prevCheckoutStepIndex + 1);
    }, []);
    const handleBillingInfoSelected = useCallback((billingInfo) => {
        // TODO: Does paymentInfo need to be reset when coming back to billing info to fix validation errors?
        setSelectedPaymentMethod({ billingInfo, paymentInfo: "" });
    }, []);
    const handlePaymentInfoSelected = useCallback((paymentInfo) => {
        setSelectedPaymentMethod(({ billingInfo }) => ({ billingInfo, paymentInfo }));
    }, []);
    const handleSavedPaymentMethodDeleted = useCallback((addressIdOrPaymentMethodId) => __awaiter(void 0, void 0, void 0, function* () {
        const idsToDelete = checkoutStep === "billing"
            ? savedPaymentMethods.filter(({ addressId }) => addressId === addressIdOrPaymentMethodId).map(({ id }) => id)
            : [addressIdOrPaymentMethodId];
        if (idsToDelete.length === 0)
            return;
        // DELETE LOGIC:
        // We are in BILLING (logic handled in BillingView.tsx):
        // - Delete last payment method => Show form.
        // - Delete payment method, but there's more => Re-set selected address.
        // We are in PAYMENT (logic handled in PaymentView.tsx and below):
        // - Delete last payment method (or last payment method for the selected address) => Expand address and show form.
        // - Delete payment method, but there's more => Re-set selected payment.
        if (checkoutStep === "payment") {
            const addressToDelete = savedPaymentMethods.find(({ id }) => id === addressIdOrPaymentMethodId);
            const addressIdToDelete = addressToDelete === null || addressToDelete === void 0 ? void 0 : addressToDelete.addressId;
            const paymentMethodsWithSameAddress = savedPaymentMethods.filter(({ addressId }) => addressId === addressIdToDelete);
            if (addressToDelete && paymentMethodsWithSameAddress.length === 1) {
                setSelectedPaymentMethod({
                    // The payment method that had the selected address is being deleted, so we just copy its data as an object to
                    // re-create it with the new payment information:
                    billingInfo: savedPaymentMethodToBillingInfo(addressToDelete),
                    paymentInfo: "",
                });
            }
        }
        const promises = idsToDelete.map((paymentMethodID) => {
            return deletePaymentMethod({
                variables: {
                    orgID,
                    paymentMethodID,
                },
            });
        });
        yield Promise.allSettled(promises);
        yield refetchPaymentMethods({ orgID });
    }), [checkoutStep, deletePaymentMethod, orgID, refetchPaymentMethods, savedPaymentMethods]);
    const [paymentReferenceNumber, setPaymentReferenceNumber] = useState("");
    const handlePurchaseSuccess = useCallback((paymentReferenceNumber) => {
        setPaymentReferenceNumber(paymentReferenceNumber);
    }, []);
    const handleReviewData = useCallback(() => {
        // TODO: paymentError should have a source property to know where the error is coming from and handle recovery differently here:
        setPaymentError("");
        setCheckoutStepIndex(2);
    }, []);
    // BLOCK DIALOG LOGIC & SHAKE ANIMATION:
    const [shakeSx, shake] = useShakeAnimation(paperRef.current);
    const [isDialogBlocked, setIsDialogBlocked] = useState(false);
    const onDialogBlocked = useCallback((nextIsDialogBlocked) => {
        setIsDialogBlocked(nextIsDialogBlocked);
    }, []);
    useEffect(() => {
        if (parentTheme && themeOptions) {
            throw new Error("You can't use both `themeOptions` and `theme`. Please, use only one. `themeOptions` is preferred.");
        }
    }, [parentTheme, themeOptions]);
    // PLAID:
    const handlePlaidFlowCompleted = useCallback((paymentInfo) => {
        if (!paymentInfo) {
            resetModalState();
            return;
        }
        handlePaymentInfoSelected(paymentInfo);
        setCheckoutStepIndex(3);
    }, [resetModalState, handlePaymentInfoSelected]);
    const theme = useMemo(() => themeOptions ? createTheme(themeOptions) : parentTheme, [parentTheme, themeOptions]);
    const Wrapper = theme ? ThemeProvider : Fragment;
    const wrapperProps = theme ? { theme } : {};
    if (isDialogLoading || isPlaidFlowLoading) {
        return (React__default.createElement(React__default.Fragment, null,
            isPlaidFlowLoading && React__default.createElement(PlaidFlow, { onSubmit: handlePlaidFlowCompleted }),
            React__default.createElement(Backdrop, { open: open, onClick: onClose }, loaderImageSrc ? (React__default.createElement(Box, { component: "img", src: loaderImageSrc, sx: {
                    width: 196,
                    height: 196,
                    mx: "auto",
                    mt: 5,
                } })) : (React__default.createElement(CircularProgress, { color: "primary" })))));
    }
    let headerVariant = isAuthenticated ? 'loggedIn' : 'guest';
    let checkoutStepElement = null;
    if (paymentError) {
        headerVariant = "error";
        checkoutStepElement = (React__default.createElement(ErrorView, { errorMessage: paymentError, errorImageSrc: errorImageSrc, onReviewData: handleReviewData, onClose: onClose }));
    }
    else if (!checkoutStep) {
        return null;
    }
    else if (checkoutStep === "authentication") {
        if (!isAuthenticated)
            headerVariant = 'anonymous';
        checkoutStepElement = (React__default.createElement(AuthenticationView, { checkoutItem: checkoutItem, isAuthenticated: isAuthenticated, guestCheckoutEnabled: guestCheckoutEnabled, onGuestClicked: handleNextClicked, onCloseClicked: onClose }));
    }
    else if (checkoutStep === "billing") {
        checkoutStepElement = (React__default.createElement(BillingView, { checkoutItem: checkoutItem, savedPaymentMethods: savedPaymentMethods, selectedBillingInfo: selectedPaymentMethod.billingInfo, onBillingInfoSelected: handleBillingInfoSelected, onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted, onNext: handleNextClicked, onClose: onClose, debug: debug }));
    }
    else if (checkoutStep === "payment") {
        checkoutStepElement = (React__default.createElement(PaymentView, { checkoutItem: checkoutItem, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, onPaymentInfoSelected: handlePaymentInfoSelected, onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted, onNext: handleNextClicked, onPrev: handlePrevClicked, onClose: onClose, acceptedPaymentTypes: acceptedPaymentTypes, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, debug: debug }));
    }
    else if (checkoutStep === "purchasing") {
        headerVariant = 'purchasing';
        checkoutStepElement = (React__default.createElement(PurchasingView, { purchasingImageSrc: purchasingImageSrc, purchasingMessages: purchasingMessages, orgID: orgID, invoiceID: invoiceID, lotID: checkoutItem.lotID, lotType: checkoutItem.lotType, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, onPurchaseSuccess: handlePurchaseSuccess, onPurchaseError: setPaymentError, onNext: handleNextClicked, onDialogBlocked: onDialogBlocked, debug: debug }));
    }
    else if (checkoutStep === "confirmation") {
        headerVariant = 'logoOnly';
        checkoutStepElement = (React__default.createElement(ConfirmationView, { checkoutItem: checkoutItem, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, paymentReferenceNumber: paymentReferenceNumber, purchaseInstructions: purchaseInstructions, onNext: handleNextClicked, onClose: onClose }));
    }
    return (React__default.createElement(Wrapper, Object.assign({}, wrapperProps),
        React__default.createElement(Dialog, { open: isDialogBlocked ? true : open, onClose: isDialogBlocked ? undefined : onClose, onBackdropClick: isDialogBlocked ? shake : undefined, "aria-labelledby": "checkout-modal-header-title", fullWidth: true, maxWidth: "sm", scroll: "body", ref: dialogRootRef, PaperProps: { sx: shakeSx, ref: paperRef } },
            React__default.createElement(DialogContent, { sx: {
                    overflowX: 'hidden',
                    pt: {
                        xs: 1.5,
                        sm: 2.5,
                    },
                    px: {
                        xs: 1.5,
                        sm: 2.5,
                    },
                    pb: 0,
                } },
                React__default.createElement(CheckoutModalHeader, { variant: headerVariant, logoSrc: logoSrc, logoSx: logoSx, user: (_a = meData === null || meData === void 0 ? void 0 : meData.me) === null || _a === void 0 ? void 0 : _a.user, userFormat: userFormat, onLoginClicked: onLogin, onPrevClicked: handlePrevClicked }),
                checkoutStepElement))));
};

export { CheckoutModal };
//# sourceMappingURL=CheckoutModal.js.map
