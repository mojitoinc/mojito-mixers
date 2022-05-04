import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { MOJITO_LIGHT_THEME, PUIPlaid } from "../lib";

const PlaidOAuthPage: NextPage = () => {
  const router = useRouter();

  const handleRedirect = useCallback((pathnameOrUrl: string) => {
    console.log(`Redirect to ${pathnameOrUrl}...`);

    if (pathnameOrUrl && pathnameOrUrl.startsWith("http")) {
      window.location.replace(pathnameOrUrl);
    } else {
      router.replace(pathnameOrUrl || "/");
    }
  }, [router]);

  return (
    <PUIPlaid
      theme={MOJITO_LIGHT_THEME}
      onRedirect={handleRedirect} />
  );
}

export default PlaidOAuthPage;
