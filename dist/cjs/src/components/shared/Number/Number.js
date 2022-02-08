'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const Number = ({ as: Wrapper = "span", children, prefix = "", suffix = "" }) => {
    const numberFormat = new Intl.NumberFormat();
    return (React__default["default"].createElement(Wrapper, null, `${prefix}${numberFormat.format(children)}${suffix}`));
};

exports.Number = Number;
//# sourceMappingURL=Number.js.map
