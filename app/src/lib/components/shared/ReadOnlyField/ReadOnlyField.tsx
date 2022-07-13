import { TextFieldProps, styled } from "@mui/material";
import React from "react";
import { CardNumberField } from "../CardNumberField/CardNumberField";
import { TextField } from "../TextField/TextField";
import { SM_BORDER_RADIUS } from "../../../config/theme/themeConstants";

export const ReadOnlyField: React.FC<TextFieldProps> = styled(props => (
  <TextField variant="standard" disabled { ...props } />
))(({ theme: { palette, typography } }) => ({
  "& .MuiInputLabel-root": {
    "&.Mui-disabled": {
      ...typography.body2,
      fontSize: "16px", // 12px accounting for 0.75 scale.
      lineHeight: "24px", // 18px accounting for 0.75 scale.
      color: palette.text.primary,
    },
  },
  "& .MuiInputBase-root": {
    "&.Mui-disabled": {
      background: palette.grey[50],
      padding: 8,
      height: "40px",
      borderRadius: SM_BORDER_RADIUS,
      marginTop: 24,
    },
  },
  "& .MuiInputBase-input": {
    "&.Mui-disabled": {
      ...typography.body1,
      color: palette.text.primary,
      WebkitTextFillColor: palette.text.primary,
      fontSize: "12px",
      cursor: "default",
    },
  },
}));


export const ReadOnlyCardField: React.FC<TextFieldProps> = styled(props => (
  <CardNumberField variant="standard" disabled { ...props } />
))(({ theme: { palette, typography } }) => ({
  "& .MuiInputLabel-root": {
    "&.Mui-disabled": {
      ...typography.body2,
      fontSize: "16px", // 12px accounting for 0.75 scale.
      lineHeight: "24px", // 18px accounting for 0.75 scale.
      color: palette.text.primary,
    },
  },
  "& .MuiInputBase-root": {
    "&.Mui-disabled": {
      background: palette.grey[50],
      padding: 8,
      height: "40px",
      borderRadius: SM_BORDER_RADIUS,
      marginTop: 24,
    },
  },
  "& .MuiInputBase-input": {
    "&.Mui-disabled": {
      ...typography.body1,
      color: palette.text.primary,
      WebkitTextFillColor: palette.text.primary,
      fontSize: "12px",
      cursor: "default",
    },
  },
}));

export const ReadOnlyWalletAddress: React.FC<TextFieldProps> = styled(props => (
  <TextField variant="standard" disabled { ...props } />
))(({ theme: { palette, typography } }) => ({
  "& .MuiInputLabel-root": {
    "&.Mui-disabled": {
      ...typography.body1,
      fontSize: "16px", // 12px accounting for 0.75 scale.
      lineHeight: "24px", // 18px accounting for 0.75 scale.
      color: palette.text.primary,
    },
  },
  "& .MuiInputBase-root": {
    "&.Mui-disabled": {
      background: palette.grey[50],
      padding: 8,
      height: "60px",
      borderRadius: SM_BORDER_RADIUS,
    },
  },
  "& .MuiInputBase-input": {
    "&.Mui-disabled": {
      ...typography.body2,
      color: palette.text.primary,
      WebkitTextFillColor: palette.text.primary,
      fontSize: "12px",
      cursor: "default",
    },
  },
}));

export const ReadOnlyHashField: React.FC<TextFieldProps> = styled(props => (
  <TextField variant="standard" disabled { ...props } />
))(({ theme: { palette, typography } }) => ({
  "& .MuiInputLabel-root": {
    "&.Mui-disabled": {
      ...typography.body2,
      fontSize: "16px", // 12px accounting for 0.75 scale.
      lineHeight: "24px", // 18px accounting for 0.75 scale.
      color: palette.text.primary,
    },
  },
  "& .MuiInputBase-root": {
    "&.Mui-disabled": {
      background: palette.grey[50],
      padding: 0,
      height: "30px",
      borderRadius: SM_BORDER_RADIUS,
      marginTop: 0,
    },
  },
  "& .MuiInputBase-input": {
    "&.Mui-disabled": {
      ...typography.body1,
      color: palette.text.primary,
      WebkitTextFillColor: palette.text.primary,
      fontSize: "12px",
      cursor: "default",
    },
  },
}));
