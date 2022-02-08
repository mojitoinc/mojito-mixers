/*
declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    custom: true;
  }
}
*/
function createComponentsTheme(theme) {
    return {
        // FORMS:
        MuiFormLabel: {
            styleOverrides: {
                root: {
                    fontSize: "14px",
                    fontWeight: 500,
                    color: "#333",
                },
            },
        },
        MuiFormHelperText: {
            styleOverrides: {
                root: {
                    marginLeft: "0px",
                    "&.Mui-error": {
                        color: "#FF5E00",
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
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "16px",
                    lineHeight: "24px",
                    fontWeight: 500,
                    color: "#6B6B6B",
                    marginLeft: "4px",
                    "&.Mui-focused": {
                        color: "#6B6B6B",
                    },
                    "&.Mui-error": {
                        color: "#FF5E00",
                    },
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    height: "60px",
                    borderRadius: "2px",
                    "&.Mui-disabled::before": {
                        border: 0,
                    },
                },
                input: {
                    fontSize: "16px",
                    "&.Mui-disabled": {
                        cursor: "not-allowed",
                    },
                },
            },
        },
        MuiFilledInput: {
            styleOverrides: {
                root: {
                    border: "solid 1px #D9D9D9",
                    background: "white",
                    "&:hover": {
                        background: "white",
                    },
                    "&.Mui-error": {
                        borderColor: "#FF5E00",
                        background: "white",
                    },
                    "&.Mui-focused": {
                        borderColor: "#55E0FF",
                        background: "white",
                    },
                    "&.Mui-disabled": {
                        background: "white",
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
                  color: "black",
                },
              },
              "& .MuiInputBase-root": {
                "&.Mui-disabled": {
                  backgroundColor: "#F8F8F8",
                  color: "black",
                  padding: 8,
                  height: "40px",
                  borderRadius: "2px",
                  marginTop: 32,
                },
              },
              "& .MuiInputBase-input": {
                "&.Mui-disabled": {
                  color: "black",
                  WebkitTextFillColor: "black",
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
                    borderRadius: "4px",
                    boxSizing: "border-box",
                    fontSize: "12px",
                    "&.Mui-disabled": {
                        background: theme.palette.grey["50"],
                        border: "1px solid #DDDDDD",
                        cursor: "not-allowed",
                        pointerEvents: "auto",
                    },
                },
                sizeSmall: {
                    minHeight: "30px",
                    height: "30px",
                    minWidth: "30px",
                    '& svg': {
                        fontSize: "18px"
                    }
                },
                sizeMedium: {
                    minHeight: "40px",
                    height: "40px",
                    minWidth: "40px",
                    '& svg': {
                        fontSize: "24px"
                    }
                },
                containedPrimary: {
                    background: theme.palette.gradients.action,
                    border: "1px solid #64C538",
                    color: "#2C2A28",
                    minWidth: "200px !important",
                },
                containedSecondary: {
                    background: '#DDDDDD',
                    color: '#686868',
                    // minWidth: 0,
                    '&:hover': {
                        background: '#DDDDDD',
                    },
                },
                outlined: {
                    borderColor: "rgba(0, 0, 0, .125)",
                    color: "black",
                    padding: 0,
                },
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    color: theme.palette.grey["400"],
                    background: "white",
                    letterSpacing: "normal",
                    padding: theme.spacing(0, 1),
                    minHeight: 42,
                    minWidth: theme.spacing(5.5),
                    border: 0,
                    borderRadius: 4,
                    [theme.breakpoints.up("sm")]: {
                        padding: theme.spacing(0, 2),
                        minWidth: theme.spacing(14),
                    },
                    [theme.breakpoints.up("md")]: {
                        minWidth: theme.spacing(17),
                    },
                    "&.Mui-selected": {
                        background: theme.palette.gradients.action,
                        color: theme.palette.grey["800"],
                        "&:hover": {
                            background: theme.palette.gradients.action
                        }
                    },
                    "&:hover": {
                        background: theme.palette.grey["100"],
                    }
                },
            }
        },
        MuiToggleButtonGroup: {
            styleOverrides: {
                root: {
                    background: theme.palette.gradients.stepperReverse,
                    padding: 1,
                    borderRadius: 5,
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
                    borderRadius: 4,
                    fontSize: 12,
                    fontWeight: 500,
                },
                ["colorSuccess"]: {
                    backgroundColor: theme.palette.success.light,
                    color: theme.palette.success.main,
                },
                ["colorWarning"]: {
                    backgroundColor: theme.palette.warning.light,
                    color: theme.palette.warning.main,
                },
                ["colorError"]: {
                    backgroundColor: theme.palette.error.light,
                    color: theme.palette.error.main,
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
                    overflowY: "scroll",
                },
            },
        },
        // DIALOG LOADER:
        MuiCircularProgress: {
            styleOverrides: {
                colorPrimary: {
                    color: "white",
                },
                colorSecondary: {
                    color: "black",
                },
            },
        },
    };
}

export { createComponentsTheme };
//# sourceMappingURL=themeComponents.js.map
