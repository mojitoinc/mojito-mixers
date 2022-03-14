'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var theme = require('../../../config/theme/theme.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const DEBUG_BOX_OUTER_SX = {
    position: "relative",
    m: 0,
    borderRadius: `${theme.SM_BORDER_RADIUS}px`,
    backgroundColor: theme => theme.palette.grey["50"],
    border: theme => `1px solid ${theme.palette.grey["100"]}`,
    color: theme => theme.palette.grey["800"],
    overflow: "hidden",
};
const DEBUG_BOX_INNER_COMPACT_SX = {
    p: 1,
    pr: 6,
    m: 0,
};
const DEBUG_BOX_INNER_SCROLL_SX = {
    p: 2,
    pt: 3,
    m: 0,
    overflow: "scroll",
    whiteSpace: "pre-wrap",
    maxHeight: "256px",
};
const DEBUG_LABEL_COMPACT_SX = {
    position: "absolute",
    top: 0,
    right: 0,
    borderBottomLeftRadius: `${theme.SM_BORDER_RADIUS}px`,
    px: 0.5,
    borderLeft: theme => `1px solid ${theme.palette.grey["100"]}`,
    borderBottom: theme => `1px solid ${theme.palette.grey["100"]}`,
    pointerEvents: "none",
};
const DEBUG_LABEL_SCROLL_SX = Object.assign(Object.assign({}, DEBUG_LABEL_COMPACT_SX), { pr: 2.5 });
const DebugBox = (_a) => {
    var { compact, sx, children } = _a, props = tslib_es6.__rest(_a, ["compact", "sx", "children"]);
    return (React__default["default"].createElement(material.Box, Object.assign({}, props, { sx: Object.assign(Object.assign({}, DEBUG_BOX_OUTER_SX), sx) }),
        React__default["default"].createElement(material.Typography, { component: "span", variant: "caption", sx: compact ? DEBUG_LABEL_COMPACT_SX : DEBUG_LABEL_SCROLL_SX }, "DEBUG"),
        React__default["default"].createElement(material.Box, { component: "pre", sx: compact ? DEBUG_BOX_INNER_COMPACT_SX : DEBUG_BOX_INNER_SCROLL_SX }, children)));
};

exports.DebugBox = DebugBox;
//# sourceMappingURL=DebugBox.js.map
