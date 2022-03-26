import { useTimeout } from "@swyg/corre";
import React, { useLayoutEffect } from "react";
import { THREEDS_SUCCESS_REDIRECT_DELAY_MS } from "../../../config/config";
import { getUrlWithSearchParams, isUrlPathname } from "../../../domain/url/url.utils";
import { ThemeProviderProps, withThemeProvider } from "../../shared/ProvidersInjector/ProvidersInjector";
import { getCheckoutModalState, persistReceivedRedirectUri3DS } from "../CheckoutOverlay/CheckoutOverlay.utils";
import { PUIStaticSuccessOverlay, PUIStaticSuccessOverlayProps } from "./StaticSuccessOverlay";

export interface PUISuccessOverlayProps extends PUIStaticSuccessOverlayProps {
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUISuccessProps = PUISuccessOverlayProps & ThemeProviderProps;

export const PUISuccessOverlay: React.FC<PUISuccessOverlayProps> = ({
  onRedirect,
  ...staticSuccessOverlayProps
}) => {
  const { purchaseSuccess, url = "" } = getCheckoutModalState();
  const isPathname = isUrlPathname(url);

  useLayoutEffect(() => {
    if (purchaseSuccess) {
      if (isPathname) persistReceivedRedirectUri3DS(window.location.href);

      return;
    }

    // Users should only see this page if they completed a credit card payment and 3DS' verification went ok.
    // Otherwise, they are immediately redirected to homepage:
    onRedirect("/");
  }, [purchaseSuccess, isPathname, onRedirect]);

  useTimeout(() => {
    // If everything's ok, users see this confirmation screen for 5 seconds and then are redirected to the purchase
    // confirmation page:
    if (purchaseSuccess) onRedirect(getUrlWithSearchParams(url));
  }, THREEDS_SUCCESS_REDIRECT_DELAY_MS, [purchaseSuccess, isPathname, onRedirect]);

  return purchaseSuccess ? (<PUIStaticSuccessOverlay { ...staticSuccessOverlayProps } />) : null;
}

export const PUISuccess: React.FC<PUISuccessProps> = withThemeProvider(PUISuccessOverlay);
