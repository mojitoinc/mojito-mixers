'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var CheckoutItemCostTotal = require('../Total/CheckoutItemCostTotal.js');
var BillingInfoFragment = require('../../BillingInfo/Fragment/BillingInfoFragment.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CheckoutItemCostPurchase = ({ checkoutItem: { price, fee, }, selectedPaymentMethodBillingInfo, }) => {
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(material.Grid, { container: true, item: true, direction: "column", sx: { display: "flex", pb: 2 } },
            React__default["default"].createElement(BillingInfoFragment.BillingInfoFragment, { savedPaymentMethod: selectedPaymentMethodBillingInfo }),
            React__default["default"].createElement(CheckoutItemCostTotal.CheckoutItemCostTotal, { price: price, fee: fee })),
        React__default["default"].createElement(material.Divider, null)));
};

exports.CheckoutItemCostPurchase = CheckoutItemCostPurchase;
//# sourceMappingURL=CheckoutItemCostPurchase.js.map
