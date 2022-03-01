'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const TaxesMessagesBox = (_a) => {
    var { variant, taxes: { status }, sx } = _a, props = tslib_es6.__rest(_a, ["variant", "taxes", "sx"]);
    if (status !== "error")
        return null;
    return (React__default["default"].createElement(material.Box, Object.assign({}, props),
        React__default["default"].createElement(material.Typography, { variant: "caption", component: "p", sx: Object.assign({ color: theme => theme.palette.warning.dark }, sx) },
            "Please, ",
            variant === "form" ? "enter" : "select",
            " a valid address to calculate taxes.")));
};

exports.TaxesMessagesBox = TaxesMessagesBox;
//# sourceMappingURL=TaxesMessagesBox.js.map
