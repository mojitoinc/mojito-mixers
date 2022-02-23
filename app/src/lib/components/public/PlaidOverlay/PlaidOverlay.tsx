import React, { useLayoutEffect } from "react";
import { getPlaidOAuthFlowState, persistPlaidReceivedRedirectUri } from "../../../domain/plaid/plaid.utils";
import { ProviderInjectorProps, withProviders } from "../../shared/ProvidersInjector/ProvidersInjector";

export interface PUIPlaidOverlayProps {
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUISuccessProps = PUIPlaidOverlayProps & ProviderInjectorProps;

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

export const PUISuccess: React.FC<PUISuccessProps> = withProviders(PUIPlaidOverlay);