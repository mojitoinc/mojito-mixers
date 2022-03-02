'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var reactUtils = require('../../../utils/reactUtils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const PrimaryButton = React__default["default"].forwardRef((props, ref) => {
    const isIcon = reactUtils.containsOnlyIcon(props.children);
    return (React__default["default"].createElement(material.Button, Object.assign({ variant: "contained", color: "primary", size: "medium", ref: ref, disableElevation: true }, props, { sx: isIcon ? Object.assign(Object.assign({}, props.sx), { p: 0 }) : props.sx })));
});

exports.PrimaryButton = PrimaryButton;
//# sourceMappingURL=PrimaryButton.js.map
