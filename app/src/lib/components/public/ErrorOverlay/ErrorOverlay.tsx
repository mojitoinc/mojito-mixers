import { SxProps, Theme } from "@mui/material/styles";
import React, { useCallback, useLayoutEffect } from "react";
import { ErrorView } from "../../../views/Error/ErrorView";
import { CheckoutModalHeader } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { FullScreenOverlay, FullScreenOverlayFunctionalProps } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ProviderInjectorProps, withProviders } from "../../shared/ProvidersInjector/ProvidersInjector";

export interface PUIErrorOverlayProps extends FullScreenOverlayFunctionalProps {
  logoSrc?: string;
  logoSx?: SxProps<Theme>;
  errorImageSrc: string;
  onRedirect: (pathnameOrUrl: string) => void;
  onReview: (pathnameOrUrl: string) => void;
  onAbort: (pathnameOrUrl: string) => void;
}

export type PUIErrorProps = PUIErrorOverlayProps & ProviderInjectorProps;

export const PUIErrorOverlay: React.FC<PUIErrorOverlayProps> = ({
  logoSrc,
  logoSx,
  errorImageSrc,
  onRedirect,
  onReview,
  onAbort,
  ...fullScreenOverlayProps
}) => {
  const purchaseError = true;

  useLayoutEffect(() => {
    // Users should only see this page if they completed a credit card payment and 3DS' verification went wrong.
    // Otherwise, they are immediately redirected to homepage:
    if (!purchaseError) onRedirect("/");
  }, [purchaseError, onRedirect]);

  const reviewData = useCallback(async (): Promise<false> => {
    if (!purchaseError) return;

    // If there was an error, users can click the review button and go back to the Payment UI to review the data...:
    onReview("/");

    return false;
  }, [purchaseError, onReview]);

  const toMarketplace = useCallback(() => {
    if (!purchaseError) return;

    // ...or they can just go back to the marketplace homepage:
    onAbort("/");
  }, [purchaseError, onAbort]);

  if (!purchaseError) return null;

  const headerElement = logoSrc ? (
    <CheckoutModalHeader
      variant="error"
      logoSrc={ logoSrc }
      logoSx={ logoSx } />
  ) : null;

  return (
    <FullScreenOverlay centered header={ headerElement } { ...fullScreenOverlayProps }>
      <ErrorView
        checkoutError={ { errorMessage: "Error creating payment method." } }
        errorImageSrc={ errorImageSrc }
        onFixError={ reviewData }
        onClose={ toMarketplace } />
    </FullScreenOverlay>
  );
}

export const PUIError: React.FC<PUIErrorProps> = withProviders(PUIErrorOverlay);
