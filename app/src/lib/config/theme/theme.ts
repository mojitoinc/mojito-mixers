import { Theme, createTheme } from "@mui/material/styles";
import { createTypographyTheme } from "./themeTypography";
import { createPaletteTheme } from "./themePalette";
import { createComponentsTheme } from "./themeComponents";

export const NARROW_MAX_WIDTH = 320;

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
