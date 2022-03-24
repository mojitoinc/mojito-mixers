'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var Icons = require('../Icons/Icons.js');
var React = require('react');
var useTheme = require('../../../../node_modules/@mui/material/styles/useTheme.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const EMPTY_OPTION = {
    label: "",
    value: "",
};
const Select = (_a) => {
    var { id, label, required, disabled, options = [], helperText, error, margin = "normal" } = _a, props = tslib_es6.__rest(_a, ["id", "label", "required", "disabled", "options", "helperText", "error", "margin"]);
    const theme = useTheme["default"]();
    const matches = material.useMediaQuery(theme.breakpoints.down('sm'));
    const selectOptions = matches ? [EMPTY_OPTION, ...options] : options;
    const mapOption = ({ value, label }) => matches ? (React__default["default"].createElement("option", { key: label, value: value }, label)) : (React__default["default"].createElement(material.MenuItem, { key: label, value: value }, label));
    return (React__default["default"].createElement(material.FormControl, { fullWidth: true, margin: margin, variant: "filled", disabled: disabled, error: error },
        React__default["default"].createElement(material.InputLabel, { required: required, htmlFor: id, disabled: disabled, shrink: true }, label),
        React__default["default"].createElement(material.Select, Object.assign({}, props, { id: id, disabled: disabled, native: matches, IconComponent: Icons.SelectIcon, disableUnderline: true, autoComplete: props.autoComplete || props.name }), selectOptions.map(mapOption)),
        helperText && React__default["default"].createElement(material.FormHelperText, null, helperText)));
};

exports.EMPTY_OPTION = EMPTY_OPTION;
exports.Select = Select;
//# sourceMappingURL=Select.js.map
