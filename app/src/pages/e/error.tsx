import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { PUIError } from "../../lib";
import { PLAYGROUND_THEMES, PLAYGROUND_LOGOS_SRC, PLAYGROUND_LOGOS_SX } from "../../utils/playground/playground.constants";

const ErrorPage: NextPage = () => {
  const router = useRouter();

  const handleRedirect = useCallback((pathnameOrUrl: string) => {
    console.log(`Redirect to ${ pathnameOrUrl }...`);

    router.replace(pathnameOrUrl || "/");
  }, [router]);

  return (
    <PUIError
      theme={ PLAYGROUND_THEMES.light }
      logoSrc={ PLAYGROUND_LOGOS_SRC.light }
      logoSx={ PLAYGROUND_LOGOS_SX.light }
      errorImageSrc=""
      onRedirect={ handleRedirect } />
  );
}

export default ErrorPage;
