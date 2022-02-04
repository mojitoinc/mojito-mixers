import { __assign } from '../../../node_modules/tslib/tslib.es6.js';
import { createTypographyTheme } from './mojito/typography.js';
import { createPaletteTheme } from './mojito/palette.js';
import { createComponentsTheme } from './mojito/components.js';
import createTheme from '../../../node_modules/@mui/material/styles/createTheme.js';

var mojitoLightTheme = createTheme({
    typography: createTypographyTheme(),
    palette: createPaletteTheme({ mode: "light" }),
});
var MOJITO_LIGHT_THEME = createTheme(__assign(__assign({}, mojitoLightTheme), { components: createComponentsTheme(mojitoLightTheme) }));
var mojitoDarkTheme = createTheme({
    typography: createTypographyTheme(),
    palette: createPaletteTheme({ mode: "dark" }),
});
var MOJITO_DARK_THEME = createTheme(__assign(__assign({}, mojitoDarkTheme), { components: createComponentsTheme(mojitoDarkTheme) }));

export { MOJITO_DARK_THEME, MOJITO_LIGHT_THEME };
//# sourceMappingURL=index.js.map
