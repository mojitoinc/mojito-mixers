import { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import { ErrorView, ErrorViewProps } from "../../../views/Error/ErrorView";
import { CheckoutModalHeader } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { FullScreenOverlay } from "../../shared/FullScreenOverlay/FullScreenOverlay";

export interface PUIStaticErrorOverlayProps extends ErrorViewProps {
  logoSrc?: string;
  logoSx?: SxProps<Theme>;
}

export const PUIStaticErrorOverlay: React.FC<PUIStaticErrorOverlayProps> = ({
  logoSrc,
  logoSx,
  ...errorViewProps
}) => {
  const headerElement = (
    <CheckoutModalHeader
      variant="error"
      logoSrc={ logoSrc }
      logoSx={ logoSx } />
  );

  return (
    <FullScreenOverlay isDialogBlocked centered header={ headerElement }>
      <ErrorView { ...errorViewProps } />
    </FullScreenOverlay>
  );
};
