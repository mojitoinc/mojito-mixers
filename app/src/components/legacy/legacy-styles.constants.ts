import { SxProps, Theme } from "@mui/material/styles";
import React from "react";

export const inputStyle: React.CSSProperties = {
  position: "relative",
  display: "block",
  width: "100%",
  maxWidth: "480px",
  margin: "12px 0 0",
  padding: "8px",
  boxSizing: "border-box",
};

export const inputGroupStyle: SxProps<Theme> = {
  position: "relative",
  width: "100%",
  maxWidth: "480px",
  display: "grid",
  gridGap: "12px",
  gridTemplateColumns: "1fr 1fr",
};

export const fieldsetLabelSx: SxProps<Theme> = {
  margin: "32px 0 0",
};

export const buttonSx: SxProps<Theme> = {
  margin: "32px 0 0",
  width: "100%",
  maxWidth: "480px",
};
