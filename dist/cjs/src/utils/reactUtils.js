'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _typeof = require('@babel/runtime/helpers/esm/typeof');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _typeof__default = /*#__PURE__*/_interopDefaultLegacy(_typeof);

function containsOnlyIcon(children) {
  var _a, _b, _c;

  return _typeof__default["default"](children) === "object" && ((_c = (_b = (_a = children === null || children === void 0 ? void 0 : children.type) === null || _a === void 0 ? void 0 : _a.type) === null || _b === void 0 ? void 0 : _b.render) === null || _c === void 0 ? void 0 : _c.muiName) === "SvgIcon";
}

exports.containsOnlyIcon = containsOnlyIcon;
//# sourceMappingURL=reactUtils.js.map
