import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { PUISuccess } from "../../lib";
import { PLAYGROUND_THEMES, PLAYGROUND_LOGOS_SRC, PLAYGROUND_LOGOS_SX } from "../../utils/playground/playground.constants";

const SuccessPage: NextPage = () => {
  const router = useRouter();

  const handleRedirect = useCallback((pathnameOrUrl: string) => {
    console.log(`Redirect to ${ pathnameOrUrl }...`);

    router.replace(pathnameOrUrl || "/");
  }, [router]);

  return (
    <PUISuccess
      theme={ PLAYGROUND_THEMES.light }
      logoSrc={ PLAYGROUND_LOGOS_SRC.light }
      logoSx={ PLAYGROUND_LOGOS_SX.light }
      successImageSrc=""
      onRedirect={ handleRedirect } />
  );
}

export default SuccessPage;
