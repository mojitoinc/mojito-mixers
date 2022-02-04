import { __assign } from '../../../../node_modules/tslib/tslib.es6.js';

function createPaletteTheme(paletteOptions) {
    return __assign(__assign({}, paletteOptions), { gradients: {
            stepper: 'linear-gradient(to right, #ffc7c7 -3%, #98df77 47%, #41ad46 100%)',
            action: 'linear-gradient(0deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), linear-gradient(272.88deg, #FFC5C5 -97.9%, #98DF77 123.11%)'
        }, success: {
            main: "#31A136",
            light: "#E5F2E5",
        }, warning: {
            main: "#D57E00",
            light: "#F3E9DB"
        }, error: {
            main: "#E14343",
            light: "#FFE6E6",
        }, grey: {
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
            // Address box text:
            "800": "#292929",
        } });
}

export { createPaletteTheme };
//# sourceMappingURL=palette.js.map
