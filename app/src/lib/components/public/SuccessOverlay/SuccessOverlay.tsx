import { SxProps, Theme } from "@mui/material/styles";
import { useTimeout } from "@swyg/corre";
import React, { useLayoutEffect } from "react";
import { THREEDS_SUCCESS_REDIRECT_DELAY_MS } from "../../../config/config";
import { getUrlWithSearchParams, isUrlPathname } from "../../../domain/url/url.utils";
import { SuccessView } from "../../../views/Success/SuccessView";
import { CheckoutModalHeader } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { FullScreenOverlay, FullScreenOverlayFunctionalProps } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ThemeProviderProps, withThemeProvider } from "../../shared/ProvidersInjector/ProvidersInjector";
import { getCheckoutModalState, persistReceivedRedirectUri3DS } from "../CheckoutOverlay/CheckoutOverlay.utils";


export interface PUISuccessOverlayProps extends FullScreenOverlayFunctionalProps {
  logoSrc?: string;
  logoSx?: SxProps<Theme>;
  successImageSrc: string;
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUISuccessProps = PUISuccessOverlayProps & ThemeProviderProps;

export const PUISuccessOverlay: React.FC<PUISuccessOverlayProps> = ({
  logoSrc,
  logoSx,
  successImageSrc,
  onRedirect,
  ...fullScreenOverlayProps
}) => {
  const { purchaseSuccess, url } = getCheckoutModalState();
  const isPathname = isUrlPathname(url);

  useLayoutEffect(() => {
    if (purchaseSuccess && isPathname) {
      persistReceivedRedirectUri3DS(window.location.href);

      return;
    }

    // Users should only see this page if they completed a credit card payment and 3DS' verification went ok.
    // Otherwise, they are immediately redirected to homepage:
    onRedirect("/");
  }, [purchaseSuccess, isPathname, onRedirect]);

  useTimeout(() => {
    // If everything's ok, users see this confirmation screen for 5 seconds and then are redirected to the purchase
    // confirmation page:
    if (purchaseSuccess) onRedirect(isPathname ? url : getUrlWithSearchParams(url));
  }, THREEDS_SUCCESS_REDIRECT_DELAY_MS, [purchaseSuccess, isPathname, onRedirect]);

  if (!purchaseSuccess) return null;

  const headerElement = logoSrc ? (
    <CheckoutModalHeader
      variant="purchasing"
      logoSrc={ logoSrc }
      logoSx={ logoSx } />
  ) : null;

  return (
    <FullScreenOverlay centered header={ headerElement } { ...fullScreenOverlayProps }>
      <SuccessView successImageSrc={ successImageSrc } />
    </FullScreenOverlay>
  );
}

export const PUISuccess: React.FC<PUISuccessProps> = withThemeProvider(PUISuccessOverlay);
