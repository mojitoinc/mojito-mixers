import { Box, BoxProps, SvgIcon } from "@mui/material";
import { Theme } from "@mui/material/styles";
import React from "react";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CheckIcon from "@mui/icons-material/Check";
import AutoRenewIcon from "@mui/icons-material/Autorenew";
import { DEFAULT_ERROR_IMAGE_SRC, DEFAULT_PURCHASING_IMAGE_SRC, ROUNDED_BORDER_RADIUS } from "../../../config/theme/themeConstants";
import { Img } from "../Img/Img";

export type StatusIconVariant = "loading" | "success" | "error";

export interface StatusIconProps extends BoxProps {
  variant?: StatusIconVariant;
  imgSrc?: string;
}

export interface StatusIconConfig {
  icon: typeof SvgIcon;
  iconColor: (theme: Theme) => string;
  defaultImgSrc?: string;
}

const statusIconConfigs: Record<StatusIconVariant, StatusIconConfig> = {
  loading: {
    icon: AutoRenewIcon,
    iconColor: theme => theme.palette.primary.main,
    defaultImgSrc: DEFAULT_PURCHASING_IMAGE_SRC,
  },
  success: {
    icon: CheckIcon,
    iconColor: theme => theme.palette.success.main,
  },
  error: {
    icon: WarningAmberIcon,
    iconColor: theme => theme.palette.warning.dark,
    defaultImgSrc: DEFAULT_ERROR_IMAGE_SRC,
  },
};

export const StatusIcon: React.FC<StatusIconProps> = ({
  variant = "loading",
  imgSrc,
  sx,
  ...props
}) => {
  const {
    icon: Icon,
    iconColor,
    defaultImgSrc,
  } = statusIconConfigs[variant];

  const src = imgSrc || defaultImgSrc;

  return src ? (
    <Img
      { ...props }
      src={ src }
      sx={{
        width: 196,
        height: 196,
        mx: "auto",
        ...sx,
      }} />
  ) : (
    <Box
      { ...props }
      sx={{
        width: 96,
        height: 96,
        mx: "auto",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: ROUNDED_BORDER_RADIUS,
        border: (theme: Theme) => `4px solid ${ iconColor(theme) }`,
        ...sx,
      }}>

      <Icon sx={{ fontSize: 40, color: (theme: Theme) => iconColor(theme) }} />
    </Box>
  );
};
