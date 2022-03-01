import { Theme, ThemeOptions, createTheme } from "@mui/material/styles";
import { createTypographyTheme } from "./themeTypography";
import { createPaletteTheme } from "./themePalette";
import { createComponentsTheme } from "./themeComponents";
import createPalette from "@mui/material/styles/createPalette";

// Used to limit text width in PaymentView's disclaimer text and PurchasingView's loading text:
export const XS_MOBILE_MAX_WIDTH = 320;
export const SM_MOBILE_MAX_WIDTH = 400;

// There's theme.shape.borderRadius, but it's a single value:
export const SM_BORDER_RADIUS = 2;
export const MD_BORDER_RADIUS = 4;
export const ROUNDED_BORDER_RADIUS = 1024;

// TODO: Not used everywhere, changing it won't work as expected:
export const BORDER_THICKNESS = 1;

// Used to cover the saved payment methods with a loader when deleting them:
export const OVERLAY_OPACITY = 0.75;

// Default images:
export const DEFAULT_PURCHASING_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/mojito-loader.gif";
export const DEFAULT_PAYMENT_IMAGE_SRC = "https://raw.githubusercontent.com/mojitoinc/mojito-mixers/main/app/src/lib/assets/circle.png";

// Theme merger:
export const extendDefaultTheme = (themeOptions?: ThemeOptions): Theme => {
  const baseTheme = createTheme({
    ...themeOptions,
    palette: createPaletteTheme(themeOptions?.palette),
    typography: createTypographyTheme(
      typeof themeOptions?.typography === "function"
        ? themeOptions.typography(createPalette(themeOptions?.palette || {}))
        : themeOptions?.typography
    ),
  });

  return createTheme({
    components: createComponentsTheme(baseTheme),
  }, baseTheme)
}

// Default Mojito themes:
export const MOJITO_LIGHT_THEME = extendDefaultTheme();
export const MOJITO_DARK_THEME = extendDefaultTheme({ palette: { mode: "dark" } });
