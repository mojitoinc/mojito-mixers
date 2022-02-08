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
var CheckoutStepper = require('../CheckoutStepper/CheckoutStepper.js');
var usePlaid = require('../../../hooks/usePlaid.js');
var createTheme = require('../../../../node_modules/@mui/material/styles/createTheme.js');
var system = require('@mui/system');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
    const { data: meData, loading: meLoading, error: meError } = graphqlGenerated.useMeQuery({ skip: !isAuthenticated });
    const [deletePaymentMethod] = graphqlGenerated.useDeletePaymentMethodMutation();
    const { data: paymentMethodsData, loading: paymentMethodsLoading, error: paymentMethodsError, refetch: refetchPaymentMethods, } = graphqlGenerated.useGetPaymentMethodListQuery({
        skip: !isAuthenticated,
        variables: {
            orgID,
        },
    });
    const isDialogLoading = isAuthenticatedLoading || meLoading || paymentMethodsLoading;
    const isPlaidFlowLoading = usePlaid.continuePlaidOAuthFlow();
    const startAt = !isAuthenticated || productConfirmationEnabled ? 0 : 1;
    const rawSavedPaymentMethods = paymentMethodsData === null || paymentMethodsData === void 0 ? void 0 : paymentMethodsData.getPaymentMethodList;
    const savedPaymentMethods = React.useMemo(() => circle_utils.transformRawSavedPaymentMethods(rawSavedPaymentMethods), [rawSavedPaymentMethods]);
    const dialogRootRef = React.useRef(null);
    const paperRef = React.useRef(null);
    const [paymentError, setPaymentError] = React.useState("");
    const [checkoutStepIndex, setCheckoutStepIndex] = React.useState(0);
    const [selectedPaymentMethod, setSelectedPaymentMethod] = React.useState({
        billingInfo: "",
        paymentInfo: "",
    });
    const checkoutStep = CHECKOUT_STEPS[checkoutStepIndex];
    React.useEffect(() => {
        var _a;
        const dialogScrollable = (_a = dialogRootRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(SELECTOR_DIALOG_SCROLLABLE);
        // Scroll to top on step change:
        if (checkoutStep && dialogScrollable)
            dialogScrollable.scrollTop = 0;
    }, [checkoutStep]);
    const resetModalState = React.useCallback(() => {
        // Make sure the progress tracker in BillingView and PaymentView is properly animated:
        CheckoutStepper.resetStepperProgress();
        // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
        // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
        const { selectedBillingInfo, continueOAuthFlow, savedStateUsed } = usePlaid.INITIAL_PLAID_OAUTH_FLOW_STATE;
        setPaymentError("");
        setCheckoutStepIndex(continueOAuthFlow && !savedStateUsed ? 3 : startAt);
        setSelectedPaymentMethod({ billingInfo: selectedBillingInfo || "", paymentInfo: "" });
    }, [startAt]);
    React.useEffect(() => {
        if (isDialogLoading || !open)
            return;
        resetModalState();
    }, [isDialogLoading, open, resetModalState]);
    React.useEffect(() => {
        if (!checkoutStep)
            onClose();
    }, [checkoutStep, onClose]);
    React.useEffect(() => {
        // TODO: After an error, a payment method might have been created anyway. Reload them.
        // TODO: Refetch these when coming back from error screen:
        if (meError)
            setPaymentError("User could not be loaded.");
        if (paymentMethodsError)
            setPaymentError("Payment methods could not be loaded.");
    }, [meError, paymentMethodsError, checkoutItem, invoiceID]);
    const handlePrevClicked = React.useCallback(() => {
        setCheckoutStepIndex((prevCheckoutStepIndex) => prevCheckoutStepIndex - 1);
    }, []);
    const handleNextClicked = React.useCallback(() => {
        setCheckoutStepIndex(prevCheckoutStepIndex => prevCheckoutStepIndex + 1);
    }, []);
    const handleBillingInfoSelected = React.useCallback((billingInfo) => {
        // TODO: Does paymentInfo need to be reset when coming back to billing info to fix validation errors?
        setSelectedPaymentMethod({ billingInfo, paymentInfo: "" });
    }, []);
    const handlePaymentInfoSelected = React.useCallback((paymentInfo) => {
        setSelectedPaymentMethod(({ billingInfo }) => ({ billingInfo, paymentInfo }));
    }, []);
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
    const [paymentReferenceNumber, setPaymentReferenceNumber] = React.useState("");
    const handlePurchaseSuccess = React.useCallback((paymentReferenceNumber) => {
        setPaymentReferenceNumber(paymentReferenceNumber);
    }, []);
    const handleReviewData = React.useCallback(() => {
        // TODO: paymentError should have a source property to know where the error is coming from and handle recovery differently here:
        setPaymentError("");
        setCheckoutStepIndex(2);
    }, []);
    // BLOCK DIALOG LOGIC & SHAKE ANIMATION:
    const [shakeSx, shake] = animationUtils.useShakeAnimation(paperRef.current);
    const [isDialogBlocked, setIsDialogBlocked] = React.useState(false);
    const onDialogBlocked = React.useCallback((nextIsDialogBlocked) => {
        setIsDialogBlocked(nextIsDialogBlocked);
    }, []);
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
        setCheckoutStepIndex(3);
    }, [resetModalState, handlePaymentInfoSelected]);
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
    if (paymentError) {
        headerVariant = "error";
        checkoutStepElement = (React__default["default"].createElement(ErrorView.ErrorView, { errorMessage: paymentError, errorImageSrc: errorImageSrc, onReviewData: handleReviewData, onClose: onClose }));
    }
    else if (!checkoutStep) {
        return null;
    }
    else if (checkoutStep === "authentication") {
        if (!isAuthenticated)
            headerVariant = 'anonymous';
        checkoutStepElement = (React__default["default"].createElement(AuthenticationView.AuthenticationView, { checkoutItem: checkoutItem, isAuthenticated: isAuthenticated, guestCheckoutEnabled: guestCheckoutEnabled, onGuestClicked: handleNextClicked, onCloseClicked: onClose }));
    }
    else if (checkoutStep === "billing") {
        checkoutStepElement = (React__default["default"].createElement(BillingView.BillingView, { checkoutItem: checkoutItem, savedPaymentMethods: savedPaymentMethods, selectedBillingInfo: selectedPaymentMethod.billingInfo, onBillingInfoSelected: handleBillingInfoSelected, onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted, onNext: handleNextClicked, onClose: onClose, debug: debug }));
    }
    else if (checkoutStep === "payment") {
        checkoutStepElement = (React__default["default"].createElement(PaymentView.PaymentView, { checkoutItem: checkoutItem, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, onPaymentInfoSelected: handlePaymentInfoSelected, onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted, onNext: handleNextClicked, onPrev: handlePrevClicked, onClose: onClose, acceptedPaymentTypes: acceptedPaymentTypes, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, debug: debug }));
    }
    else if (checkoutStep === "purchasing") {
        headerVariant = 'purchasing';
        checkoutStepElement = (React__default["default"].createElement(PurchasingView.PurchasingView, { purchasingImageSrc: purchasingImageSrc, purchasingMessages: purchasingMessages, orgID: orgID, invoiceID: invoiceID, lotID: checkoutItem.lotID, lotType: checkoutItem.lotType, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, onPurchaseSuccess: handlePurchaseSuccess, onPurchaseError: setPaymentError, onNext: handleNextClicked, onDialogBlocked: onDialogBlocked, debug: debug }));
    }
    else if (checkoutStep === "confirmation") {
        headerVariant = 'logoOnly';
        checkoutStepElement = (React__default["default"].createElement(ConfirmationView.ConfirmationView, { checkoutItem: checkoutItem, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, paymentReferenceNumber: paymentReferenceNumber, purchaseInstructions: purchaseInstructions, onNext: handleNextClicked, onClose: onClose }));
    }
    return (React__default["default"].createElement(Wrapper, Object.assign({}, wrapperProps),
        React__default["default"].createElement(material.Dialog, { open: isDialogBlocked ? true : open, onClose: isDialogBlocked ? undefined : onClose, onBackdropClick: isDialogBlocked ? shake : undefined, "aria-labelledby": "checkout-modal-header-title", fullWidth: true, maxWidth: "sm", scroll: "body", ref: dialogRootRef, PaperProps: { sx: shakeSx, ref: paperRef } },
            React__default["default"].createElement(material.DialogContent, { sx: {
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
                React__default["default"].createElement(CheckoutModalHeader.CheckoutModalHeader, { variant: headerVariant, logoSrc: logoSrc, logoSx: logoSx, user: (_a = meData === null || meData === void 0 ? void 0 : meData.me) === null || _a === void 0 ? void 0 : _a.user, userFormat: userFormat, onLoginClicked: onLogin, onPrevClicked: handlePrevClicked }),
                checkoutStepElement))));
};

exports.CheckoutModal = CheckoutModal;
//# sourceMappingURL=CheckoutModal.js.map
