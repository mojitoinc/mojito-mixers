import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { PUIError } from "../../lib";
import { PLAYGROUND_THEMES, PLAYGROUND_LOGOS_SRC, PLAYGROUND_LOGOS_SX } from "../../utils/playground/playground.constants";

const ErrorPage: NextPage = () => {
  const router = useRouter();

  const handleRedirect = useCallback((pathnameOrUrl: string) => {
    console.log(`Redirect to ${ pathnameOrUrl }...`);

    /*
    if (continueOAuthFlow) {
      persistPlaidReceivedRedirectUri(window.location.href);
    }
    */

    // router.replace("/");
  }, []);

  const handleReview = useCallback((pathnameOrUrl: string) => {
    console.log(`Review ${ pathnameOrUrl }...`);

    // router.replace("/");
  }, []);

  const handleAbort = useCallback((pathnameOrUrl: string) => {
    console.log(`Back to ${ pathnameOrUrl }...`);

    // router.replace("/");
  }, []);

  return (
    <PUIError
      theme={ PLAYGROUND_THEMES.light }
      logoSrc={ PLAYGROUND_LOGOS_SRC.light }
      logoSx={ PLAYGROUND_LOGOS_SX.light }
      errorImageSrc=""
      onRedirect={ handleRedirect }
      onReview={ handleReview }
      onAbort={ handleAbort } />
  );
}

export default ErrorPage;
