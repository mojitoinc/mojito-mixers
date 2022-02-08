import { Box, Typography, Divider } from '@mui/material';
import React__default from 'react';

const PurchaseConfirmationItemDetails = ({ checkoutItem, purchaseInstructions, }) => {
    return (React__default.createElement(Box, { sx: { position: "relative", mt: 2.5 } },
        React__default.createElement(Box, { component: "img", src: checkoutItem.imageSrc, sx: {
                background: theme => checkoutItem.imageBackground || theme.palette.grey["300"],
                width: "100%",
                mb: 5,
            } }),
        React__default.createElement(Typography, null, checkoutItem.name),
        React__default.createElement(Typography, { sx: { marginTop: 0.5 } }, checkoutItem.description),
        React__default.createElement(Typography, { sx: { marginTop: 0.5 } }, purchaseInstructions),
        React__default.createElement(Divider, { sx: { mt: 5 } })));
};

export { PurchaseConfirmationItemDetails };
//# sourceMappingURL=PurchaseConfirmationItemDetails.js.map
