'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var TextField = require('../TextField/TextField.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const InlineField = material.styled((props) => (React__default["default"].createElement(TextField.TextField, Object.assign({}, props, { variant: "filled", margin: "none", InputProps: { disableUnderline: true } }))))(({ theme: { palette } }) => ({
    "& .MuiInputLabel-root": {
        color: palette.text.primary,
    },
    "& .MuiInputBase-root": {
        background: palette.background.default,
        color: palette.text.primary,
        padding: 8,
        height: "30px",
    },
    "& .MuiInputBase-input": {
        color: palette.text.primary,
        WebkitTextFillColor: palette.text.primary,
        fontSize: "12px",
        cursor: "default",
        padding: 0,
    },
}));

exports.InlineField = InlineField;
//# sourceMappingURL=InlineField.js.map
