'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var StatusIcon = require('../../components/shared/StatusIcon/StatusIcon.js');
var theme = require('../../config/theme/theme.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const SuccessView = ({ successImageSrc, }) => {
    return (React__default["default"].createElement(material.Box, null,
        React__default["default"].createElement(StatusIcon.StatusIcon, { variant: "success", imgSrc: successImageSrc, sx: { my: 5 } }),
        React__default["default"].createElement(material.Box, { sx: { maxWidth: theme.XS_MOBILE_MAX_WIDTH, mx: "auto", my: 5 } },
            React__default["default"].createElement(material.Typography, { variant: "body2", sx: { textAlign: "center", mb: 1.5 } }, "Payment success!"),
            React__default["default"].createElement(material.Typography, { variant: "body2", sx: { textAlign: "center" } }, "Redirecting you to the confirmation screen..."))));
};

exports.SuccessView = SuccessView;
//# sourceMappingURL=SuccessView.js.map
