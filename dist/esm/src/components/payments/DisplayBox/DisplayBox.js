import { __rest, __assign } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box } from '@mui/material';
import React__default from 'react';

var DISPLAY_BOX_PROPS = {
  p: 2,
  border: 1,
  borderRadius: "2px",
  backgroundColor: function backgroundColor(theme) {
    return theme.palette.grey["50"];
  },
  borderColor: function borderColor(theme) {
    return theme.palette.grey["100"];
  },
  color: function color(theme) {
    return theme.palette.grey["800"];
  },
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  }
};
var DisplayBox = function DisplayBox(_a) {
  var sx = _a.sx,
      props = __rest(_a, ["sx"]);

  return /*#__PURE__*/React__default.createElement(Box, __assign({}, props, {
    sx: __assign(__assign({}, DISPLAY_BOX_PROPS), sx)
  }));
};
var DebugBox = function DebugBox(_a) {
  var sx = _a.sx,
      props = __rest(_a, ["sx"]);

  return /*#__PURE__*/React__default.createElement(DisplayBox, __assign({}, props, {
    component: "pre",
    sx: __assign(__assign({}, sx), {
      overflow: "scroll"
    })
  }));
};

export { DebugBox, DisplayBox };
//# sourceMappingURL=DisplayBox.js.map
