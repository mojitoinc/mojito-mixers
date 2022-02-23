import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { PUIPlaid } from "../lib";
import { PLAYGROUND_THEMES } from "../utils/playground/playground.constants";

const PlaidOAuthPage: NextPage = () => {
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
    <PUIPlaid
      theme={ PLAYGROUND_THEMES.light }
      onRedirect={ handleRedirect } />
  );
}

export default PlaidOAuthPage;
