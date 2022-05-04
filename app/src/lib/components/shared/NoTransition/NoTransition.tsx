import { TransitionProps } from "@mui/material/transitions";
import React from "react";

export const NoTransition = React.forwardRef<
  React.ReactFragment,
  TransitionProps
// eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ children }, ref) => {
  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{ children }</>;
});
