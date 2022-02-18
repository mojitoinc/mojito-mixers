import React__default from 'react';
import { Stack, Box, Divider, Grid, Avatar, Typography } from '@mui/material';
import { Number } from '../../../shared/Number/Number.js';

const CheckoutItemList = ({ sx = {}, checkoutItems, withSeparators = false, showPrices = false, }) => (React__default.createElement(Stack, { sx: sx, divider: React__default.createElement(Box, { sx: { py: 1.25 } }, withSeparators && React__default.createElement(Divider, { sx: { my: 2.5 } })) }, checkoutItems.map(({ lotID, name, units, unitPrice, imageSrc, imageBackground }) => (React__default.createElement(Grid, { key: lotID, container: true, item: true, direction: "column", sx: {
        display: "flex",
    } },
    React__default.createElement(Box, { sx: { flex: 1, display: "flex" } },
        React__default.createElement(Avatar, { alt: name, src: imageSrc, variant: "square", sx: {
                background: (theme) => imageBackground || theme.palette.grey["300"],
                width: 80,
                height: 80,
                flex: "0 0 auto",
            } }),
        React__default.createElement(Box, { sx: {
                marginLeft: 2,
                marginTop: 0.5,
                display: "flex",
                flexDirection: "column",
                flex: 1,
                justifyContent: "space-between",
            } },
            React__default.createElement(Typography, { sx: { fontWeight: "500" } }, name),
            React__default.createElement(Box, { sx: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                } },
                React__default.createElement(Typography, { sx: { marginTop: 0.5 } }, units),
                showPrices && (React__default.createElement(Typography, { sx: { marginTop: 0.5 } },
                    React__default.createElement(Number, { suffix: " USD" }, unitPrice)))))))))));

export { CheckoutItemList };
//# sourceMappingURL=CheckoutItemList.js.map