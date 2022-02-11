import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { FormControl, InputLabel, Select as Select$1, MenuItem, FormHelperText } from '@mui/material';
import { SelectIcon } from '../Icons/Icons.js';
import React__default from 'react';

const EMPTY_OPTION = {
    label: "",
    value: "",
};
const Select = (_a) => {
    var { id, label, required, disabled, options = [], helperText, error } = _a, props = __rest(_a, ["id", "label", "required", "disabled", "options", "helperText", "error"]);
    return (React__default.createElement(FormControl, { fullWidth: true, margin: "normal", variant: "filled", disabled: disabled, error: error },
        React__default.createElement(InputLabel, { required: required, htmlFor: id, disabled: disabled, shrink: true }, label),
        React__default.createElement(Select$1, Object.assign({ id: id, disabled: disabled, IconComponent: SelectIcon, disableUnderline: true }, props), options.map(({ value, label }) => (React__default.createElement(MenuItem, { key: label, value: value }, label)))),
        helperText && React__default.createElement(FormHelperText, null, helperText)));
};

export { EMPTY_OPTION, Select };
//# sourceMappingURL=Select.js.map
