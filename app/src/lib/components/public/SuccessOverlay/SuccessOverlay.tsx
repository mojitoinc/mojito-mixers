import { SxProps, Theme } from "@mui/material/styles";
import { useTimeout } from "@swyg/corre";
import React, { useLayoutEffect } from "react";
import { SuccessView } from "../../../views/Success/SuccessView";
import { CheckoutModalHeader } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { FullScreenOverlay, FullScreenOverlayFunctionalProps } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ProviderInjectorProps, withProviders } from "../../shared/ProvidersInjector/ProvidersInjector";

const REDIRECT_DELAY_MS = 5000;

export interface PUISuccessOverlayProps extends FullScreenOverlayFunctionalProps {
  logoSrc?: string;
  logoSx?: SxProps<Theme>;
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUISuccessProps = PUISuccessOverlayProps & ProviderInjectorProps;

export const PUISuccessOverlay: React.FC<PUISuccessOverlayProps> = ({
  logoSrc,
  logoSx,
  onRedirect,
  ...fullScreenOverlayProps
}) => {
  const purchaseCompleted = true;

  useLayoutEffect(() => {
    // Users should only see this page if they completed a credit card payment and 3DS' verification went ok.
    // Otherwise, they are immediately redirected to homepage:
    if (!purchaseCompleted) onRedirect("/");
  }, [purchaseCompleted, onRedirect]);

  useTimeout(() => {
    // If everything's ok, users see this confirmation screen for 5 seconds and then are redirected to the purchase
    // confirmation page:
    if (purchaseCompleted) onRedirect("/");
  }, REDIRECT_DELAY_MS, [purchaseCompleted, onRedirect]);

  if (!purchaseCompleted) return null;

  const headerElement = logoSrc ? (
    <CheckoutModalHeader
      variant="purchasing"
      logoSrc={ logoSrc }
      logoSx={ logoSx } />
  ) : null;

  return (
    <FullScreenOverlay centered header={ headerElement } { ...fullScreenOverlayProps }>
      <SuccessView />
    </FullScreenOverlay>
  );
}

export const PUISuccess: React.FC<PUISuccessProps> = withProviders(PUISuccessOverlay);
