'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var formatUtils = require('../../../utils/formatUtils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const FormErrorsBox = (_a) => {
    var { error, sx } = _a, props = tslib_es6.__rest(_a, ["error", "sx"]);
    return (React__default["default"].createElement(material.Box, Object.assign({}, props, { sx: Object.assign({ color: theme => theme.palette.warning.dark }, sx) }),
        React__default["default"].createElement(material.Typography, { variant: "caption", component: "p", sx: { fontWeight: 600 } }, "Last purchase attempt errors:"),
        React__default["default"].createElement(material.Box, { component: "ul", sx: { m: 0, pl: "16px !important", listStyle: "disc !important" } }, formatUtils.parseSentences(error).map((sentence) => {
            return React__default["default"].createElement(material.Typography, { key: sentence, variant: "caption", component: "li", sx: { mt: 1.5 } }, sentence);
        }))));
};

exports.FormErrorsBox = FormErrorsBox;
//# sourceMappingURL=FormErrorsBox.js.map
