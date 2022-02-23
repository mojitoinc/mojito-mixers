import { __awaiter } from '../../../../node_modules/tslib/tslib.es6.js';
import { Backdrop, Box, CircularProgress } from '@mui/material';
import React__default, { useRef, useMemo, useEffect, useCallback, useState } from 'react';
import { transformRawSavedPaymentMethods, getSavedPaymentMethodAddressIdFromBillingInfo, savedPaymentMethodToBillingInfo } from '../../../domain/circle/circle.utils.js';
import { useMeQuery, useGetPaymentMethodListQuery, useGetInvoiceDetailsQuery, useDeletePaymentMethodMutation } from '../../../queries/graphqlGenerated.js';
import { AuthenticationView } from '../../../views/Authentication/AuthenticationView.js';
import { BillingView } from '../../../views/Billing/BillingView.js';
import { ConfirmationView } from '../../../views/Confirmation/ConfirmationView.js';
import { PaymentView } from '../../../views/Payment/PaymentView.js';
import { CheckoutModalHeader } from '../../payments/CheckoutModalHeader/CheckoutModalHeader.js';
import { PurchasingView } from '../../../views/Purchasing/PurchasingView.js';
import { ErrorView } from '../../../views/Error/ErrorView.js';
import { continuePlaidOAuthFlow, PlaidFlow } from '../../../hooks/usePlaid.js';
import { useCheckoutModalState } from './CheckoutOverlay.hooks.js';
import { ERROR_LOADING_USER, ERROR_LOADING_PAYMENT_METHODS, ERROR_LOADING_INVOICE, DEFAULT_ERROR_AT } from '../../../domain/errors/errors.constants.js';
import { FullScreenOverlay } from '../../shared/FullScreenOverlay/FullScreenOverlay.js';
import { withProviders } from '../../shared/ProvidersInjector/ProvidersInjector.js';
import { transformCheckoutItemsFromInvoice } from '../../../domain/product/product.utils.js';
import { useCreateInvoiceAndReservation } from '../../../hooks/useCreateInvoiceAndReservation.js';

const SELECTOR_DIALOG_SCROLLABLE = "[role=presentation]";
const PUICheckoutOverlay = ({ 
// Modal:
open, onClose, 
// Flow:
guestCheckoutEnabled, productConfirmationEnabled, 
// Personalization:
theme: parentTheme, themeOptions, logoSrc, logoSx, loaderImageSrc, purchasingImageSrc, purchasingMessages, errorImageSrc, userFormat, acceptedPaymentTypes, paymentLimits, // Not implemented yet. Used to show payment limits for some payment types.
customTexts, 
// Legal:
consentType, // Not implemented yet. Used to let the app control where to log errors to (e.g. Sentry).
privacyHref, termsOfUseHref, 
// Data:
orgID, invoiceID: initialInvoiceID, checkoutItems: parentCheckoutItems, 
// Authentication:
onLogin, isAuthenticated, isAuthenticatedLoading, 
// Other Events:
debug, onError, onMarketingOptInChange, // Not implemented yet. Used to let user subscribe / unsubscribe to marketing updates.
 }) => {
    var _a;
    const dialogRootRef = useRef(null);
    const { data: meData, loading: meLoading, error: meError, refetch: meRefetch, } = useMeQuery({ skip: !isAuthenticated });
    const { data: paymentMethodsData, loading: paymentMethodsLoading, error: paymentMethodsError, refetch: refetchPaymentMethods, } = useGetPaymentMethodListQuery({
        skip: !isAuthenticated,
        variables: { orgID },
    });
    const { 
    // CheckoutModalState:
    checkoutStep, checkoutError, initModalState, goBack, goNext, goTo, setError, 
    // SelectedPaymentMethod:
    selectedPaymentMethod, setSelectedPaymentMethod, 
    // PurchaseState:
    invoiceID, paymentReferenceNumber, setInvoiceID, setPaymentReferenceNumber, } = useCheckoutModalState({
        invoiceID: initialInvoiceID,
        productConfirmationEnabled,
        isAuthenticated,
        onError,
    });
    const { data: invoiceDetailsData, loading: invoiceDetailsLoading, error: invoiceDetailsError, refetch: refetchInvoiceDetails, } = useGetInvoiceDetailsQuery({
        skip: !invoiceID,
        variables: { orgID, invoiceID },
    });
    // Modal loading state:
    const isDialogLoading = isAuthenticatedLoading || meLoading || paymentMethodsLoading;
    const isDialogInitializing = isDialogLoading || invoiceDetailsLoading || !invoiceID;
    const isPlaidFlowLoading = continuePlaidOAuthFlow();
    // Payment methods and checkout items / invoice items transforms:
    const rawSavedPaymentMethods = paymentMethodsData === null || paymentMethodsData === void 0 ? void 0 : paymentMethodsData.getPaymentMethodList;
    const invoiceItems = invoiceDetailsData === null || invoiceDetailsData === void 0 ? void 0 : invoiceDetailsData.getInvoiceDetails.items;
    const checkoutItems = useMemo(() => transformCheckoutItemsFromInvoice(parentCheckoutItems, invoiceItems), [parentCheckoutItems, invoiceItems]);
    const savedPaymentMethods = useMemo(() => transformRawSavedPaymentMethods(rawSavedPaymentMethods), [rawSavedPaymentMethods]);
    const [createInvoiceAndReservationState, createInvoiceAndReservation] = useCreateInvoiceAndReservation({
        orgID,
        checkoutItems,
        debug,
    });
    useEffect(() => {
        var _a;
        const dialogScrollable = (_a = dialogRootRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(SELECTOR_DIALOG_SCROLLABLE);
        // Scroll to top on step change:
        if (checkoutStep && dialogScrollable)
            dialogScrollable.scrollTop = 0;
    }, [checkoutStep]);
    useEffect(() => {
        if (isDialogLoading || !open)
            return;
        initModalState();
    }, [isDialogLoading, open, initModalState]);
    const createInvoiceAndReservationCalledRef = useRef(false);
    useEffect(() => {
        if (isDialogLoading || invoiceID === null || invoiceID || createInvoiceAndReservationCalledRef.current)
            return;
        createInvoiceAndReservationCalledRef.current = true;
        createInvoiceAndReservation();
    }, [isDialogLoading, invoiceID, createInvoiceAndReservation]);
    useEffect(() => {
        if (createInvoiceAndReservationState.error) {
            setError(createInvoiceAndReservationState.error);
        }
        else if (createInvoiceAndReservationState.invoiceID) {
            setInvoiceID(createInvoiceAndReservationState.invoiceID);
        }
    }, [createInvoiceAndReservationState, setError, setInvoiceID]);
    const handleClose = useCallback(() => {
        createInvoiceAndReservationCalledRef.current = false;
        setInvoiceID(null);
        onClose();
    }, [setInvoiceID, onClose]);
    useEffect(() => {
        if (savedPaymentMethods.length === 0)
            return;
        // When reloading the saved payment methods after an error, we might have form data that matches a payment method
        // that has just been created, so we want to update it to reference the existing one:
        setSelectedPaymentMethod((prevSelectedPaymentMethod) => {
            const { billingInfo, paymentInfo } = prevSelectedPaymentMethod;
            if (typeof billingInfo === "string" && typeof paymentInfo === "string")
                return Object.assign(Object.assign({}, prevSelectedPaymentMethod), { cvv: "" });
            // To find the saved payment method(s) that was/were last created:
            const reversedSavedPaymentMethods = savedPaymentMethods.slice().reverse();
            // TODO: This logic can probably be simplified. Just get the last saved payment method...
            let matchingPaymentMethod;
            if (typeof billingInfo === "object") {
                const addressId = getSavedPaymentMethodAddressIdFromBillingInfo(billingInfo);
                matchingPaymentMethod = reversedSavedPaymentMethods.find(paymentMethod => paymentMethod.addressId === addressId);
            }
            return matchingPaymentMethod ? {
                // Both billingInfo and paymentInfo were objects (and we found a matching newly created payment method):
                billingInfo: matchingPaymentMethod.addressId,
                paymentInfo: matchingPaymentMethod.id,
                cvv: "",
            } : {
                // billingInfo was an addressID (or we could not find a match) and paymentInfo was an object:
                billingInfo,
                paymentInfo: typeof billingInfo === "string" ? reversedSavedPaymentMethods[0].id : paymentInfo,
                cvv: "",
            };
        });
    }, [savedPaymentMethods, setSelectedPaymentMethod]);
    useEffect(() => {
        if (meError)
            setError(ERROR_LOADING_USER(meError));
        if (paymentMethodsError)
            setError(ERROR_LOADING_PAYMENT_METHODS(paymentMethodsError));
        if (invoiceDetailsError)
            setError(ERROR_LOADING_INVOICE(invoiceDetailsError));
    }, [meError, paymentMethodsError, invoiceDetailsError, setError]);
    const handleBillingInfoSelected = useCallback((billingInfo) => {
        // If we go back to the billing info step to fix some validation errors or change some data, we preserve the data
        // in the payment info step (form) as long as it was not a saved payment method. In that case, the saved payment
        // method doesn't belong to the now updated billing info anymore, so we do reset it:
        setSelectedPaymentMethod(({ paymentInfo }) => ({ billingInfo, paymentInfo: typeof paymentInfo === "object" ? paymentInfo : "", cvv: "" }));
    }, [setSelectedPaymentMethod]);
    const handlePaymentInfoSelected = useCallback((paymentInfo) => {
        setSelectedPaymentMethod(({ billingInfo }) => ({ billingInfo, paymentInfo, cvv: "" }));
    }, [setSelectedPaymentMethod]);
    const handleCvvSelected = useCallback((cvv) => {
        setSelectedPaymentMethod(({ billingInfo, paymentInfo }) => ({ billingInfo, paymentInfo, cvv }));
    }, [setSelectedPaymentMethod]);
    const [deletePaymentMethod] = useDeletePaymentMethodMutation();
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
                    cvv: "",
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
    }), [checkoutStep, deletePaymentMethod, orgID, refetchPaymentMethods, savedPaymentMethods, setSelectedPaymentMethod]);
    const handlePurchaseSuccess = useCallback((nextPaymentReferenceNumber) => __awaiter(void 0, void 0, void 0, function* () {
        // After a successful purchase, a new payment method might have been created, so we reload them:
        yield refetchPaymentMethods();
        setPaymentReferenceNumber(nextPaymentReferenceNumber);
        goNext();
    }), [refetchPaymentMethods, setPaymentReferenceNumber, goNext]);
    const handleFixError = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        // After an error, all data is reloaded in case the issue was caused by stale/cached data or in case a new payment
        // method has been created despite the error:
        yield Promise.allSettled([
            meRefetch(),
            refetchPaymentMethods(),
            refetchInvoiceDetails(),
        ]);
        if (checkoutError.at !== "purchasing") {
            // If we are redirecting users to the PurchasingView again, we keep the CVV to be able to re-try the purchase:
            setSelectedPaymentMethod((prevSelectedPaymentMethod) => (Object.assign(Object.assign({}, prevSelectedPaymentMethod), { cvv: "" })));
        }
        goTo(checkoutError.at || DEFAULT_ERROR_AT, checkoutError);
        // This function is used as a CheckoutModalFooter's onSubmitClicked, so we want that to show a loader on the submit
        // button when clicked but do not remove it once the Promise is resolved, as we are moving to another view and
        // CheckoutModalFooter will unmount (so doing this prevents a memory leak issue):
        return false;
    }), [meRefetch, refetchPaymentMethods, refetchInvoiceDetails, setSelectedPaymentMethod, goTo, checkoutError]);
    // BLOCK DIALOG LOGIC & SHAKE ANIMATION:
    // TODO: Move to hook.
    const [isDialogBlocked, setIsDialogBlocked] = useState(false);
    // PLAID:
    const handlePlaidFlowCompleted = useCallback((paymentInfo) => {
        if (!paymentInfo) {
            initModalState();
            return;
        }
        handlePaymentInfoSelected(paymentInfo);
        goTo("purchasing");
    }, [initModalState, handlePaymentInfoSelected, goTo]);
    if (isDialogInitializing || isPlaidFlowLoading) {
        return (React__default.createElement(React__default.Fragment, null,
            isPlaidFlowLoading && React__default.createElement(PlaidFlow, { onSubmit: handlePlaidFlowCompleted }),
            React__default.createElement(Backdrop, { open: open, onClick: handleClose }, loaderImageSrc ? (React__default.createElement(Box, { component: "img", src: loaderImageSrc, sx: {
                    width: 196,
                    height: 196,
                    mx: "auto",
                    mt: 5,
                } })) : (React__default.createElement(CircularProgress, { color: "primary" })))));
    }
    let headerVariant = isAuthenticated ? 'loggedIn' : 'guest';
    let checkoutStepElement = null;
    if (checkoutStep === "error") {
        headerVariant = "error";
        checkoutStepElement = (React__default.createElement(ErrorView, { checkoutError: checkoutError, errorImageSrc: errorImageSrc, onFixError: handleFixError, onClose: handleClose, debug: debug }));
    }
    else if (!checkoutStep) {
        return null;
    }
    else if (checkoutStep === "authentication") {
        if (!isAuthenticated)
            headerVariant = 'anonymous';
        checkoutStepElement = (React__default.createElement(AuthenticationView, { checkoutItems: checkoutItems, isAuthenticated: isAuthenticated, guestCheckoutEnabled: guestCheckoutEnabled, onGuestClicked: goNext, onCloseClicked: handleClose }));
    }
    else if (checkoutStep === "billing") {
        checkoutStepElement = (React__default.createElement(BillingView, { checkoutItems: checkoutItems, savedPaymentMethods: savedPaymentMethods, selectedBillingInfo: selectedPaymentMethod.billingInfo, checkoutError: checkoutError, onBillingInfoSelected: handleBillingInfoSelected, onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted, onNext: goNext, onClose: handleClose, debug: debug }));
    }
    else if (checkoutStep === "payment") {
        checkoutStepElement = (React__default.createElement(PaymentView, { checkoutItems: checkoutItems, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, checkoutError: checkoutError, onPaymentInfoSelected: handlePaymentInfoSelected, onCvvSelected: handleCvvSelected, onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted, onNext: goNext, onPrev: goBack, onClose: handleClose, acceptedPaymentTypes: acceptedPaymentTypes, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, wirePaymentsDisclaimerText: customTexts.wirePaymentsDisclaimer, debug: debug }));
    }
    else if (checkoutStep === "purchasing") {
        headerVariant = "purchasing";
        checkoutStepElement = (React__default.createElement(PurchasingView, { purchasingImageSrc: purchasingImageSrc, purchasingMessages: purchasingMessages, orgID: orgID, invoiceID: invoiceID, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, onPurchaseSuccess: handlePurchaseSuccess, onPurchaseError: setError, onDialogBlocked: setIsDialogBlocked, debug: debug }));
    }
    else if (checkoutStep === "confirmation") {
        headerVariant = "logoOnly";
        checkoutStepElement = (React__default.createElement(ConfirmationView, { checkoutItems: checkoutItems, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, paymentReferenceNumber: paymentReferenceNumber, purchaseInstructions: customTexts.purchaseInstructions, onNext: handleClose }));
    }
    const headerElement = (React__default.createElement(CheckoutModalHeader, { variant: headerVariant, logoSrc: logoSrc, logoSx: logoSx, user: (_a = meData === null || meData === void 0 ? void 0 : meData.me) === null || _a === void 0 ? void 0 : _a.user, userFormat: userFormat, onLoginClicked: onLogin, onPrevClicked: checkoutStep === "authentication" ? handleClose : goBack }));
    return (React__default.createElement(FullScreenOverlay, { centered: checkoutStep === "purchasing" || checkoutStep === "error", open: open, onClose: handleClose, isDialogBlocked: isDialogBlocked, dialogRootRef: dialogRootRef, header: headerElement, children: checkoutStepElement }));
};
const PUICheckout = withProviders(PUICheckoutOverlay);

export { PUICheckout, PUICheckoutOverlay };
//# sourceMappingURL=CheckoutOverlay.js.map