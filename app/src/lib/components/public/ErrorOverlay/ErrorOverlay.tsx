import { SxProps, Theme } from "@mui/material/styles";
import { useTimeout } from "@swyg/corre";
import React, { useCallback, useLayoutEffect, useState, useEffect } from "react";
import { PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS, PAYMENT_NOTIFICATION_INTERVAL_MS } from "../../../config/config";
import { ERROR_PURCHASE } from "../../../domain/errors/errors.constants";
import { isUrlPathname, getUrlWithSearchParams } from "../../../domain/url/url.utils";
import { useGetPaymentNotificationQuery } from "../../../queries/graphqlGenerated";
import { ErrorView } from "../../../views/Error/ErrorView";
import { CheckoutModalHeader } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { FullScreenOverlay, FullScreenOverlayFunctionalProps } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { withProviders, ProvidersInjectorProps } from "../../shared/ProvidersInjector/ProvidersInjector";
import { clearPersistedInfo, getCheckoutModalState, persistReceivedRedirectUri3DS } from "../CheckoutOverlay/CheckoutOverlay.utils";

export interface PUIErrorOverlayProps extends FullScreenOverlayFunctionalProps {
  logoSrc?: string;
  logoSx?: SxProps<Theme>;
  errorImageSrc: string;
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUIErrorProps = PUIErrorOverlayProps & ProvidersInjectorProps;

export const PUIErrorOverlay: React.FC<PUIErrorOverlayProps> = ({
  logoSrc,
  logoSx,
  errorImageSrc,
  onRedirect,
  ...fullScreenOverlayProps
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const paymentNotificationResult = useGetPaymentNotificationQuery({
    pollInterval: PAYMENT_NOTIFICATION_INTERVAL_MS,
  });

  const error = paymentNotificationResult.data?.getPaymentNotification?.message?.error || "";

  useEffect(() => {
    if (error) setErrorMessage(prevErrorMessage => prevErrorMessage || "");
  }, [error]);

  useTimeout(() => {
    setErrorMessage(prevErrorMessage => prevErrorMessage || ERROR_PURCHASE().errorMessage);
  }, PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS);

  const { purchaseError, url = "" } = getCheckoutModalState();

  useLayoutEffect(() => {
    // Users should only see this page if they completed a credit card payment and 3DS' verification went wrong.
    // Otherwise, they are immediately redirected to homepage:
    if (!purchaseError) onRedirect("/");
  }, [purchaseError, onRedirect]);

  const reviewData = useCallback(async (): Promise<false> => {
    const isPathname = isUrlPathname(url);

    if (isPathname) persistReceivedRedirectUri3DS(window.location.href);

    // If there was an error, users can click the review button and go back to the Payment UI to review the data...:
    onRedirect(isPathname ? url : getUrlWithSearchParams(url));

    return false;
  }, [onRedirect, url]);

  const toMarketplace = useCallback(() => {
    if (!purchaseError) return;

    clearPersistedInfo();

    // ...or they can just go back to the marketplace homepage:
    onRedirect("/");
  }, [purchaseError, onRedirect]);

  const headerElement = logoSrc ? (
    <CheckoutModalHeader
      variant="error"
      logoSrc={ logoSrc }
      logoSx={ logoSx } />
  ) : null;

  return (
    <FullScreenOverlay isDialogBlocked={ !errorMessage } centered header={ headerElement } { ...fullScreenOverlayProps }>
      <ErrorView
        checkoutError={ { errorMessage } }
        errorImageSrc={ errorImageSrc }
        onFixError={ reviewData }
        onClose={ toMarketplace } />
    </FullScreenOverlay>
  );
}

export const PUIError: React.FC<PUIErrorProps> = withProviders(PUIErrorOverlay);
