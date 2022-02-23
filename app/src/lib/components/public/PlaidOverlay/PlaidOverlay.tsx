import React, { useLayoutEffect } from "react";
import { getPlaidOAuthFlowState, persistPlaidReceivedRedirectUri } from "../../../domain/plaid/plaid.utils";
import { ThemeProviderProps, withThemeProvider } from "../../shared/ProvidersInjector/ProvidersInjector";

export interface PUIPlaidOverlayProps {
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUISuccessProps = PUIPlaidOverlayProps & ThemeProviderProps;

export const PUIPlaidOverlay: React.FC<PUIPlaidOverlayProps> = ({
  onRedirect,
}) => {
  const { continueOAuthFlow, url } = getPlaidOAuthFlowState();

  useLayoutEffect(() => {
    if (continueOAuthFlow) {
      persistPlaidReceivedRedirectUri(window.location.href);
    }

    onRedirect(url || "/");
  }, [continueOAuthFlow, onRedirect, url]);

  return null;
}

export const PUIPlaid: React.FC<PUISuccessProps> = withThemeProvider(PUIPlaidOverlay);
