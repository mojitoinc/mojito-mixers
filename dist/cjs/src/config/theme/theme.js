'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var themeTypography = require('./themeTypography.js');
var themePalette = require('./themePalette.js');
var themeComponents = require('./themeComponents.js');
var createTheme = require('../../../node_modules/@mui/material/styles/createTheme.js');

// Used to limit text width in PaymentView's disclaimer text and PurchasingView's loading text:
const XS_MOBILE_MAX_WIDTH = 320;
const SM_MOBILE_MAX_WIDTH = 400;
// There's theme.shape.borderRadius, but it's a single value:
const SM_BORDER_RADIUS = 2;
const MD_BORDER_RADIUS = 4;
const ROUNDED_BORDER_RADIUS = 1024;
// TODO: Not used everywhere, changing it won't work as expected:
const BORDER_THICKNESS = 1;
// Used to cover the saved payment methods with a loader when deleting them:
const OVERLAY_OPACITY = 0.75;
// Images:
const DEFAULT_PURCHASING_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif";
const DEFAULT_ERROR_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-error-loader.gif";
const CIRCLE_LOGO_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/circle.png";
// Theme merger:
const extendDefaultTheme = (themeOptions) => {
    const baseTheme = createTheme["default"](Object.assign(Object.assign({}, themeOptions), { palette: themePalette.createPaletteTheme(themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.palette), typography: themeTypography.createTypographyTheme(typeof (themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.typography) === "function"
            ? themeOptions.typography(createTheme["default"]({ palette: themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.palette }).palette)
            : themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.typography) }));
    return createTheme["default"]({
        components: themeComponents.createComponentsTheme(baseTheme),
    }, baseTheme);
};
// Default Mojito themes:
const MOJITO_LIGHT_THEME = extendDefaultTheme();
const MOJITO_DARK_THEME = extendDefaultTheme({ palette: { mode: "dark" } });

exports.BORDER_THICKNESS = BORDER_THICKNESS;
exports.CIRCLE_LOGO_IMAGE_SRC = CIRCLE_LOGO_IMAGE_SRC;
exports.DEFAULT_ERROR_IMAGE_SRC = DEFAULT_ERROR_IMAGE_SRC;
exports.DEFAULT_PURCHASING_IMAGE_SRC = DEFAULT_PURCHASING_IMAGE_SRC;
exports.MD_BORDER_RADIUS = MD_BORDER_RADIUS;
exports.MOJITO_DARK_THEME = MOJITO_DARK_THEME;
exports.MOJITO_LIGHT_THEME = MOJITO_LIGHT_THEME;
exports.OVERLAY_OPACITY = OVERLAY_OPACITY;
exports.ROUNDED_BORDER_RADIUS = ROUNDED_BORDER_RADIUS;
exports.SM_BORDER_RADIUS = SM_BORDER_RADIUS;
exports.SM_MOBILE_MAX_WIDTH = SM_MOBILE_MAX_WIDTH;
exports.XS_MOBILE_MAX_WIDTH = XS_MOBILE_MAX_WIDTH;
exports.extendDefaultTheme = extendDefaultTheme;
//# sourceMappingURL=theme.js.map
