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

var SELECTOR_DIALOG_SCROLLABLE = "[role=presentation]";
var CHECKOUT_STEPS = ["authentication", "billing", "payment", "purchasing", "confirmation"];
var CheckoutModal = function (_a) {
    var _b;
    var // Modal:
    open = _a.open, onClose = _a.onClose, 
    // Flow:
    guestCheckoutEnabled = _a.guestCheckoutEnabled, productConfirmationEnabled = _a.productConfirmationEnabled, 
    // Personalization:
    parentTheme = _a.theme, themeOptions = _a.themeOptions, logoSrc = _a.logoSrc, logoSx = _a.logoSx, loaderImageSrc = _a.loaderImageSrc, purchasingImageSrc = _a.purchasingImageSrc, purchasingMessages = _a.purchasingMessages, errorImageSrc = _a.errorImageSrc, userFormat = _a.userFormat, acceptedPaymentTypes = _a.acceptedPaymentTypes; _a.paymentLimits; // Not implemented yet. Used to show payment limits for some payment types.
    var purchaseInstructions = _a.purchaseInstructions; 
    // Legal:
    _a.consentType; // Not implemented yet. Used to let the app control where to log errors to (e.g. Sentry).
    var privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref, 
    // Data:
    orgID = _a.orgID, invoiceID = _a.invoiceID, checkoutItem = _a.checkoutItem, 
    // Authentication:
    onLogin = _a.onLogin, isAuthenticated = _a.isAuthenticated, isAuthenticatedLoading = _a.isAuthenticatedLoading; 
    // Other Events:
    _a.onError; // Not implemented yet. Used to let the app control where to log errors to (e.g. Sentry).
    _a.onMarketingOptInChange;
    var _c = graphqlGenerated.useMeQuery({ skip: !isAuthenticated }), meData = _c.data, meLoading = _c.loading, meError = _c.error;
    var deletePaymentMethod = graphqlGenerated.useDeletePaymentMethodMutation()[0];
    var _d = graphqlGenerated.useGetPaymentMethodListQuery({
        skip: !isAuthenticated,
        variables: {
            orgID: orgID,
        },
    }), paymentMethodsData = _d.data, paymentMethodsLoading = _d.loading, paymentMethodsError = _d.error, refetchPaymentMethods = _d.refetch;
    var isDialogLoading = isAuthenticatedLoading || meLoading || paymentMethodsLoading;
    var isPlaidFlowLoading = usePlaid.continuePlaidOAuthFlow();
    var startAt = !isAuthenticated || productConfirmationEnabled ? 0 : 1;
    var rawSavedPaymentMethods = paymentMethodsData === null || paymentMethodsData === void 0 ? void 0 : paymentMethodsData.getPaymentMethodList;
    var savedPaymentMethods = React.useMemo(function () { return circle_utils.transformRawSavedPaymentMethods(rawSavedPaymentMethods); }, [rawSavedPaymentMethods]);
    var dialogRootRef = React.useRef(null);
    var paperRef = React.useRef(null);
    var _e = React.useState(""), paymentError = _e[0], setPaymentError = _e[1];
    var _f = React.useState(0), checkoutStepIndex = _f[0], setCheckoutStepIndex = _f[1];
    var _g = React.useState({
        billingInfo: "",
        paymentInfo: "",
    }), selectedPaymentMethod = _g[0], setSelectedPaymentMethod = _g[1];
    var checkoutStep = CHECKOUT_STEPS[checkoutStepIndex];
    React.useEffect(function () {
        var _a;
        var dialogScrollable = (_a = dialogRootRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(SELECTOR_DIALOG_SCROLLABLE);
        // Scroll to top on step change:
        if (checkoutStep && dialogScrollable)
            dialogScrollable.scrollTop = 0;
    }, [checkoutStep]);
    var resetModalState = React.useCallback(function () {
        // Make sure the progress tracker in BillingView and PaymentView is properly animated:
        CheckoutStepper.resetStepperProgress();
        // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
        // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
        var selectedBillingInfo = usePlaid.INITIAL_PLAID_OAUTH_FLOW_STATE.selectedBillingInfo, continueOAuthFlow = usePlaid.INITIAL_PLAID_OAUTH_FLOW_STATE.continueOAuthFlow, savedStateUsed = usePlaid.INITIAL_PLAID_OAUTH_FLOW_STATE.savedStateUsed;
        setPaymentError("");
        setCheckoutStepIndex(continueOAuthFlow && !savedStateUsed ? 3 : startAt);
        setSelectedPaymentMethod({ billingInfo: selectedBillingInfo || "", paymentInfo: "" });
    }, [startAt]);
    React.useEffect(function () {
        if (isDialogLoading || !open)
            return;
        resetModalState();
    }, [isDialogLoading, open, resetModalState]);
    React.useEffect(function () {
        if (!checkoutStep)
            onClose();
    }, [checkoutStep, onClose]);
    React.useEffect(function () {
        // TODO: Refetch these when coming back from error screen:
        if (meError)
            setPaymentError("User could not be loaded.");
        if (paymentMethodsError)
            setPaymentError("Payment methods could not be loaded.");
    }, [meError, paymentMethodsError, checkoutItem, invoiceID]);
    var handlePrevClicked = React.useCallback(function () {
        setCheckoutStepIndex(function (prevCheckoutStepIndex) { return prevCheckoutStepIndex - 1; });
    }, []);
    var handleNextClicked = React.useCallback(function () {
        setCheckoutStepIndex(function (prevCheckoutStepIndex) { return prevCheckoutStepIndex + 1; });
    }, []);
    var handleBillingInfoSelected = React.useCallback(function (billingInfo) {
        // TODO: Does paymentInfo need to be reset when coming back to billing info to fix validation errors?
        setSelectedPaymentMethod({ billingInfo: billingInfo, paymentInfo: "" });
    }, []);
    var handlePaymentInfoSelected = React.useCallback(function (paymentInfo) {
        setSelectedPaymentMethod(function (_a) {
            var billingInfo = _a.billingInfo;
            return ({ billingInfo: billingInfo, paymentInfo: paymentInfo });
        });
    }, []);
    var handleSavedPaymentMethodDeleted = React.useCallback(function (addressIdOrPaymentMethodId) { return tslib_es6.__awaiter(void 0, void 0, void 0, function () {
        var idsToDelete, addressToDelete, addressIdToDelete_1, paymentMethodsWithSameAddress, promises;
        return tslib_es6.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    idsToDelete = checkoutStep === "billing"
                        ? savedPaymentMethods.filter(function (_a) {
                            var addressId = _a.addressId;
                            return addressId === addressIdOrPaymentMethodId;
                        }).map(function (_a) {
                            var id = _a.id;
                            return id;
                        })
                        : [addressIdOrPaymentMethodId];
                    if (idsToDelete.length === 0)
                        return [2 /*return*/];
                    // DELETE LOGIC:
                    // We are in BILLING (logic handled in BillingView.tsx):
                    // - Delete last payment method => Show form.
                    // - Delete payment method, but there's more => Re-set selected address.
                    // We are in PAYMENT (logic handled in PaymentView.tsx and below):
                    // - Delete last payment method (or last payment method for the selected address) => Expand address and show form.
                    // - Delete payment method, but there's more => Re-set selected payment.
                    if (checkoutStep === "payment") {
                        addressToDelete = savedPaymentMethods.find(function (_a) {
                            var id = _a.id;
                            return id === addressIdOrPaymentMethodId;
                        });
                        addressIdToDelete_1 = addressToDelete === null || addressToDelete === void 0 ? void 0 : addressToDelete.addressId;
                        paymentMethodsWithSameAddress = savedPaymentMethods.filter(function (_a) {
                            var addressId = _a.addressId;
                            return addressId === addressIdToDelete_1;
                        });
                        if (addressToDelete && paymentMethodsWithSameAddress.length === 1) {
                            setSelectedPaymentMethod({
                                // The payment method that had the selected address is being deleted, so we just copy its data as an object to
                                // re-create it with the new payment information:
                                billingInfo: circle_utils.savedPaymentMethodToBillingInfo(addressToDelete),
                                paymentInfo: "",
                            });
                        }
                    }
                    promises = idsToDelete.map(function (paymentMethodID) {
                        return deletePaymentMethod({
                            variables: {
                                orgID: orgID,
                                paymentMethodID: paymentMethodID,
                            },
                        });
                    });
                    return [4 /*yield*/, Promise.allSettled(promises)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, refetchPaymentMethods({ orgID: orgID })];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [checkoutStep, deletePaymentMethod, orgID, refetchPaymentMethods, savedPaymentMethods]);
    var _h = React.useState(""), paymentReferenceNumber = _h[0], setPaymentReferenceNumber = _h[1];
    var handlePurchaseSuccess = React.useCallback(function (paymentReferenceNumber) {
        setPaymentReferenceNumber(paymentReferenceNumber);
    }, []);
    var handleReviewData = React.useCallback(function () {
        // TODO: paymentError should have a source property to know where the error is coming from and handle recovery differently here:
        setPaymentError("");
        setCheckoutStepIndex(2);
    }, []);
    // BLOCK DIALOG LOGIC & SHAKE ANIMATION:
    var _j = animationUtils.useShakeAnimation(paperRef.current), shakeSx = _j[0], shake = _j[1];
    var _k = React.useState(false), isDialogBlocked = _k[0], setIsDialogBlocked = _k[1];
    var onDialogBlocked = React.useCallback(function (nextIsDialogBlocked) {
        setIsDialogBlocked(nextIsDialogBlocked);
    }, []);
    React.useEffect(function () {
        if (parentTheme && themeOptions) {
            throw new Error("You can't use both `themeOptions` and `theme`. Please, use only one. `themeOptions` is preferred.");
        }
    }, [parentTheme, themeOptions]);
    // PLAID:
    var handlePlaidFlowCompleted = React.useCallback(function (paymentInfo) {
        if (!paymentInfo) {
            resetModalState();
            return;
        }
        handlePaymentInfoSelected(paymentInfo);
        setCheckoutStepIndex(3);
    }, [resetModalState, handlePaymentInfoSelected]);
    var theme = React.useMemo(function () { return themeOptions ? createTheme["default"](themeOptions) : parentTheme; }, [parentTheme, themeOptions]);
    var Wrapper = theme ? system.ThemeProvider : React.Fragment;
    var wrapperProps = theme ? { theme: theme } : {};
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
    var headerVariant = isAuthenticated ? 'loggedIn' : 'guest';
    var checkoutStepElement = null;
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
        checkoutStepElement = (React__default["default"].createElement(BillingView.BillingView, { checkoutItem: checkoutItem, savedPaymentMethods: savedPaymentMethods, selectedBillingInfo: selectedPaymentMethod.billingInfo, onBillingInfoSelected: handleBillingInfoSelected, onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted, onNext: handleNextClicked, onClose: onClose }));
    }
    else if (checkoutStep === "payment") {
        checkoutStepElement = (React__default["default"].createElement(PaymentView.PaymentView, { checkoutItem: checkoutItem, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, onPaymentInfoSelected: handlePaymentInfoSelected, onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted, onNext: handleNextClicked, onPrev: handlePrevClicked, onClose: onClose, acceptedPaymentTypes: acceptedPaymentTypes, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref }));
    }
    else if (checkoutStep === "purchasing") {
        headerVariant = 'purchasing';
        checkoutStepElement = (React__default["default"].createElement(PurchasingView.PurchasingView, { purchasingImageSrc: purchasingImageSrc, purchasingMessages: purchasingMessages, orgID: orgID, invoiceID: invoiceID, lotID: checkoutItem.lotID, lotType: checkoutItem.lotType, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, onPurchaseSuccess: handlePurchaseSuccess, onPurchaseError: setPaymentError, onNext: handleNextClicked, onDialogBlocked: onDialogBlocked }));
    }
    else if (checkoutStep === "confirmation") {
        headerVariant = 'logoOnly';
        checkoutStepElement = (React__default["default"].createElement(ConfirmationView.ConfirmationView, { checkoutItem: checkoutItem, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethod: selectedPaymentMethod, paymentReferenceNumber: paymentReferenceNumber, purchaseInstructions: purchaseInstructions, onNext: handleNextClicked, onClose: onClose }));
    }
    return (React__default["default"].createElement(Wrapper, tslib_es6.__assign({}, wrapperProps),
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
                React__default["default"].createElement(CheckoutModalHeader.CheckoutModalHeader, { variant: headerVariant, logoSrc: logoSrc, logoSx: logoSx, user: (_b = meData === null || meData === void 0 ? void 0 : meData.me) === null || _b === void 0 ? void 0 : _b.user, userFormat: userFormat, onLoginClicked: onLogin, onPrevClicked: handlePrevClicked }),
                checkoutStepElement))));
};

exports.CheckoutModal = CheckoutModal;
//# sourceMappingURL=CheckoutModal.js.map
