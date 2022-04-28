import { useAuth0 } from "@auth0/auth0-react";
import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { MOJITO_LIGHT_THEME, PUIError, PUIRouterOptions } from "../../lib";
import { CHECKOUT_MODAL_INFO_KEY_PREFIX } from "../../lib/config/config";
import { config } from "../../utils/config/config.constants";
import { PLAYGROUND_MOJITO_LOGO } from "../../utils/playground/playground.constants";

const ErrorPage: NextPage = () => {
  const router = useRouter();
  const { getIdTokenClaims } = useAuth0();

  const getAuthenticationToken = useCallback(async () => {
    const token = await getIdTokenClaims();

    return token?.__raw || "";
  }, [getIdTokenClaims]);

  const onGoTo = useCallback((pathnameOrUrl: string, { replace, ...options }: PUIRouterOptions = {}) => {
    if (!pathnameOrUrl) {
      if (replace) {
        router.replace("/");
      } else {
        router.push("/");
      }
    } else {
      if (pathnameOrUrl.startsWith("http")) {
        if (replace) {
          console.log(`Replace URL with ${pathnameOrUrl}`);
          window.location.replace(pathnameOrUrl);
        } else {
          console.log(`Push URL ${pathnameOrUrl}`);
          window.location.href = pathnameOrUrl;
        }
      } else {
        if (replace) {
          console.log(`Replace route with ${pathnameOrUrl}`);
          router.replace(pathnameOrUrl || "/", undefined, options);
        } else {
          console.log(`Push route ${pathnameOrUrl}`);
          router.push(pathnameOrUrl || "/", undefined, options);
        }
      }
    }
  }, [router]);

  return (
    <PUIError
      uri={ `${ config.API_HOSTNAME }/query` }
      getAuthenticationToken={ getAuthenticationToken }
      theme={MOJITO_LIGHT_THEME}
      logoSrc={PLAYGROUND_MOJITO_LOGO}
      errorImageSrc=""
      onGoTo={onGoTo} />
  );
}

export default ErrorPage;

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
