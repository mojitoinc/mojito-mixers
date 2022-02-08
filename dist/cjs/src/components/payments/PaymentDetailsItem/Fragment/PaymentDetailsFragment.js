'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var AccountBalance = require('../../../../../node_modules/@mui/icons-material/AccountBalance.js');
var React = require('react');
var Icons = require('../../../shared/Icons/Icons.js');
var payment_constants = require('../../../../domain/payment/payment.constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var PaymentDetailsFragment = function PaymentDetailsFragment(_a) {
  var savedPaymentMethod = _a.savedPaymentMethod;

  if (savedPaymentMethod.type === "CreditCard") {
    return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(Icons.CreditCardIcon, {
      network: savedPaymentMethod.network
    }), /*#__PURE__*/React__default["default"].createElement(material.Typography, null, payment_constants.CREDIT_CARD_MASK_PREFIX, " ", savedPaymentMethod.last4Digit), /*#__PURE__*/React__default["default"].createElement(material.Typography, null, payment_constants.EXPIRATION_DATE_MASK));
  }

  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(AccountBalance["default"], {
    sx: {
      width: "24px",
      height: "24px"
    }
  }), /*#__PURE__*/React__default["default"].createElement(material.Typography, null, payment_constants.ACH_MASK_PREFIX, " ", savedPaymentMethod.accountNumber));
};

exports.PaymentDetailsFragment = PaymentDetailsFragment;
//# sourceMappingURL=PaymentDetailsFragment.js.map
