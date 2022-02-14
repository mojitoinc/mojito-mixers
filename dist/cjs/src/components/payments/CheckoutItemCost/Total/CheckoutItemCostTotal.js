'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var Number = require('../../../shared/Number/Number.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CheckoutItemCostTotal = ({ total, taxes, fees, withDetails = false, }) => {
    return (React__default["default"].createElement(material.Box, { sx: { display: "flex", flexDirection: "column", mt: { xs: 3, sm: 0.5 } } },
        withDetails && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Box, { sx: { display: "flex", flex: 1, justifyContent: "space-between" } },
                React__default["default"].createElement(material.Typography, null, "Your purchase"),
                React__default["default"].createElement(material.Typography, null,
                    React__default["default"].createElement(Number.Number, { suffix: " USD" }, total))),
            React__default["default"].createElement(material.Box, { sx: {
                    display: "flex",
                    pt: 1,
                    flex: 1,
                    justifyContent: "space-between",
                } },
                React__default["default"].createElement(material.Typography, { sx: (theme) => ({ color: theme.palette.grey["500"] }) }, "Taxes"),
                React__default["default"].createElement(material.Typography, null,
                    React__default["default"].createElement(Number.Number, { suffix: " USD" }, taxes))),
            React__default["default"].createElement(material.Box, { sx: {
                    display: "flex",
                    pt: 1,
                    flex: 1,
                    justifyContent: "space-between",
                } },
                React__default["default"].createElement(material.Typography, { sx: (theme) => ({ color: theme.palette.grey["500"] }) }, "Fees"),
                React__default["default"].createElement(material.Typography, null,
                    React__default["default"].createElement(Number.Number, { suffix: " USD" }, fees))))),
        React__default["default"].createElement(material.Box, { sx: {
                display: "flex",
                mt: 3,
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
            } },
            React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500" } }, withDetails ? "Total Amount (USD)" : "Total Amount Paid (USD)"),
            React__default["default"].createElement(material.Typography, { variant: "subtitle1", sx: {
                    fontWeight: "500",
                    color: "success.main",
                } },
                React__default["default"].createElement(Number.Number, { suffix: " USD" }, total + taxes + fees)))));
};

exports.CheckoutItemCostTotal = CheckoutItemCostTotal;
//# sourceMappingURL=CheckoutItemCostTotal.js.map
