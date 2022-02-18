import { Theme, SxProps } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";
import React from "react";
import { SM_BORDER_RADIUS } from "../../../config/theme/theme";

const DISPLAY_BOX_PROPS: SxProps<Theme> = {
  p: 2,
  m: 0,
  border: 1,
  borderRadius: SM_BORDER_RADIUS,
  backgroundColor: theme => theme.palette.grey["50"],
  borderColor: theme => theme.palette.grey["100"],
  color: theme => theme.palette.grey["800"],
  display: "flex",
  flexDirection: {
    xs: "column",
    sm: "row"
  },
};

export const DisplayBox: React.FC<BoxProps> = ({
  sx,
  ...props
}) => {
  return (
    <Box { ...props } sx={{ ...DISPLAY_BOX_PROPS, ...sx }} />
  );
}

export const DebugBox: React.FC<BoxProps> = ({
  sx,
  ...props
}) => {
  return (
    <DisplayBox { ...props } component="pre" sx={{ ...sx, overflow: "scroll", whiteSpace: "pre-wrap" }} />
  );
}
