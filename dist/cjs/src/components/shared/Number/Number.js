'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var Number = function (_a) {
    var _b = _a.as, Wrapper = _b === void 0 ? "span" : _b, children = _a.children, _c = _a.prefix, prefix = _c === void 0 ? "" : _c, _d = _a.suffix, suffix = _d === void 0 ? "" : _d;
    var numberFormat = new Intl.NumberFormat();
    return (React__default["default"].createElement(Wrapper, null, "".concat(prefix).concat(numberFormat.format(children)).concat(suffix)));
};

exports.Number = Number;
//# sourceMappingURL=Number.js.map
