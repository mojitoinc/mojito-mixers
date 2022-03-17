import "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    paymentUI?: {
      progressBar?: string;
      paymentMethodSelectorBorder?: string;
      paymentMethodSelectorBackground?: string;
      mainButtonBackground?: string;
      mainButtonBorderWidth?: number;
    };
  }

  interface PaletteOptions {
    paymentUI?: {
      progressBar?: string;
      paymentMethodSelectorBorder?: string;
      paymentMethodSelectorBackground?: string;
      mainButtonBackground?: string;
      mainButtonBorderWidth?: number;
    };
  }
}
