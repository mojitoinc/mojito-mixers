import { NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { MOJITO_LIGHT_THEME } from "../../lib";
import { PLAYGROUND_MOJITO_LOGO } from "../../utils/playground/playground.constants";

const SuccessPage: NextPage = () => {
  const router = useRouter();
  const paymentIdParam = router.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();
  const paymentErrorParam = router.query[THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY]?.toString();

  const handleRedirect = useCallback((pathnameOrUrl: string) => {
    console.log(`Redirect to ${pathnameOrUrl}...`);

    if (pathnameOrUrl && pathnameOrUrl.startsWith("http")) {
      window.location.replace(pathnameOrUrl);
    } else {
      router.replace(pathnameOrUrl || "/");
    }
  }, [router]);

  return (
    <CheckoutComponent
      theme={MOJITO_LIGHT_THEME}
      logoSrc={PLAYGROUND_MOJITO_LOGO}
      successImageSrc=""
      onRedirect={handleRedirect} />
  );
}

export default SuccessPage;
