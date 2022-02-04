'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var index = require('../../../shared/Number/index.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CheckoutItemCostTotal = function (_a) {
    var price = _a.price, fee = _a.fee;
    return (React__default["default"].createElement(material.Box, { sx: { display: "flex", flexDirection: "column", alignItems: "flex-end", mt: { xs: 3, sm: 0.5 } } },
        React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500" } }, "Total Amount (USD)"),
        React__default["default"].createElement(material.Typography, { variant: "subtitle1", sx: {
                fontWeight: "500",
                color: "success.main",
                marginTop: 2,
            } },
            React__default["default"].createElement(index.Number, { prefix: "$" }, price + fee))));
};

exports.CheckoutItemCostTotal = CheckoutItemCostTotal;
//# sourceMappingURL=CheckoutItemCostTotal.js.map
