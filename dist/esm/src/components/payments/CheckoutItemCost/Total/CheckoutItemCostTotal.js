import { Box, Typography } from '@mui/material';
import React__default from 'react';
import { Number } from '../../../shared/Number/Number.js';

var CheckoutItemCostTotal = function CheckoutItemCostTotal(_a) {
  var price = _a.price,
      fee = _a.fee;
  return /*#__PURE__*/React__default.createElement(Box, {
    sx: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      mt: {
        xs: 3,
        sm: 0.5
      }
    }
  }, /*#__PURE__*/React__default.createElement(Typography, {
    sx: {
      fontWeight: "500"
    }
  }, "Total Amount (USD)"), /*#__PURE__*/React__default.createElement(Typography, {
    variant: "subtitle1",
    sx: {
      fontWeight: "500",
      color: "success.main",
      marginTop: 2
    }
  }, /*#__PURE__*/React__default.createElement(Number, {
    prefix: "$"
  }, price + fee)));
};

export { CheckoutItemCostTotal };
//# sourceMappingURL=CheckoutItemCostTotal.js.map
