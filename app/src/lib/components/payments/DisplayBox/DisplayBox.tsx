import { Theme, SxProps } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";
import React from "react";
import Icon from "@mdi/react";
import { SM_BORDER_RADIUS } from "../../../config/theme/themeConstants";

export const DISPLAY_BOX_SX: SxProps<Theme> = {
  position: "relative",
  p: 2,
  m: 0,
  borderRadius: `${ SM_BORDER_RADIUS }px`,
  backgroundColor: theme => theme.palette.grey["50"],
  color: theme => theme.palette.grey["800"],
};

export const ICON_WRAPPER_SX: SxProps<Theme> = {
  position: "absolute",
  top: theme => theme.spacing(2),
  left: theme => theme.spacing(2),
  transform: "translate(0, -3px)",
};

export interface DisplayBox extends BoxProps {
  iconPath?: string;
}

export const DisplayBox: React.FC<DisplayBox> = ({
  iconPath,
  sx,
  children,
  ...props
}) => {
  return (
    <Box { ...props } sx={{ ...DISPLAY_BOX_SX, pl: iconPath ? 7 : 2, ...sx }}>
      { iconPath ? (
        <Box sx={ ICON_WRAPPER_SX }>
          <Icon path={ iconPath } size="24px" />
        </Box>
      ) : null }

      { children }
    </Box>
  );
};
