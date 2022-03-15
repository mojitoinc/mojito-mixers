'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var reactHookForm = require('react-hook-form');
var Select = require('../Select.js');
var useCountryOptions = require('../../../../hooks/useCountryOptions.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CountrySelector = (_a) => {
    var { label, value, disabled, onSelectCountry } = _a, props = tslib_es6.__rest(_a, ["label", "value", "disabled", "onSelectCountry"]);
    const { options, optionsMap } = useCountryOptions.useCountryOptions();
    const handleChange = React.useCallback((e) => {
        onSelectCountry(optionsMap[e.target.value]);
    }, [optionsMap, onSelectCountry]);
    const isDisabled = disabled || options.length === 0;
    // If the selected option can't be found among the available ones, we reset the field:
    React.useEffect(() => {
        const countryCode = value.value;
        if (isDisabled || !countryCode)
            return;
        if (!optionsMap[countryCode])
            onSelectCountry(Select.EMPTY_OPTION);
    }, [value, isDisabled, optionsMap, onSelectCountry]);
    // If the selected option only has one property set, we try to find a match:
    React.useEffect(() => {
        const { value: selectedValue, label: selectedLabel } = value;
        if ((selectedValue && selectedLabel) || (!selectedValue && !selectedLabel) || options.length === 0)
            return;
        const option = selectedValue
            ? optionsMap[selectedValue]
            : options.find((option) => option.label === selectedLabel);
        setTimeout(() => onSelectCountry(option || Select.EMPTY_OPTION));
    }, [value, optionsMap, options, onSelectCountry]);
    const selectedValue = value.value;
    return (React__default["default"].createElement(Select.Select, Object.assign({}, props, { 
        // See https://developers.google.com/web/updates/2015/06/checkout-faster-with-autofill:
        autoComplete: props.autoComplete || "country", label: label, options: options, onChange: handleChange, value: optionsMap[selectedValue] ? selectedValue : "", disabled: isDisabled })));
};
const ControlledCountrySelector = ({ name, control, label, }) => (React__default["default"].createElement(reactHookForm.Controller, { name: name, control: control, render: (_a) => {
        var _b;
        var _c = _a.field, { name, onChange, ref } = _c, field = tslib_es6.__rest(_c, ["name", "onChange", "ref"]), { fieldState } = _a;
        const error = fieldState === null || fieldState === void 0 ? void 0 : fieldState.error;
        const fieldError = error ? (error.hasOwnProperty("message") ? error.message : (_b = error.value) === null || _b === void 0 ? void 0 : _b.message) || "" : "";
        return (React__default["default"].createElement(CountrySelector, Object.assign({ id: name, name: name, autoComplete: "country", label: label, onSelectCountry: onChange, fullWidth: true, inputRef: ref, error: !!fieldError, helperText: fieldError }, field)));
    } }));

exports.ControlledCountrySelector = ControlledCountrySelector;
exports.CountrySelector = CountrySelector;
//# sourceMappingURL=CountrySelector.js.map
