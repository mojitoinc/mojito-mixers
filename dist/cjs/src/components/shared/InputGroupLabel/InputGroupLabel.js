'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const InputGroupLabel = (_a) => {
    var { sx } = _a, props = tslib_es6.__rest(_a, ["sx"]);
    return (React__default["default"].createElement(material.Typography, Object.assign({ variant: "body2", sx: [
            (theme) => ({
                fontWeight: "bold",
                color: theme.palette.grey["700"],
                mt: 1.5
            }),
            sx
        ] }, props)));
};

exports.InputGroupLabel = InputGroupLabel;
//# sourceMappingURL=InputGroupLabel.js.map
