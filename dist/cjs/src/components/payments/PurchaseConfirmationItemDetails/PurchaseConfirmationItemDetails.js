'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var CheckoutItemList = require('../CheckoutItemCost/List/CheckoutItemList.js');
var useDictionary = require('../../../hooks/useDictionary.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const PurchaseConfirmationItemDetails = ({ checkoutItems, }) => {
    const dictionary = useDictionary.useDictionary();
    return (React__default["default"].createElement(material.Stack, { sx: { display: "flex", flex: 1, pt: 2.5 } },
        React__default["default"].createElement(material.Typography, { variant: "body2" }, "You purchased"),
        React__default["default"].createElement(CheckoutItemList.CheckoutItemList, { sx: { mt: 3 }, checkoutItems: checkoutItems }),
        React__default["default"].createElement(material.Typography, { sx: { mt: 6 } }, "Purchase confirmed!"),
        dictionary.purchaseInstructions.map((line, i) => (React__default["default"].createElement(material.Typography, { key: i, sx: { mt: 1 } }, line)))));
};

exports.PurchaseConfirmationItemDetails = PurchaseConfirmationItemDetails;
//# sourceMappingURL=PurchaseConfirmationItemDetails.js.map
