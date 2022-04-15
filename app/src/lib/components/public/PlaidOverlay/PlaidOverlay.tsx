import React, { useLayoutEffect } from "react";
import { ThemeProviderProps, withThemeProvider } from "../../shared/ProvidersInjector/ProvidersInjector";
import { getCheckoutModalState, persistCheckoutModalInfoRedirectURI } from "../CheckoutOverlay/CheckoutOverlay.utils";

export interface PUIPlaidOverlayProps {
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUISuccessProps = PUIPlaidOverlayProps & ThemeProviderProps;

export const PUIPlaidOverlay: React.FC<PUIPlaidOverlayProps> = ({
  onRedirect,
}) => {
  const { continueFlow, url } = getCheckoutModalState();

  useLayoutEffect(() => {
    if (continueFlow) {
      persistCheckoutModalInfoRedirectURI(window.location.href);
    }

    onRedirect(url || "/");
  }, [continueFlow, onRedirect, url]);

  return null;
}

export const PUIPlaid: React.FC<PUISuccessProps> = withThemeProvider(PUIPlaidOverlay);
