'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var reactHookForm = require('react-hook-form');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const controlledFieldFrom = (FieldComponent) => (_a) => {
    var { name, label, control } = _a, props = tslib_es6.__rest(_a, ["name", "label", "control"]);
    return (React__default["default"].createElement(reactHookForm.Controller, { name: name, control: control, render: (_a) => {
            var _b = _a.field, { name, ref } = _b, field = tslib_es6.__rest(_b, ["name", "ref"]), { fieldState: { error } } = _a;
            return (React__default["default"].createElement(FieldComponent, Object.assign({ id: name, name: name, label: label, fullWidth: true, inputRef: ref, error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }, props, field)));
        } }));
};
const TextField = (props) => (React__default["default"].createElement(material.TextField, Object.assign({ fullWidth: true, variant: "filled", margin: "normal" }, props, { InputProps: Object.assign(Object.assign({}, props.InputProps), { disableUnderline: true }), InputLabelProps: Object.assign(Object.assign({}, props.InputLabelProps), { shrink: true }) })));
const ControlledTextField = controlledFieldFrom(TextField);

exports.ControlledTextField = ControlledTextField;
exports.TextField = TextField;
exports.controlledFieldFrom = controlledFieldFrom;
//# sourceMappingURL=TextField.js.map
