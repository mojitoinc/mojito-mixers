'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var AccountBalance = require('../../../../../node_modules/@mui/icons-material/AccountBalance.js');
var React = require('react');
var Icons = require('../../../shared/Icons/Icons.js');
var payment_constants = require('../../../../domain/payment/payment.constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var PaymentDetailsFragment = function (_a) {
    var savedPaymentMethod = _a.savedPaymentMethod;
    if (savedPaymentMethod.type === "CreditCard") {
        return (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(Icons.CreditCardIcon, { network: savedPaymentMethod.network }),
            React__default["default"].createElement(material.Typography, null,
                payment_constants.CREDIT_CARD_MASK_PREFIX,
                " ",
                savedPaymentMethod.last4Digit),
            React__default["default"].createElement(material.Typography, null, payment_constants.EXPIRATION_DATE_MASK)));
    }
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(AccountBalance["default"], { sx: { width: "24px", height: "24px" } }),
        React__default["default"].createElement(material.Typography, null,
            payment_constants.ACH_MASK_PREFIX,
            " ",
            savedPaymentMethod.accountNumber)));
};

exports.PaymentDetailsFragment = PaymentDetailsFragment;
//# sourceMappingURL=PaymentDetailsFragment.js.map
