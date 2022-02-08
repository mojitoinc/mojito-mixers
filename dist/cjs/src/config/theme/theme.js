'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var themeTypography = require('./themeTypography.js');
var themePalette = require('./themePalette.js');
var themeComponents = require('./themeComponents.js');
var createTheme = require('../../../node_modules/@mui/material/styles/createTheme.js');

var mojitoLightTheme = createTheme["default"]({
    typography: themeTypography.createTypographyTheme(),
    palette: themePalette.createPaletteTheme({ mode: "light" }),
});
var MOJITO_LIGHT_THEME = createTheme["default"](tslib_es6.__assign(tslib_es6.__assign({}, mojitoLightTheme), { components: themeComponents.createComponentsTheme(mojitoLightTheme) }));
var mojitoDarkTheme = createTheme["default"]({
    typography: themeTypography.createTypographyTheme(),
    palette: themePalette.createPaletteTheme({ mode: "dark" }),
});
var MOJITO_DARK_THEME = createTheme["default"](tslib_es6.__assign(tslib_es6.__assign({}, mojitoDarkTheme), { components: themeComponents.createComponentsTheme(mojitoDarkTheme) }));

exports.MOJITO_DARK_THEME = MOJITO_DARK_THEME;
exports.MOJITO_LIGHT_THEME = MOJITO_LIGHT_THEME;
//# sourceMappingURL=theme.js.map
