'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var index = require('../../../shared/Number/index.js');
var CheckoutItemCostTotal = require('../Total/CheckoutItemCostTotal.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CheckoutItemCostBreakdown = function (_a) {
    var _b = _a.checkoutItem, name = _b.name, price = _b.price, fee = _b.fee, imageSrc = _b.imageSrc, imageBackground = _b.imageBackground;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(material.Grid, { container: true, item: true, direction: {
                xs: "column",
                sm: "row"
            }, sx: {
                display: "flex",
                py: 5
            } },
            React__default["default"].createElement(material.Box, { sx: { flex: 1, display: "flex" } },
                React__default["default"].createElement(material.Avatar, { alt: name, src: imageSrc, variant: "square", sx: {
                        background: function (theme) { return imageBackground || theme.palette.grey["300"]; },
                        width: 80,
                        height: 80,
                        flex: "0 0 auto",
                    } }),
                React__default["default"].createElement(material.Box, { sx: { marginLeft: 2, marginTop: 0.5 } },
                    React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500" } }, name),
                    React__default["default"].createElement(material.Typography, { sx: { marginTop: 2 } },
                        React__default["default"].createElement(index.Number, { prefix: "$", suffix: " USD" }, price)),
                    React__default["default"].createElement(material.Typography, { sx: { marginTop: 0.5 } },
                        React__default["default"].createElement(index.Number, { prefix: "$", suffix: " Fee" }, fee)))),
            React__default["default"].createElement(CheckoutItemCostTotal.CheckoutItemCostTotal, { price: price, fee: fee })),
        React__default["default"].createElement(material.Divider, null)));
};

exports.CheckoutItemCostBreakdown = CheckoutItemCostBreakdown;
//# sourceMappingURL=CheckoutItemCostBreakdown.js.map
