import { Grid, Divider } from '@mui/material';
import React__default from 'react';
import { CheckoutItemCostTotal } from '../Total/CheckoutItemCostTotal.js';
import { BillingInfoFragment } from '../../BillingInfo/Fragment/BillingInfoFragment.js';

var CheckoutItemCostPurchase = function CheckoutItemCostPurchase(_a) {
  var _b = _a.checkoutItem,
      price = _b.price,
      fee = _b.fee,
      selectedPaymentMethodBillingInfo = _a.selectedPaymentMethodBillingInfo;
  return /*#__PURE__*/React__default.createElement(React__default.Fragment, null, /*#__PURE__*/React__default.createElement(Grid, {
    container: true,
    item: true,
    direction: "column",
    sx: {
      display: "flex",
      pb: 2
    }
  }, /*#__PURE__*/React__default.createElement(BillingInfoFragment, {
    savedPaymentMethod: selectedPaymentMethodBillingInfo
  }), /*#__PURE__*/React__default.createElement(CheckoutItemCostTotal, {
    price: price,
    fee: fee
  })), /*#__PURE__*/React__default.createElement(Divider, null));
};

export { CheckoutItemCostPurchase };
//# sourceMappingURL=CheckoutItemCostPurchase.js.map
