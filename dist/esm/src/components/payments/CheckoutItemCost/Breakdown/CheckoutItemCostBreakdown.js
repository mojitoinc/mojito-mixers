import { Stack, Divider } from '@mui/material';
import React__default from 'react';
import { CheckoutItemCostTotal } from '../Total/CheckoutItemCostTotal.js';
import { useCheckoutItemsCostTotal } from '../../../../hooks/useCheckoutItemCostTotal.js';
import { CheckoutItemList } from '../List/CheckoutItemList.js';

const CheckoutItemCostBreakdown = ({ checkoutItems, taxes, }) => {
    const { total, fees } = useCheckoutItemsCostTotal(checkoutItems);
    return (React__default.createElement(Stack, { sx: { display: "flex", flex: 1, py: 5 } },
        React__default.createElement(CheckoutItemList, { checkoutItems: checkoutItems, withSeparators: true, showPrices: true }),
        React__default.createElement(Divider, { sx: { mt: 3.75, mb: 1.5 } }),
        React__default.createElement(CheckoutItemCostTotal, { withDetails: true, total: total, fees: fees, taxes: taxes })));
};

export { CheckoutItemCostBreakdown };
//# sourceMappingURL=CheckoutItemCostBreakdown.js.map
