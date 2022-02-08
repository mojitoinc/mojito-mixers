import { Box, Typography, Divider } from '@mui/material';
import React__default from 'react';

var PurchaseConfirmationItemDetails = function PurchaseConfirmationItemDetails(_a) {
  var checkoutItem = _a.checkoutItem,
      purchaseInstructions = _a.purchaseInstructions;
  return /*#__PURE__*/React__default.createElement(Box, {
    sx: {
      position: "relative",
      mt: 2.5
    }
  }, /*#__PURE__*/React__default.createElement(Box, {
    component: "img",
    src: checkoutItem.imageSrc,
    sx: {
      background: function background(theme) {
        return checkoutItem.imageBackground || theme.palette.grey["300"];
      },
      width: "100%",
      mb: 5
    }
  }), /*#__PURE__*/React__default.createElement(Typography, null, checkoutItem.name), /*#__PURE__*/React__default.createElement(Typography, {
    sx: {
      marginTop: 0.5
    }
  }, checkoutItem.description), /*#__PURE__*/React__default.createElement(Typography, {
    sx: {
      marginTop: 0.5
    }
  }, purchaseInstructions), /*#__PURE__*/React__default.createElement(Divider, {
    sx: {
      mt: 5
    }
  }));
};

export { PurchaseConfirmationItemDetails };
//# sourceMappingURL=PurchaseConfirmationItemDetails.js.map
