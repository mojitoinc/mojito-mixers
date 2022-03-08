'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var theme = require('../../../config/theme/theme.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DISPLAY_BOX_SX = {
    p: 2,
    m: 0,
    borderRadius: `${theme.SM_BORDER_RADIUS}px`,
    backgroundColor: theme => theme.palette.grey["50"],
    border: theme => `1px solid ${theme.palette.grey["100"]}`,
    color: theme => theme.palette.grey["800"],
};
const DisplayBox = (_a) => {
    var { sx } = _a, props = tslib_es6.__rest(_a, ["sx"]);
    return (React__default["default"].createElement(material.Box, Object.assign({}, props, { sx: Object.assign(Object.assign({}, DISPLAY_BOX_SX), sx) })));
};

exports.DISPLAY_BOX_SX = DISPLAY_BOX_SX;
exports.DisplayBox = DisplayBox;
//# sourceMappingURL=DisplayBox.js.map
