import { __rest, __assign } from '../../../../../node_modules/tslib/tslib.es6.js';
import React__default, { useCallback, useEffect } from 'react';
import { Controller } from 'react-hook-form';
import { EMPTY_OPTION, Select } from '../Select.js';
import { useCountryOptions } from '../../../../hooks/useCountryOptions.js';

var CountrySelector = function CountrySelector(_a) {
  var label = _a.label,
      value = _a.value,
      disabled = _a.disabled,
      onSelectCountry = _a.onSelectCountry,
      props = __rest(_a, ["label", "value", "disabled", "onSelectCountry"]);

  var _b = useCountryOptions(),
      options = _b.options,
      optionsMap = _b.optionsMap;

  var handleChange = useCallback(function (e) {
    onSelectCountry(optionsMap[e.target.value]);
  }, [optionsMap, onSelectCountry]);
  var isDisabled = disabled || options.length === 0; // If the selected option can't be found among the available ones, we reset the field:

  useEffect(function () {
    var countryCode = value.value;
    if (isDisabled || !countryCode) return;
    if (!optionsMap[countryCode]) onSelectCountry(EMPTY_OPTION);
  }, [value, isDisabled, optionsMap, onSelectCountry]); // If the selected option only has one property set, we try to find a match:

  useEffect(function () {
    var selectedValue = value.value,
        selectedLabel = value.label;
    if (selectedValue && selectedLabel || !selectedValue && !selectedLabel) return;
    var option = selectedValue ? optionsMap[selectedValue] : options.find(function (option) {
      return option.label === selectedLabel;
    });
    setTimeout(function () {
      return onSelectCountry(option || EMPTY_OPTION);
    });
  }, [value, optionsMap, options, onSelectCountry]);
  return /*#__PURE__*/React__default.createElement(Select, __assign({}, props, {
    label: label,
    options: options,
    onChange: handleChange,
    value: value.value,
    disabled: isDisabled
  }));
};
var ControlledCountrySelector = function ControlledCountrySelector(_a) {
  var name = _a.name,
      control = _a.control,
      label = _a.label;
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
      return /*#__PURE__*/React__default.createElement(CountrySelector, __assign({
        id: name,
        name: name,
        label: label,
        onSelectCountry: onChange,
        fullWidth: true,
        inputRef: ref,
        error: !!error,
        helperText: error === null || error === void 0 ? void 0 : error.message
      }, field));
    }
  });
};

export { ControlledCountrySelector, CountrySelector };
//# sourceMappingURL=CountrySelector.js.map
