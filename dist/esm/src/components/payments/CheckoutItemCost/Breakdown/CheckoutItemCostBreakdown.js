import { Grid, Box, Avatar, Typography, Divider } from '@mui/material';
import React__default from 'react';
import { Number } from '../../../shared/Number/index.js';
import { CheckoutItemCostTotal } from '../Total/CheckoutItemCostTotal.js';

var CheckoutItemCostBreakdown = function (_a) {
    var _b = _a.checkoutItem, name = _b.name, price = _b.price, fee = _b.fee, imageSrc = _b.imageSrc, imageBackground = _b.imageBackground;
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Grid, { container: true, item: true, direction: {
                xs: "column",
                sm: "row"
            }, sx: {
                display: "flex",
                py: 5
            } },
            React__default.createElement(Box, { sx: { flex: 1, display: "flex" } },
                React__default.createElement(Avatar, { alt: name, src: imageSrc, variant: "square", sx: {
                        background: function (theme) { return imageBackground || theme.palette.grey["300"]; },
                        width: 80,
                        height: 80,
                        flex: "0 0 auto",
                    } }),
                React__default.createElement(Box, { sx: { marginLeft: 2, marginTop: 0.5 } },
                    React__default.createElement(Typography, { sx: { fontWeight: "500" } }, name),
                    React__default.createElement(Typography, { sx: { marginTop: 2 } },
                        React__default.createElement(Number, { prefix: "$", suffix: " USD" }, price)),
                    React__default.createElement(Typography, { sx: { marginTop: 0.5 } },
                        React__default.createElement(Number, { prefix: "$", suffix: " Fee" }, fee)))),
            React__default.createElement(CheckoutItemCostTotal, { price: price, fee: fee })),
        React__default.createElement(Divider, null)));
};

export { CheckoutItemCostBreakdown };
//# sourceMappingURL=CheckoutItemCostBreakdown.js.map
