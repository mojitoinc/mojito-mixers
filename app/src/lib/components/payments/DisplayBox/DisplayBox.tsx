import { Theme, SxProps } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";
import React from "react";
import { SM_BORDER_RADIUS } from "../../../config/theme/themeConstants";

export const DISPLAY_BOX_SX: SxProps<Theme> = {
  p: 2,
  m: 0,
  borderRadius: `${ SM_BORDER_RADIUS }px`,
  backgroundColor: theme => theme.palette.grey["50"],
  color: theme => theme.palette.grey["800"],
};

export const DisplayBox: React.FC<BoxProps> = ({
  sx,
  ...props
}) => {
  return (
    <Box { ...props } sx={{ ...DISPLAY_BOX_SX, ...sx }} />
  );
};
