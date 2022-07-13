import { Theme, SxProps } from "@mui/material/styles";
import { BoxProps } from "@mui/material";
import React from "react";
import { mdiInformationOutline } from "@mdi/js";
import { BORDER_THICKNESS } from "../../../config/theme/themeConstants";
import { DisplayBox } from "../DisplayBox/DisplayBox";

export const ERROR_BOX_SX: SxProps<Theme> = {
  backgroundColor: theme => theme.palette.info.light,
  color: theme => theme.palette.info.dark,
  border: theme => `${ BORDER_THICKNESS }px solid ${ theme.palette.info.dark }`,
};

export const InfoBox: React.FC<BoxProps> = ({
  sx,
  ...props
}) => {
  return (
    <DisplayBox { ...props } sx={{ ...ERROR_BOX_SX, ...sx }} iconPath={ mdiInformationOutline } />
  );
};
