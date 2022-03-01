import { createTypographyTheme } from './themeTypography.js';
import { createPaletteTheme } from './themePalette.js';
import { createComponentsTheme } from './themeComponents.js';
import createTheme from '../../../node_modules/@mui/material/styles/createTheme.js';

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
// Default images:
const DEFAULT_PURCHASING_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif";
const DEFAULT_PAYMENT_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/circle.png";
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

export { BORDER_THICKNESS, DEFAULT_PAYMENT_IMAGE_SRC, DEFAULT_PURCHASING_IMAGE_SRC, MD_BORDER_RADIUS, MOJITO_DARK_THEME, MOJITO_LIGHT_THEME, OVERLAY_OPACITY, ROUNDED_BORDER_RADIUS, SM_BORDER_RADIUS, SM_MOBILE_MAX_WIDTH, XS_MOBILE_MAX_WIDTH };
//# sourceMappingURL=theme.js.map
