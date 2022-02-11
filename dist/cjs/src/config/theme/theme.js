'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var themeTypography = require('./themeTypography.js');
var themePalette = require('./themePalette.js');
var themeComponents = require('./themeComponents.js');
var createTheme = require('../../../node_modules/@mui/material/styles/createTheme.js');

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

exports.MOJITO_DARK_THEME = MOJITO_DARK_THEME;
exports.MOJITO_LIGHT_THEME = MOJITO_LIGHT_THEME;
//# sourceMappingURL=theme.js.map
