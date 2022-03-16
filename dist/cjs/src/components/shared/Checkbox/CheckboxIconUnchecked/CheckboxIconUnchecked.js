'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var useTheme = require('../../../../../node_modules/@mui/material/styles/useTheme.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CheckboxIconUnchecked = ({ error, }) => {
    const { palette } = useTheme["default"]();
    return (React__default["default"].createElement(material.SvgIcon, null,
        React__default["default"].createElement("svg", { width: "20", height: "20", viewBox: "0 0 20 20", fill: "none", xmlns: "http://www.w3.org/2000/svg" },
            React__default["default"].createElement("rect", { x: "0.5", y: "0.5", width: "19", height: "19", rx: "1.5", stroke: error ? palette.warning.dark : palette.grey[200] }))));
};

exports.CheckboxIconUnchecked = CheckboxIconUnchecked;
//# sourceMappingURL=CheckboxIconUnchecked.js.map
