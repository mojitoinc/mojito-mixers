import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getPlaidOAuthFlowState, persistPlaidReceivedRedirectUri } from "../lib/domain/plaid/plaid.utils";

const PlaidOAuthPage: NextPage = () => {
  const router = useRouter();

  const { continueOAuthFlow, url } = getPlaidOAuthFlowState();

  useEffect(() => {
    if (continueOAuthFlow) {
      persistPlaidReceivedRedirectUri(window.location.href);
    }

    router.replace(url || "/");
  }, [continueOAuthFlow, router, url]);

  return null;
}

export default PlaidOAuthPage;
