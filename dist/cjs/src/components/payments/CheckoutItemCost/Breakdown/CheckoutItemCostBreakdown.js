'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var CheckoutItemCostTotal = require('../Total/CheckoutItemCostTotal.js');
var useCheckoutItemCostTotal = require('../../../../hooks/useCheckoutItemCostTotal.js');
var CheckoutItemList = require('../List/CheckoutItemList.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CheckoutItemCostBreakdown = ({ checkoutItems, taxes, }) => {
    const firstCheckoutItem = checkoutItems[0];
    const { total, fees } = useCheckoutItemCostTotal.useCheckoutItemsCostTotal(checkoutItems);
    return (React__default["default"].createElement(material.Stack, { sx: { display: "flex", flex: 1 } },
        React__default["default"].createElement(CheckoutItemList.CheckoutItemList, { checkoutItems: checkoutItems, withSeparators: true, showPrices: true }),
        React__default["default"].createElement(material.Divider, { sx: { mt: 3.75, mb: 1.5 } }),
        React__default["default"].createElement(CheckoutItemCostTotal.CheckoutItemCostTotal, { withDetails: true, total: total, fees: fees === 0 && firstCheckoutItem.lotType === "buyNow" ? null : fees, taxes: taxes })));
};

exports.CheckoutItemCostBreakdown = CheckoutItemCostBreakdown;
//# sourceMappingURL=CheckoutItemCostBreakdown.js.map
