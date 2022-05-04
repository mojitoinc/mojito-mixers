import { useAuth0 } from "@auth0/auth0-react";
import { useRouter } from "next/router";
import React, { ErrorInfo, useCallback } from "react";
import { PUICheckoutComponentProps, CheckoutEventData, CheckoutEventType, CheckoutModalError, MOJITO_LIGHT_THEME, PUIRouterOptions, THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY, THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY, PUICheckoutProps, PUICheckout } from "../../lib";
import { isLocalhost } from "../../lib/domain/url/url.utils";
import { config } from "../../utils/config/config.constants";
import { PLAYGROUND_MOJITO_LOGO, PLAYGROUND_USER_FORMAT } from "../../utils/playground/playground.constants";

export const CheckoutComponent: React.FC<PUICheckoutComponentProps> = ({
  orgID,
  checkoutItems,
  ...checkoutComponentProps
}) => {
  const router = useRouter();
  const paymentIdParam = router.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();
  const paymentErrorParam = router.query[THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY]?.toString();

  const { loginWithPopup, isAuthenticated, isLoading: isAuthenticatedLoading, getIdTokenClaims } = useAuth0();

  const getAuthenticationToken = useCallback(async () => {
    const token = await getIdTokenClaims();

    // eslint-disable-next-line no-underscore-dangle
    return token?.__raw || "";
  }, [getIdTokenClaims]);

  const onGoTo = useCallback((pathnameOrUrl: string, { replace, reason, ...options }: PUIRouterOptions = {}) => {
    if (pathnameOrUrl.startsWith("http")) {
      if (replace) {
        console.log(`Replace URL with ${pathnameOrUrl}`, reason);
        window.location.replace(pathnameOrUrl);
      } else {
        console.log(`Push URL ${pathnameOrUrl}`, reason);
        window.location.href = pathnameOrUrl;
      }
    } else if (replace) {
      console.log(`Replace route with ${pathnameOrUrl}`, reason);
      router.replace(pathnameOrUrl || "/", undefined, options);
    } else {
      console.log(`Push route ${pathnameOrUrl}`, reason);
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
    paymentIdParam,
    paymentErrorParam,
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
    orgID: orgID || "",
    // invoiceID,
    checkoutItems: checkoutItems || [],

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
