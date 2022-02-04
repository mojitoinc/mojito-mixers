'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var payment_utils = require('../../../domain/payment/payment.utils.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CREDIT_CARD_ICON_SX = { width: "35px", height: "24px" };
var SelectIcon = function (props) { return (React__default["default"].createElement(material.SvgIcon, tslib_es6.__assign({}, props),
    React__default["default"].createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M12 16C11.8567 16 11.7195 15.9419 11.6198 15.8389L6.14917 10.1919C5.94573 9.98189 5.95105 9.64672 6.16105 9.44328C6.37105 9.23984 6.70622 9.24516 6.90966 9.45516L12 14.7097L17.0903 9.45516C17.2938 9.24516 17.6289 9.23984 17.839 9.44328C18.049 9.64672 18.0543 9.98189 17.8508 10.1919L12.3802 15.8389C12.2805 15.9419 12.1433 16 12 16Z", fill: "currentColor" }))); };
var CreditCardIcon = function (_a) {
    var network = _a.network, props = tslib_es6.__rest(_a, ["network"]);
    return (React__default["default"].createElement(material.SvgIcon, tslib_es6.__assign({}, payment_utils.standaloneGetCardImageProps(network), props, { sx: tslib_es6.__assign(tslib_es6.__assign({}, CREDIT_CARD_ICON_SX), props.sx) })));
};

exports.CREDIT_CARD_ICON_SX = CREDIT_CARD_ICON_SX;
exports.CreditCardIcon = CreditCardIcon;
exports.SelectIcon = SelectIcon;
//# sourceMappingURL=Icons.js.map
