import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { FormControl, FormHelperText } from '@mui/material';
import React__default from 'react';
import { Controller } from 'react-hook-form';
import { CheckboxIconUnchecked } from './CheckboxIconUnchecked/CheckboxIconUnchecked.js';
import { CheckboxIconChecked } from './CheckboxIconChecked/CheckboxIconChecked.js';
import FormControlLabel from '../../../../node_modules/@mui/material/FormControlLabel/FormControlLabel.js';
import MuiCheckbox from '../../../../node_modules/@mui/material/Checkbox/Checkbox.js';

const Checkbox = (_a) => {
    var { label, checked, onChange, sx, error, helperText } = _a, props = __rest(_a, ["label", "checked", "onChange", "sx", "error", "helperText"]);
    return (React__default.createElement(FormControl, { sx: sx, error: error },
        React__default.createElement(FormControlLabel, { label: React__default.createElement(React__default.Fragment, null,
                label,
                helperText && React__default.createElement(FormHelperText, { sx: { mt: 1 } }, helperText)), sx: { alignItems: "flex-start", pt: 1 }, control: React__default.createElement(MuiCheckbox, Object.assign({ sx: { pl: 1.5, pt: 0 }, checked: checked, onChange: onChange, icon: React__default.createElement(CheckboxIconUnchecked, { error: error }), checkedIcon: React__default.createElement(CheckboxIconChecked, { error: error }), disableRipple: true }, props)) })));
};
const ControlledCheckbox = ({ name, control, label, }) => (React__default.createElement(Controller, { name: name, control: control, render: (_a) => {
        var _b = _a.field, { name, onChange, ref, value } = _b, field = __rest(_b, ["name", "onChange", "ref", "value"]), { fieldState } = _a;
        const error = fieldState === null || fieldState === void 0 ? void 0 : fieldState.error;
        return (React__default.createElement(Checkbox, Object.assign({ id: name, name: name, label: label, checked: value, onChange: onChange, inputRef: ref, error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }, field)));
    } }));

export { Checkbox, ControlledCheckbox };
//# sourceMappingURL=Checkbox.js.map
