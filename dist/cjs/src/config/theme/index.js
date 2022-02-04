'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var typography = require('./mojito/typography.js');
var palette = require('./mojito/palette.js');
var components = require('./mojito/components.js');
var createTheme = require('../../../node_modules/@mui/material/styles/createTheme.js');

var mojitoLightTheme = createTheme["default"]({
    typography: typography.createTypographyTheme(),
    palette: palette.createPaletteTheme({ mode: "light" }),
});
var MOJITO_LIGHT_THEME = createTheme["default"](tslib_es6.__assign(tslib_es6.__assign({}, mojitoLightTheme), { components: components.createComponentsTheme(mojitoLightTheme) }));
var mojitoDarkTheme = createTheme["default"]({
    typography: typography.createTypographyTheme(),
    palette: palette.createPaletteTheme({ mode: "dark" }),
});
var MOJITO_DARK_THEME = createTheme["default"](tslib_es6.__assign(tslib_es6.__assign({}, mojitoDarkTheme), { components: components.createComponentsTheme(mojitoDarkTheme) }));

exports.MOJITO_DARK_THEME = MOJITO_DARK_THEME;
exports.MOJITO_LIGHT_THEME = MOJITO_LIGHT_THEME;
//# sourceMappingURL=index.js.map
