import { useAuth0 } from "@auth0/auth0-react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { MOJITO_LIGHT_THEME, PUIError, PUIRouterOptions } from "../../lib";
import { config } from "../../utils/config/config.constants";
import { PLAYGROUND_MOJITO_LOGO } from "../../utils/playground/playground.constants";

const ErrorPage: NextPage = () => {
  const router = useRouter();
  const { getIdTokenClaims } = useAuth0();

  const getAuthenticationToken = useCallback(async () => {
    const token = await getIdTokenClaims();

    // eslint-disable-next-line no-underscore-dangle
    return token?.__raw || "";
  }, [getIdTokenClaims]);

  const onGoTo = useCallback((pathnameOrUrl: string, { replace, reason, ...options }: PUIRouterOptions = {}) => {
    if (pathnameOrUrl.startsWith("http")) {
      if (replace) {
        console.log(`Replace URL with ${ pathnameOrUrl }`, reason);
        window.location.replace(pathnameOrUrl);
      } else {
        console.log(`Push URL ${ pathnameOrUrl }`, reason);
        window.location.href = pathnameOrUrl;
      }
    } else if (replace) {
      console.log(`Replace route with ${ pathnameOrUrl }`, reason);
      router.replace(pathnameOrUrl || "/", undefined, options);
    } else {
      console.log(`Push route ${ pathnameOrUrl }`, reason);
      router.push(pathnameOrUrl || "/", undefined, options);
    }
  }, [router]);

  return (
    <PUIError
      uri={ `${ config.API_HOSTNAME }/query` }
      getAuthenticationToken={ getAuthenticationToken }
      theme={ MOJITO_LIGHT_THEME }
      logoSrc={ PLAYGROUND_MOJITO_LOGO }
      errorImageSrc=""
      onGoTo={ onGoTo } />
  );
}

export default ErrorPage;

// Uncomment if SSR enabled:

/*
export function getServerSideProps(context: GetServerSidePropsContext): GetServerSidePropsResult<Record<string, never>> {
  const hasCheckoutModalInfo = context.req.headers.cookie?.includes(CHECKOUT_MODAL_INFO_KEY_PREFIX);

  // TODO: Theses checks could be improved to use the logic in CheckoutOverlay.utils.ts.

  if (hasCheckoutModalInfo) return { props: {} };

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
*/
