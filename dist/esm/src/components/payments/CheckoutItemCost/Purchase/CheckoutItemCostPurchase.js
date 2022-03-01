import { Grid, Divider } from '@mui/material';
import React__default from 'react';
import { CheckoutItemCostTotal } from '../Total/CheckoutItemCostTotal.js';
import { BillingInfoFragment } from '../../BillingInfo/Fragment/BillingInfoFragment.js';
import { useCheckoutItemsCostTotal } from '../../../../hooks/useCheckoutItemCostTotal.js';

const CheckoutItemCostPurchase = ({ checkoutItems, selectedPaymentMethodBillingInfo, }) => {
    const { total, fees, taxRate, taxAmount } = useCheckoutItemsCostTotal(checkoutItems);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Grid, { container: true, item: true, direction: "column", sx: { display: "flex", pb: 2 } },
            React__default.createElement(BillingInfoFragment, { savedPaymentMethod: selectedPaymentMethodBillingInfo }),
            React__default.createElement(CheckoutItemCostTotal, { total: total, fees: fees, taxes: { status: "complete", taxRate, taxAmount } })),
        React__default.createElement(Divider, null)));
};

export { CheckoutItemCostPurchase };
//# sourceMappingURL=CheckoutItemCostPurchase.js.map
