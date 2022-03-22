'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var formatUtils = require('../../../../utils/formatUtils.js');
var Number = require('../../../shared/Number/Number.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const TAX_RATE_PLACEHOLDER_SX = {
    background: theme => theme.palette.grey[100],
    borderRadius: "128px",
    color: "transparent",
    fontSize: "10px",
    margin: "0 0 0 2px",
    userSelect: "none",
};
const TAX_AMOUNT_PLACEHOLDER_SX = Object.assign(Object.assign({}, TAX_RATE_PLACEHOLDER_SX), { margin: "0 2px 0 0" });
const TOTAL_PLACEHOLDER_SX = {
    background: theme => theme.palette.success.light,
    borderRadius: "128px",
    color: "transparent",
    fontFamily: theme => theme.typography.subtitle1.fontFamily,
    fontSize: "14px",
    margin: "0 4px 0 0",
    userSelect: "none",
};
const ROW_SX = {
    display: "flex",
    mb: 1,
    flex: 1,
    justifyContent: "space-between",
};
const CheckoutItemCostTotal = ({ total, fees, taxes, withDetails = false, }) => {
    const feesValue = fees || 0;
    let taxRowElement = null;
    let totalElement = (React__default["default"].createElement(material.Tooltip, { title: "Enter a valid address to calculate the total" },
        React__default["default"].createElement("span", null,
            React__default["default"].createElement(Number.Number, { suffix: " USD" }, total + feesValue))));
    if (taxes) {
        const { status, taxAmount = 0, taxRate = 0, } = taxes;
        let taxRateElement = null;
        let taxAmountElement = null;
        if (status === "loading") {
            taxRateElement = React__default["default"].createElement(material.Tooltip, { title: "Calculating taxes..." },
                React__default["default"].createElement("span", null,
                    "(",
                    React__default["default"].createElement(material.Box, { component: "span", sx: TAX_RATE_PLACEHOLDER_SX }, "00.00"),
                    " %)"));
            taxAmountElement = React__default["default"].createElement(material.Tooltip, { title: "Calculating taxes..." },
                React__default["default"].createElement("span", null,
                    React__default["default"].createElement(material.Box, { component: "span", sx: TAX_AMOUNT_PLACEHOLDER_SX },
                        `${(total + feesValue) * 0.10 | 0}`.replace(/./, "0"),
                        ".00"),
                    " USD"));
            totalElement = React__default["default"].createElement(material.Tooltip, { title: "Calculating total..." },
                React__default["default"].createElement("span", null,
                    React__default["default"].createElement(material.Box, { component: "span", sx: TOTAL_PLACEHOLDER_SX },
                        `${(total + feesValue) * 1.10 | 0}`.replace(/./, "0"),
                        ".00"),
                    " USD"));
        }
        else if (status === "complete" && taxAmount !== undefined) {
            taxRateElement = `(${formatUtils.formatTaxRate(taxRate)})`;
            taxAmountElement = React__default["default"].createElement(Number.Number, { suffix: " USD" }, taxAmount);
            totalElement = React__default["default"].createElement(Number.Number, { suffix: " USD" }, total + feesValue + taxAmount);
        }
        else {
            taxRateElement = null;
            taxAmountElement = React__default["default"].createElement(material.Tooltip, { title: "Enter a valid address to calculate the taxes" },
                React__default["default"].createElement("span", null,
                    React__default["default"].createElement(Number.Number, { suffix: " USD" }, 0)));
            totalElement = React__default["default"].createElement(material.Tooltip, { title: "Enter a valid address to calculate the total" },
                React__default["default"].createElement("span", null,
                    React__default["default"].createElement(Number.Number, { suffix: " USD" }, total + feesValue)));
        }
        taxRowElement = (React__default["default"].createElement(material.Box, { sx: ROW_SX },
            React__default["default"].createElement(material.Typography, { sx: (theme) => ({ color: theme.palette.grey["500"] }) },
                "Taxes ",
                taxRateElement),
            React__default["default"].createElement(material.Typography, null, taxAmountElement)));
    }
    return (React__default["default"].createElement(material.Box, { sx: { display: "flex", flexDirection: "column", mt: { xs: 3, sm: 0.5 } } },
        withDetails && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Box, { sx: ROW_SX },
                React__default["default"].createElement(material.Typography, null, "Subtotal"),
                React__default["default"].createElement(material.Typography, null,
                    React__default["default"].createElement(Number.Number, { suffix: " USD" }, total))),
            fees === null ? null : (React__default["default"].createElement(material.Box, { sx: ROW_SX },
                React__default["default"].createElement(material.Typography, { sx: (theme) => ({ color: theme.palette.grey["500"] }) }, "Fees"),
                React__default["default"].createElement(material.Typography, null,
                    React__default["default"].createElement(Number.Number, { suffix: " USD" }, fees)))),
            taxRowElement)),
        React__default["default"].createElement(material.Box, { sx: {
                display: "flex",
                mt: 1,
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
            } },
            React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500" } }, withDetails ? "Total Amount (USD)" : "Total Amount Paid (USD)"),
            React__default["default"].createElement(material.Typography, { variant: "subtitle1", sx: {
                    fontWeight: "500",
                    color: "success.main",
                } }, totalElement))));
};

exports.CheckoutItemCostTotal = CheckoutItemCostTotal;
//# sourceMappingURL=CheckoutItemCostTotal.js.map
