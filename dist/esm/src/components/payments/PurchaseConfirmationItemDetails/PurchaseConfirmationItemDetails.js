import React__default from 'react';
import { Stack, Typography } from '@mui/material';
import { CheckoutItemList } from '../CheckoutItemCost/List/CheckoutItemList.js';

const PurchaseConfirmationItemDetails = ({ checkoutItems, purchaseInstructions }) => {
    const checkoutItem = checkoutItems[0];
    return (React__default.createElement(Stack, { sx: { display: "flex", flex: 1, pt: 2.5 } },
        React__default.createElement(Typography, { variant: "body2" }, "You purchased"),
        React__default.createElement(CheckoutItemList, { sx: { mt: 3 }, checkoutItems: checkoutItems }),
        React__default.createElement(Typography, { sx: { mt: 6 } }, checkoutItem.name),
        React__default.createElement(Typography, { sx: { mt: 0.5 } }, checkoutItem.description),
        React__default.createElement(Typography, { sx: { mt: 0.5 } }, purchaseInstructions)));
};

export { PurchaseConfirmationItemDetails };
//# sourceMappingURL=PurchaseConfirmationItemDetails.js.map
