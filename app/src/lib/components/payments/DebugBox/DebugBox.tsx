import { Theme, SxProps } from "@mui/material/styles";
import { Box, BoxProps, Typography } from "@mui/material";
import React from "react";
import { SM_BORDER_RADIUS } from "../../../config/theme/theme";

const DEBUG_BOX_OUTER_SX: SxProps<Theme> = {
  position: "relative",
  m: 0,
  borderRadius: `${ SM_BORDER_RADIUS }px`,
  backgroundColor: theme => theme.palette.grey["50"],
  border: theme => `1px solid ${ theme.palette.grey["100"] }`,
  color: theme => theme.palette.grey["800"],
  overflow: "hidden",
};

const DEBUG_BOX_INNER_COMPACT_SX: SxProps<Theme> = {
  p: 1,
  pr: 6,
  m: 0,
};

const DEBUG_BOX_INNER_SCROLL_SX: SxProps<Theme> = {
  p: 2,
  pt: 3,
  m: 0,
  overflow: "scroll",
  whiteSpace: "pre-wrap",
  maxHeight: "256px",
};

const DEBUG_LABEL_COMPACT_SX: SxProps<Theme> = {
  position: "absolute",
  top: 0,
  right: 0,
  borderBottomLeftRadius: `${ SM_BORDER_RADIUS }px`,
  px: 0.5,
  borderLeft: theme => `1px solid ${ theme.palette.grey["100"] }`,
  borderBottom: theme => `1px solid ${ theme.palette.grey["100"] }`,
  pointerEvents: "none",
};

const DEBUG_LABEL_SCROLL_SX: SxProps<Theme> = {
  ...DEBUG_LABEL_COMPACT_SX,
  pr: 2.5,
};

export interface DebugBoxProps extends BoxProps {
  compact?: boolean;
}

export const DebugBox: React.FC<DebugBoxProps> = ({
  compact,
  sx,
  children,
  ...props
}) => {
  return (
    <Box { ...props } sx={{ ...DEBUG_BOX_OUTER_SX, ...sx }}>
      <Typography component="span" variant="caption" sx={ compact ? DEBUG_LABEL_COMPACT_SX : DEBUG_LABEL_SCROLL_SX }>DEBUG</Typography>
      <Box component="pre" sx={ compact ? DEBUG_BOX_INNER_COMPACT_SX : DEBUG_BOX_INNER_SCROLL_SX }>{ children }</Box>
    </Box>
  );
}
