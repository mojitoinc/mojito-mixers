'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var Number = require('../../../shared/Number/Number.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CheckoutItemCostTotal = function CheckoutItemCostTotal(_a) {
  var price = _a.price,
      fee = _a.fee;
  return /*#__PURE__*/React__default["default"].createElement(material.Box, {
    sx: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
      mt: {
        xs: 3,
        sm: 0.5
      }
    }
  }, /*#__PURE__*/React__default["default"].createElement(material.Typography, {
    sx: {
      fontWeight: "500"
    }
  }, "Total Amount (USD)"), /*#__PURE__*/React__default["default"].createElement(material.Typography, {
    variant: "subtitle1",
    sx: {
      fontWeight: "500",
      color: "success.main",
      marginTop: 2
    }
  }, /*#__PURE__*/React__default["default"].createElement(Number.Number, {
    prefix: "$"
  }, price + fee)));
};

exports.CheckoutItemCostTotal = CheckoutItemCostTotal;
//# sourceMappingURL=CheckoutItemCostTotal.js.map
