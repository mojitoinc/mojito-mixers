import { Theme, SxProps } from "@mui/material/styles";
import { Box, BoxProps } from "@mui/material";

const DISPLAY_BOX_PROPS: SxProps<Theme> = {
  p: 2,
  border: 1,
  borderRadius: "2px",
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
    <DisplayBox { ...props } component="pre" sx={{ ...sx, overflow: "scroll" }} />
  );
}
