import mergeOptions from 'merge-options';

const MOJITO_LIGHT_PALETTE = {
    background: {
        default: "#FFFFFF",
        paper: "#FFFFFF",
    },
    primary: {
        // Input borders when focused, focused select options background (lighter shade), link underline:
        main: "#64C538",
        // Primary button text (which might use a gradient background from below anyway):
        contrastText: "#000000",
    },
    text: {
        // Main text color used for most of the texts we use:
        primary: "#000000",
        // Not used:
        secondary: "#000000",
        // Disabled text (used in disabled inputs):
        disabled: "#D9D9D9",
    },
    paymentUI: {
        progressBar: "linear-gradient(to right, #FFC7C7 -3%, #98DF77 47%, #41AD46 100%)",
        paymentMethodSelectorBorder: "linear-gradient(to left, #FFC7C7 -3%, #98DF77 47%, #41AD46 100%)",
        paymentMethodSelectorBackground: "linear-gradient(272.88deg, #FFC5C5 -97.9%, #98DF77 123.11%)",
        mainButtonBackground: "linear-gradient(272.88deg, #FFC5C5 -97.9%, #98DF77 123.11%)",
    },
    info: {
        main: "#0A96B4",
        light: "#55E0FF66",
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
const MOJITO_DARK_PALETTE = MOJITO_LIGHT_PALETTE;
function createPaletteTheme(paletteOptions = {}) {
    return mergeOptions((paletteOptions === null || paletteOptions === void 0 ? void 0 : paletteOptions.mode) === "dark" ? MOJITO_DARK_PALETTE : MOJITO_LIGHT_PALETTE, paletteOptions);
}

export { createPaletteTheme };
//# sourceMappingURL=themePalette.js.map
