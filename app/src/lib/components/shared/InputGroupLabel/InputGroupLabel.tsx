import { Theme, Typography, TypographyProps } from "@mui/material";
import { SystemStyleObject } from "@mui/system";
import React from "react";

export const InputGroupLabel: React.FC<TypographyProps> = ({
  sx,
  ...props
}) => (
  <Typography
    variant="body2"
    sx={[
      (theme: Theme) => ({
        fontWeight: "bold",
        color: theme.palette.grey["700"],
        mt: 1.5
      }),
      sx as
        | SystemStyleObject<Theme>
        | ((theme: Theme) => SystemStyleObject<Theme>)
    ]}
    {...props}
  />
);
