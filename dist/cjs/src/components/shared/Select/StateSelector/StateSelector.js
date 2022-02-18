'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var reactHookForm = require('react-hook-form');
var Select = require('../Select.js');
var useCountryOptions = require('../../../../hooks/useCountryOptions.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const StateSelector = (_a) => {
    var { label, value, disabled, onSelectState, countryCode } = _a, props = tslib_es6.__rest(_a, ["label", "value", "disabled", "onSelectState", "countryCode"]);
    const { options, optionsMap } = useCountryOptions.useCountryOptions(countryCode);
    const handleChange = React.useCallback((e) => {
        onSelectState(optionsMap[e.target.value]);
    }, [optionsMap, onSelectState]);
    const isDisabled = disabled || !countryCode || options.length === 0;
    // If the selected option can't be found among the available ones, we reset the field:
    React.useEffect(() => {
        const stateCode = value.value;
        if (isDisabled || !stateCode)
            return;
        if (!optionsMap[stateCode])
            onSelectState(Select.EMPTY_OPTION);
    }, [value, isDisabled, optionsMap, onSelectState]);
    // If the selected option only has one property set, we try to find a match:
    React.useEffect(() => {
        const { value: selectedValue, label: selectedLabel } = value;
        if ((selectedValue && selectedLabel) ||
            (!selectedValue && !selectedLabel) ||
            options.length === 0)
            return;
        const option = selectedValue
            ? optionsMap[selectedValue]
            : options.find((option) => option.label === selectedLabel);
        setTimeout(() => onSelectState(option || Select.EMPTY_OPTION));
    }, [value, optionsMap, options, onSelectState, countryCode]);
    return (React__default["default"].createElement(Select.Select, Object.assign({}, props, { label: label, options: options, onChange: handleChange, value: value.value, disabled: isDisabled })));
};
const ControlledStateSelector = ({ name, control, label, countryCode, }) => (React__default["default"].createElement(reactHookForm.Controller, { name: name, control: control, render: (_a) => {
        var _b;
        var _c = _a.field, { name, onChange, ref } = _c, field = tslib_es6.__rest(_c, ["name", "onChange", "ref"]), { fieldState } = _a;
        const error = fieldState === null || fieldState === void 0 ? void 0 : fieldState.error;
        const fieldError = error ? (error.hasOwnProperty("message") ? error.message : (_b = error.value) === null || _b === void 0 ? void 0 : _b.message) || "" : "";
        return (React__default["default"].createElement(StateSelector, Object.assign({ id: name, name: name, label: label, onSelectState: onChange, fullWidth: true, countryCode: countryCode, inputRef: ref, error: !!fieldError, helperText: fieldError }, field)));
    } }));

exports.ControlledStateSelector = ControlledStateSelector;
exports.StateSelector = StateSelector;
//# sourceMappingURL=StateSelector.js.map
