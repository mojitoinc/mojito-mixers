import { useTimeout } from "@swyg/corre";
import React, { useCallback, useLayoutEffect, useState, useEffect } from "react";
import { PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS, PAYMENT_NOTIFICATION_INTERVAL_MS, THREEDS_FLOW_SEARCH_PARAM_ERROR } from "../../../config/config";
import { ERROR_PURCHASE } from "../../../domain/errors/errors.constants";
import { isUrlPathname } from "../../../domain/url/url.utils";
import { useGetPaymentNotificationQuery } from "../../../queries/graphqlGenerated";
import { withProviders, ProvidersInjectorProps } from "../../shared/ProvidersInjector/ProvidersInjector";
import { clearPersistedInfo, getCheckoutModalState, persistCheckoutModalInfoRedirectURI } from "../CheckoutOverlay/CheckoutOverlay.utils";
import { PUIStaticErrorOverlay, PUIStaticErrorOverlayProps } from "./StaticErrorOverlay";

export interface PUIErrorOverlayProps extends PUIStaticErrorOverlayProps {
  onRedirect: (pathnameOrUrl: string) => void;
}

export type PUIErrorProps = PUIErrorOverlayProps & ProvidersInjectorProps;

export const PUIErrorOverlay: React.FC<PUIErrorOverlayProps> = ({
  onRedirect,
  ...staticErrorOverlayProps
}) => {
  const [errorMessage, setErrorMessage] = useState("");

  const paymentNotificationResult = useGetPaymentNotificationQuery({
    skip: !!errorMessage,
    pollInterval: PAYMENT_NOTIFICATION_INTERVAL_MS,
  });

  const error = paymentNotificationResult.data?.getPaymentNotification?.message?.error || "";

  useEffect(() => {
    if (error) setErrorMessage(prevErrorMessage => prevErrorMessage || "");
  }, [error]);

  useTimeout(() => {
    setErrorMessage(prevErrorMessage => prevErrorMessage || ERROR_PURCHASE.errorMessage);
  }, PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS);

  const { purchaseError, url = "" } = getCheckoutModalState();

  useLayoutEffect(() => {
    // Users should only see this page if they completed a credit card payment and 3DS' verification went wrong.
    // Otherwise, they are immediately redirected to homepage:
    if (!purchaseError) onRedirect("/");
  }, [purchaseError, onRedirect]);

  const reviewData = useCallback(async (errorMessage: string): Promise<false> => {
    const isPathname = isUrlPathname(url);

    if (isPathname) persistCheckoutModalInfoRedirectURI(window.location.href);

    // If there was an error, users can click the review button and go back to the Payment UI to review the data...:

    onRedirect(`${ url }${ THREEDS_FLOW_SEARCH_PARAM_ERROR }${ encodeURIComponent(errorMessage) }`);

    return false;
  }, [onRedirect, url]);

  const toMarketplace = useCallback(() => {
    if (!purchaseError) return;

    clearPersistedInfo();

    // ...or they can just go back to the marketplace homepage:
    onRedirect("/");
  }, [purchaseError, onRedirect]);

  return (
    <PUIStaticErrorOverlay
      { ...staticErrorOverlayProps }
      checkoutError={ { errorMessage } }
      onFixError={ reviewData }
      onClose={ toMarketplace } />
  );
}

export const PUIError: React.FC<PUIErrorProps> = withProviders(PUIErrorOverlay);
