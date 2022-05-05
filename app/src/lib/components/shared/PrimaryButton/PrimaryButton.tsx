import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { Theme, SxProps } from "@mui/material/styles";
import { containsOnlyIcon } from "../../../utils/reactUtils";

export interface PrimaryButtonProps extends ButtonProps {
  children: React.ReactChild;
  sx?: SxProps<Theme>;
}

export const PrimaryButton = React.forwardRef<HTMLButtonElement, PrimaryButtonProps>(({
  children,
  sx,
  ...props
}, ref) => {
  const isIcon = containsOnlyIcon(children);

  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      ref={ ref }
      disableElevation
      sx={ isIcon ? { ...sx, p: 0 } : sx }
      { ...props }>
      { children }
    </Button>
  );
});
