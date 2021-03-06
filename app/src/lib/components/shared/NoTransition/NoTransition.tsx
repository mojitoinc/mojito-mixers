import { TransitionProps } from "@mui/material/transitions";
import React from "react";

export const NoTransition = React.forwardRef<
  React.ReactFragment,
  TransitionProps & { children: React.ReactChild }
// eslint-disable-next-line @typescript-eslint/no-unused-vars
>(({ children }, ref) => {
  return <>{ children }</>;
});
