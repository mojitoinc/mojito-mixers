'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var Number = require('../../../shared/Number/Number.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CheckoutItemList = ({ sx = {}, checkoutItems, withSeparators = false, showPrices = false, }) => (React__default["default"].createElement(material.Stack, { sx: sx, divider: React__default["default"].createElement(material.Box, { sx: { py: 1.25 } }, withSeparators && React__default["default"].createElement(material.Divider, { sx: { my: 2.5 } })) }, checkoutItems.map(({ lotID, name, imageSrc, imageBackground, totalSupply, remainingSupply, units, unitPrice }) => (React__default["default"].createElement(material.Grid, { key: lotID, container: true, item: true, direction: "column", sx: {
        display: "flex",
    } },
    React__default["default"].createElement(material.Box, { sx: { flex: 1, display: "flex" } },
        React__default["default"].createElement(material.Avatar, { alt: name, src: imageSrc, variant: "square", sx: {
                background: (theme) => imageBackground || theme.palette.grey["300"],
                width: 80,
                height: 80,
                flex: "0 0 auto",
            } }),
        React__default["default"].createElement(material.Box, { sx: {
                marginLeft: 2,
                marginTop: 0.5,
                display: "flex",
                flexDirection: "column",
                flex: 1,
            } },
            React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500", pb: 0.5 } }, name),
            React__default["default"].createElement(material.Typography, { sx: { pb: 0.5 } },
                "# ",
                units === 1 ? (React__default["default"].createElement(Number.Number, null, totalSupply - remainingSupply + 1)) : (React__default["default"].createElement(React__default["default"].Fragment, null,
                    React__default["default"].createElement(Number.Number, null, totalSupply - remainingSupply + 1),
                    "-",
                    React__default["default"].createElement(Number.Number, null, totalSupply - remainingSupply + units))),
                " / ",
                React__default["default"].createElement(Number.Number, null, totalSupply)),
            React__default["default"].createElement(material.Box, { sx: {
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    mt: "auto",
                    pt: 0.5,
                } },
                React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500" } }, units),
                showPrices && React__default["default"].createElement(material.Typography, null,
                    React__default["default"].createElement(Number.Number, { suffix: " USD" }, unitPrice))))))))));

exports.CheckoutItemList = CheckoutItemList;
//# sourceMappingURL=CheckoutItemList.js.map
