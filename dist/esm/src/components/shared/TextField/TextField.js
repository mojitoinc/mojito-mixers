import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { TextField as TextField$1 } from '@mui/material';
import { Controller } from 'react-hook-form';
import React__default from 'react';

const controlledFieldFrom = (FieldComponent) => {
    const ControlledField = (_a) => {
        var { name, label, control } = _a, props = __rest(_a, ["name", "label", "control"]);
        return (React__default.createElement(Controller, { name: name, control: control, render: (_a) => {
                var _b = _a.field, { name, ref } = _b, field = __rest(_b, ["name", "ref"]), { fieldState: { error } } = _a;
                return (React__default.createElement(FieldComponent, Object.assign({ id: name, name: name, label: label, fullWidth: true, inputRef: ref, error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }, props, field)));
            } }));
    };
    return ControlledField;
};
const TextField = (props) => (React__default.createElement(TextField$1, Object.assign({ fullWidth: true, variant: "filled", margin: "normal" }, props, { InputProps: Object.assign(Object.assign({}, props.InputProps), { disableUnderline: true }), InputLabelProps: Object.assign(Object.assign({}, props.InputLabelProps), { shrink: true }) })));
const ControlledTextField = controlledFieldFrom(TextField);

export { ControlledTextField, TextField, controlledFieldFrom };
//# sourceMappingURL=TextField.js.map
