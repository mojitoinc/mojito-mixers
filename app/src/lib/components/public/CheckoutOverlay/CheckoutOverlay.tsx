import { Backdrop, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Theme, SxProps } from "@mui/material/styles";
import { ApolloError } from "@apollo/client";
import { getSavedPaymentMethodAddressIdFromBillingInfo, savedPaymentMethodToBillingInfo, transformRawSavedPaymentMethods } from "../../../domain/circle/circle.utils";
import { UserFormat } from "../../../domain/auth/authentication.interfaces";
import { PaymentMethod, PaymentType } from "../../../domain/payment/payment.interfaces";
import { CheckoutEventData, CheckoutEventType } from "../../../domain/events/events.interfaces";
import { CheckoutItemInfo } from "../../../domain/product/product.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { useDeletePaymentMethodMutation, useGetInvoiceDetailsQuery, useGetPaymentMethodListQuery, useMeQuery, useReleaseReservationBuyNowLotMutation } from "../../../queries/graphqlGenerated";
import { AuthenticationView } from "../../../views/Authentication/AuthenticationView";
import { BillingView } from "../../../views/Billing/BillingView";
import { ConfirmationView } from "../../../views/Confirmation/ConfirmationView";
import { PaymentView } from "../../../views/Payment/PaymentView";
import { CheckoutModalHeader, CheckoutModalHeaderVariant } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { PurchasingView } from "../../../views/Purchasing/PurchasingView";
import { ErrorView } from "../../../views/Error/ErrorView";
import { RawSavedPaymentMethod, SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import { continuePlaidOAuthFlow, PlaidFlow } from "../../../hooks/usePlaid";
import { ConsentType } from "../../shared/ConsentText/ConsentText";
import { CheckoutModalError, CheckoutModalStepIndex, useCheckoutModalState } from "./CheckoutOverlay.hooks";
import { DEFAULT_ERROR_AT, ERROR_LOADING_INVOICE, ERROR_LOADING_PAYMENT_METHODS, ERROR_LOADING_USER } from "../../../domain/errors/errors.constants";
import { FullScreenOverlay } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ProvidersInjectorProps, withProviders } from "../../shared/ProvidersInjector/ProvidersInjector";
import { transformCheckoutItemsFromInvoice } from "../../../domain/product/product.utils";
import { useCreateInvoiceAndReservation } from "../../../hooks/useCreateInvoiceAndReservation";
import { useCheckoutItemsCostTotal } from "../../../hooks/useCheckoutItemCostTotal";
import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";
import { DictionaryProvider } from "../../../providers/DictionaryProvider";
import { Wallet } from "../../../domain/wallet/wallet.interfaces";
import { DEV_DEBUG_ENABLED_KEY, THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY, THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY, THREEDS_REDIRECT_DELAY_MS } from "../../../config/config";
import { Network } from "../../../domain/network/network.interfaces";
import { NEW_WALLET_OPTION } from "../../../domain/wallet/wallet.constants";
import { StatusIcon } from "../../shared/StatusIcon/StatusIcon";
import { CreditCardNetwork } from "../../../domain/react-payment-inputs/react-payment-inputs.utils";
import { PUIStaticSuccessOverlay } from "../SuccessOverlay/StaticSuccessOverlay";
import { PUIStaticErrorOverlay } from "../ErrorOverlay/StaticErrorOverlay";
import { useCountdown } from "../../../hooks/useContdown";
import { PUIRouterOptions } from "../../../domain/router/router.types";
import { getPathnameWithParams } from "../../../domain/url/url.utils";

export type LoaderMode = "default" | "success" | "error";

export interface PUICheckoutOverlayProps {
  // Modal:
  open: boolean;
  onClose?: () => void;
  onGoTo: (pathnameOrUrl: string, options?: PUIRouterOptions) => void;

  // Flow:
  loaderMode?: LoaderMode;
  paymentIdParam?: string;
  paymentErrorParam?: string;
  guestCheckoutEnabled?: boolean;
  productConfirmationEnabled?: boolean;
  vertexEnabled?: boolean;
  threeDSEnabled?: boolean;

  // Personalization:
  logoSrc?: string;
  logoSx?: SxProps<Theme>;
  loaderImageSrc?: string;
  purchasingImageSrc?: string;
  purchasingMessages?: false | string[];
  successImageSrc?: string;
  errorImageSrc?: string;
  userFormat?: UserFormat;
  acceptedPaymentTypes?: PaymentType[];
  acceptedCreditCardNetworks?: CreditCardNetwork[];
  network?: Network;
  // paymentLimits?: Partial<Record<PaymentType, number>>;
  dictionary?: Partial<PUIDictionary>;

  // Legal:
  consentType?: ConsentType;

  // Data:
  orgID: string;
  invoiceID?: string;
  checkoutItems: CheckoutItemInfo[];

  // Authentication:
  onLogin: () => void;
  isAuthenticated?: boolean;
  isAuthenticatedLoading?: boolean;

  // Other Events:
  debug?: boolean;
  onEvent?: (eventType: CheckoutEventType, eventData: CheckoutEventData) => void;
  onError?: (error: CheckoutModalError) => void;
}

export type PUICheckoutProps = PUICheckoutOverlayProps & ProvidersInjectorProps;

export type PUICheckoutComponentProps = Partial<PUICheckoutProps> & Pick<
  PUICheckoutProps,
  "open" | "loaderMode" | "paymentErrorParam"
>;

const DEV_DEBUG_ENABLED = process.browser && localStorage.getItem(DEV_DEBUG_ENABLED_KEY) === "true";

export const PUICheckoutOverlay: React.FC<PUICheckoutOverlayProps> = ({
  // Modal:
  open,
  onClose,
  onGoTo,

  // Flow:
  loaderMode: initialLoaderMode = "default",
  paymentIdParam,
  paymentErrorParam,
  guestCheckoutEnabled,
  productConfirmationEnabled,
  vertexEnabled = true,
  threeDSEnabled = true,

  // Personalization:
  logoSrc,
  logoSx,
  loaderImageSrc,
  purchasingImageSrc,
  purchasingMessages,
  successImageSrc,
  errorImageSrc,
  userFormat,
  acceptedPaymentTypes,
  acceptedCreditCardNetworks,
  network,
  // paymentLimits, // Not implemented yet. Used to show payment limits for some payment types.
  dictionary: parentDictionary,

  // Legal:
  consentType,

  // Data:
  orgID: parentOrgID,
  invoiceID: parentInvoiceID,
  checkoutItems: parentCheckoutItems,

  // Authentication:
  onLogin,
  isAuthenticated,
  isAuthenticatedLoading,

  // Other Events:
  debug: parentDebug,
  onEvent,
  onError,
}) => {
  const [debug, setDebug] = useState(!!parentDebug);

  // Initialization, just to prevent issues with Next.js' SSR:

  useEffect(() => {
    setDebug((prevDebug) => {
      const nextDebug = prevDebug || DEV_DEBUG_ENABLED;

      if (nextDebug) console.log(`\n🐞 DEBUG MODE ENABLED!\n\n`);

      return nextDebug;
    });
  }, []);

  // Actual changes triggered by users:
  const toggleDebug = useCallback(() => {
    setDebug((prevDebug) => {
      const nextDebug = !prevDebug;

      console.log(`\n🐞 DEBUG MODE ${ nextDebug ? "ENABLED" : "DISABLED" }!\n\n`);

      if (nextDebug) {
        localStorage.setItem(DEV_DEBUG_ENABLED_KEY, "true");
      } else {
        localStorage.removeItem(DEV_DEBUG_ENABLED_KEY);
      }

      return nextDebug;
    });
  }, []);

  // First, get user data:

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery({ skip: !isAuthenticated });

  const wallets = useMemo(() => {
    if (meLoading || !meData) return undefined;

    const userWallets = meData.me?.wallets as Wallet[] || [];

    return network
      ? userWallets.filter(wallet => wallet?.network?.id === network.id)
      : userWallets;
  }, [meLoading, meData, network]);


  // Get everything related to Payment UI routing, error and state handling, including resuming Plaid / 3DS flows:

  const paymentIdParamRef = useRef(paymentIdParam);
  const paymentErrorParamRef = useRef(paymentErrorParam);

  const {
    // CheckoutModalState:
    startAt,
    checkoutStep,
    checkoutError,
    isDialogBlocked,
    setIsDialogBlocked,
    initModalState,
    goBack,
    goNext,
    goTo,
    setError,

    // Data that can be persisted:
    orgID,
    checkoutItems: initialCheckoutItems,
    goToMarketplaceHref,

    // SelectedPaymentMethod:
    selectedPaymentMethod,
    setSelectedPaymentMethod,

    // PurchaseState:
    invoiceID,
    invoiceCountdownStart,
    setInvoiceID,
    taxes,
    setTaxes,
    wallet,
    setWalletAddress,
    paymentID,
    processorPaymentID,
    setPayments,
  } = useCheckoutModalState({
    orgID: parentOrgID,
    invoiceID: parentInvoiceID,
    paymentIdParam: paymentIdParamRef.current,
    productConfirmationEnabled,
    vertexEnabled,
    isAuthenticated,
    onError,
    debug,
  });

  const dictionary = useMemo(() => ({ ...parentDictionary, goToMarketplaceHref }), [parentDictionary, goToMarketplaceHref]);


  // Get saved payment methods:

  const {
    data: paymentMethodsData,
    loading: paymentMethodsLoading,
    error: paymentMethodsError,
    refetch: refetchPaymentMethods,
  } = useGetPaymentMethodListQuery({
    skip: !isAuthenticated || !orgID || !open,
    variables: { orgID },
  });


  // Once we have an invoiceID, load the invoice:

  const {
    data: invoiceDetailsData,
    loading: invoiceDetailsLoading,
    error: invoiceDetailsError,
    refetch: refetchInvoiceDetails,
  } = useGetInvoiceDetailsQuery({
    skip: !invoiceID,
    variables: { invoiceID },
  });


  // Payment methods and checkout items / invoice items transforms:

  const rawSavedPaymentMethods = paymentMethodsData?.getPaymentMethodList;
  const savedPaymentMethods = useMemo(() => transformRawSavedPaymentMethods(rawSavedPaymentMethods as RawSavedPaymentMethod[]), [rawSavedPaymentMethods]);

  const invoiceItems = invoiceDetailsData?.getInvoiceDetails.items;
  const destinationAddress = (invoiceItems || [])?.[0]?.destinationAddress || NEW_WALLET_OPTION.value;

  useEffect(() => {
    if (!destinationAddress) return;

    const nextWallet = (wallets || []).find(({ address }) => address === destinationAddress);

    setWalletAddress(nextWallet || destinationAddress);
  }, [wallets, destinationAddress, setWalletAddress]);

  // TODO: These should probably be combined.

  const checkoutItems = useMemo(() => {
    return transformCheckoutItemsFromInvoice(parentCheckoutItems, initialCheckoutItems, invoiceItems);
  }, [parentCheckoutItems, initialCheckoutItems, invoiceItems]);

  const { total: subtotal, fees, taxAmount } = useCheckoutItemsCostTotal(checkoutItems);


  // Modal loading state:

  const isAuthLoading = isAuthenticatedLoading || meLoading;
  const isDialogLoading = isAuthLoading || paymentMethodsLoading || !orgID || checkoutItems.length === 0;
  const isDialogInitializing = isDialogLoading || paymentMethodsLoading || invoiceDetailsLoading || !invoiceID || !invoiceCountdownStart;
  const isPlaidFlowLoading = continuePlaidOAuthFlow();
  const [loaderMode, setLoaderMode] = useState(initialLoaderMode);
  const showEspecialLoaders = open && isDialogInitializing && loaderMode !== "default" && checkoutStep !== "error";

  useEffect(() => {
    if (loaderMode === "default") return;

    if (!isDialogInitializing || !open) {
      // Once we have finished loading data OR if the modal is not opened (probably
      // because the stored data expired) or is closed, we reset the loader mode:
      setLoaderMode("default");
    }
  }, [loaderMode, isDialogInitializing, open]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    params.delete(THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY);
    params.delete(THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY);

    const cleanParams = params.toString();
    const cleanPathname = `${ window.location.pathname }${ cleanParams ? `?${ cleanParams }` : "" }`;

    if (cleanPathname && cleanPathname !== getPathnameWithParams()) {
      // As soon as we find these params, we remove them from the URL (they are stored in a Ref to avoid losing them
      // before we get a change to use them):
      onGoTo(cleanPathname, { replace: true, shallow: true, reason: "Clean URL." });
    }
  }, [onGoTo]);


  // Invoice creation & buy now lot reservation:

  const createInvoiceAndReservationCalledRef = useRef(false);

  const {
    // TODO: Instead of returning state, just pass setError and setInvoiceID or return it from createInvoiceAndReservation.
    invoiceAndReservationState,
    createInvoiceAndReservation,
  } = useCreateInvoiceAndReservation({ orgID, checkoutItems, debug });

  useEffect(() => {
    if (isDialogLoading || invoiceID === null || invoiceID || createInvoiceAndReservationCalledRef.current) return;

    createInvoiceAndReservationCalledRef.current = true;

    createInvoiceAndReservation();
  }, [isDialogLoading, invoiceID, createInvoiceAndReservation]);

  useEffect(() => {
    const { invoiceID: nextInvoiceID, invoiceCountdownStart: nextInvoiceCountdownStart, error } = invoiceAndReservationState;

    if (error) {
      // TODO: It would be great if we can keep track of the reservation expiration without changing the displayed error
      // if there's already once, so when clicking the action button for that one, on top of calling its respective error
      // handling code, we re-create the reservation:
      setError(error);

      return;
    }

    if (nextInvoiceID && nextInvoiceCountdownStart) setInvoiceID(nextInvoiceID, nextInvoiceCountdownStart);
  }, [invoiceAndReservationState, setError, setInvoiceID]);


  // Reservation countdown:

  const { countdownElementRef } = useCountdown({
    invoiceCountdownStart: checkoutStep === "confirmation" || checkoutStep === "error" ? null : invoiceCountdownStart,
    setError,
  });


  // Init modal state once everything has been loaded:

  const hasBeenInitRef = useRef(false);

  useEffect(() => {
    if (hasBeenInitRef.current && (!open || isAuthLoading)) hasBeenInitRef.current = false;
  }, [open, isAuthLoading, debug]);

  useEffect(() => {
    if (!open || isAuthLoading || hasBeenInitRef.current) return;

    if ((loaderMode === "default" && !isDialogLoading) || (loaderMode !== "default" && isDialogLoading)) {
      hasBeenInitRef.current = true;

      const { flowType, url } = initModalState();

      if (flowType === "" && loaderMode !== "default") {
        onGoTo(url || "/", { replace: true, reason: "Invalid modal state." });
      }
    }
  }, [open, isAuthLoading, loaderMode, isDialogLoading, initModalState, onGoTo]);


  // Data loading error handling:

  useEffect(() => {
    if (meError) setError(ERROR_LOADING_USER(meError));
    if (invoiceDetailsError) setError(ERROR_LOADING_INVOICE(invoiceDetailsError));

    // TODO: We could add an option to configure if we want to ignore this error:
    const ignorePaymentMethodsError = true;

    if (paymentMethodsError) {
      if (ignorePaymentMethodsError) {
        if (debug) console.log("\n❌ (IGNORED) Error loading saved payment methods:\n\n", paymentMethodsError);
      } else {
        setError(ERROR_LOADING_PAYMENT_METHODS(paymentMethodsError));
      }
    }
  }, [meError, invoiceDetailsError, paymentMethodsError, debug, setError]);


  // Analytics:

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const triggerAnalyticsEventRef = useRef((eventType: CheckoutEventType) => { /* Do nothing */ });

  triggerAnalyticsEventRef.current = (eventType: CheckoutEventType) => {
    if (!onEvent || !open) return;

    const { paymentInfo } = selectedPaymentMethod;

    let paymentType: PaymentType | undefined;

    if (typeof paymentInfo === "string") {
      const payment = savedPaymentMethods.find(({ id }) => id === paymentInfo);

      paymentType = payment?.type;
    } else if (paymentInfo) {
      paymentType = paymentInfo.type;
    }

    if (!eventType.startsWith("event:") && !eventType.includes(checkoutStep)) {
      if (debug) console.log(`⚠️ eventType / checkoutStep mismatch: ${ eventType } / ${ checkoutStep }`);

      return;
    }

    onEvent(eventType, {
      // Location:
      step: CheckoutModalStepIndex[checkoutStep],
      stepName: checkoutStep,

      // Purchase:
      departmentCategory: "NFT",
      paymentType,
      shippingMethod: typeof wallet === "object" ? "multisig wallet" : "custom wallet",
      checkoutItems,

      // Payment:
      currency: "USD",
      revenue: subtotal + fees,
      fees,
      tax: taxAmount,
      total: subtotal + fees + taxAmount,

      // Order:
      processorPaymentID,
      paymentID,
    });
  };

  useEffect(() => {
    // Original code (might this be causing the mismatch eventName / checkoutStep issue?):
    if (!isDialogInitializing) setTimeout(() => triggerAnalyticsEventRef.current(`navigate:${ checkoutStep }`));

    // Possible fix (might this cause some other issues such as missing data):
    // if (!isDialogInitializing) triggerAnalyticsEventRef.current(`navigate:${ checkoutStep }`);
  }, [isDialogInitializing, checkoutStep]);


  // Saved payment method creation-reload-sync:

  useEffect(() => {
    if (savedPaymentMethods.length === 0) return;

    // When reloading the saved payment methods after an error, we might have form data that matches a payment method
    // that has just been created, so we want to update it to reference the existing one:

    setSelectedPaymentMethod((prevSelectedPaymentMethod) => {
      const { billingInfo, paymentInfo } = prevSelectedPaymentMethod;

      if (typeof billingInfo === "string" && typeof paymentInfo === "string") return { ...prevSelectedPaymentMethod, cvv: "" };

      // To find the saved payment method(s) that was/were last created:
      const reversedSavedPaymentMethods = savedPaymentMethods.slice().reverse();

      // TODO: This logic can probably be simplified. Just get the last saved payment method...

      let matchingPaymentMethod: SavedPaymentMethod | undefined;

      if (typeof billingInfo === "object") {
        const addressId = getSavedPaymentMethodAddressIdFromBillingInfo(billingInfo);

        matchingPaymentMethod = reversedSavedPaymentMethods.find(paymentMethod => paymentMethod.addressId === addressId);
      }

      return matchingPaymentMethod ? {
        // Both billingInfo and paymentInfo were objects (and we found a matching newly created payment method):
        billingInfo: matchingPaymentMethod.addressId,
        paymentInfo: matchingPaymentMethod.id,
        cvv: "",
      } : {
        // billingInfo was an addressID (or we could not find a match) and paymentInfo was an object:
        billingInfo,
        paymentInfo: typeof billingInfo === "string" ? reversedSavedPaymentMethods[0].id : paymentInfo,
        cvv: "",
      };
    });
  }, [savedPaymentMethods, setSelectedPaymentMethod]);


  // Form data / state:

  const handleBillingInfoSelected = useCallback((billingInfo: string | BillingInfo) => {
    // If we go back to the billing info step to fix some validation errors or change some data, we preserve the data
    // in the payment info step (form) as long as it was not a saved payment method. In that case, the saved payment
    // method doesn't belong to the now updated billing info anymore, so we do reset it:
    setSelectedPaymentMethod(({ paymentInfo }) => ({ billingInfo, paymentInfo: typeof paymentInfo === "object" ? paymentInfo : "", cvv: "" }));
  }, [setSelectedPaymentMethod]);

  const handlePaymentInfoSelected = useCallback((paymentInfo: string | PaymentMethod) => {
    setSelectedPaymentMethod(({ billingInfo }) => ({ billingInfo, paymentInfo, cvv: "" }));
  }, [setSelectedPaymentMethod]);

  const handleCvvSelected = useCallback((cvv: string) => {
    setSelectedPaymentMethod(({ billingInfo, paymentInfo }) => ({ billingInfo, paymentInfo, cvv }));
  }, [setSelectedPaymentMethod]);


  // Delete payment methods:

  const [deletePaymentMethod] = useDeletePaymentMethodMutation();

  const handleSavedPaymentMethodDeleted = useCallback(async (addressIdOrPaymentMethodId: string) => {
    const idsToDelete: string[] = (checkoutStep === "billing"
      ? savedPaymentMethods.filter(({ addressId }) => addressId === addressIdOrPaymentMethodId).map(({ id }) => id)
      : [addressIdOrPaymentMethodId]).filter(Boolean);

    if (idsToDelete.length === 0) return;

    // DELETE LOGIC:

    // We are in BILLING (logic handled in BillingView.tsx):
    // - Delete last payment method => Show form.
    // - Delete payment method, but there's more => Re-set selected address.

    // We are in PAYMENT (logic handled in PaymentView.tsx and below):
    // - Delete last payment method (or last payment method for the selected address) => Expand address and show form.
    // - Delete payment method, but there's more => Re-set selected payment.

    if (checkoutStep === "payment") {
      const addressToDelete = savedPaymentMethods.find(({ id }) => id === addressIdOrPaymentMethodId);
      const addressIdToDelete = addressToDelete?.addressId;
      const paymentMethodsWithSameAddress = savedPaymentMethods.filter(({ addressId }) => addressId === addressIdToDelete);

      if (addressToDelete && paymentMethodsWithSameAddress.length === 1) {
        setSelectedPaymentMethod({
          // The payment method that had the selected address is being deleted, so we just copy its data as an object to
          // re-create it with the new payment information:
          billingInfo: savedPaymentMethodToBillingInfo(addressToDelete),
          paymentInfo: "",
          cvv: "",
        });
      }
    }

    const promises = idsToDelete.map((paymentMethodID) => {
      return deletePaymentMethod({
        variables: {
          orgID,
          paymentMethodID,
        },
      });
    });

    await Promise.allSettled(promises);

    await refetchPaymentMethods().catch(() => { /* TODO: Handle this error properly. */ });
  }, [checkoutStep, deletePaymentMethod, orgID, refetchPaymentMethods, savedPaymentMethods, setSelectedPaymentMethod]);


  // Purchase:

  const handlePurchaseSuccess = useCallback(async (nextCirclePaymentID: string, nextPaymentID:string, redirectURL: string) => {
    setPayments(nextCirclePaymentID, nextPaymentID);

    setTimeout(() => triggerAnalyticsEventRef.current("event:paymentSuccess"));

    if (redirectURL) {
      setTimeout(() => {
        if (debug) console.log(`Redirecting to 3DS = ${ redirectURL }`);

        window.location.href = redirectURL;
      }, THREEDS_REDIRECT_DELAY_MS);

      return;
    }

    // After a successful purchase, a new payment method might have been created, so we reload them:
    await refetchPaymentMethods().catch(() => { /* TODO: Handle this error properly. */ });

    goNext();
  }, [setPayments, debug, refetchPaymentMethods, goNext]);

  const handlePurchaseError = useCallback(async (error?: string | CheckoutModalError) => {
    setTimeout(() => triggerAnalyticsEventRef.current("event:paymentError"));

    // After a failed purchase, a new payment method might have been created anyway, so we reload them (createPaymentMethod
    // works but createPayment fails):
    await refetchPaymentMethods().catch(() => { /* TODO: Handle this error properly. */ });

    setError(error);
  }, [refetchPaymentMethods, setError]);


  // Release reservation:

  const lastReleasedReservationID = useRef("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleBeforeUnloadRef = useRef((e?: BeforeUnloadEvent) => { /* Do nothing */ });

  const [releaseReservationBuyNowLot] = useReleaseReservationBuyNowLotMutation({
    variables: {
      orgID,
      invoiceID,
    },
  });

  const handleBeforeUnload = handleBeforeUnloadRef.current = useCallback((e?: BeforeUnloadEvent) => {
    if (paymentID || processorPaymentID || parentInvoiceID) return;

    if (orgID && invoiceID && invoiceID !== lastReleasedReservationID.current) {
      if (debug) console.log(`\n♻️ Releasing reservation invoice ${ invoiceID } (orgID = ${ orgID })...\n`);

      releaseReservationBuyNowLot().then((result) => {
        lastReleasedReservationID.current = invoiceID;

        if (debug) console.log("  🟢 releaseReservationBuyNowLot result", result);
      }).catch((error: ApolloError | Error) => {
        if (debug) console.log("  🔴 releaseReservationBuyNowLot error", error);
      });
    }

    if (e) {
      // TODO: We might want to implement close tab confirmations at some point:

      // If you prevent default behavior in Mozilla Firefox prompt will always be shown:
      // e.preventDefault();

      // Chrome requires returnValue to be set:
      // e.returnValue = '';

      // The absence of a returnValue property on the event will guarantee the browser unload happens:
      // eslint-disable-next-line no-param-reassign
      delete e.returnValue;
    }
  }, [paymentID, processorPaymentID, parentInvoiceID, orgID, invoiceID, debug, releaseReservationBuyNowLot]);

  useEffect(() => {
    if (checkoutError?.at === "reset") handleBeforeUnloadRef.current();
  }, [checkoutError]);

  useEffect(() => {
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [handleBeforeUnload]);

  const handleClose = useCallback(() => {
    if (!onClose) return;

    window.removeEventListener('beforeunload', handleBeforeUnload);

    handleBeforeUnload();

    createInvoiceAndReservationCalledRef.current = false;

    setInvoiceID(null, null);

    onClose();
  }, [handleBeforeUnload, setInvoiceID, onClose]);

  const handleGoTo = useCallback((pathnameOrUrl: string) => {
    if (pathnameOrUrl === window.location.href || pathnameOrUrl === window.location.pathname) {
      handleClose();

      return;
    }

    window.removeEventListener('beforeunload', handleBeforeUnload);

    handleBeforeUnload();

    onGoTo(pathnameOrUrl || "/", { replace: true });
  }, [handleClose, handleBeforeUnload, onGoTo]);

  const handlePurchaseCompleted = useCallback(() => {
    handleGoTo(goToMarketplaceHref)
  }, [handleGoTo, goToMarketplaceHref]);


  // Error handling:

  const handleFixError = useCallback(async (): Promise<false> => {
    const at = checkoutError?.at;

    if (at === "reset") {
      await Promise.allSettled([
        meRefetch(),
        refetchPaymentMethods().catch(() => { /* TODO: Handle this error properly. */ }),
        createInvoiceAndReservation(),
      ]);

      // TODO: Cancel previous reservation?

      goTo();
    } else {
      // After an error, all data is reloaded in case the issue was caused by stale/cached data or in case a new payment
      // method has been created despite the error:
      await Promise.allSettled([
        meRefetch(),
        refetchPaymentMethods().catch(() => { /* TODO: Handle this error properly. */ }),
        refetchInvoiceDetails(),
      ]);

      if (at !== "purchasing") {
        // If we are redirecting users to the PurchasingView again, we keep the CVV to be able to re-try the purchase:
        setSelectedPaymentMethod(prevSelectedPaymentMethod => ({ ...prevSelectedPaymentMethod, cvv: "" }));
      }

      goTo(at || DEFAULT_ERROR_AT, checkoutError);
    }

    // This function is used as a CheckoutModalFooter's onSubmitClicked, so we want that to show a loader on the submit
    // button when clicked but do not remove it once the Promise is resolved, as we are moving to another view and
    // CheckoutModalFooter will unmount (so doing this prevents a memory leak issue):
    return false;
  }, [checkoutError, goTo, createInvoiceAndReservation, meRefetch, refetchPaymentMethods, refetchInvoiceDetails, setSelectedPaymentMethod]);


  // Plaid integration (resume Plaid flow):

  const handlePlaidFlowCompleted = useCallback((paymentInfo?: PaymentMethod) => {
    if (!paymentInfo) {
      initModalState();

      return;
    }

    handlePaymentInfoSelected(paymentInfo);

    goTo("purchasing");
  }, [initModalState, handlePaymentInfoSelected, goTo]);


  // Loading UI:

  if (showEspecialLoaders && loaderMode === "success") {
    return (
      <PUIStaticSuccessOverlay
        // TODO: Add to dictionary:
        successImageSrc={ successImageSrc }
        logoSrc={ logoSrc }
        logoSx={ logoSx } />
    );
  }

  if (showEspecialLoaders && loaderMode === "error") {
    return (
      <PUIStaticErrorOverlay
        checkoutError={{ errorMessage: paymentErrorParamRef.current || "" }}
        // TODO: Add to dictionary:
        errorImageSrc={ errorImageSrc }
        logoSrc={ logoSrc }
        logoSx={ logoSx } />
    );
  }

  if ((isDialogInitializing || isPlaidFlowLoading) && (checkoutStep !== "error")) {
    return (
      <>
        { isPlaidFlowLoading && <PlaidFlow onSubmit={ handlePlaidFlowCompleted } /> }

        <Backdrop
          open={ open }
          onClick={ handleClose }>
          { loaderImageSrc ? (
            <StatusIcon
              variant="loading"
              imgSrc={ loaderImageSrc }
              sx={{ mt: 5 }} />
          ) : (
            <CircularProgress color="primary" />
          ) }
        </Backdrop>
      </>
    );
  }


  // Normal UI (steps / views):

  let headerVariant: CheckoutModalHeaderVariant = isAuthenticated ? 'loggedIn' : 'guest';
  let checkoutStepElement = null;

  if (checkoutStep === "error" && checkoutError) {
    headerVariant = "error";

    checkoutStepElement = (
      <ErrorView
        checkoutError={ checkoutError }
        errorImageSrc={ errorImageSrc }
        onFixError={ handleFixError }
        onClose={ handleClose }
        debug={ debug } />
    );
  } else if (checkoutStep === "authentication") {
    if (!isAuthenticated) headerVariant = 'anonymous';

    checkoutStepElement = (
      <AuthenticationView
        checkoutItems={ checkoutItems }
        taxes={ taxes }
        isAuthenticated={ isAuthenticated }
        guestCheckoutEnabled={ guestCheckoutEnabled }
        onGuestClicked={ goNext }
        onCloseClicked={ handleClose } />
    );
  } else if (checkoutStep === "billing") {
    checkoutStepElement = (
      <BillingView
        vertexEnabled={ vertexEnabled }
        checkoutItems={ checkoutItems }
        savedPaymentMethods={ savedPaymentMethods }
        selectedBillingInfo={ selectedPaymentMethod.billingInfo }
        wallet={ wallet }
        wallets={ wallets }
        checkoutError={ checkoutError }
        onBillingInfoSelected={ handleBillingInfoSelected }
        onTaxesChange={ setTaxes }
        onSavedPaymentMethodDeleted={ handleSavedPaymentMethodDeleted }
        onWalletChange={ setWalletAddress }
        onNext={ goNext }
        onClose={ handleClose }
        consentType={ consentType }
        debug={ debug } />
    );
  } else if (checkoutStep === "payment" && invoiceID && invoiceCountdownStart) {
    checkoutStepElement = (
      <PaymentView
        orgID={ orgID }
        invoiceID={ invoiceID }
        invoiceCountdownStart={ invoiceCountdownStart }
        checkoutItems={ checkoutItems }
        taxes={ taxes }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethod={ selectedPaymentMethod }
        wallet={ wallet }
        wallets={ wallets }
        checkoutError={ checkoutError }
        onPaymentInfoSelected={ handlePaymentInfoSelected }
        onCvvSelected={ handleCvvSelected }
        onSavedPaymentMethodDeleted={ handleSavedPaymentMethodDeleted }
        onWalletChange={ setWalletAddress }
        onNext={ goNext }
        onPrev={ goBack }
        onClose={ handleClose }
        acceptedPaymentTypes={ acceptedPaymentTypes }
        acceptedCreditCardNetworks={ acceptedCreditCardNetworks }
        consentType={ consentType }
        debug={ debug } />
    );
  } else if (checkoutStep === "purchasing" && invoiceID && invoiceCountdownStart) {
    headerVariant = "purchasing";

    checkoutStepElement = (
      <PurchasingView
        threeDSEnabled={ threeDSEnabled }
        purchasingImageSrc={ purchasingImageSrc }
        purchasingMessages={ purchasingMessages }
        orgID={ orgID }
        invoiceID={ invoiceID }
        invoiceCountdownStart={ invoiceCountdownStart }
        checkoutItems={ checkoutItems }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethod={ selectedPaymentMethod }
        wallet={ wallet }
        onPurchaseSuccess={ handlePurchaseSuccess }
        onPurchaseError={ handlePurchaseError }
        onDialogBlocked={ setIsDialogBlocked }
        debug={ debug } />
    );
  } else if (checkoutStep === "confirmation") {
    headerVariant = "logoOnly";

    checkoutStepElement = (
      <ConfirmationView
        checkoutItems={ checkoutItems }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethod={ selectedPaymentMethod }
        processorPaymentID={ processorPaymentID }
        wallet={ wallet }
        onNext={ handlePurchaseCompleted }
        onGoTo={ handleGoTo } />
    );
  } else {
    console.warn("Unknown checkoutStepElement!");

    // !checkoutStep or
    // checkoutStep === "error" && !checkoutError or
    // checkoutStep === "purchasing" && !invoiceID or
    // some other kind of indeterminate / incorrect state:
    return null;
  }

  const headerElement = (
    <CheckoutModalHeader
      variant={ headerVariant }
      countdownElementRef={ countdownElementRef }
      logoSrc={ logoSrc }
      logoSx={ logoSx }
      user={ meData?.me?.user }
      userFormat={ userFormat }
      onLogin={ onLogin }
      onClose={ checkoutStep === startAt ? handleClose : undefined }
      onPrev={ checkoutStep === startAt ? undefined : goBack }
      toggleDebug={ toggleDebug } />
  );

  return (
    <DictionaryProvider dictionary={ dictionary }>
      <FullScreenOverlay
        centered={ checkoutStep === "purchasing" || checkoutStep === "error" }
        open={ open }
        onClose={ handleClose }
        isDialogBlocked={ isDialogBlocked }
        contentKey={ checkoutStep }
        header={ headerElement }>
        { checkoutStepElement }
      </FullScreenOverlay>
    </DictionaryProvider>
  );
};

export const PUICheckout: React.FC<PUICheckoutProps> = withProviders(PUICheckoutOverlay);
