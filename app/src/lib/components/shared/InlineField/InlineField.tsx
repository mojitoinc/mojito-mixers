import { styled, TextFieldProps } from "@mui/material";
import React from "react";
import { TextField } from "../TextField/TextField";

export const InlineField: React.FC<TextFieldProps> = styled((props: TextFieldProps) => (
  <TextField
    { ...props }
    variant="filled"
    margin="none"
    InputProps={{ disableUnderline: true }} />
))(({ theme: { palette } }) => ({
  "& .MuiInputLabel-root": {
    color: palette.text.primary,
  },
  "& .MuiInputBase-root": {
    background: palette.background.default,
    color: palette.text.primary,
    padding: 8,
    height: "30px",
  },
  "& .MuiInputBase-input": {
    color: palette.text.primary,
    WebkitTextFillColor: palette.text.primary,
    fontSize: "12px",
    cursor: "default",
    padding: 0,
  },
}));
