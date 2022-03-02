import { Backdrop, Box, CircularProgress } from "@mui/material";
import React, { ErrorInfo, useCallback, useEffect, useMemo, useRef } from "react";
import { getSavedPaymentMethodAddressIdFromBillingInfo, savedPaymentMethodToBillingInfo, transformRawSavedPaymentMethods } from "../../../domain/circle/circle.utils";
import { UserFormat } from "../../../domain/auth/authentication.interfaces";
import { PaymentMethod, PaymentType } from "../../../domain/payment/payment.interfaces";
import { CheckoutItemInfo } from "../../../domain/product/product.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { useDeletePaymentMethodMutation, useGetInvoiceDetailsQuery, useGetPaymentMethodListQuery, useMeQuery } from "../../../queries/graphqlGenerated";
import { AuthenticationView } from "../../../views/Authentication/AuthenticationView";
import { BillingView } from "../../../views/Billing/BillingView";
import { ConfirmationView } from "../../../views/Confirmation/ConfirmationView";
import { PaymentView } from "../../../views/Payment/PaymentView";
import { CheckoutModalHeader, CheckoutModalHeaderVariant } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { PurchasingView } from "../../../views/Purchasing/PurchasingView";
import { ErrorView } from "../../../views/Error/ErrorView";
import { RawSavedPaymentMethod, SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import { Theme, SxProps } from "@mui/material/styles";
import { continuePlaidOAuthFlow, PlaidFlow } from "../../../hooks/usePlaid";
import { ConsentType } from "../../shared/ConsentText/ConsentText";
import { CheckoutModalError, useCheckoutModalState } from "./CheckoutOverlay.hooks";
import { DEFAULT_ERROR_AT, ERROR_LOADING_INVOICE, ERROR_LOADING_PAYMENT_METHODS, ERROR_LOADING_USER } from "../../../domain/errors/errors.constants";
import { FullScreenOverlay } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ProvidersInjectorProps, withProviders } from "../../shared/ProvidersInjector/ProvidersInjector";
import { transformCheckoutItemsFromInvoice } from "../../../domain/product/product.utils";
import { useCreateInvoiceAndReservation } from "../../../hooks/useCreateInvoiceAndReservation";
import { CustomTextsKeys } from "../../../domain/customTexts/customTexts.interfaces";

export interface PUICheckoutOverlayProps {
  // Modal:
  open: boolean;
  onClose: () => void;

  // Flow:
  guestCheckoutEnabled?: boolean;
  productConfirmationEnabled?: boolean;

  // Personalization:
  logoSrc: string;
  logoSx?: SxProps<Theme>;
  loaderImageSrc: string;
  purchasingImageSrc: string;
  purchasingMessages?: false | string[];
  errorImageSrc: string;
  userFormat: UserFormat;
  acceptedPaymentTypes: PaymentType[];
  paymentLimits?: Partial<Record<PaymentType, number>>;
  customTexts: Record<CustomTextsKeys, (string | React.ReactFragment)[]>,

  // Legal:
  consentType?: ConsentType;
  privacyHref?: string;
  termsOfUseHref?: string;

  // Data:
  orgID: string;
  invoiceID?: string;
  checkoutItems: CheckoutItemInfo[];

  // Authentication:
  onLogin: () => void;
  isAuthenticated?: boolean;
  isAuthenticatedLoading?: boolean;
  onCatch?: (error: Error, errorInfo?: ErrorInfo) => void  // Other Events:
  debug?: boolean;
  onError?: (error: CheckoutModalError) => void;
  onMarketingOptInChange?: (marketingOptIn: boolean) => void
 }

export type PUICheckoutProps = PUICheckoutOverlayProps & ProvidersInjectorProps;

export const PUICheckoutOverlay: React.FC<PUICheckoutOverlayProps> = ({
  // Modal:
  open,
  onClose,

  // Flow:
  guestCheckoutEnabled,
  productConfirmationEnabled,

  // Personalization:
  logoSrc,
  logoSx,
  loaderImageSrc,
  purchasingImageSrc,
  purchasingMessages,
  errorImageSrc,
  userFormat,
  acceptedPaymentTypes,
  paymentLimits, // Not implemented yet. Used to show payment limits for some payment types.
  customTexts,

  // Legal:
  consentType,
  privacyHref,
  termsOfUseHref,

  // Data:
  orgID,
  invoiceID: initialInvoiceID,
  checkoutItems: parentCheckoutItems,

  // Authentication:
  onLogin,
  isAuthenticated,
  isAuthenticatedLoading,

  // Other Events:
  debug,
  onError,
  onMarketingOptInChange, // Not implemented yet. Used to let user subscribe / unsubscribe to marketing updates.
}) => {
  // First, get user data and saved payment methods:

  const {
    data: meData,
    loading: meLoading,
    error: meError,
    refetch: meRefetch,
  } = useMeQuery({ skip: !isAuthenticated });

  const {
    data: paymentMethodsData,
    loading: paymentMethodsLoading,
    error: paymentMethodsError,
    refetch: refetchPaymentMethods,
  } = useGetPaymentMethodListQuery({
    skip: !isAuthenticated,
    variables: { orgID },
  });


  // Get everything related to Payment UI routing, error and state handling, including resuming Plaid / 3DS flows:

  const {
    // CheckoutModalState:
    checkoutStep,
    checkoutError,
    isDialogBlocked,
    setIsDialogBlocked,
    initModalState,
    goBack,
    goNext,
    goTo,
    setError,

    // SelectedPaymentMethod:
    selectedPaymentMethod,
    setSelectedPaymentMethod,

    // PurchaseState:
    invoiceID,
    setInvoiceID,
    taxes,
    setTaxes,
    walletAddress,
    setWalletAddress,
    paymentReferenceNumber,
    setPaymentReferenceNumber,
  } = useCheckoutModalState({
    invoiceID: initialInvoiceID,
    productConfirmationEnabled,
    isAuthenticated,
    onError,
  });


  // Once we have an invoiceID, load the invoice:

  const {
    data: invoiceDetailsData,
    loading: invoiceDetailsLoading,
    error: invoiceDetailsError,
    refetch: refetchInvoiceDetails,
  } = useGetInvoiceDetailsQuery({
    skip: !invoiceID,
    variables: { orgID, invoiceID },
  });


  // Modal loading state:

  const isDialogLoading = isAuthenticatedLoading || meLoading || paymentMethodsLoading;
  const isDialogInitializing = isDialogLoading || invoiceDetailsLoading || !invoiceID;
  const isPlaidFlowLoading = continuePlaidOAuthFlow();


  // Payment methods and checkout items / invoice items transforms:

  const rawSavedPaymentMethods = paymentMethodsData?.getPaymentMethodList;
  const invoiceItems = invoiceDetailsData?.getInvoiceDetails.items;
  const checkoutItems = useMemo(() => transformCheckoutItemsFromInvoice(parentCheckoutItems, invoiceItems), [parentCheckoutItems, invoiceItems]);
  const savedPaymentMethods = useMemo(() => transformRawSavedPaymentMethods(rawSavedPaymentMethods as RawSavedPaymentMethod[]), [rawSavedPaymentMethods]);


  // Invoice creation & buy now lot reservation:

  const createInvoiceAndReservationCalledRef = useRef(false);

  const {
    invoiceAndReservationState,
    createInvoiceAndReservation,
    countdownElementRef,
  } = useCreateInvoiceAndReservation({ orgID, checkoutItems, debug });

  useEffect(() => {
    if (isDialogLoading || invoiceID === null || invoiceID || createInvoiceAndReservationCalledRef.current) return;

    createInvoiceAndReservationCalledRef.current = true;

    createInvoiceAndReservation();
  }, [isDialogLoading, invoiceID, createInvoiceAndReservation]);

  useEffect(() => {
    if (invoiceAndReservationState.error) {
      setError(invoiceAndReservationState.error);
    } else if (invoiceAndReservationState.invoiceID) {
      setInvoiceID(invoiceAndReservationState.invoiceID);
    }
  }, [invoiceAndReservationState, setError, setInvoiceID]);


  // Init modal state once everything has been loaded:

  useEffect(() => {
    if (!isDialogLoading && open) initModalState();
  }, [isDialogLoading, open, initModalState]);


  // Data loading error handling:

  useEffect(() => {
    if (meError) setError(ERROR_LOADING_USER(meError));
    if (paymentMethodsError) setError(ERROR_LOADING_PAYMENT_METHODS(paymentMethodsError));
    if (invoiceDetailsError) setError(ERROR_LOADING_INVOICE(invoiceDetailsError));
  }, [meError, paymentMethodsError, invoiceDetailsError, setError]);


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

      let matchingPaymentMethod: SavedPaymentMethod | undefined = undefined;

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
    const idsToDelete: string[] = checkoutStep === "billing"
      ? savedPaymentMethods.filter(({ addressId }) => addressId === addressIdOrPaymentMethodId).map(({ id }) => id)
      : [addressIdOrPaymentMethodId];

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

    await refetchPaymentMethods({ orgID });
  }, [checkoutStep, deletePaymentMethod, orgID, refetchPaymentMethods, savedPaymentMethods, setSelectedPaymentMethod]);


  // Purchase:

  const handlePurchaseSuccess = useCallback(async (nextPaymentReferenceNumber: string) => {
    setPaymentReferenceNumber(nextPaymentReferenceNumber);

    // After a successful purchase, a new payment method might have been created, so we reload them:
    await refetchPaymentMethods();

    goNext();
  }, [refetchPaymentMethods, setPaymentReferenceNumber, goNext]);

  const handlePurchaseError = useCallback(async (error: string | CheckoutModalError) => {
    // After a failed purchase, a new payment method might have been created anyway, so we reload them (createPaymentMethod
    // works but createPayment fails):
    await refetchPaymentMethods();

    setError(error);
  }, [refetchPaymentMethods, setError]);

  const handleClose = useCallback(() => {
    createInvoiceAndReservationCalledRef.current = false;

    setInvoiceID(null);

    onClose();
  }, [setInvoiceID, onClose]);

  const handleFixError = useCallback(async (): Promise<false> => {
    const at = checkoutError?.at;

    if (at === "reset") {
      goTo();

      await Promise.allSettled([
        meRefetch(),
        refetchPaymentMethods(),
        createInvoiceAndReservation(),
      ]);

      return false;
    }

    // After an error, all data is reloaded in case the issue was caused by stale/cached data or in case a new payment
    // method has been created despite the error:
    await Promise.allSettled([
      meRefetch(),
      refetchPaymentMethods(),
      refetchInvoiceDetails(),
    ]);

    if (at !== "purchasing") {
      // If we are redirecting users to the PurchasingView again, we keep the CVV to be able to re-try the purchase:
      setSelectedPaymentMethod((prevSelectedPaymentMethod) => ({ ...prevSelectedPaymentMethod, cvv: "" }));
    }

    goTo(at || DEFAULT_ERROR_AT, checkoutError);

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

  if ((isDialogInitializing || isPlaidFlowLoading) && (checkoutStep !== "error")) {
    return (<>
      { isPlaidFlowLoading && <PlaidFlow onSubmit={ handlePlaidFlowCompleted } /> }

      <Backdrop
        open={ open }
        onClick={ handleClose }>
        { loaderImageSrc ? (
          <Box
            component="img"
            src={ loaderImageSrc }
            sx={{
              width: 196,
              height: 196,
              mx: "auto",
              mt: 5,
            }} />
        ) : (
          <CircularProgress color="primary" />
        ) }
      </Backdrop>
    </>);
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
        checkoutItems={ checkoutItems }
        savedPaymentMethods={ savedPaymentMethods }
        selectedBillingInfo={ selectedPaymentMethod.billingInfo }
        walletAddress={ walletAddress }
        checkoutError={ checkoutError }
        onBillingInfoSelected={ handleBillingInfoSelected }
        onTaxesChange={ setTaxes }
        onSavedPaymentMethodDeleted={ handleSavedPaymentMethodDeleted }
        onWalletAddressChange={ setWalletAddress }
        onNext={ goNext }
        onClose={ handleClose }
        debug={ debug } />
    );
  } else if (checkoutStep === "payment") {
    checkoutStepElement = (
      <PaymentView
        checkoutItems={ checkoutItems }
        taxes={ taxes }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethod={ selectedPaymentMethod }
        walletAddress={ walletAddress }
        checkoutError={ checkoutError }
        onPaymentInfoSelected={ handlePaymentInfoSelected }
        onCvvSelected={ handleCvvSelected }
        onSavedPaymentMethodDeleted={ handleSavedPaymentMethodDeleted }
        onWalletAddressChange={ setWalletAddress }
        onNext={ goNext }
        onPrev={ goBack }
        onClose={ handleClose }
        acceptedPaymentTypes={ acceptedPaymentTypes }
        consentType={ consentType }
        privacyHref={ privacyHref }
        termsOfUseHref={ termsOfUseHref }
        wirePaymentsDisclaimerText={ customTexts.wirePaymentsDisclaimer }
        debug={ debug } />
    );
  } else if (checkoutStep === "purchasing" && invoiceID) {
    headerVariant = "purchasing";

    checkoutStepElement = (
      <PurchasingView
        purchasingImageSrc={ purchasingImageSrc }
        purchasingMessages={ purchasingMessages }
        orgID={ orgID }
        invoiceID={ invoiceID }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethod={ selectedPaymentMethod }
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
        paymentReferenceNumber={ paymentReferenceNumber }
        purchaseInstructions={ customTexts.purchaseInstructions }
        onNext={ handleClose } />
    );
  } else {
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
      onLoginClicked={ onLogin }
      onPrevClicked={ checkoutStep === "authentication" ? handleClose : goBack } />
  );

  return (
    <FullScreenOverlay
      centered={ checkoutStep === "purchasing" || checkoutStep === "error" }
      open={ open }
      onClose={ handleClose }
      isDialogBlocked={ isDialogBlocked }
      contentKey={ checkoutStep }
      header={ headerElement }
      children={ checkoutStepElement } />
  );
};

export const PUICheckout: React.FC<PUICheckoutProps> = withProviders(PUICheckoutOverlay);
