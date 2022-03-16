'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var themeTypography = require('./themeTypography.js');
var themePalette = require('./themePalette.js');
var themeComponents = require('./themeComponents.js');
var createTheme = require('../../../node_modules/@mui/material/styles/createTheme.js');

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

exports.MOJITO_DARK_THEME = MOJITO_DARK_THEME;
exports.MOJITO_LIGHT_THEME = MOJITO_LIGHT_THEME;
exports.extendDefaultTheme = extendDefaultTheme;
//# sourceMappingURL=theme.js.map
