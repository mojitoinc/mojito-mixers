import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { PUIPlaidOverlay } from "../lib/components/public/PlaidOverlay/PlaidOverlay";

const PlaidOAuthPage: NextPage = () => {
  const router = useRouter();

  const handleRedirect = useCallback((pathnameOrUrl: string) => {
    console.log(`Redirect to ${ pathnameOrUrl }...`);

    router.replace(pathnameOrUrl || "/");
  }, [router]);

  return (
    <PUIPlaidOverlay onRedirect={ handleRedirect } />
  );
}

export default PlaidOAuthPage;
