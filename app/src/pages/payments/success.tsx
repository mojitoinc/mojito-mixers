import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { CheckoutComponent } from "../../components/checkout-component/CheckoutComponent";
import { THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY } from "../../lib";
import { NOOP } from "../../lib/utils/miscUtils";

const SuccessPage: NextPage = () => {
  const router = useRouter();
  const paymentIdParamRef = useRef(router.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString());
  const paymentIdParam = paymentIdParamRef.current;

  useEffect(() => {
    if (!paymentIdParam) router.replace("/");
  }, [paymentIdParam, router]);

  return paymentIdParam ? (
    <CheckoutComponent
      loaderMode="success"
      open
      onClose={ NOOP }
      paymentIdParam={ paymentIdParam } />
  ) : null;
}

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
