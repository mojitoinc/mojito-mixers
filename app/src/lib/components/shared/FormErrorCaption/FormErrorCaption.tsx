import { Typography, TypographyProps } from "@mui/material";
import React from "react";

export type FormErrorsCaptionProps = TypographyProps;

export const FormErrorsCaption: React.FC<FormErrorsCaptionProps> = ({
  children,
  sx,
}) => {
  return (
    <Typography variant="caption" component="p" sx={{ ...sx, color: theme => theme.palette.warning.dark }}>
      { children }
    </Typography>
  );
}
