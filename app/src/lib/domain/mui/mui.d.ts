import "@mui/material/styles";

declare module "@mui/material/styles" {
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
