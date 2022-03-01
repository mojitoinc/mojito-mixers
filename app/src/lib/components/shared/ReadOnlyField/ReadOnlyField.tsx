import { TextFieldProps, styled } from "@mui/material";
import { CardNumberField } from "../CardNumberField/CardNumberField";
import { TextField } from "../TextField/TextField";
import React from "react";
import { SM_BORDER_RADIUS } from "../../../config/theme/theme";

export const ReadOnlyField: React.FC<TextFieldProps> = styled((props) => (
  <TextField variant="standard" disabled { ...props } />
))(({ theme: { palette, typography } }) => ({
  "& .MuiInputLabel-root": {
    "&.Mui-disabled": {
      color: palette.text.primary,
    },
  },
  "& .MuiInputBase-root": {
    "&.Mui-disabled": {
      background: palette.grey[50],
      padding: 8,
      height: "40px",
      borderRadius: SM_BORDER_RADIUS,
      marginTop: 32,
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


export const ReadOnlyCardField: React.FC<TextFieldProps> = styled((props) => (
  <CardNumberField variant="standard" disabled { ...props } />
))(({ theme: { palette, typography } }) => ({
  "& .MuiInputLabel-root": {
    "&.Mui-disabled": {
      color: palette.text.primary,
    },
  },
  "& .MuiInputBase-root": {
    "&.Mui-disabled": {
      background: palette.grey[50],
      padding: 8,
      height: "40px",
      borderRadius: SM_BORDER_RADIUS,
      marginTop: 32,
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

export const ReadOnlyWalletAddress: React.FC<TextFieldProps> = styled((props) => (
  <TextField variant="standard" disabled { ...props } />
))(({ theme: { palette, typography } }) => ({
  "& .MuiInputLabel-root": {
    "&.Mui-disabled": {
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
