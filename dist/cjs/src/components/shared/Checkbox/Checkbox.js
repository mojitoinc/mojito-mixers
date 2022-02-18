'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var reactHookForm = require('react-hook-form');
var CheckboxIconUnchecked = require('./CheckboxIconUnchecked/CheckboxIconUnchecked.js');
var CheckboxIconChecked = require('./CheckboxIconChecked/CheckboxIconChecked.js');
var FormControlLabel = require('../../../../node_modules/@mui/material/FormControlLabel/FormControlLabel.js');
var Checkbox$1 = require('../../../../node_modules/@mui/material/Checkbox/Checkbox.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Checkbox = (_a) => {
    var { label, checked, onChange, sx, error, helperText } = _a, props = tslib_es6.__rest(_a, ["label", "checked", "onChange", "sx", "error", "helperText"]);
    return (React__default["default"].createElement(material.FormControl, { sx: sx, error: error },
        React__default["default"].createElement(FormControlLabel["default"], { label: React__default["default"].createElement(React__default["default"].Fragment, null,
                label,
                helperText && React__default["default"].createElement(material.FormHelperText, { sx: { mt: 1 } }, helperText)), sx: { alignItems: "flex-start", pt: 1 }, control: React__default["default"].createElement(Checkbox$1["default"], Object.assign({ sx: { pl: 1.5, pt: 0 }, checked: checked, onChange: onChange, icon: React__default["default"].createElement(CheckboxIconUnchecked.CheckboxIconUnchecked, { error: error }), checkedIcon: React__default["default"].createElement(CheckboxIconChecked.CheckboxIconChecked, { error: error }), disableRipple: true }, props)) })));
};
const ControlledCheckbox = ({ name, control, label, }) => (React__default["default"].createElement(reactHookForm.Controller, { name: name, control: control, render: (_a) => {
        var _b = _a.field, { name, onChange, ref, value } = _b, field = tslib_es6.__rest(_b, ["name", "onChange", "ref", "value"]), { fieldState } = _a;
        const error = fieldState === null || fieldState === void 0 ? void 0 : fieldState.error;
        return (React__default["default"].createElement(Checkbox, Object.assign({ id: name, name: name, label: label, checked: value, onChange: onChange, inputRef: ref, error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }, field)));
    } }));

exports.Checkbox = Checkbox;
exports.ControlledCheckbox = ControlledCheckbox;
//# sourceMappingURL=Checkbox.js.map
