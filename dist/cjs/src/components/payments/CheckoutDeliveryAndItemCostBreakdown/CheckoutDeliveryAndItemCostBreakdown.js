'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var DeliveryWalletSelector = require('../DeliveryWallet/DeliveryWalletSelector/DeliveryWalletSelector.js');
var CheckoutItemCostBreakdown = require('../CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CheckoutDeliveryAndItemCostBreakdown = ({ checkoutItems, taxes, validatePersonalDeliveryAddress, wallets, wallet, onWalletChange, dictionary, }) => (React__default["default"].createElement(material.Stack, { sx: { display: "flex", width: { xs: "100%", md: "calc(50% - 35px)" } } },
    React__default["default"].createElement(DeliveryWalletSelector.DeliveryWalletSelector, { validatePersonalAddress: validatePersonalDeliveryAddress, wallets: wallets, wallet: wallet, onWalletChange: onWalletChange, dictionary: dictionary }),
    React__default["default"].createElement(material.Divider, { sx: { my: 3.75 } }),
    React__default["default"].createElement(CheckoutItemCostBreakdown.CheckoutItemCostBreakdown, { checkoutItems: checkoutItems, taxes: taxes })));

exports.CheckoutDeliveryAndItemCostBreakdown = CheckoutDeliveryAndItemCostBreakdown;
//# sourceMappingURL=CheckoutDeliveryAndItemCostBreakdown.js.map
