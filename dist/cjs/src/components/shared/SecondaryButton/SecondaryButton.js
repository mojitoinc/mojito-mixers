'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var reactUtils = require('../../../utils/reactUtils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var SecondaryButton = React__default["default"].forwardRef(function (props, ref) {
    var isIcon = reactUtils.containsOnlyIcon(props.children);
    return (React__default["default"].createElement(material.Button, tslib_es6.__assign({ variant: "contained", color: "secondary", size: "small", ref: ref, disableElevation: true }, props, { sx: isIcon ? tslib_es6.__assign(tslib_es6.__assign({}, props.sx), { p: 0 }) : props.sx })));
});

exports.SecondaryButton = SecondaryButton;
//# sourceMappingURL=SecondaryButton.js.map
