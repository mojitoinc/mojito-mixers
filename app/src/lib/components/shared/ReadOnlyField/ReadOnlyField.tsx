import { TextFieldProps, styled } from "@mui/material";
import { CardNumberField } from "../CardNumberField/CardNumberField";
import { TextField } from "../TextField/TextField";
import React from "react";

export const ReadOnlyField: React.FC<TextFieldProps> = styled((props) => (
  <TextField variant="standard" disabled { ...props } />
))({
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
});


export const ReadOnlyCardField: React.FC<TextFieldProps> = styled((props) => (
  <CardNumberField variant="standard" disabled { ...props } />
))({
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
});
