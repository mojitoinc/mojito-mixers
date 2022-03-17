import React from "react";
import { Theme, SxProps } from "@mui/material/styles";
import { Box } from "@mui/material";

const containerSx: SxProps<Theme> = {
  position: "relative",
  margin: "0 auto",
  py: 2.5,
  maxWidth: "1200px",
  px: {
    xs: 1.5,
    sm: 2.5,
  },
};

export const Container: React.FC = ({ children }) => {
  return <Box sx={ containerSx }>{children}</Box>;
};
