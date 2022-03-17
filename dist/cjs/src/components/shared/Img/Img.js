'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var material = require('@mui/material');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const IMG_SX_PROPS = {
    display: "block",
};
const Img = (_a) => {
    var { src, sx } = _a, props = tslib_es6.__rest(_a, ["src", "sx"]);
    return (React__default["default"].createElement(material.Box, Object.assign({}, props, { component: "img", src: src, sx: Object.assign(Object.assign({}, IMG_SX_PROPS), sx) })));
};

exports.Img = Img;
//# sourceMappingURL=Img.js.map
