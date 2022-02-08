import { __rest, __assign } from '../../../../node_modules/tslib/tslib.es6.js';
import { FormControl, FormHelperText, SvgIcon } from '@mui/material';
import React__default from 'react';
import { Controller } from 'react-hook-form';
import FormControlLabel from '../../../../node_modules/@mui/material/FormControlLabel/FormControlLabel.js';
import MuiCheckbox from '../../../../node_modules/@mui/material/Checkbox/Checkbox.js';

var CheckboxIconUnchecked = function () { return (React__default.createElement(SvgIcon, null,
    React__default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("rect", { x: "0.5", y: "0.5", width: "19", height: "19", rx: "1.5", stroke: "#D9D9D9" })))); };
var CheckboxIconChecked = function () { return (React__default.createElement(SvgIcon, null,
    React__default.createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
        React__default.createElement("rect", { x: "0.5", y: "0.5", width: "19", height: "19", rx: "1.5", fill: "#E5F2E5", stroke: "#31A136" }),
        React__default.createElement("path", { d: "M5.75926 10.3492C5.39983 9.92988 4.76853 9.88132 4.34921 10.2407C3.92988 10.6002 3.88132 11.2315 4.24074 11.6508L5.75926 10.3492ZM8 14.5L7.24074 15.1508C7.42202 15.3623 7.68328 15.4886 7.96162 15.4993C8.23996 15.51 8.51015 15.4041 8.70711 15.2071L8 14.5ZM16.7071 7.20711C17.0976 6.81658 17.0976 6.18342 16.7071 5.79289C16.3166 5.40237 15.6834 5.40237 15.2929 5.79289L16.7071 7.20711ZM4.24074 11.6508L7.24074 15.1508L8.75926 13.8492L5.75926 10.3492L4.24074 11.6508ZM8.70711 15.2071L16.7071 7.20711L15.2929 5.79289L7.29289 13.7929L8.70711 15.2071Z", fill: "#31A136" })))); };
var Checkbox = function (_a) {
    var label = _a.label, checked = _a.checked, onChange = _a.onChange, sx = _a.sx, error = _a.error, helperText = _a.helperText, props = __rest(_a, ["label", "checked", "onChange", "sx", "error", "helperText"]);
    return (React__default.createElement(FormControl, { sx: sx, error: error },
        React__default.createElement(FormControlLabel, { label: label, control: React__default.createElement(MuiCheckbox, __assign({ sx: { paddingLeft: 1.5, paddingRight: 0.5, paddingTop: 1.5 }, checked: checked, onChange: onChange, icon: React__default.createElement(CheckboxIconUnchecked, null), checkedIcon: React__default.createElement(CheckboxIconChecked, null), disableRipple: true }, props)) }),
        helperText && React__default.createElement(FormHelperText, null, helperText)));
};
var ControlledCheckbox = function (_a) {
    var name = _a.name, control = _a.control, label = _a.label;
    return (React__default.createElement(Controller, { name: name, control: control, render: function (_a) {
            var _b = _a.field, name = _b.name, onChange = _b.onChange, ref = _b.ref, value = _b.value, field = __rest(_b, ["name", "onChange", "ref", "value"]), fieldState = _a.fieldState;
            var error = fieldState === null || fieldState === void 0 ? void 0 : fieldState.error;
            return (React__default.createElement(Checkbox, __assign({ id: name, name: name, label: label, checked: value, onChange: onChange, inputRef: ref, error: !!error, helperText: error === null || error === void 0 ? void 0 : error.message }, field)));
        } }));
};

export { Checkbox, ControlledCheckbox };
//# sourceMappingURL=index.js.map
