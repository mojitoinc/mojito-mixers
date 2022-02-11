import { Theme } from "@mui/material/styles";
import { Components as ComponentsOptions } from "@mui/material/styles/components";

/*
declare module '@mui/material/TextField' {
  interface TextFieldPropsVariantOverrides {
    custom: true;
  }
}
*/

export function createComponentsTheme(theme: Theme): ComponentsOptions {
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
          fontSize: "16px", // 12px accounting for 0.75 scale.
          lineHeight: "24px", // 18px accounting for 0.75 scale.
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

          '&:disabled': {
            background: theme.palette.grey["50"],
            cursor: "not-allowed",
          },
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
          minHeight: theme.spacing(5.5),
          minWidth: theme.spacing(5.5),

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

        ["colorSuccess" as any]: {
          backgroundColor: theme.palette.success.light,
          color: theme.palette.success.main,
        } as any,

        ["colorWarning" as any]: {
          backgroundColor: theme.palette.warning.light,
          color: theme.palette.warning.main,
        } as any,

        ["colorError" as any]: {
          backgroundColor: theme.palette.error.light,
          color: theme.palette.error.main,
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
