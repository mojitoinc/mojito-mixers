'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var themeConstants = require('./themeConstants.js');
var themeUtils = require('./themeUtils.js');

/*
declare module "@mui/material/TextField" {
  interface TextFieldPropsVariantOverrides {
    custom: true;
  }
}
*/
function createComponentsTheme({ typography, palette, spacing, breakpoints, transitions }) {
    var _a, _b, _c, _d, _e, _f, _g;
    return {
        // FORMS:
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: "14px",
                    fontWeight: 500,
                    color: palette.grey[700],
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginLeft: 0,
                    "&.Mui-error": {
                        color: palette.warning.dark,
                    },
                }
            }
        },
        // INPUTS:
        MuiFormControl: {
            styleOverrides: {
                marginNormal: {
                    marginTop: "12px",
                    marginBottom: "8px",
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: {
                    fontFamily: typography.caption.fontFamily,
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 500,
                    color: palette.grey[500],
                    // marginLeft: "4px",
                    "&.Mui-focused": {
                        color: palette.grey[500],
                    },
                    "&.Mui-error": {
                        color: palette.warning.dark,
                    },
                    "&.Mui-error.Mui-focused": {
                        color: palette.grey[500],
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: "60px",
                    borderRadius: themeConstants.MD_BORDER_RADIUS,
                    "&.Mui-disabled::before": {
                        border: 0,
                    },
                },
                input: Object.assign(Object.assign({}, typography.subtitle1), { "&.Mui-disabled": {
                        cursor: "not-allowed",
                    } }),
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    borderRadius: themeConstants.MD_BORDER_RADIUS,
                    border: `${themeConstants.BORDER_THICKNESS}px solid ${palette.grey[200]}`,
                    background: palette.background.default,
                    "&:hover": {
                        background: palette.background.default,
                    },
                    "&.Mui-focused": {
                        borderColor: palette.primary.main,
                        background: palette.background.default,
                    },
                    "&.Mui-error": {
                        borderColor: palette.warning.dark,
                        background: palette.background.default,
                    },
                    "&.Mui-disabled": {
                        borderColor: palette.grey[100],
                        background: palette.background.default,
                    },
                    "&.Mui-disabled.Mui-error": {
                        borderColor: palette.warning.light,
                        background: palette.background.default,
                    },
                },
            },
        },
        /*
        MuiTextField: {
          variants: [{
            props: {
              variant: "custom"
            },
            styles: {
              "& .MuiInputLabel-root": {
                "&.Mui-disabled": {
                  color: palette.text.primary,
                },
              },
              "& .MuiInputBase-root": {
                "&.Mui-disabled": {
                  backgroundColor: palette.grey[50],
                  color: palette.text.primary,
                  padding: 8,
                  height: "40px",
                  borderRadius: SM_BORDER_RADIUS,
                  marginTop: 32,
                },
              },
              "& .MuiInputBase-input": {
                "&.Mui-disabled": {
                  color: palette.text.primary,
                  WebkitTextFillColor: palette.text.primary,
                  fontSize: "12px",
                  cursor: "default",
                },
              },
            },
          }],
        },
          */
        // BUTTONS:
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                root: {
                    borderRadius: themeConstants.MD_BORDER_RADIUS,
                    boxSizing: "border-box",
                    fontSize: "12px",
                    "&.Mui-disabled": {
                        background: palette.grey["50"],
                        border: `${themeConstants.BORDER_THICKNESS}px solid ${palette.grey[100]}`,
                        cursor: "not-allowed",
                        pointerEvents: "auto",
                    },
                },
                sizeSmall: {
                    minHeight: "30px",
                    height: "30px",
                    minWidth: "30px",
                    "& svg": {
                        fontSize: "18px"
                    }
                },
                sizeMedium: {
                    minHeight: "40px",
                    height: "40px",
                    minWidth: "40px",
                    "& svg": {
                        fontSize: "24px"
                    }
                },
                containedPrimary: {
                    background: ((_a = palette.paymentUI) === null || _a === void 0 ? void 0 : _a.mainButtonBackground) || palette.primary.main,
                    border: `${(_c = (_b = palette.paymentUI) === null || _b === void 0 ? void 0 : _b.mainButtonBorderWidth) !== null && _c !== void 0 ? _c : themeConstants.BORDER_THICKNESS}px solid ${palette.primary.main}`,
                    color: palette.primary.contrastText,
                    minWidth: "200px !important",
                    transition: transitions.create(["background"]),
                    "&:hover": {
                        background: themeUtils.darkenBackground(((_d = palette.paymentUI) === null || _d === void 0 ? void 0 : _d.mainButtonBackground) || palette.primary.main),
                    },
                },
                containedSecondary: {
                    background: palette.grey[100],
                    color: palette.grey[600],
                    // minWidth: 0,
                    "&:hover": {
                        background: palette.grey[300],
                    },
                },
                outlined: {
                    borderColor: palette.grey[100],
                    color: palette.text.primary,
                    padding: 0,
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: palette.grey["400"],
                    background: palette.background.default,
                    letterSpacing: "normal",
                    padding: spacing(0, 1),
                    minHeight: 42,
                    minWidth: spacing(5.5),
                    border: 0,
                    borderRadius: themeConstants.MD_BORDER_RADIUS,
                    transition: transitions.create(["background"]),
                    [breakpoints.up("sm")]: {
                        padding: spacing(0, 2),
                        minWidth: spacing(14),
                    },
                    [breakpoints.up("md")]: {
                        minWidth: spacing(17),
                    },
                    "&.Mui-selected": {
                        background: ((_e = palette.paymentUI) === null || _e === void 0 ? void 0 : _e.paymentMethodSelectorBackground) || palette.primary.main,
                        color: palette.primary.contrastText,
                        "&:hover": {
                            background: themeUtils.darkenBackground(((_f = palette.paymentUI) === null || _f === void 0 ? void 0 : _f.paymentMethodSelectorBackground) || palette.primary.main),
                        },
                    },
                    "&:hover": {
                        background: palette.grey["100"],
                    },
                },
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    background: ((_g = palette.paymentUI) === null || _g === void 0 ? void 0 : _g.paymentMethodSelectorBorder) || palette.primary.main,
                    backgroundOrigin: "border-box",
                    border: `${themeConstants.BORDER_THICKNESS}px solid transparent`,
                    borderRadius: themeConstants.MD_BORDER_RADIUS + themeConstants.BORDER_THICKNESS,
                },
            },
        },
        // CHIPS:
        MuiChip: {
            styleOverrides: {
                label: {
                    display: "flex",
                    alignItems: "center",
                },
                sizeSmall: {
                    height: "30px",
                    borderRadius: themeConstants.MD_BORDER_RADIUS,
                    fontSize: 12,
                    fontWeight: 500,
                },
                ["colorSuccess"]: {
                    backgroundColor: palette.success.light,
                    color: palette.success.main,
                },
                ["colorWarning"]: {
                    backgroundColor: palette.warning.light,
                    color: palette.warning.main,
                },
                ["colorError"]: {
                    backgroundColor: palette.error.light,
                    color: palette.error.main,
                },
                ["colorInfo"]: {
                    backgroundColor: palette.info.light,
                    color: palette.info.main,
                },
            },
        },
        // GRID:
        MuiGrid: {
            styleOverrides: {
                root: {
                    "&.MuiGrid-item": {
                        maxWidth: "100%",
                    },
                },
            },
        },
        // DIALOG:
        MuiDialog: {
            styleOverrides: {
                container: {
                // Keep the scroll always visible in the non-full-screen version:
                // overflowY: "scroll",
                },
                paperFullScreen: {
                    // Keep the scroll always visible in the full-screen version:
                    overflowY: "scroll",
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                },
            },
        },
        // DIALOG LOADER:
        MuiCircularProgress: {
            styleOverrides: {
                colorPrimary: {
                    color: palette.background.default,
                },
                colorSecondary: {
                    color: palette.text.primary,
                },
            },
        },
        // TOOLTIPS:
        MuiTooltip: {
            styleOverrides: {
                tooltip: Object.assign(Object.assign({}, typography.body1), { padding: spacing(1, 1.5) }),
            },
        },
    };
}

exports.createComponentsTheme = createComponentsTheme;
//# sourceMappingURL=themeComponents.js.map
