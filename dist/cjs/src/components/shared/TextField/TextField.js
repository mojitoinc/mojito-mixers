'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var reactHookForm = require('react-hook-form');
var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var controlledFieldFrom = function (FieldComponent) {
    return function (_a) {
        var name = _a.name, label = _a.label, control = _a.control, props = tslib_es6.__rest(_a, ["name", "label", "control"]);
        return (React__default["default"].createElement(reactHookForm.Controller, { name: name, control: control, render: function (_a) {
                var _b = _a.field, name = _b.name, ref = _b.ref, field = tslib_es6.__rest(_b, ["name", "ref"]), error = _a.fieldState.error;
                return (React__default["default"].createElement(FieldComponent, tslib_es6.__assign({ id: name, name: name, label: label, fullWidth: true, inputRef: ref, error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }, props, field)));
            } }));
    };
};
var TextField = function (props) { return (React__default["default"].createElement(material.TextField, tslib_es6.__assign({ fullWidth: true, variant: "filled", margin: "normal" }, props, { InputProps: tslib_es6.__assign(tslib_es6.__assign({}, props.InputProps), { disableUnderline: true }), InputLabelProps: tslib_es6.__assign(tslib_es6.__assign({}, props.InputLabelProps), { shrink: true }) }))); };
var ControlledTextField = controlledFieldFrom(TextField);

exports.ControlledTextField = ControlledTextField;
exports.TextField = TextField;
exports.controlledFieldFrom = controlledFieldFrom;
//# sourceMappingURL=TextField.js.map
