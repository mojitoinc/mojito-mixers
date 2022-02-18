import { TextFieldProps, styled } from "@mui/material";
import { CardNumberField } from "../CardNumberField/CardNumberField";
import { TextField } from "../TextField/TextField";
import React from "react";

export const ReadOnlyField: React.FC<TextFieldProps> = styled((props) => (
  <TextField variant="standard" disabled { ...props } />
))(({ theme: { palette } }) => ({
  "& .MuiInputLabel-root": {
    "&.Mui-disabled": {
      color: palette.text.primary,
    },
  },
  "& .MuiInputBase-root": {
    "&.Mui-disabled": {
      background: palette.grey[50],
      color: palette.text.primary,
      padding: 8,
      height: "40px",
      borderRadius: "2px",
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
}));


export const ReadOnlyCardField: React.FC<TextFieldProps> = styled((props) => (
  <CardNumberField variant="standard" disabled { ...props } />
))(({ theme: { palette } }) => ({
  "& .MuiInputLabel-root": {
    "&.Mui-disabled": {
      color: palette.text.primary,
    },
  },
  "& .MuiInputBase-root": {
    "&.Mui-disabled": {
      background: palette.grey[50],
      color: palette.text.primary,
      padding: 8,
      height: "40px",
      borderRadius: "2px",
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
}));
