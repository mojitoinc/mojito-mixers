import { __rest, __assign } from '../../../../node_modules/tslib/tslib.es6.js';
import { FormControl, InputLabel, Select as Select$1, MenuItem, FormHelperText } from '@mui/material';
import { SelectIcon } from '../Icons/Icons.js';
import React__default from 'react';

var EMPTY_OPTION = {
  label: "",
  value: ""
};
var Select = function Select(_a) {
  var id = _a.id,
      label = _a.label,
      required = _a.required,
      disabled = _a.disabled,
      _b = _a.options,
      options = _b === void 0 ? [] : _b,
      helperText = _a.helperText,
      error = _a.error,
      props = __rest(_a, ["id", "label", "required", "disabled", "options", "helperText", "error"]);

  return /*#__PURE__*/React__default.createElement(FormControl, {
    fullWidth: true,
    margin: "normal",
    variant: "filled",
    disabled: disabled,
    error: error
  }, /*#__PURE__*/React__default.createElement(InputLabel, {
    required: required,
    htmlFor: id,
    disabled: disabled,
    shrink: true
  }, label), /*#__PURE__*/React__default.createElement(Select$1, __assign({
    id: id,
    disabled: disabled,
    IconComponent: SelectIcon,
    disableUnderline: true
  }, props), options.map(function (_a) {
    var value = _a.value,
        label = _a.label;
    return /*#__PURE__*/React__default.createElement(MenuItem, {
      key: label,
      value: value
    }, label);
  })), helperText && /*#__PURE__*/React__default.createElement(FormHelperText, null, helperText));
};

export { EMPTY_OPTION, Select };
//# sourceMappingURL=Select.js.map
