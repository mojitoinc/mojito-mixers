'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var circle_utils = require('../../../domain/circle/circle.utils.js');
var graphqlGenerated = require('../../../queries/graphqlGenerated.js');
var AuthenticationView = require('../../../views/Authentication/AuthenticationView.js');
var BillingView = require('../../../views/Billing/BillingView.js');
var ConfirmationView = require('../../../views/Confirmation/ConfirmationView.js');
var PaymentView = require('../../../views/Payment/PaymentView.js');
var CheckoutModalHeader = require('../CheckoutModalHeader/CheckoutModalHeader.js');
var PurchasingView = require('../../../views/Purchasing/PurchasingView.js');
var ErrorView = require('../../../views/Error/ErrorView.js');
var animationUtils = require('../../../utils/animationUtils.js');
var usePlaid = require('../../../hooks/usePlaid.js');
var CheckoutModal_hooks = require('./CheckoutModal.hooks.js');
var errors_constants = require('../../../domain/errors/errors.constants.js');
var createTheme = require('../../../../node_modules/@mui/material/styles/createTheme.js');
var system = require('@mui/system');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const SELECTOR_DIALOG_SCROLLABLE = "[role=presentation]";
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
orgID, invoiceID, checkoutItems, 
// Authentication:
onLogin, isAuthenticated, isAuthenticatedLoading, 
// Other Events:
debug, onError, onMarketingOptInChange, // Not implemented yet. Used to let user subscribe / unsubscribe to marketing updates.
 }) => {
    var _a;
    const { data: meData, loading: meLoading, error: meError, refetch: meRefetch, } = graphqlGenerated.useMeQuery({ skip: !isAuthenticated });
    const { data: paymentMethodsData, loading: paymentMethodsLoading, error: paymentMethodsError, refetch: refetchPaymentMethods, } = graphqlGenerated.useGetPaymentMethodListQuery({
        skip: !isAuthenticated,
        variables: {
            orgID,
        },
    });
    const [deletePaymentMethod] = graphqlGenerated.useDeletePaymentMethodMutation();
    const isDialogLoading = isAuthenticatedLoading || meLoading || paymentMethodsLoading;
    const isPlaidFlowLoading = usePlaid.continuePlaidOAuthFlow();
    const rawSavedPaymentMethods = paymentMethodsData === null || paymentMethodsData === void 0 ? void 0 : paymentMethodsData.getPaymentMethodList;
    const savedPaymentMethods = React.useMemo(() => circle_utils.transformRawSavedPaymentMethods(rawSavedPaymentMethods), [rawSavedPaymentMethods]);
    const dialogRootRef = React.useRef(null);
    const paperRef = React.useRef(null);
    const { 
    // CheckoutModalState:
    checkoutStep, checkoutError, resetModalState, goBack, goNext, goTo, setError, 
    // SelectedPaymentMethod:
    selectedPaymentMethod, setSelectedPaymentMethod, } = CheckoutModal_hooks.useCheckoutModalState({
        productConfirmationEnabled,
        isAuthenticated,
        onError,
    });
    React.useEffect(() => {
        var _a;
        const dialogScrollable = (_a = dialogRootRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(SELECTOR_DIALOG_SCROLLABLE);
        // Scroll to top on step change:
        if (checkoutStep && dialogScrollable)
            dialogScrollable.scrollTop = 0;
    }, [checkoutStep]);
    React.useEffect(() => {
        if (isDialogLoading || !open)
            return;
        resetModalState();
    }, [isDialogLoading, open, resetModalState]);
    React.useEffect(() => {
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
                const addressId = circle_utils.getSavedPaymentMethodAddressIdFromBillingInfo(billingInfo);
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
    React.useEffect(() => {
        if (meError)
            setError(errors_constants.ERROR_LOADING_USER(meError));
        if (paymentMethodsError)
            setError(errors_constants.ERROR_LOADING_PAYMENT_METHODS(paymentMethodsError));
    }, [meError, paymentMethodsError, setError]);
    const handleBillingInfoSelected = React.useCallback((billingInfo) => {
        // If we go back to the billing info step to fix some validation errors or change some data, we preserve the data
        // in the payment info step (form) as long as it was not a saved payment method. In that case, the saved payment
        // method doesn't belong to the now updated billing info anymore, so we do reset it:
        setSelectedPaymentMethod(({ paymentInfo }) => ({ billingInfo, paymentInfo: typeof paymentInfo === "object" ? paymentInfo : "", cvv: "" }));
    }, [setSelectedPaymentMethod]);
    const handlePaymentInfoSelected = React.useCallback((paymentInfo) => {
        setSelectedPaymentMethod(({ billingInfo }) => ({ billingInfo, paymentInfo, cvv: "" }));
    }, [setSelectedPaymentMethod]);
    const handleCvvSelected = React.useCallback((cvv) => {
        setSelectedPaymentMethod(({ billingInfo, paymentInfo }) => ({ billingInfo, paymentInfo, cvv }));
    }, [setSelectedPaymentMethod]);
    const handleSavedPaymentMethodDeleted = React.useCallback((addressIdOrPaymentMethodId) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
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
                    billingInfo: circle_utils.savedPaymentMethodToBillingInfo(addressToDelete),
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
    const [paymentReferenceNumber, setPaymentReferenceNumber] = React.useState("");
    const handlePurchaseSuccess = React.useCallback((paymentReferenceNumber) => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        // After a successful purchase, a new payment method might have been created, so we reload them:
        yield refetchPaymentMethods();
        setPaymentReferenceNumber(paymentReferenceNumber);
        goNext();
    }), [refetchPaymentMethods, goNext]);
    const handleFixError = React.useCallback(() => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        // After an error, all data is reloaded in case the issue was caused by stale/cached data or in case a new payment
        // method has been created despite the error:
        yield Promise.allSettled([
            meRefetch(),
            refetchPaymentMethods(),
        ]);
        if (checkoutError.at !== "purchasing") {
            // If we are redirecting users to the PurchasingView again, we keep the CVV to be able to re-try the purchase:
            setSelectedPaymentMethod((prevSelectedPaymentMethod) => (Object.assign(Object.assign({}, prevSelectedPaymentMethod), { cvv: "" })));
        }
        goTo(checkoutError.at || errors_constants.DEFAULT_ERROR_AT, checkoutError);
        // This function is used as a CheckoutModalFooter's onSubmitClicked, so we want that to show a loader on the submit
        // button when clicked but do not remove it once the Promise is resolved, as we are moving to another view and
        // CheckoutModalFooter will unmount (so doing this prevents a memory leak issue):
        return false;
    }), [meRefetch, refetchPaymentMethods, setSelectedPaymentMethod, goTo, checkoutError]);
    // BLOCK DIALOG LOGIC & SHAKE ANIMATION:
    const [shakeSx, shake] = animationUtils.useShakeAnimation(paperRef.current);
    const [isDialogBlocked, setIsDialogBlocked] = React.useState(false);
    React.useEffect(() => {
        if (parentTheme && themeOptions) {
            throw new Error("You can't use both `themeOptions` and `theme`. Please, use only one. `themeOptions` is preferred.");
        }
    }, [parentTheme, themeOptions]);
    // PLAID:
    const handlePlaidFlowCompleted = React.useCallback((paymentInfo) => {
        if (!paymentInfo) {
            resetModalState();
            return;
        }
        handlePaymentInfoSelected(paymentInfo);
        goTo("purchasing");
    }, [resetModalState, handlePaymentInfoSelected, goTo]);
    const theme = React.useMemo(() => themeOptions ? createTheme["default"](themeOptions) : parentTheme, [parentTheme, themeOptions]);
    const Wrapper = theme ? system.ThemeProvider : React.Fragment;
    const wrapperProps = theme ? { theme } : {};
    if (isDialogLoading || isPlaidFlowLoading) {
        return (React__default["default"].createElement(React__default["default"].Fragment, null,
            isPlaidFlowLoading && React__default["default"].createElement(usePlaid.PlaidFlow, { onSubmit: handlePlaidFlowCompleted }),
            React__default["default"].createElement(material.Backdrop, { open: open, onClick: onClose }, loaderImageSrc ? (React__default["default"].createElement(material.Box, { component: "img", src: loaderImageSrc, sx: {
                    width: 196,
                    height: 196,
                    mx: "auto",
                    mt: 5,
                } })) : (React__default["default"].createElement(material.CircularProgress, { color: "primary" })))));
    }
    let headerVariant = isAuthenticated ? 'loggedIn' : 'guest';
    let checkoutStepElement = null;
    if (checkoutStep === "error") {
        headerVariant = "error";
        checkoutStepElement = (React__default["default"].createElement(ErrorView.ErrorView, { checkoutError: checkoutError, errorImageSrc: errorImageSrc, onFixError: handleFixError, onClose: onClose, debug: debug }));
    }
    else if (!checkoutStep) {
        return null;
    }
    else if (checkoutStep === "authentication") {
        if (!isAuthenticated)
            headerVariant = 'anonymous';
        checkoutStepElement = (React__default["default"].createElement(AuthenticationView.AuthenticationView, { checkoutItems: checkoutItems, isAuthenticated: isAuthenticated, guestCheckoutEnabled: guestCheckoutEnabled, onGuestClicked: goNext, onCloseClicked: onClose }));
    }
    else if (checkoutStep === "billing") {
        checkoutStepElement = (React__default["default"].createElement(BillingView.BillingView, { checkoutItems: checkoutItems, savedPaymentMethods: savedPaymentMethods, selectedBillingInfo: selectedPaymentMethod.billingInfo, checkoutError: checkoutError, onBillingInfoSelected: handleBillingInfoSelected, onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted, onNext: goNext, onClose: onClose, debug: debug }));
    }
    else if (checkoutStep === "payment") {
        checkoutStepElement = (React__default["default"].createElement(PaymentView.PaymentView, { checkoutItems: checkoutItems, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, checkoutError: checkoutError, onPaymentInfoSelected: handlePaymentInfoSelected, onCvvSelected: handleCvvSelected, onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted, onNext: goNext, onPrev: goBack, onClose: onClose, acceptedPaymentTypes: acceptedPaymentTypes, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, debug: debug }));
    }
    else if (checkoutStep === "purchasing") {
        headerVariant = "purchasing";
        checkoutStepElement = (React__default["default"].createElement(PurchasingView.PurchasingView, { purchasingImageSrc: purchasingImageSrc, purchasingMessages: purchasingMessages, orgID: orgID, invoiceID: invoiceID, checkoutItems: checkoutItems, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, onPurchaseSuccess: handlePurchaseSuccess, onPurchaseError: setError, onDialogBlocked: setIsDialogBlocked, debug: debug }));
    }
    else if (checkoutStep === "confirmation") {
        headerVariant = "logoOnly";
        checkoutStepElement = (React__default["default"].createElement(ConfirmationView.ConfirmationView, { checkoutItems: checkoutItems, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, paymentReferenceNumber: paymentReferenceNumber, purchaseInstructions: purchaseInstructions, onNext: onClose, onClose: onClose }));
    }
    return (React__default["default"].createElement(Wrapper, Object.assign({}, wrapperProps),
        React__default["default"].createElement(material.Dialog, { open: isDialogBlocked ? true : open, onClose: isDialogBlocked ? shake : onClose, "aria-labelledby": "checkout-modal-header-title", scroll: "body", ref: dialogRootRef, PaperProps: { sx: shakeSx, ref: paperRef }, 
            // Dialog only:
            // fullWidth
            // maxWidth="sm"
            fullScreen: true },
            React__default["default"].createElement(material.DialogContent, { sx: {
                    overflowX: 'hidden',
                    px: {
                        xs: 1.5,
                        sm: 2.5,
                    },
                    py: 2.5,
                    maxWidth: theme => theme.breakpoints.values.lg,
                    mx: "auto",
                } },
                React__default["default"].createElement(CheckoutModalHeader.CheckoutModalHeader, { variant: headerVariant, logoSrc: logoSrc, logoSx: logoSx, user: (_a = meData === null || meData === void 0 ? void 0 : meData.me) === null || _a === void 0 ? void 0 : _a.user, userFormat: userFormat, onLoginClicked: onLogin, onPrevClicked: checkoutStep === "authentication" ? onClose : goBack }),
                checkoutStepElement))));
};

exports.CheckoutModal = CheckoutModal;
//# sourceMappingURL=CheckoutModal.js.map
