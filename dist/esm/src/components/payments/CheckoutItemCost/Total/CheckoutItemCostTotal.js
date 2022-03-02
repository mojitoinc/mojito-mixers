import { Tooltip, Box, Typography } from '@mui/material';
import React__default from 'react';
import { formatTaxRate } from '../../../../utils/formatUtils.js';
import { Number } from '../../../shared/Number/Number.js';

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
const CheckoutItemCostTotal = ({ total, fees, taxes: { status, taxAmount = 0, taxRate = 0, }, withDetails = false, }) => {
    let taxRateElement = null;
    let taxAmountElement = null;
    let totalElement = null;
    const feesValue = fees || 0;
    if (status === "loading") {
        taxRateElement = React__default.createElement(Tooltip, { title: "Calculating taxes..." },
            React__default.createElement("span", null,
                "(",
                React__default.createElement(Box, { component: "span", sx: TAX_RATE_PLACEHOLDER_SX }, "00.00"),
                " %)"));
        taxAmountElement = React__default.createElement(Tooltip, { title: "Calculating taxes..." },
            React__default.createElement("span", null,
                React__default.createElement(Box, { component: "span", sx: TAX_AMOUNT_PLACEHOLDER_SX },
                    `${(total + feesValue) * 0.10 | 0}`.replace(/./, "0"),
                    ".00"),
                " USD"));
        totalElement = React__default.createElement(Tooltip, { title: "Calculating total..." },
            React__default.createElement("span", null,
                React__default.createElement(Box, { component: "span", sx: TOTAL_PLACEHOLDER_SX },
                    `${(total + feesValue) * 1.10 | 0}`.replace(/./, "0"),
                    ".00"),
                " USD"));
    }
    else if (status === "complete" && taxAmount !== undefined) {
        taxRateElement = `(${formatTaxRate(taxRate)})`;
        taxAmountElement = React__default.createElement(Number, { suffix: " USD" }, taxAmount);
        totalElement = React__default.createElement(Number, { suffix: " USD" }, total + feesValue + taxAmount);
    }
    else {
        taxRateElement = null;
        taxAmountElement = React__default.createElement(Tooltip, { title: "Enter a valid address to calculate the taxes" },
            React__default.createElement("span", null,
                React__default.createElement(Number, { suffix: " USD" }, 0)));
        totalElement = React__default.createElement(Tooltip, { title: "Enter a valid address to calculate the total" },
            React__default.createElement("span", null,
                React__default.createElement(Number, { suffix: " USD" }, total + feesValue)));
    }
    return (React__default.createElement(Box, { sx: { display: "flex", flexDirection: "column", mt: { xs: 3, sm: 0.5 } } },
        withDetails && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Box, { sx: ROW_SX },
                React__default.createElement(Typography, null, "Your purchase"),
                React__default.createElement(Typography, null,
                    React__default.createElement(Number, { suffix: " USD" }, total))),
            React__default.createElement(Box, { sx: ROW_SX },
                React__default.createElement(Typography, { sx: (theme) => ({ color: theme.palette.grey["500"] }) },
                    "Taxes ",
                    taxRateElement),
                React__default.createElement(Typography, null, taxAmountElement)),
            fees === null ? null : (React__default.createElement(Box, { sx: ROW_SX },
                React__default.createElement(Typography, { sx: (theme) => ({ color: theme.palette.grey["500"] }) }, "Fees"),
                React__default.createElement(Typography, null,
                    React__default.createElement(Number, { suffix: " USD" }, fees)))))),
        React__default.createElement(Box, { sx: {
                display: "flex",
                mt: 3,
                flex: 1,
                justifyContent: "space-between",
                alignItems: "center",
            } },
            React__default.createElement(Typography, { sx: { fontWeight: "500" } }, withDetails ? "Total Amount (USD)" : "Total Amount Paid (USD)"),
            React__default.createElement(Typography, { variant: "subtitle1", sx: {
                    fontWeight: "500",
                    color: "success.main",
                } }, totalElement))));
};

export { CheckoutItemCostTotal };
//# sourceMappingURL=CheckoutItemCostTotal.js.map
