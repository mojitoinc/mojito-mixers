'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var theme = require('../../../config/theme/theme.js');
var WarningAmber = require('../../../../node_modules/@mui/icons-material/WarningAmber.js');
var Check = require('../../../../node_modules/@mui/icons-material/Check.js');
var Autorenew = require('../../../../node_modules/@mui/icons-material/Autorenew.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const statusIconConfigs = {
    loading: {
        icon: Autorenew["default"],
        iconColor: theme => theme.palette.primary.main,
        defaultImgSrc: theme.DEFAULT_PURCHASING_IMAGE_SRC,
    },
    success: {
        icon: Check["default"],
        iconColor: theme => theme.palette.success.main,
    },
    error: {
        icon: WarningAmber["default"],
        iconColor: theme => theme.palette.warning.dark,
        defaultImgSrc: theme.DEFAULT_ERROR_IMAGE_SRC,
    },
};
const StatusIcon = (_a) => {
    var { variant = "loading", imgSrc, sx } = _a; tslib_es6.__rest(_a, ["variant", "imgSrc", "sx"]);
    const { icon: Icon, iconColor, defaultImgSrc, } = statusIconConfigs[variant];
    const src = imgSrc || defaultImgSrc;
    return src ? (React__default["default"].createElement(material.Box, { component: "img", src: src, sx: Object.assign({ width: 196, height: 196, mx: "auto" }, sx) })) : (React__default["default"].createElement(material.Box, { sx: Object.assign({ width: 96, height: 96, mx: "auto", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: theme.ROUNDED_BORDER_RADIUS, border: (theme) => `4px solid ${iconColor(theme)}` }, sx) },
        React__default["default"].createElement(Icon, { sx: {
                fontSize: 40,
                color: (theme) => iconColor(theme),
            } })));
};

exports.StatusIcon = StatusIcon;
//# sourceMappingURL=StatusIcon.js.map
