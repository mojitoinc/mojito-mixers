'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var CardNumberField = require('../CardNumberField/CardNumberField.js');
var TextField = require('../TextField/TextField.js');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ReadOnlyField = material.styled((props) => (React__default["default"].createElement(TextField.TextField, Object.assign({ variant: "standard", disabled: true }, props))))({
    "& .MuiInputLabel-root": {
        "&.Mui-disabled": {
            color: "black",
        },
    },
    "& .MuiInputBase-root": {
        "&.Mui-disabled": {
            backgroundColor: "#F8F8F8",
            color: "black",
            padding: 8,
            height: "40px",
            borderRadius: "2px",
            marginTop: 32,
        },
    },
    "& .MuiInputBase-input": {
        "&.Mui-disabled": {
            color: "black",
            WebkitTextFillColor: "black",
            fontSize: "12px",
            cursor: "default",
        },
    },
});
const ReadOnlyCardField = material.styled((props) => (React__default["default"].createElement(CardNumberField.CardNumberField, Object.assign({ variant: "standard", disabled: true }, props))))({
    "& .MuiInputLabel-root": {
        "&.Mui-disabled": {
            color: "black",
        },
    },
    "& .MuiInputBase-root": {
        "&.Mui-disabled": {
            backgroundColor: "#F8F8F8",
            color: "black",
            padding: 8,
            height: "40px",
            borderRadius: "2px",
            marginTop: 32,
        },
    },
    "& .MuiInputBase-input": {
        "&.Mui-disabled": {
            color: "black",
            WebkitTextFillColor: "black",
            fontSize: "12px",
            cursor: "default",
        },
    },
});

exports.ReadOnlyCardField = ReadOnlyCardField;
exports.ReadOnlyField = ReadOnlyField;
//# sourceMappingURL=ReadOnlyField.js.map
