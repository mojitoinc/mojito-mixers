import { SxProps, Theme } from "@mui/material/styles";
import React, { useCallback, useLayoutEffect } from "react";
import { isUrlPathname, getUrlWithSearchParams } from "../../../domain/url/url.utils";
import { ErrorView } from "../../../views/Error/ErrorView";
import { CheckoutModalHeader } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { FullScreenOverlay, FullScreenOverlayFunctionalProps } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ThemeProviderProps, withThemeProvider } from "../../shared/ProvidersInjector/ProvidersInjector";
import { clearPersistedInfo, getCheckoutModalState, persistReceivedRedirectUri3DS } from "../CheckoutOverlay/CheckoutOverlay.utils";

export interface PUIErrorOverlayProps extends FullScreenOverlayFunctionalProps {
  logoSrc?: string;
  logoSx?: SxProps<Theme>;
  errorImageSrc: string;
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUIErrorProps = PUIErrorOverlayProps & ThemeProviderProps;

export const PUIErrorOverlay: React.FC<PUIErrorOverlayProps> = ({
  logoSrc,
  logoSx,
  errorImageSrc,
  onRedirect,
  ...fullScreenOverlayProps
}) => {
  const { purchaseError, url } = getCheckoutModalState();

  useLayoutEffect(() => {
    // Users should only see this page if they completed a credit card payment and 3DS' verification went wrong.
    // Otherwise, they are immediately redirected to homepage:
    if (!purchaseError) onRedirect("/");
  }, [purchaseError, onRedirect]);

  const reviewData = useCallback(async (): Promise<false> => {
    if (!purchaseError) return;

    const isPathname = isUrlPathname(url);

    if (isPathname) persistReceivedRedirectUri3DS(window.location.href);

    // If there was an error, users can click the review button and go back to the Payment UI to review the data...:
    onRedirect(isPathname ? url : getUrlWithSearchParams(url));

    return false;
  }, [purchaseError, onRedirect, url]);

  const toMarketplace = useCallback(() => {
    if (!purchaseError) return;

    clearPersistedInfo();

    // ...or they can just go back to the marketplace homepage:
    onRedirect("/");
  }, [purchaseError, onRedirect]);

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

export const PUIError: React.FC<PUIErrorProps> = withThemeProvider(PUIErrorOverlay);
