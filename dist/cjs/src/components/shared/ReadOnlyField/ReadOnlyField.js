'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var CardNumberField = require('../CardNumberField/CardNumberField.js');
var TextField = require('../TextField/TextField.js');
var React = require('react');
var themeConstants = require('../../../config/theme/themeConstants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ReadOnlyField = material.styled((props) => (React__default["default"].createElement(TextField.TextField, Object.assign({ variant: "standard", disabled: true }, props))))(({ theme: { palette, typography } }) => ({
    "& .MuiInputLabel-root": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body2), { fontSize: "16px", lineHeight: "24px", color: palette.text.primary }),
    },
    "& .MuiInputBase-root": {
        "&.Mui-disabled": {
            background: palette.grey[50],
            padding: 8,
            height: "40px",
            borderRadius: themeConstants.SM_BORDER_RADIUS,
            marginTop: 24,
        },
    },
    "& .MuiInputBase-input": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body1), { color: palette.text.primary, WebkitTextFillColor: palette.text.primary, fontSize: "12px", cursor: "default" }),
    },
}));
const ReadOnlyCardField = material.styled((props) => (React__default["default"].createElement(CardNumberField.CardNumberField, Object.assign({ variant: "standard", disabled: true }, props))))(({ theme: { palette, typography } }) => ({
    "& .MuiInputLabel-root": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body2), { fontSize: "16px", lineHeight: "24px", color: palette.text.primary }),
    },
    "& .MuiInputBase-root": {
        "&.Mui-disabled": {
            background: palette.grey[50],
            padding: 8,
            height: "40px",
            borderRadius: themeConstants.SM_BORDER_RADIUS,
            marginTop: 24,
        },
    },
    "& .MuiInputBase-input": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body1), { color: palette.text.primary, WebkitTextFillColor: palette.text.primary, fontSize: "12px", cursor: "default" }),
    },
}));
const ReadOnlyWalletAddress = material.styled((props) => (React__default["default"].createElement(TextField.TextField, Object.assign({ variant: "standard", disabled: true }, props))))(({ theme: { palette, typography } }) => ({
    "& .MuiInputLabel-root": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body1), { fontSize: "16px", lineHeight: "24px", color: palette.text.primary }),
    },
    "& .MuiInputBase-root": {
        "&.Mui-disabled": {
            background: palette.grey[50],
            padding: 8,
            height: "60px",
            borderRadius: themeConstants.SM_BORDER_RADIUS,
        },
    },
    "& .MuiInputBase-input": {
        "&.Mui-disabled": Object.assign(Object.assign({}, typography.body2), { color: palette.text.primary, WebkitTextFillColor: palette.text.primary, fontSize: "12px", cursor: "default" }),
    },
}));

exports.ReadOnlyCardField = ReadOnlyCardField;
exports.ReadOnlyField = ReadOnlyField;
exports.ReadOnlyWalletAddress = ReadOnlyWalletAddress;
//# sourceMappingURL=ReadOnlyField.js.map
