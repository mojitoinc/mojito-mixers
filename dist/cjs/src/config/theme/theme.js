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
// TODO: Not used everywhere, changing it won't work as expected:
const BORDER_THICKNESS = 1;
// Used to cover the saved payment methods with a loader when deleting them:
const OVERLAY_OPACITY = 0.75;
const mojitoLightTheme = createTheme["default"]({
    typography: themeTypography.createTypographyTheme(),
    palette: themePalette.createPaletteTheme({ mode: "light" }),
});
const MOJITO_LIGHT_THEME = createTheme["default"](Object.assign(Object.assign({}, mojitoLightTheme), { components: themeComponents.createComponentsTheme(mojitoLightTheme) }));
const mojitoDarkTheme = createTheme["default"]({
    typography: themeTypography.createTypographyTheme(),
    palette: themePalette.createPaletteTheme({ mode: "dark" }),
});
const MOJITO_DARK_THEME = createTheme["default"](Object.assign(Object.assign({}, mojitoDarkTheme), { components: themeComponents.createComponentsTheme(mojitoDarkTheme) }));

exports.BORDER_THICKNESS = BORDER_THICKNESS;
exports.MD_BORDER_RADIUS = MD_BORDER_RADIUS;
exports.MOJITO_DARK_THEME = MOJITO_DARK_THEME;
exports.MOJITO_LIGHT_THEME = MOJITO_LIGHT_THEME;
exports.OVERLAY_OPACITY = OVERLAY_OPACITY;
exports.SM_BORDER_RADIUS = SM_BORDER_RADIUS;
exports.SM_MOBILE_MAX_WIDTH = SM_MOBILE_MAX_WIDTH;
exports.XS_MOBILE_MAX_WIDTH = XS_MOBILE_MAX_WIDTH;
//# sourceMappingURL=theme.js.map
