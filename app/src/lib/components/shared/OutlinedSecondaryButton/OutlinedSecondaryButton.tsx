import { Button, ButtonProps } from "@mui/material";
import React from "react";

export const OutlinedSecondaryButton: React.FC<ButtonProps> = props => (
  <Button variant="outlined" {...props} />
);
