'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DISPLAY_BOX_PROPS = {
    p: 2,
    border: 1,
    borderRadius: "2px",
    backgroundColor: theme => theme.palette.grey["50"],
    borderColor: theme => theme.palette.grey["100"],
    color: theme => theme.palette.grey["800"],
    display: "flex",
    flexDirection: {
        xs: "column",
        sm: "row"
    },
};
const DisplayBox = (_a) => {
    var { sx } = _a, props = tslib_es6.__rest(_a, ["sx"]);
    return (React__default["default"].createElement(material.Box, Object.assign({}, props, { sx: Object.assign(Object.assign({}, DISPLAY_BOX_PROPS), sx) })));
};
const DebugBox = (_a) => {
    var { sx } = _a, props = tslib_es6.__rest(_a, ["sx"]);
    return (React__default["default"].createElement(DisplayBox, Object.assign({}, props, { component: "pre", sx: Object.assign(Object.assign({}, sx), { overflow: "scroll" }) })));
};

exports.DebugBox = DebugBox;
exports.DisplayBox = DisplayBox;
//# sourceMappingURL=DisplayBox.js.map
