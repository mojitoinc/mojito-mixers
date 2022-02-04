
import { Button, ButtonProps } from "@mui/material";
import React from "react";
import { containsOnlyIcon } from "../../../utils/reactUtils";

export const PrimaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const isIcon = containsOnlyIcon(props.children);

  return (
    <Button
      variant="contained"
      color="primary"
      size="medium"
      ref={ ref }
      disableElevation
      { ...props }
      sx={ isIcon ? { ...props.sx, p: 0 } : undefined } />
  );
});
