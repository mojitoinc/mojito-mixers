import { Theme, createTheme } from "@mui/material/styles";
import { createTypographyTheme } from "./themeTypography";
import { createPaletteTheme } from "./themePalette";
import { createComponentsTheme } from "./themeComponents";

// Used to limit text width in PaymentView's disclaimer text and PurchasingView's loading text:
export const XS_MOBILE_MAX_WIDTH = 320;
export const SM_MOBILE_MAX_WIDTH = 400;

// There's theme.shape.borderRadius, but it's a single value:
export const SM_BORDER_RADIUS = 2;
export const MD_BORDER_RADIUS = 4;

// TODO: Not used everywhere, changing it won't work as expected:
export const BORDER_THICKNESS = 1;

// Used to cover the saved payment methods with a loader when deleting them:
export const OVERLAY_OPACITY = 0.75;

const mojitoLightTheme: Theme = createTheme({
  typography: createTypographyTheme(),
  palette: createPaletteTheme({ mode: "light" }),
});

export const MOJITO_LIGHT_THEME = createTheme({
  ...mojitoLightTheme,
  components: createComponentsTheme(mojitoLightTheme),
});

const mojitoDarkTheme: Theme = createTheme({
  typography: createTypographyTheme(),
  palette: createPaletteTheme({ mode: "dark" }),
});

export const MOJITO_DARK_THEME = createTheme({
  ...mojitoDarkTheme,
  components: createComponentsTheme(mojitoDarkTheme),
});
