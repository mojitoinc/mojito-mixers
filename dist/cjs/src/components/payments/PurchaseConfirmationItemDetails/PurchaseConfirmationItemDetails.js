'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var CheckoutItemList = require('../CheckoutItemCost/List/CheckoutItemList.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const PurchaseConfirmationItemDetails = ({ checkoutItems, purchaseInstructions }) => {
    const checkoutItem = checkoutItems[0];
    return (React__default["default"].createElement(material.Stack, { sx: { display: "flex", flex: 1, pt: 2.5 } },
        React__default["default"].createElement(material.Typography, { variant: "body2" }, "You purchased"),
        React__default["default"].createElement(CheckoutItemList.CheckoutItemList, { sx: { mt: 3 }, checkoutItems: checkoutItems }),
        React__default["default"].createElement(material.Typography, { sx: { mt: 6 } }, checkoutItem.name),
        React__default["default"].createElement(material.Typography, { sx: { mt: 0.5 } }, checkoutItem.description),
        React__default["default"].createElement(material.Typography, { sx: { mt: 0.5 } }, purchaseInstructions)));
};

exports.PurchaseConfirmationItemDetails = PurchaseConfirmationItemDetails;
//# sourceMappingURL=PurchaseConfirmationItemDetails.js.map
