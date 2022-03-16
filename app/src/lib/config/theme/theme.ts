import { Theme, ThemeOptions, createTheme } from "@mui/material/styles";
import { createTypographyTheme } from "./themeTypography";
import { createPaletteTheme } from "./themePalette";
import { createComponentsTheme } from "./themeComponents";

// Theme merger:
export const extendDefaultTheme = (themeOptions?: ThemeOptions): Theme => {
  const baseTheme = createTheme({
    ...themeOptions,
    palette: createPaletteTheme(themeOptions?.palette),
    typography: createTypographyTheme(
      typeof themeOptions?.typography === "function"
        ? themeOptions.typography(createTheme({ palette: themeOptions?.palette }).palette)
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
