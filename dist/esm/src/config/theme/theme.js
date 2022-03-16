import { createTypographyTheme } from './themeTypography.js';
import { createPaletteTheme } from './themePalette.js';
import { createComponentsTheme } from './themeComponents.js';
import createTheme from '../../../node_modules/@mui/material/styles/createTheme.js';

// Theme merger:
const extendDefaultTheme = (themeOptions) => {
    const baseTheme = createTheme(Object.assign(Object.assign({}, themeOptions), { palette: createPaletteTheme(themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.palette), typography: createTypographyTheme(typeof (themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.typography) === "function"
            ? themeOptions.typography(createTheme({ palette: themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.palette }).palette)
            : themeOptions === null || themeOptions === void 0 ? void 0 : themeOptions.typography) }));
    return createTheme({
        components: createComponentsTheme(baseTheme),
    }, baseTheme);
};
// Default Mojito themes:
const MOJITO_LIGHT_THEME = extendDefaultTheme();
const MOJITO_DARK_THEME = extendDefaultTheme({ palette: { mode: "dark" } });

export { MOJITO_DARK_THEME, MOJITO_LIGHT_THEME, extendDefaultTheme };
//# sourceMappingURL=theme.js.map
