'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var CheckoutItemCostBreakdown = require('../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js');
var CheckoutModalFooter = require('../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var React = require('react');
var CheckoutStepper = require('../../components/payments/CheckoutStepper/CheckoutStepper.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var AuthenticationView = function (_a) {
    var checkoutItem = _a.checkoutItem, isAuthenticated = _a.isAuthenticated, guestCheckoutEnabled = _a.guestCheckoutEnabled, onGuestClicked = _a.onGuestClicked, onCloseClicked = _a.onCloseClicked;
    React.useEffect(function () {
        // Make sure the progress tracker in BillingView and PaymentView is properly animated:
        CheckoutStepper.resetStepperProgress();
    }, []);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(CheckoutItemCostBreakdown.CheckoutItemCostBreakdown, { checkoutItem: checkoutItem }),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: isAuthenticated ? "toPayment" : "toGuestCheckout", guestCheckoutEnabled: guestCheckoutEnabled, privacyHref: "", termsOfUseHref: "", onSubmitClicked: onGuestClicked, onCloseClicked: onCloseClicked })));
};

exports.AuthenticationView = AuthenticationView;
//# sourceMappingURL=AuthenticationView.js.map
