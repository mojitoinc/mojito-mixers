import { __assign, __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { TextField as TextField$1 } from '@mui/material';
import { Controller } from 'react-hook-form';
import React__default from 'react';

var controlledFieldFrom = function (FieldComponent) {
    return function (_a) {
        var name = _a.name, label = _a.label, control = _a.control, props = __rest(_a, ["name", "label", "control"]);
        return (React__default.createElement(Controller, { name: name, control: control, render: function (_a) {
                var _b = _a.field, name = _b.name, ref = _b.ref, field = __rest(_b, ["name", "ref"]), error = _a.fieldState.error;
                return (React__default.createElement(FieldComponent, __assign({ id: name, name: name, label: label, fullWidth: true, inputRef: ref, error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }, props, field)));
            } }));
    };
};
var TextField = function (props) { return (React__default.createElement(TextField$1, __assign({ fullWidth: true, variant: "filled", margin: "normal" }, props, { InputProps: __assign(__assign({}, props.InputProps), { disableUnderline: true }), InputLabelProps: __assign(__assign({}, props.InputLabelProps), { shrink: true }) }))); };
var ControlledTextField = controlledFieldFrom(TextField);

export { ControlledTextField, TextField, controlledFieldFrom };
//# sourceMappingURL=TextField.js.map
