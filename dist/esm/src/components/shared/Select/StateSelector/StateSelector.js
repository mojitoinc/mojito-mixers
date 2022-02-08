import { __rest, __assign } from '../../../../../node_modules/tslib/tslib.es6.js';
import React__default, { useCallback, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { EMPTY_OPTION, Select } from '../Select.js';
import { useCountryOptions } from '../../../../hooks/useCountryOptions.js';

var StateSelector = function StateSelector(_a) {
  var label = _a.label,
      value = _a.value,
      disabled = _a.disabled,
      onSelectState = _a.onSelectState,
      countryCode = _a.countryCode,
      props = __rest(_a, ["label", "value", "disabled", "onSelectState", "countryCode"]);

  var _b = useCountryOptions(countryCode),
      options = _b.options,
      optionsMap = _b.optionsMap;

  var handleChange = useCallback(function (e) {
    onSelectState(optionsMap[e.target.value]);
  }, [optionsMap, onSelectState]);
  var isDisabled = disabled || !countryCode || options.length === 0; // If the selected option can't be found among the available ones, we reset the field:

  useEffect(function () {
    var stateCode = value.value;
    if (isDisabled || !stateCode) return;
    if (!optionsMap[stateCode]) onSelectState(EMPTY_OPTION);
  }, [value, isDisabled, optionsMap, onSelectState]); // If the selected option only has one property set, we try to find a match:

  useEffect(function () {
    var selectedValue = value.value,
        selectedLabel = value.label;
    if (selectedValue && selectedLabel || !selectedValue && !selectedLabel || options.length === 0) return;
    var option = selectedValue ? optionsMap[selectedValue] : options.find(function (option) {
      return option.label === selectedLabel;
    });
    setTimeout(function () {
      return onSelectState(option || EMPTY_OPTION);
    });
  }, [value, optionsMap, options, onSelectState, countryCode]);
  return /*#__PURE__*/React__default.createElement(Select, __assign({}, props, {
    label: label,
    options: options,
    onChange: handleChange,
    value: value.value,
    disabled: isDisabled
  }));
};
var ControlledStateSelector = function ControlledStateSelector(_a) {
  var name = _a.name,
      control = _a.control,
      label = _a.label,
      countryCode = _a.countryCode;
  return /*#__PURE__*/React__default.createElement(Controller, {
    name: name,
    control: control,
    render: function render(_a) {
      var _b;

      var _c = _a.field,
          name = _c.name,
          onChange = _c.onChange,
          ref = _c.ref,
          field = __rest(_c, ["name", "onChange", "ref"]),
          fieldState = _a.fieldState;

      var error = (_b = fieldState === null || fieldState === void 0 ? void 0 : fieldState.error) === null || _b === void 0 ? void 0 : _b.value;
      return /*#__PURE__*/React__default.createElement(StateSelector, __assign({
        id: name,
        name: name,
        label: label,
        onSelectState: onChange,
        fullWidth: true,
        countryCode: countryCode,
        inputRef: ref,
        error: !!error,
        helperText: error === null || error === void 0 ? void 0 : error.message
      }, field));
    }
  });
};

export { ControlledStateSelector, StateSelector };
//# sourceMappingURL=StateSelector.js.map
