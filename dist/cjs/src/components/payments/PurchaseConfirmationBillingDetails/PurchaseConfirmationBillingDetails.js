'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var Icons = require('../../shared/Icons/Icons.js');
var ReadOnlyField = require('../../shared/ReadOnlyField/ReadOnlyField.js');
var CheckoutItemCostPurchase = require('../CheckoutItemCost/Purchase/CheckoutItemCostPurchase.js');
var PurchaseConfirmationBillingDetails_constants = require('./PurchaseConfirmationBillingDetails.constants.js');
var PurchaseConfirmationBillingDetails_utils = require('./PurchaseConfirmationBillingDetails.utils.js');
var Check = require('../../../../node_modules/@mui/icons-material/Check.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var PurchaseConfirmationBillingDetails = function PurchaseConfirmationBillingDetails(_a) {
  var checkoutItem = _a.checkoutItem,
      paymentReferenceNumber = _a.paymentReferenceNumber,
      selectedPaymentMethodBillingInfo = _a.selectedPaymentMethodBillingInfo,
      selectedPaymentMethodPaymentInfo = _a.selectedPaymentMethodPaymentInfo;

  var _b = PurchaseConfirmationBillingDetails_utils.getFormattedPaymentMethod(selectedPaymentMethodPaymentInfo),
      isMasked = _b.isMasked,
      paymentType = _b.paymentType,
      displayValue = _b.displayValue,
      network = _b.network;

  var icon = network ? /*#__PURE__*/React__default["default"].createElement(Icons.CreditCardIcon, {
    network: network
  }) : null;
  return /*#__PURE__*/React__default["default"].createElement(material.Box, {
    sx: {
      position: "relative",
      mb: 2
    }
  }, /*#__PURE__*/React__default["default"].createElement(material.Stack, {
    spacing: 2,
    direction: {
      xs: "column",
      sm: "row"
    },
    sx: {
      justifyContent: "space-between",
      alignItems: {
        xs: "flex-start",
        sm: "center"
      },
      pt: 2
    }
  }, /*#__PURE__*/React__default["default"].createElement(material.Typography, {
    variant: "h5"
  }, "Purchase Confirmation"), /*#__PURE__*/React__default["default"].createElement(material.Chip, {
    size: "small",
    color: "success",
    label: /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, "Payment Processed", /*#__PURE__*/React__default["default"].createElement(Check["default"], {
      sx: {
        height: "24px",
        ml: 1.5
      }
    }))
  })), /*#__PURE__*/React__default["default"].createElement(material.Stack, {
    spacing: 2,
    direction: {
      xs: "column",
      sm: "row"
    },
    sx: {
      justifyContent: "space-between",
      alignItems: {
        xs: "flex-start",
        sm: "center"
      },
      pt: 1.5,
      pb: {
        xs: 2.5,
        sm: 1.5
      }
    }
  }, isMasked ? /*#__PURE__*/React__default["default"].createElement(ReadOnlyField.ReadOnlyField, {
    label: PurchaseConfirmationBillingDetails_constants.PAYMENT_TYPE_LABEL[paymentType],
    value: displayValue,
    InputProps: icon ? {
      endAdornment: /*#__PURE__*/React__default["default"].createElement(material.InputAdornment, {
        position: "end"
      }, icon)
    } : undefined
  }) : /*#__PURE__*/React__default["default"].createElement(ReadOnlyField.ReadOnlyCardField, {
    label: PurchaseConfirmationBillingDetails_constants.PAYMENT_TYPE_LABEL[paymentType],
    value: displayValue
  }), /*#__PURE__*/React__default["default"].createElement(ReadOnlyField.ReadOnlyField, {
    label: "Reference No.",
    value: paymentReferenceNumber || "-"
  })), /*#__PURE__*/React__default["default"].createElement(CheckoutItemCostPurchase.CheckoutItemCostPurchase, {
    checkoutItem: checkoutItem,
    selectedPaymentMethodBillingInfo: selectedPaymentMethodBillingInfo
  }));
};

exports.PurchaseConfirmationBillingDetails = PurchaseConfirmationBillingDetails;
//# sourceMappingURL=PurchaseConfirmationBillingDetails.js.map
