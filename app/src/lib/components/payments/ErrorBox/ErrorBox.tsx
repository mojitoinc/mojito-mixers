import { Theme, SxProps } from "@mui/material/styles";
import { BoxProps } from "@mui/material";
import React from "react";
import { mdiAlertCircleOutline } from "@mdi/js";
import { BORDER_THICKNESS } from "../../../config/theme/themeConstants";
import { DisplayBox } from "../DisplayBox/DisplayBox";

export const ERROR_BOX_SX: SxProps<Theme> = {
  backgroundColor: theme => theme.palette.error.light,
  color: theme => theme.palette.error.dark,
  border: theme => `${ BORDER_THICKNESS }px solid ${ theme.palette.error.dark }`,
};

export const ErrorBox: React.FC<BoxProps> = ({
  sx,
  ...props
}) => {
  return (
    <DisplayBox { ...props } sx={{ ...ERROR_BOX_SX, ...sx }} iconPath={ mdiAlertCircleOutline } />
  );
};
