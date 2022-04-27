import { GetServerSidePropsContext, GetServerSidePropsResult, NextPage } from "next";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import { CheckoutComponent } from "../../components/checkout-component/CheckoutComponent";
import { THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY } from "../../lib";

const SuccessPage: NextPage = () => {
  const router = useRouter();
  const paymentIdParam = router.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();
  // const paymentErrorParam = router.query[THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY]?.toString();

  // TODO: CheckoutOverlay should automatically call goTo:
  useEffect(() => {
    if (!paymentIdParam) {
      router.replace("/");
    }
  }, [paymentIdParam, router]);

  /*
  const handleGoTo = useCallback((pathnameOrUrl: string) => {
    console.log(`Redirect to ${pathnameOrUrl}...`);

    if (pathnameOrUrl && pathnameOrUrl.startsWith("http")) {
      window.location.replace(pathnameOrUrl);
    } else {
      router.replace(pathnameOrUrl || "/");
    }
  }, [router]);
  */

  const handleClose = useCallback(() => {
    // TODO: Redirect to original item page (storage).
  }, []);

  return paymentIdParam ? (
    <CheckoutComponent loaderMode="success" open onClose={ handleClose } />
  ) : null;
}

export default SuccessPage;

export function getServerSideProps(context: GetServerSidePropsContext): GetServerSidePropsResult<Record<string, never>> {
  const paymentIdParam = context.query[THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY]?.toString();

  console.log("paymentIdParam =", paymentIdParam);

  // TODO: Validate paymentIdParam value.
  // TODO: Make sure these checks work with and without SSR.

  if (paymentIdParam) return { props: {} };

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
}
