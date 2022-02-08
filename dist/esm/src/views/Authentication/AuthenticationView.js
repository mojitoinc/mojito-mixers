import { CheckoutItemCostBreakdown } from '../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js';
import { CheckoutModalFooter } from '../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import React__default, { useEffect } from 'react';
import { resetStepperProgress } from '../../components/payments/CheckoutStepper/CheckoutStepper.js';

var AuthenticationView = function AuthenticationView(_a) {
  var checkoutItem = _a.checkoutItem,
      isAuthenticated = _a.isAuthenticated,
      guestCheckoutEnabled = _a.guestCheckoutEnabled,
      onGuestClicked = _a.onGuestClicked,
      onCloseClicked = _a.onCloseClicked;
  useEffect(function () {
    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();
  }, []);
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(CheckoutItemCostBreakdown, {
    checkoutItem: checkoutItem
  }), /*#__PURE__*/React__default.createElement(CheckoutModalFooter, {
    variant: isAuthenticated ? "toPayment" : "toGuestCheckout",
    guestCheckoutEnabled: guestCheckoutEnabled,
    privacyHref: "",
    termsOfUseHref: "",
    onSubmitClicked: onGuestClicked,
    onCloseClicked: onCloseClicked
  }));
};

export { AuthenticationView };
//# sourceMappingURL=AuthenticationView.js.map
