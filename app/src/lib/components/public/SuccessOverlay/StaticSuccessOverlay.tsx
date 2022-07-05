import { SxProps, Theme } from "@mui/material/styles";
import React from "react";
import { SuccessView, SuccessViewProps } from "../../../views/Success/SuccessView";
import { CheckoutModalHeader } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { FullScreenOverlay } from "../../shared/FullScreenOverlay/FullScreenOverlay";

export interface PUIStaticSuccessOverlayProps extends SuccessViewProps {
  logoSrc?: string;
  logoSx?: SxProps<Theme>;
}

export const PUIStaticSuccessOverlay: React.FC<PUIStaticSuccessOverlayProps> = ({
  logoSrc,
  logoSx,
  ...successViewProps
}) => {
  const headerElement = (
    <CheckoutModalHeader
      variant="purchasing"
      logoSrc={ logoSrc }
      logoSx={ logoSx } />
  );

  return (
    <FullScreenOverlay container="fullscreen" isDialogBlocked centered header={ headerElement }>
      <SuccessView { ...successViewProps } />
    </FullScreenOverlay>
  );
};
