import React__default from 'react';

var Number = function (_a) {
    var _b = _a.as, Wrapper = _b === void 0 ? "span" : _b, children = _a.children, _c = _a.prefix, prefix = _c === void 0 ? "" : _c, _d = _a.suffix, suffix = _d === void 0 ? "" : _d;
    var numberFormat = new Intl.NumberFormat();
    return (React__default.createElement(Wrapper, null, "".concat(prefix).concat(numberFormat.format(children)).concat(suffix)));
};

export { Number };
//# sourceMappingURL=Number.js.map
