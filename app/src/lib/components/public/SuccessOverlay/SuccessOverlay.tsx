import { SxProps, Theme } from "@mui/material/styles";
import { useTimeout } from "@swyg/corre";
import React, { useLayoutEffect } from "react";
import { getUrlWithSearchParams, isUrlPathname } from "../../../domain/url/url.utils";
import { SuccessView } from "../../../views/Success/SuccessView";
import { CheckoutModalHeader } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { FullScreenOverlay, FullScreenOverlayFunctionalProps } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ProviderInjectorProps, withProviders } from "../../shared/ProvidersInjector/ProvidersInjector";
import { getCheckoutModalState, persistReceivedRedirectUri3DS } from "../CheckoutOverlay/CheckoutOverlay.utils";

const REDIRECT_DELAY_MS = 5000;

export interface PUISuccessOverlayProps extends FullScreenOverlayFunctionalProps {
  logoSrc?: string;
  logoSx?: SxProps<Theme>;
  successImageSrc: string;
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUISuccessProps = PUISuccessOverlayProps & ProviderInjectorProps;

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
  }, REDIRECT_DELAY_MS, [purchaseSuccess, isPathname, onRedirect]);

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

export const PUISuccess: React.FC<PUISuccessProps> = withProviders(PUISuccessOverlay);
