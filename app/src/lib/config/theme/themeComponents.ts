import { Theme } from "@mui/material/styles";
import { Components as ComponentsOptions } from "@mui/material/styles/components";
import { BORDER_THICKNESS, MD_BORDER_RADIUS } from "./theme";

/*
declare module "@mui/material/TextField" {
  interface TextFieldPropsVariantOverrides {
    custom: true;
  }
}
*/

export function createComponentsTheme({ typography, palette, spacing, breakpoints }: Theme): ComponentsOptions {
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
          fontSize: "16px", // 12px accounting for 0.75 scale.
          lineHeight: "24px", // 18px accounting for 0.75 scale.
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

          "&.Mui-disabled::before": {
            border: 0,
          },
        },
        input: {
          ...typography.subtitle1,

          "&.Mui-disabled": {
            cursor: "not-allowed",
          },
        },
      },
    },

    MuiFilledInput: {
      styleOverrides: {
        root: {
          border: `${BORDER_THICKNESS}px solid ${palette.grey[200]}`,
          borderRadius: MD_BORDER_RADIUS,
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
          borderRadius: MD_BORDER_RADIUS,
          boxSizing: "border-box",
          fontSize: "12px",

          "&.Mui-disabled": {
            background: palette.grey["50"],
            border: `${BORDER_THICKNESS}px solid ${palette.grey[100]}`,
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
          background: palette.gradients?.action || palette.primary.light,
          border: `${BORDER_THICKNESS}px solid ${palette.primary.main}`,
          color: palette.text.primary,
          minWidth: "200px !important",
        },
        containedSecondary: {
          background: palette.grey[100],
          color: palette.grey[600],
          // minWidth: 0,

          "&:hover": {
            background: palette.grey[100],
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
          borderRadius: MD_BORDER_RADIUS,

          [breakpoints.up("sm")]: {
            padding: spacing(0, 2),
            minWidth: spacing(14),
          },

          [breakpoints.up("md")]: {
            minWidth: spacing(17),
          },

          "&.Mui-selected": {
            background: palette.gradients?.action || palette.primary.light,
            color: palette.grey["800"],

            "&:hover": {
              background: palette.gradients?.action || palette.primary.light,
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
          background: palette.gradients?.stepperReverse || palette.primary.light,
          backgroundOrigin: "border-box",
          border: `${BORDER_THICKNESS}px solid transparent`,
          borderRadius: MD_BORDER_RADIUS + BORDER_THICKNESS,
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
          borderRadius: MD_BORDER_RADIUS,
          fontSize: 12,
          fontWeight: 500,
        },

        ["colorSuccess" as any]: {
          backgroundColor: palette.success.light,
          color: palette.success.main,
        } as any,

        ["colorWarning" as any]: {
          backgroundColor: palette.warning.light,
          color: palette.warning.main,
        } as any,

        ["colorError" as any]: {
          backgroundColor: palette.error.light,
          color: palette.error.main,
        } as any,

        ["colorInfo" as any]: {
          backgroundColor: palette.info.light,
          color: palette.info.main,
        } as any,
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
        tooltip: {
          ...typography.body1,
          padding: spacing(1, 1.5),
        },
      },
    },

  };
}
