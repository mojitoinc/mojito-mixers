import { TransitionProps } from "@mui/material/transitions";
import React from "react";

export const NoTransition = React.forwardRef<
  React.ReactFragment,
  TransitionProps & { children: React.ReactChild }
>(({ children }) => {
  return <>{ children }</>;
});
