'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var mergeOptions = require('merge-options');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var mergeOptions__default = /*#__PURE__*/_interopDefaultLegacy(mergeOptions);

function createTypographyTheme(typographyOptions = {}) {
    return mergeOptions__default["default"]({
        fontFamily: "IBM Plex Sans, sans-serif",
        h5: {
            // Title at the top of the modal:
            fontFamily: "IBM Plex Mono, monospace",
            fontWeight: 600,
        },
        subtitle1: {
            // Item price and input values:
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "16px",
        },
        subtitle2: {
            // Stepper labels:
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "14px",
            fontWeight: 600,
        },
        body2: {
            // Form group labels:
            fontWeight: 600,
            fontSize: "12px",
        },
        body1: {
            // Default text, form input labels and tooltips:
            fontSize: "12px",
        },
        caption: {
            // Saved item lines:
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "12px",
        },
        button: {
            fontWeight: 600,
            textTransform: "none",
        },
    }, typographyOptions);
}

exports.createTypographyTheme = createTypographyTheme;
//# sourceMappingURL=themeTypography.js.map
