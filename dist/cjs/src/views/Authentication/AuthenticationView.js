'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var CheckoutItemCostBreakdown = require('../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js');
var CheckoutModalFooter = require('../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var CheckoutStepper = require('../../components/payments/CheckoutStepper/CheckoutStepper.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const AuthenticationView = ({ checkoutItems, taxes, isAuthenticated, guestCheckoutEnabled, onGuestClicked, onCloseClicked, }) => {
    React.useEffect(() => {
        // Make sure the progress tracker in BillingView and PaymentView is properly animated:
        CheckoutStepper.resetStepperProgress();
    }, []);
    return (React__default["default"].createElement(material.Stack, { sx: { mt: 5 } },
        React__default["default"].createElement(CheckoutItemCostBreakdown.CheckoutItemCostBreakdown, { checkoutItems: checkoutItems, taxes: taxes }),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: isAuthenticated ? "toPayment" : "toGuestCheckout", guestCheckoutEnabled: guestCheckoutEnabled, onSubmitClicked: onGuestClicked, onCloseClicked: onCloseClicked })));
};

exports.AuthenticationView = AuthenticationView;
//# sourceMappingURL=AuthenticationView.js.map
