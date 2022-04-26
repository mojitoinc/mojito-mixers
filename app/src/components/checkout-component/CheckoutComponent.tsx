import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import React, { ErrorInfo, useCallback } from "react";
import { CheckoutEventData, CheckoutEventType, CheckoutModalError, MOJITO_LIGHT_THEME, PUIRouterOptions } from "../../lib";
import { PUICheckout, PUICheckoutProps } from "../../lib/components/public/CheckoutOverlay/CheckoutOverlay";
import { isLocalhost } from "../../lib/domain/url/url.utils";
import { config } from "../../utils/config/config.constants";
import { PLAYGROUND_MOJITO_LOGO, PLAYGROUND_USER_FORMAT } from "../../utils/playground/playground.constants";

export type CheckoutComponentProps = Partial<PUICheckoutProps> & Pick<
  PUICheckoutProps,
  "open" | "onClose" | "loaderMode" | "paymentErrorParam"
>;

export const CheckoutComponent: React.FC<CheckoutComponentProps> = (checkoutComponentProps) => {
  const router = useRouter();

  const { loginWithPopup, isAuthenticated, isLoading: isAuthenticatedLoading, getIdTokenClaims } = useAuth0();

  const getAuthenticationToken = useCallback(async () => {
    const token = await getIdTokenClaims();

    return token?.__raw || "";
  }, [getIdTokenClaims]);

  const onGoTo = useCallback((pathnameOrUrl: string, { replace, ...options }: PUIRouterOptions = {}) => {
    console.log(`Redirect to ${pathnameOrUrl}...`);

    if (pathnameOrUrl && pathnameOrUrl.startsWith("http")) {
      window.location.replace(pathnameOrUrl);
    } else if (replace) {
      router.replace(pathnameOrUrl || "/", undefined, options);
    } else {
      router.push(pathnameOrUrl || "/", undefined, options);
    }
  }, [router]);

  const handleLogin = useCallback(async () => {
    await loginWithPopup({ prompt: "login" });

    const token = await getIdTokenClaims();

    console.log({ token });
  }, [loginWithPopup, getIdTokenClaims]);

  const handleEvent = useCallback((eventType: CheckoutEventType, eventData: CheckoutEventData) => {
    if (!isLocalhost()) console.log(`🎯 ${ eventType }`, eventData);

    // console.log(`🎯 ${ eventType }`, eventData);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleError = useCallback((error: CheckoutModalError) => {
    // console.log(error);
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleCatch = useCallback((error: Error, errorInfo?: ErrorInfo): void | true => {
    // console.log(error, errorInfo);
    // return true;
  }, []);

  const checkoutProps: PUICheckoutProps = {
    ...checkoutComponentProps,

    // ProviderInjector:
    uri: `${config.API_HOSTNAME}/query`,
    getAuthenticationToken,

    // Modal:
    // open,
    // onClose,
    onGoTo,
    // goToHref,
    // goToLabel,

    // Flow:
    // loaderMode,
    // TODO: Finish implementing this (pass them down to utils to validate):
    // paymentIdParam,
    // paymentErrorParam,
    guestCheckoutEnabled: false,
    productConfirmationEnabled: false,
    vertexEnabled: true,
    threeDSEnabled: true,

    // Theming:
    theme: MOJITO_LIGHT_THEME,

    /*
    themeOptions: {
      // Reference App (https://github.com/mojitoinc/mojito-reference-app/) palette:
      palette: {
        primary: {
          // main: "#FF00FF", // Magenta
          // contrastText: "#FFFFFF",
        },

        paymentUI: {
          // progressBar: "", // Use primary as fallback.
          // paymentMethodSelectorBorder: "", // Use primary as fallback.
          // paymentMethodSelectorBackground: "", // Use primary as fallback.
          // mainButtonBackground: "", // Use primary as fallback.
          // mainButtonBorderWidth: 0,
        },
      },
    },
    */

    // Personalization:
    logoSrc: PLAYGROUND_MOJITO_LOGO,
    // logoSx,
    // loaderImageSrc,
    // purchasingImageSrc,
    // purchasingMessages,
    // successImageSrc,
    // errorImageSrc,
    userFormat: PLAYGROUND_USER_FORMAT,
    // acceptedPaymentTypes,
    // acceptedCreditCardNetworks,
    // network,
    // paymentLimits,
    dictionary: {
      privacyHref: "https://mojito.xyz",
      termsOfUseHref: "https://mojito.xyz",
    },

    // Legal:
    consentType: "circle",

    // Data:
    orgID: checkoutComponentProps.orgID || "",
    // invoiceID,
    checkoutItems: checkoutComponentProps.checkoutItems || [],

    // Authentication:
    onLogin: handleLogin,
    isAuthenticated,
    isAuthenticatedLoading,

    // Other Events:
    debug: true,
    onEvent: handleEvent,
    onError: handleError,
    onCatch: handleCatch,
  };

  return <PUICheckout {...checkoutProps} />;
}
