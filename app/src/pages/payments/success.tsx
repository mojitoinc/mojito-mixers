import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CheckoutComponent } from "../../components/checkout-component/CheckoutComponent";
import { getCheckoutModalState, THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY } from "../../lib";
import { COINBASE_URL_PARAM_FROM_KEY, COINBASE_URL_PARAM_FROM_VALUE } from "../../lib/config/config";

const SuccessPage: NextPage = () => {
  const router = useRouter();
  const [paymentId, setPaymentId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    let paymentIdParam = params.get(THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY) || "";

    if (paymentIdParam === "" && params.get(COINBASE_URL_PARAM_FROM_KEY) === COINBASE_URL_PARAM_FROM_VALUE) {
      paymentIdParam = getCheckoutModalState({ noClear: true }).processorPaymentID;
    }

    setPaymentId(paymentIdParam);
  }, []);

  useEffect(() => {
    if (paymentId === "") router.replace("/");
  }, [paymentId, router]);

  return paymentId ? (
    <CheckoutComponent
      loaderMode="success"
      open
      paymentIdParam={ paymentId } />
  ) : null;
};

export default SuccessPage;

// Uncomment if SSR enabled:

/*
export function getServerSideProps(context: GetServerSidePropsContext): GetServerSidePropsResult<Record<string, never>> {
  // const paymentIdParam = context.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();
  // const hasCheckoutModalInfo = context.req.headers.cookie?.includes(CHECKOUT_MODAL_INFO_KEY(paymentIdParam));

  // TODO: For now, ignore the paymentId param as we seem to get mismatching ones:
  const hasCheckoutModalInfo = paymentIdParam && context.req.headers.cookie?.includes(CHECKOUT_MODAL_INFO_KEY_PREFIX);

  // TODO: Theses checks could be improved to use the logic in CheckoutOverlay.utils.ts.

  if (hasCheckoutModalInfo) return { props: {} };

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
*/
