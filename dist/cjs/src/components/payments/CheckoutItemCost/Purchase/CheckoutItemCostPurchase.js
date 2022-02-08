'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var CheckoutItemCostTotal = require('../Total/CheckoutItemCostTotal.js');
var BillingInfoFragment = require('../../BillingInfo/Fragment/BillingInfoFragment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CheckoutItemCostPurchase = function CheckoutItemCostPurchase(_a) {
  var _b = _a.checkoutItem,
      price = _b.price,
      fee = _b.fee,
      selectedPaymentMethodBillingInfo = _a.selectedPaymentMethodBillingInfo;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(material.Grid, {
    container: true,
    item: true,
    direction: "column",
    sx: {
      display: "flex",
      pb: 2
    }
  }, /*#__PURE__*/React__default["default"].createElement(BillingInfoFragment.BillingInfoFragment, {
    savedPaymentMethod: selectedPaymentMethodBillingInfo
  }), /*#__PURE__*/React__default["default"].createElement(CheckoutItemCostTotal.CheckoutItemCostTotal, {
    price: price,
    fee: fee
  })), /*#__PURE__*/React__default["default"].createElement(material.Divider, null));
};

exports.CheckoutItemCostPurchase = CheckoutItemCostPurchase;
//# sourceMappingURL=CheckoutItemCostPurchase.js.map
