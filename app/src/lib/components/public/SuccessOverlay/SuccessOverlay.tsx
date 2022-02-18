import { useTimeout } from "@swyg/corre";
import React, { useLayoutEffect } from "react";
import { FullScreenOverlay, FullScreenOverlayProps } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ProviderInjectorProps, withProviders } from "../../shared/ProvidersInjector/ProvidersInjector";

const REDIRECT_DELAY_MS = 5000;

export interface PUISuccessOverlayProps extends FullScreenOverlayProps {
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUISuccessProps = PUISuccessOverlayProps & ProviderInjectorProps;

export const PUISuccessOverlay: React.FC<PUISuccessOverlayProps> = ({
  onRedirect,
  ...fullScreenOverlayProps
}) => {
  const goToConfirmation = false;

  useLayoutEffect(() => {
    if (!goToConfirmation) onRedirect("/");
  }, [goToConfirmation, onRedirect]);

  useTimeout(() => {
    if (goToConfirmation) onRedirect("/");
  }, REDIRECT_DELAY_MS, [goToConfirmation, onRedirect]);

  if (!goToConfirmation) return null;

  return (
    <FullScreenOverlay { ...fullScreenOverlayProps }>
      Success.
    </FullScreenOverlay>
  );
}

export const PUISuccess: React.FC<PUISuccessProps> = withProviders(PUISuccessOverlay);
