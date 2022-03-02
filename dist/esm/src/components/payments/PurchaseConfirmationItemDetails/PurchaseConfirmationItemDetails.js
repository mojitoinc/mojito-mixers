import React__default from 'react';
import { Stack, Typography } from '@mui/material';
import { CheckoutItemList } from '../CheckoutItemCost/List/CheckoutItemList.js';

const PurchaseConfirmationItemDetails = ({ checkoutItems, dictionary, }) => {
    return (React__default.createElement(Stack, { sx: { display: "flex", flex: 1, pt: 2.5 } },
        React__default.createElement(Typography, { variant: "body2" }, "You purchased"),
        React__default.createElement(CheckoutItemList, { sx: { mt: 3 }, checkoutItems: checkoutItems }),
        React__default.createElement(Typography, { sx: { mt: 6 } }, "Purchase confirmed!"),
        dictionary.purchaseInstructions.map((line, i) => (React__default.createElement(Typography, { key: i, sx: { mt: 1 } }, line)))));
};

export { PurchaseConfirmationItemDetails };
//# sourceMappingURL=PurchaseConfirmationItemDetails.js.map
