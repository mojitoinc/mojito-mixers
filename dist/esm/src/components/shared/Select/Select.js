import { __rest } from '../../../../node_modules/tslib/tslib.es6.js';
import { useMediaQuery, FormControl, InputLabel, Select as Select$1, FormHelperText, MenuItem } from '@mui/material';
import { SelectIcon } from '../Icons/Icons.js';
import React__default from 'react';
import useTheme from '../../../../node_modules/@mui/material/styles/useTheme.js';

const EMPTY_OPTION = {
    label: "",
    value: "",
};
const Select = (_a) => {
    var { id, label, required, disabled, options = [], helperText, error, margin = "normal" } = _a, props = __rest(_a, ["id", "label", "required", "disabled", "options", "helperText", "error", "margin"]);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));
    const selectOptions = matches ? [EMPTY_OPTION, ...options] : options;
    const mapOption = ({ value, label }) => matches ? (React__default.createElement("option", { key: label, value: value }, label)) : (React__default.createElement(MenuItem, { key: label, value: value }, label));
    return (React__default.createElement(FormControl, { fullWidth: true, margin: "normal", variant: "filled", disabled: disabled, error: error },
        React__default.createElement(InputLabel, { required: required, htmlFor: id, disabled: disabled, shrink: true }, label),
        React__default.createElement(Select$1, Object.assign({}, props, { id: id, disabled: disabled, native: matches, IconComponent: SelectIcon, disableUnderline: true, autoComplete: props.autoComplete || props.name }), selectOptions.map(mapOption)),
        helperText && React__default.createElement(FormHelperText, null, helperText)));
};

export { EMPTY_OPTION, Select };
//# sourceMappingURL=Select.js.map
