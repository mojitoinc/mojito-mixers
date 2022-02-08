import { createTypographyTheme } from './themeTypography.js';
import { createPaletteTheme } from './themePalette.js';
import { createComponentsTheme } from './themeComponents.js';
import createTheme from '../../../node_modules/@mui/material/styles/createTheme.js';

const mojitoLightTheme = createTheme({
    typography: createTypographyTheme(),
    palette: createPaletteTheme({ mode: "light" }),
});
const MOJITO_LIGHT_THEME = createTheme(Object.assign(Object.assign({}, mojitoLightTheme), { components: createComponentsTheme(mojitoLightTheme) }));
const mojitoDarkTheme = createTheme({
    typography: createTypographyTheme(),
    palette: createPaletteTheme({ mode: "dark" }),
});
const MOJITO_DARK_THEME = createTheme(Object.assign(Object.assign({}, mojitoDarkTheme), { components: createComponentsTheme(mojitoDarkTheme) }));

export { MOJITO_DARK_THEME, MOJITO_LIGHT_THEME };
//# sourceMappingURL=theme.js.map
