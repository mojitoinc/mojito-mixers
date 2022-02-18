import { __rest } from '../../../../../node_modules/tslib/tslib.es6.js';
import React__default, { useCallback, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { EMPTY_OPTION, Select } from '../Select.js';
import { useCountryOptions } from '../../../../hooks/useCountryOptions.js';

const StateSelector = (_a) => {
    var { label, value, disabled, onSelectState, countryCode } = _a, props = __rest(_a, ["label", "value", "disabled", "onSelectState", "countryCode"]);
    const { options, optionsMap } = useCountryOptions(countryCode);
    const handleChange = useCallback((e) => {
        onSelectState(optionsMap[e.target.value]);
    }, [optionsMap, onSelectState]);
    const isDisabled = disabled || !countryCode || options.length === 0;
    // If the selected option can't be found among the available ones, we reset the field:
    useEffect(() => {
        const stateCode = value.value;
        if (isDisabled || !stateCode)
            return;
        if (!optionsMap[stateCode])
            onSelectState(EMPTY_OPTION);
    }, [value, isDisabled, optionsMap, onSelectState]);
    // If the selected option only has one property set, we try to find a match:
    useEffect(() => {
        const { value: selectedValue, label: selectedLabel } = value;
        if ((selectedValue && selectedLabel) ||
            (!selectedValue && !selectedLabel) ||
            options.length === 0)
            return;
        const option = selectedValue
            ? optionsMap[selectedValue]
            : options.find((option) => option.label === selectedLabel);
        setTimeout(() => onSelectState(option || EMPTY_OPTION));
    }, [value, optionsMap, options, onSelectState, countryCode]);
    return (React__default.createElement(Select, Object.assign({}, props, { label: label, options: options, onChange: handleChange, value: value.value, disabled: isDisabled })));
};
const ControlledStateSelector = ({ name, control, label, countryCode, }) => (React__default.createElement(Controller, { name: name, control: control, render: (_a) => {
        var _b;
        var _c = _a.field, { name, onChange, ref } = _c, field = __rest(_c, ["name", "onChange", "ref"]), { fieldState } = _a;
        const error = fieldState === null || fieldState === void 0 ? void 0 : fieldState.error;
        const fieldError = error ? (error.hasOwnProperty("message") ? error.message : (_b = error.value) === null || _b === void 0 ? void 0 : _b.message) || "" : "";
        return (React__default.createElement(StateSelector, Object.assign({ id: name, name: name, label: label, onSelectState: onChange, fullWidth: true, countryCode: countryCode, inputRef: ref, error: !!fieldError, helperText: fieldError }, field)));
    } }));

export { ControlledStateSelector, StateSelector };
//# sourceMappingURL=StateSelector.js.map
