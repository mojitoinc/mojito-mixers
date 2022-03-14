import mergeOptions from 'merge-options';

function createTypographyTheme(typographyOptions = {}) {
    return mergeOptions({
        fontFamily: "IBM Plex Sans, sans-serif",
        h5: {
            // Title at the top of the modal:
            fontFamily: "IBM Plex Mono, monospace",
            fontWeight: 600,
        },
        subtitle1: {
            // Item price and input values:
            fontFamily: "IBM Plex Sans, sans-serif",
            fontSize: "16px",
        },
        subtitle2: {
            // Stepper labels:
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "14px",
            fontWeight: 600,
        },
        body2: {
            // Form group labels:
            fontWeight: 600,
            fontSize: "12px",
        },
        body1: {
            // Default text, form input labels and tooltips:
            fontSize: "12px",
        },
        caption: {
            // Saved item lines:
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "12px",
        },
        button: {
            fontWeight: 600,
            textTransform: "none",
        },
    }, typographyOptions);
}

export { createTypographyTheme };
//# sourceMappingURL=themeTypography.js.map
