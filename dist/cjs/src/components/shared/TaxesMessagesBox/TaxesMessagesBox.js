'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var validationUtils = require('../../../utils/validationUtils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const TaxesMessagesBox = (_a) => {
    var { variant, taxes, sx } = _a, props = tslib_es6.__rest(_a, ["variant", "taxes", "sx"]);
    if (taxes === null || taxes.status !== "error")
        return null;
    const message = taxes.invalidZipCode && variant === "form"
        ? validationUtils.withInvalidZipCode({ label: "zip code" })
        : validationUtils.withInvalidAddress({ variant });
    return (React__default["default"].createElement(material.Box, Object.assign({}, props),
        React__default["default"].createElement(material.Typography, { variant: "caption", component: "p", sx: Object.assign({ color: theme => theme.palette.warning.dark }, sx) }, message)));
};

exports.TaxesMessagesBox = TaxesMessagesBox;
//# sourceMappingURL=TaxesMessagesBox.js.map
