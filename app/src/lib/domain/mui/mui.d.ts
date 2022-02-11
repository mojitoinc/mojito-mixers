import "@mui/material/styles/createPalette";

declare module "@mui/material/styles/createPalette" {
  interface Palette {
    gradients?: {
      stepper?: string;
      stepperReverse?: string;
      action?: string;
      actionReverse?: string;
    };
  }

  interface PaletteOptions {
    gradients?: {
      stepper?: string;
      stepperReverse?: string;
      action?: string;
      actionReverse?: string;
    };
  }
}
