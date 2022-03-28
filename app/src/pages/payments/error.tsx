import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { MOJITO_LIGHT_THEME, PUIError } from "../../lib";
import { config } from "../../utils/config/config.constants";
import { PLAYGROUND_MOJITO_LOGO } from "../../utils/playground/playground.constants";

const ErrorPage: NextPage = () => {
  const router = useRouter();

  const handleRedirect = useCallback((pathnameOrUrl: string) => {
    console.log(`Redirect to ${ pathnameOrUrl }...`);

    if (pathnameOrUrl && pathnameOrUrl.startsWith("http")) {
      window.location.replace(pathnameOrUrl);
    } else {
      router.replace(pathnameOrUrl || "/");
    }
  }, [router]);

  return (
    <PUIError
      uri={ `${ config.API_HOSTNAME }/query` }
      theme={MOJITO_LIGHT_THEME}
      logoSrc={PLAYGROUND_MOJITO_LOGO}
      errorImageSrc=""
      onRedirect={ handleRedirect } />
  );
}

export default ErrorPage;
