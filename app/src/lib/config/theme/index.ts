import { Theme, createTheme } from "@mui/material/styles";
import { createTypographyTheme } from "./mojito/typography";
import { createPaletteTheme } from "./mojito/palette";
import { createComponentsTheme } from "./mojito/components";

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
