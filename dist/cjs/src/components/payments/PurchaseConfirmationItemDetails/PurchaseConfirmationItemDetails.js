'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var PurchaseConfirmationItemDetails = function PurchaseConfirmationItemDetails(_a) {
  var checkoutItem = _a.checkoutItem,
      purchaseInstructions = _a.purchaseInstructions;
  return /*#__PURE__*/React__default["default"].createElement(material.Box, {
    sx: {
      position: "relative",
      mt: 2.5
    }
  }, /*#__PURE__*/React__default["default"].createElement(material.Box, {
    component: "img",
    src: checkoutItem.imageSrc,
    sx: {
      background: function background(theme) {
        return checkoutItem.imageBackground || theme.palette.grey["300"];
      },
      width: "100%",
      mb: 5
    }
  }), /*#__PURE__*/React__default["default"].createElement(material.Typography, null, checkoutItem.name), /*#__PURE__*/React__default["default"].createElement(material.Typography, {
    sx: {
      marginTop: 0.5
    }
  }, checkoutItem.description), /*#__PURE__*/React__default["default"].createElement(material.Typography, {
    sx: {
      marginTop: 0.5
    }
  }, purchaseInstructions), /*#__PURE__*/React__default["default"].createElement(material.Divider, {
    sx: {
      mt: 5
    }
  }));
};

exports.PurchaseConfirmationItemDetails = PurchaseConfirmationItemDetails;
//# sourceMappingURL=PurchaseConfirmationItemDetails.js.map
