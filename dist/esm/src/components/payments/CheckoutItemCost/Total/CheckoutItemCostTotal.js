import { Box, Typography } from '@mui/material';
import React__default from 'react';
import { Number } from '../../../shared/Number/Number.js';

const CheckoutItemCostTotal = ({ total, taxes, fees, withDetails = false, }) => {
    return (React__default.createElement(Box, { sx: { display: "flex", flexDirection: "column", mt: { xs: 3, sm: 0.5 } } },
        withDetails && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Box, { sx: { display: "flex", flex: 1, justifyContent: "space-between" } },
                React__default.createElement(Typography, null, "Your purchase"),
                React__default.createElement(Typography, null,
                    React__default.createElement(Number, { suffix: " USD" }, total))),
            React__default.createElement(Box, { sx: {
                    display: "flex",
                    pt: 1,
                    flex: 1,
                    justifyContent: "space-between",
                } },
                React__default.createElement(Typography, { sx: (theme) => ({ color: theme.palette.grey["500"] }) }, "Taxes"),
                React__default.createElement(Typography, null,
                    React__default.createElement(Number, { suffix: " USD" }, taxes))),
            React__default.createElement(Box, { sx: {
                    display: "flex",
                    pt: 1,
                    flex: 1,
                    justifyContent: "space-between",
                } },
                React__default.createElement(Typography, { sx: (theme) => ({ color: theme.palette.grey["500"] }) }, "Fees"),
                React__default.createElement(Typography, null,
                    React__default.createElement(Number, { suffix: " USD" }, fees))))),
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
                } },
                React__default.createElement(Number, { suffix: " USD" }, total + taxes + fees)))));
};

export { CheckoutItemCostTotal };
//# sourceMappingURL=CheckoutItemCostTotal.js.map
