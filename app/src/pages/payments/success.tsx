import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { MOJITO_LIGHT_THEME, PUISuccess } from "../../lib";
import { PLAYGROUND_MOJITO_LOGO } from "../../utils/playground/playground.constants";

const SuccessPage: NextPage = () => {
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
    <PUISuccess
      theme={MOJITO_LIGHT_THEME}
      logoSrc={PLAYGROUND_MOJITO_LOGO}
      successImageSrc=""
      onRedirect={handleRedirect} />
  );
}

export default SuccessPage;
