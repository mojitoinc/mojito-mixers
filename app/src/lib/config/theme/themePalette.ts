import { PaletteOptions } from "@mui/material/styles";
import mergeOptions from "merge-options";

const MOJITO_LIGHT_PALETTE: PaletteOptions = {
  background: {
    default: "#FFFFFF",
    paper: "#FFFFFF",
  },

  primary: {
    main: "#64C538",
  },

  text: {
    primary: "#000000",
    secondary: "#000000",
    disabled: "#D9D9D9",
  },

  gradients: {
    stepper: "linear-gradient(to right, #FFC7C7 -3%, #98DF77 47%, #41AD46 100%)",
    stepperReverse: "linear-gradient(to left, #FFC7C7 -3%, #98DF77 47%, #41AD46 100%)",
    // Simplified gradients:
    action: "linear-gradient(272.88deg, #FFC5C5 -97.9%, #98DF77 123.11%)",
    actionReverse: "linear-gradient(272.88deg, #FFC5C5 -97.9%, #98DF77 123.11%)",
    // Original gradients (Figma):
    // action: "linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(272.88deg, #FFC5C5 -97.9%, #98DF77 123.11%)",
    // actionReverse: "linear-gradient(to left, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(272.88deg, #FFC5C5 -97.9%, #98DF77 123.11%)",
  },

  success: {
    main: "#31A136",
    light: "#E5F2E5",
  },

  warning: {
    main: "#D57E00",
    light: "#F3E9DB",
    dark: "#FF5E00",
  },

  error: {
    main: "#E14343",
    light: "#FFE6E6",
  },

  grey: {
    // Address box, read only input and payment method toggle (selected) background:
    "50": "#F8F8F8",

    // Payment method toggle (not selected) background, separators, secondary button background and address box border:
    "100": "#DDDDDD",

    // Input borders:
    "200": "#D9D9D9",

    // Image placeholder background:
    "300": "#C4C4C4",

    // Payment method toggle (not selected) text:
    "400": "#727272",

    // Input labels and icons:
    "500": "#6B6B6B",

    // Secondary button text:
    "600": "#686868",

    // Form input group labels:
    "700": "#333333",

    // Address box text and primary button text:
    "800": "#292929",
  },
};

// TODO: Not implemented:
const MOJITO_DARK_PALETTE: PaletteOptions = MOJITO_LIGHT_PALETTE;

export function createPaletteTheme(paletteOptions: PaletteOptions = {}): PaletteOptions {
  return mergeOptions(paletteOptions?.mode === "dark" ? MOJITO_DARK_PALETTE : MOJITO_LIGHT_PALETTE, paletteOptions);
}
