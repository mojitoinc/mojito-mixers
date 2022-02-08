'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var reactHookForm = require('react-hook-form');
var Select = require('../Select.js');
var useCountryOptions = require('../../../../hooks/useCountryOptions.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var StateSelector = function StateSelector(_a) {
  var label = _a.label,
      value = _a.value,
      disabled = _a.disabled,
      onSelectState = _a.onSelectState,
      countryCode = _a.countryCode,
      props = tslib_es6.__rest(_a, ["label", "value", "disabled", "onSelectState", "countryCode"]);

  var _b = useCountryOptions.useCountryOptions(countryCode),
      options = _b.options,
      optionsMap = _b.optionsMap;

  var handleChange = React.useCallback(function (e) {
    onSelectState(optionsMap[e.target.value]);
  }, [optionsMap, onSelectState]);
  var isDisabled = disabled || !countryCode || options.length === 0; // If the selected option can't be found among the available ones, we reset the field:

  React.useEffect(function () {
    var stateCode = value.value;
    if (isDisabled || !stateCode) return;
    if (!optionsMap[stateCode]) onSelectState(Select.EMPTY_OPTION);
  }, [value, isDisabled, optionsMap, onSelectState]); // If the selected option only has one property set, we try to find a match:

  React.useEffect(function () {
    var selectedValue = value.value,
        selectedLabel = value.label;
    if (selectedValue && selectedLabel || !selectedValue && !selectedLabel || options.length === 0) return;
    var option = selectedValue ? optionsMap[selectedValue] : options.find(function (option) {
      return option.label === selectedLabel;
    });
    setTimeout(function () {
      return onSelectState(option || Select.EMPTY_OPTION);
    });
  }, [value, optionsMap, options, onSelectState, countryCode]);
  return /*#__PURE__*/React__default["default"].createElement(Select.Select, tslib_es6.__assign({}, props, {
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
  return /*#__PURE__*/React__default["default"].createElement(reactHookForm.Controller, {
    name: name,
    control: control,
    render: function render(_a) {
      var _b;

      var _c = _a.field,
          name = _c.name,
          onChange = _c.onChange,
          ref = _c.ref,
          field = tslib_es6.__rest(_c, ["name", "onChange", "ref"]),
          fieldState = _a.fieldState;

      var error = (_b = fieldState === null || fieldState === void 0 ? void 0 : fieldState.error) === null || _b === void 0 ? void 0 : _b.value;
      return /*#__PURE__*/React__default["default"].createElement(StateSelector, tslib_es6.__assign({
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

exports.ControlledStateSelector = ControlledStateSelector;
exports.StateSelector = StateSelector;
//# sourceMappingURL=StateSelector.js.map
