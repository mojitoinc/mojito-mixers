'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Typography = require('../../../../../node_modules/@mui/material/Typography/Typography.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var BillingInfoFragment = function (_a) {
    var _b = _a.savedPaymentMethod, _c = _b.billingDetails, name = _c.name, address1 = _c.address1, address2 = _c.address2, city = _c.city, district = _c.district, postalCode = _c.postalCode, country = _c.country, _d = _b.metadata, email = _d.email, phoneNumber = _d.phoneNumber;
    return (React__default["default"].createElement("div", { style: { display: "flex", flexDirection: 'column' } },
        React__default["default"].createElement(Typography["default"], { variant: "caption" }, name),
        address1 && React__default["default"].createElement(Typography["default"], { variant: "caption" }, address1),
        address2 && React__default["default"].createElement(Typography["default"], { variant: "caption" }, address2),
        React__default["default"].createElement(Typography["default"], { variant: "caption" }, [city, district.label, postalCode, country.label].filter(Boolean).join(", ")),
        React__default["default"].createElement(Typography["default"], { variant: "caption" }, email),
        React__default["default"].createElement(Typography["default"], { variant: "caption" }, phoneNumber)));
};

exports.BillingInfoFragment = BillingInfoFragment;
//# sourceMappingURL=BillingInfoFragment.js.map
