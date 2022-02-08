import { __awaiter, __assign, __generator } from '../../../../node_modules/tslib/tslib.es6.js';
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
import { continuePlaidOAuthFlow, INITIAL_PLAID_OAUTH_FLOW_STATE, PlaidFlow } from '../../../hooks/usePlaid.js';
import createTheme from '../../../../node_modules/@mui/material/styles/createTheme.js';
import { ThemeProvider } from '@mui/system';

var SELECTOR_DIALOG_SCROLLABLE = "[role=presentation]";
var CHECKOUT_STEPS = ["authentication", "billing", "payment", "purchasing", "confirmation"];
var CheckoutModal = function CheckoutModal(_a) {
  var _b;

  var // Modal:
  open = _a.open,
      onClose = _a.onClose,
      // Flow:
  guestCheckoutEnabled = _a.guestCheckoutEnabled,
      productConfirmationEnabled = _a.productConfirmationEnabled,
      // Personalization:
  parentTheme = _a.theme,
      themeOptions = _a.themeOptions,
      logoSrc = _a.logoSrc,
      logoSx = _a.logoSx,
      loaderImageSrc = _a.loaderImageSrc,
      purchasingImageSrc = _a.purchasingImageSrc,
      purchasingMessages = _a.purchasingMessages,
      errorImageSrc = _a.errorImageSrc,
      userFormat = _a.userFormat,
      acceptedPaymentTypes = _a.acceptedPaymentTypes;
      _a.paymentLimits;
      var // Not implemented yet. Used to show payment limits for some payment types.
  purchaseInstructions = _a.purchaseInstructions,
      // Legal:
  consentType = _a.consentType,
      // Not implemented yet. Used to let the app control where to log errors to (e.g. Sentry).
  privacyHref = _a.privacyHref,
      termsOfUseHref = _a.termsOfUseHref,
      // Data:
  orgID = _a.orgID,
      invoiceID = _a.invoiceID,
      checkoutItem = _a.checkoutItem,
      // Authentication:
  onLogin = _a.onLogin,
      isAuthenticated = _a.isAuthenticated,
      isAuthenticatedLoading = _a.isAuthenticatedLoading,
      // Other Events:
  debug = _a.debug;
      _a.onError;
      // Not implemented yet. Used to let the app control where to log errors to (e.g. Sentry).
  _a.onMarketingOptInChange;

  var _c = useMeQuery({
    skip: !isAuthenticated
  }),
      meData = _c.data,
      meLoading = _c.loading,
      meError = _c.error;

  var deletePaymentMethod = useDeletePaymentMethodMutation()[0];

  var _d = useGetPaymentMethodListQuery({
    skip: !isAuthenticated,
    variables: {
      orgID: orgID
    }
  }),
      paymentMethodsData = _d.data,
      paymentMethodsLoading = _d.loading,
      paymentMethodsError = _d.error,
      refetchPaymentMethods = _d.refetch;

  var isDialogLoading = isAuthenticatedLoading || meLoading || paymentMethodsLoading;
  var isPlaidFlowLoading = continuePlaidOAuthFlow();
  var startAt = !isAuthenticated || productConfirmationEnabled ? 0 : 1;
  var rawSavedPaymentMethods = paymentMethodsData === null || paymentMethodsData === void 0 ? void 0 : paymentMethodsData.getPaymentMethodList;
  var savedPaymentMethods = useMemo(function () {
    return transformRawSavedPaymentMethods(rawSavedPaymentMethods);
  }, [rawSavedPaymentMethods]);
  var dialogRootRef = useRef(null);
  var paperRef = useRef(null);

  var _e = useState(""),
      paymentError = _e[0],
      setPaymentError = _e[1];

  var _f = useState(0),
      checkoutStepIndex = _f[0],
      setCheckoutStepIndex = _f[1];

  var _g = useState({
    billingInfo: "",
    paymentInfo: ""
  }),
      selectedPaymentMethod = _g[0],
      setSelectedPaymentMethod = _g[1];

  var checkoutStep = CHECKOUT_STEPS[checkoutStepIndex];
  useEffect(function () {
    var _a;

    var dialogScrollable = (_a = dialogRootRef.current) === null || _a === void 0 ? void 0 : _a.querySelector(SELECTOR_DIALOG_SCROLLABLE); // Scroll to top on step change:

    if (checkoutStep && dialogScrollable) dialogScrollable.scrollTop = 0;
  }, [checkoutStep]);
  var resetModalState = useCallback(function () {
    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress(); // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
    // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s

    var selectedBillingInfo = INITIAL_PLAID_OAUTH_FLOW_STATE.selectedBillingInfo,
        continueOAuthFlow = INITIAL_PLAID_OAUTH_FLOW_STATE.continueOAuthFlow,
        savedStateUsed = INITIAL_PLAID_OAUTH_FLOW_STATE.savedStateUsed;
    setPaymentError("");
    setCheckoutStepIndex(continueOAuthFlow && !savedStateUsed ? 3 : startAt);
    setSelectedPaymentMethod({
      billingInfo: selectedBillingInfo || "",
      paymentInfo: ""
    });
  }, [startAt]);
  useEffect(function () {
    if (isDialogLoading || !open) return;
    resetModalState();
  }, [isDialogLoading, open, resetModalState]);
  useEffect(function () {
    if (!checkoutStep) onClose();
  }, [checkoutStep, onClose]);
  useEffect(function () {
    // TODO: After an error, a payment method might have been created anyway. Reload them.
    // TODO: Refetch these when coming back from error screen:
    if (meError) setPaymentError("User could not be loaded.");
    if (paymentMethodsError) setPaymentError("Payment methods could not be loaded.");
  }, [meError, paymentMethodsError, checkoutItem, invoiceID]);
  var handlePrevClicked = useCallback(function () {
    setCheckoutStepIndex(function (prevCheckoutStepIndex) {
      return prevCheckoutStepIndex - 1;
    });
  }, []);
  var handleNextClicked = useCallback(function () {
    setCheckoutStepIndex(function (prevCheckoutStepIndex) {
      return prevCheckoutStepIndex + 1;
    });
  }, []);
  var handleBillingInfoSelected = useCallback(function (billingInfo) {
    // TODO: Does paymentInfo need to be reset when coming back to billing info to fix validation errors?
    setSelectedPaymentMethod({
      billingInfo: billingInfo,
      paymentInfo: ""
    });
  }, []);
  var handlePaymentInfoSelected = useCallback(function (paymentInfo) {
    setSelectedPaymentMethod(function (_a) {
      var billingInfo = _a.billingInfo;
      return {
        billingInfo: billingInfo,
        paymentInfo: paymentInfo
      };
    });
  }, []);
  var handleSavedPaymentMethodDeleted = useCallback(function (addressIdOrPaymentMethodId) {
    return __awaiter(void 0, void 0, void 0, function () {
      var idsToDelete, addressToDelete, addressIdToDelete_1, paymentMethodsWithSameAddress, promises;
      return __generator(this, function (_a) {
        switch (_a.label) {
          case 0:
            idsToDelete = checkoutStep === "billing" ? savedPaymentMethods.filter(function (_a) {
              var addressId = _a.addressId;
              return addressId === addressIdOrPaymentMethodId;
            }).map(function (_a) {
              var id = _a.id;
              return id;
            }) : [addressIdOrPaymentMethodId];
            if (idsToDelete.length === 0) return [2
            /*return*/
            ]; // DELETE LOGIC:
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
                  billingInfo: savedPaymentMethodToBillingInfo(addressToDelete),
                  paymentInfo: ""
                });
              }
            }

            promises = idsToDelete.map(function (paymentMethodID) {
              return deletePaymentMethod({
                variables: {
                  orgID: orgID,
                  paymentMethodID: paymentMethodID
                }
              });
            });
            return [4
            /*yield*/
            , Promise.allSettled(promises)];

          case 1:
            _a.sent();

            return [4
            /*yield*/
            , refetchPaymentMethods({
              orgID: orgID
            })];

          case 2:
            _a.sent();

            return [2
            /*return*/
            ];
        }
      });
    });
  }, [checkoutStep, deletePaymentMethod, orgID, refetchPaymentMethods, savedPaymentMethods]);

  var _h = useState(""),
      paymentReferenceNumber = _h[0],
      setPaymentReferenceNumber = _h[1];

  var handlePurchaseSuccess = useCallback(function (paymentReferenceNumber) {
    setPaymentReferenceNumber(paymentReferenceNumber);
  }, []);
  var handleReviewData = useCallback(function () {
    // TODO: paymentError should have a source property to know where the error is coming from and handle recovery differently here:
    setPaymentError("");
    setCheckoutStepIndex(2);
  }, []); // BLOCK DIALOG LOGIC & SHAKE ANIMATION:

  var _j = useShakeAnimation(paperRef.current),
      shakeSx = _j[0],
      shake = _j[1];

  var _k = useState(false),
      isDialogBlocked = _k[0],
      setIsDialogBlocked = _k[1];

  var onDialogBlocked = useCallback(function (nextIsDialogBlocked) {
    setIsDialogBlocked(nextIsDialogBlocked);
  }, []);
  useEffect(function () {
    if (parentTheme && themeOptions) {
      throw new Error("You can't use both `themeOptions` and `theme`. Please, use only one. `themeOptions` is preferred.");
    }
  }, [parentTheme, themeOptions]); // PLAID:

  var handlePlaidFlowCompleted = useCallback(function (paymentInfo) {
    if (!paymentInfo) {
      resetModalState();
      return;
    }

    handlePaymentInfoSelected(paymentInfo);
    setCheckoutStepIndex(3);
  }, [resetModalState, handlePaymentInfoSelected]);
  var theme = useMemo(function () {
    return themeOptions ? createTheme(themeOptions) : parentTheme;
  }, [parentTheme, themeOptions]);
  var Wrapper = theme ? ThemeProvider : Fragment;
  var wrapperProps = theme ? {
    theme: theme
  } : {};

  if (isDialogLoading || isPlaidFlowLoading) {
    return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, isPlaidFlowLoading && /*#__PURE__*/React__default.createElement(PlaidFlow, {
      onSubmit: handlePlaidFlowCompleted
    }), /*#__PURE__*/React__default.createElement(Backdrop, {
      open: open,
      onClick: onClose
    }, loaderImageSrc ? /*#__PURE__*/React__default.createElement(Box, {
      component: "img",
      src: loaderImageSrc,
      sx: {
        width: 196,
        height: 196,
        mx: "auto",
        mt: 5
      }
    }) : /*#__PURE__*/React__default.createElement(CircularProgress, {
      color: "primary"
    })));
  }

  var headerVariant = isAuthenticated ? 'loggedIn' : 'guest';
  var checkoutStepElement = null;

  if (paymentError) {
    headerVariant = "error";
    checkoutStepElement = /*#__PURE__*/React__default.createElement(ErrorView, {
      errorMessage: paymentError,
      errorImageSrc: errorImageSrc,
      onReviewData: handleReviewData,
      onClose: onClose
    });
  } else if (!checkoutStep) {
    return null;
  } else if (checkoutStep === "authentication") {
    if (!isAuthenticated) headerVariant = 'anonymous';
    checkoutStepElement = /*#__PURE__*/React__default.createElement(AuthenticationView, {
      checkoutItem: checkoutItem,
      isAuthenticated: isAuthenticated,
      guestCheckoutEnabled: guestCheckoutEnabled,
      onGuestClicked: handleNextClicked,
      onCloseClicked: onClose
    });
  } else if (checkoutStep === "billing") {
    checkoutStepElement = /*#__PURE__*/React__default.createElement(BillingView, {
      checkoutItem: checkoutItem,
      savedPaymentMethods: savedPaymentMethods,
      selectedBillingInfo: selectedPaymentMethod.billingInfo,
      onBillingInfoSelected: handleBillingInfoSelected,
      onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted,
      onNext: handleNextClicked,
      onClose: onClose,
      debug: debug
    });
  } else if (checkoutStep === "payment") {
    checkoutStepElement = /*#__PURE__*/React__default.createElement(PaymentView, {
      checkoutItem: checkoutItem,
      savedPaymentMethods: savedPaymentMethods,
      selectedPaymentMethod: selectedPaymentMethod,
      onPaymentInfoSelected: handlePaymentInfoSelected,
      onSavedPaymentMethodDeleted: handleSavedPaymentMethodDeleted,
      onNext: handleNextClicked,
      onPrev: handlePrevClicked,
      onClose: onClose,
      acceptedPaymentTypes: acceptedPaymentTypes,
      consentType: consentType,
      privacyHref: privacyHref,
      termsOfUseHref: termsOfUseHref,
      debug: debug
    });
  } else if (checkoutStep === "purchasing") {
    headerVariant = 'purchasing';
    checkoutStepElement = /*#__PURE__*/React__default.createElement(PurchasingView, {
      purchasingImageSrc: purchasingImageSrc,
      purchasingMessages: purchasingMessages,
      orgID: orgID,
      invoiceID: invoiceID,
      lotID: checkoutItem.lotID,
      lotType: checkoutItem.lotType,
      savedPaymentMethods: savedPaymentMethods,
      selectedPaymentMethod: selectedPaymentMethod,
      onPurchaseSuccess: handlePurchaseSuccess,
      onPurchaseError: setPaymentError,
      onNext: handleNextClicked,
      onDialogBlocked: onDialogBlocked,
      debug: debug
    });
  } else if (checkoutStep === "confirmation") {
    headerVariant = 'logoOnly';
    checkoutStepElement = /*#__PURE__*/React__default.createElement(ConfirmationView, {
      checkoutItem: checkoutItem,
      savedPaymentMethods: savedPaymentMethods,
      selectedPaymentMethod: selectedPaymentMethod,
      paymentReferenceNumber: paymentReferenceNumber,
      purchaseInstructions: purchaseInstructions,
      onNext: handleNextClicked,
      onClose: onClose
    });
  }

  return /*#__PURE__*/React__default.createElement(Wrapper, __assign({}, wrapperProps), /*#__PURE__*/React__default.createElement(Dialog, {
    open: isDialogBlocked ? true : open,
    onClose: isDialogBlocked ? undefined : onClose,
    onBackdropClick: isDialogBlocked ? shake : undefined,
    "aria-labelledby": "checkout-modal-header-title",
    fullWidth: true,
    maxWidth: "sm",
    scroll: "body",
    ref: dialogRootRef,
    PaperProps: {
      sx: shakeSx,
      ref: paperRef
    }
  }, /*#__PURE__*/React__default.createElement(DialogContent, {
    sx: {
      overflowX: 'hidden',
      pt: {
        xs: 1.5,
        sm: 2.5
      },
      px: {
        xs: 1.5,
        sm: 2.5
      },
      pb: 0
    }
  }, /*#__PURE__*/React__default.createElement(CheckoutModalHeader, {
    variant: headerVariant,
    logoSrc: logoSrc,
    logoSx: logoSx,
    user: (_b = meData === null || meData === void 0 ? void 0 : meData.me) === null || _b === void 0 ? void 0 : _b.user,
    userFormat: userFormat,
    onLoginClicked: onLogin,
    onPrevClicked: handlePrevClicked
  }), checkoutStepElement)));
};

export { CheckoutModal };
//# sourceMappingURL=CheckoutModal.js.map
