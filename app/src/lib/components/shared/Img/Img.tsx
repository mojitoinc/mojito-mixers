import React from "react";
import { Box, BoxProps } from "@mui/material";
import { SxProps, Theme } from "@mui/material/styles";

const IMG_SX_PROPS: SxProps<Theme> = {
  display: "block",
};

export type ImgProps = Omit<BoxProps<"img">, "component">;

export const Img: React.FC<ImgProps> = ({
  src,
  sx,
  ...props
}) => {
  return (
    <Box
      { ...props }
      component="img"
      src={ src }
      sx={{
        ...IMG_SX_PROPS,
        ...sx,
      }} />
  );
}
