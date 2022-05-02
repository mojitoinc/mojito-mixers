import { useTimeout } from "@swyg/corre";
import React, { useLayoutEffect } from "react";
import { THREEDS_SUCCESS_REDIRECT_DELAY_MS } from "../../../config/config";
import { PUIRouterOptions } from "../../../domain/router/router.types";
import { getUrlWithSearchParams, isUrlPathname } from "../../../domain/url/url.utils";
import { ThemeProviderProps, withThemeProvider } from "../../shared/ProvidersInjector/ProvidersInjector";
import { getCheckoutModalState, persistCheckoutModalInfoRedirectURI } from "../CheckoutOverlay/CheckoutOverlay.utils";
import { PUIStaticSuccessOverlay, PUIStaticSuccessOverlayProps } from "./StaticSuccessOverlay";

export interface PUISuccessOverlayProps extends PUIStaticSuccessOverlayProps {
  onGoTo: (pathnameOrUrl: string, options?: PUIRouterOptions) => void;
}

export type PUISuccessProps = PUISuccessOverlayProps & ThemeProviderProps;

export const PUISuccessOverlay: React.FC<PUISuccessOverlayProps> = ({
  onGoTo,
  ...staticSuccessOverlayProps
}) => {
  const { purchaseSuccess, url = "" } = getCheckoutModalState({ noClear: true });
  const isPathname = isUrlPathname(url);

  useLayoutEffect(() => {
    if (purchaseSuccess) {
      if (isPathname) persistCheckoutModalInfoRedirectURI(window.location.href);

      return;
    }

    // Users should only see this page if they completed a credit card payment and 3DS' verification went ok.
    // Otherwise, they are immediately redirected to homepage:
    onGoTo("/", { replace: true, reason: "No purchase success." });
  }, [purchaseSuccess, isPathname, onGoTo]);

  useTimeout(() => {
    // If everything's ok, users see this confirmation screen for 5 seconds and then are redirected to the purchase
    // confirmation page:
    if (purchaseSuccess) onGoTo(getUrlWithSearchParams(url));
  }, THREEDS_SUCCESS_REDIRECT_DELAY_MS);

  return <PUIStaticSuccessOverlay { ...staticSuccessOverlayProps } />;
}

export const PUISuccess: React.FC<PUISuccessProps> = withThemeProvider(PUISuccessOverlay);
