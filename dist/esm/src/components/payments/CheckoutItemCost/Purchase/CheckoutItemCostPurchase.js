import { Grid, Divider } from '@mui/material';
import React__default from 'react';
import { CheckoutItemCostTotal } from '../Total/CheckoutItemCostTotal.js';
import { BillingInfoFragment } from '../../BillingInfo/Fragment/BillingInfoFragment.js';

var CheckoutItemCostPurchase = function (_a) {
    var _b = _a.checkoutItem, price = _b.price, fee = _b.fee, selectedPaymentMethodBillingInfo = _a.selectedPaymentMethodBillingInfo;
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Grid, { container: true, item: true, direction: "column", sx: { display: "flex", pb: 2 } },
            React__default.createElement(BillingInfoFragment, { savedPaymentMethod: selectedPaymentMethodBillingInfo }),
            React__default.createElement(CheckoutItemCostTotal, { price: price, fee: fee })),
        React__default.createElement(Divider, null)));
};

export { CheckoutItemCostPurchase };
//# sourceMappingURL=CheckoutItemCostPurchase.js.map
