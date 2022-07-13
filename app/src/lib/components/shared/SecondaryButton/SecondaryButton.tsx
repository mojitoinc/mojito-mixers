import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { Theme, SxProps } from "@mui/material/styles";
import { containsOnlyIcon } from "../../../utils/reactUtils";
import { HTMLTarget } from "../../../domain/html/html.intefaces";

export interface SecondaryButtonProps extends ButtonProps {
  children: React.ReactChild;
  sx?: SxProps<Theme>;
  target?: HTMLTarget;
  rel?: string;
}

export const SecondaryButton = React.forwardRef<HTMLButtonElement, SecondaryButtonProps>(({
  children,
  sx,
  ...props
}, ref) => {
  const isIcon = containsOnlyIcon(children);

  return (
    <Button
      variant="contained"
      color="secondary"
      size="small"
      ref={ ref }
      disableElevation
      sx={ isIcon ? { ...sx, p: 0 } : sx }
      { ...props }>
      { children }
    </Button>
  );
});
