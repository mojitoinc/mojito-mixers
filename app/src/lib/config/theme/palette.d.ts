import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    gradients?: {
      stepper?: string;
      action?: string;
    };
  }

  interface PaletteOptions {
    gradients?: {
      stepper?: string;
      action?: string;
    };
  }
}
