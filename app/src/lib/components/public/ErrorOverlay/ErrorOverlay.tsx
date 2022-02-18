import React, { useCallback, useLayoutEffect } from "react";
import { FullScreenOverlay, FullScreenOverlayNoColumnsProps } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ProviderInjectorProps, withProviders } from "../../shared/ProvidersInjector/ProvidersInjector";

export interface PUIErrorOverlayProps extends FullScreenOverlayNoColumnsProps {
  onRedirect: (pathnameOrUrl: string) => void;
  onReview: (pathnameOrUrl: string) => void;
  onAbort: (pathnameOrUrl: string) => void;
}

export type PUIErrorProps = PUIErrorOverlayProps & ProviderInjectorProps;

export const PUIErrorOverlay: React.FC<PUIErrorOverlayProps> = ({
  onRedirect,
  onReview,
  onAbort,
  ...fullScreenOverlayProps
}) => {
  const goToError = false;

  useLayoutEffect(() => {
    if (!goToError) onRedirect("/");
  }, [goToError, onRedirect]);

  const reviewData = useCallback(() => {
    if (!goToError) return;

    onReview("/");
  }, [goToError, onReview]);

  const toMarketplace = useCallback(() => {
    if (!goToError) return;

    onAbort("/");
  }, [goToError, onAbort]);

  if (!goToError) return null;

  return (
    <FullScreenOverlay centered { ...fullScreenOverlayProps }>
      Error.
    </FullScreenOverlay>
  );
}

export const PUIError: React.FC<PUIErrorProps> = withProviders(PUIErrorOverlay);
