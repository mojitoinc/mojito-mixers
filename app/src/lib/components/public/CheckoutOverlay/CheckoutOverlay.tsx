import { Backdrop, Box, CircularProgress } from "@mui/material";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { getSavedPaymentMethodAddressIdFromBillingInfo, savedPaymentMethodToBillingInfo, transformRawSavedPaymentMethods } from "../../../domain/circle/circle.utils";
import { UserFormat } from "../../../domain/auth/authentication.interfaces";
import { PaymentMethod, PaymentType } from "../../../domain/payment/payment.interfaces";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { useDeletePaymentMethodMutation, useGetPaymentMethodListQuery, useMeQuery } from "../../../queries/graphqlGenerated";
import { AuthenticationView } from "../../../views/Authentication/AuthenticationView";
import { BillingView } from "../../../views/Billing/BillingView";
import { ConfirmationView } from "../../../views/Confirmation/ConfirmationView";
import { PaymentView } from "../../../views/Payment/PaymentView";
import { CheckoutModalHeader, CheckoutModalHeaderVariant } from "../../payments/CheckoutModalHeader/CheckoutModalHeader";
import { PurchasingView } from "../../../views/Purchasing/PurchasingView";
import { ErrorView } from "../../../views/Error/ErrorView";
import { RawSavedPaymentMethod, SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import { Theme, ThemeOptions, SxProps } from "@mui/material/styles";
import { continuePlaidOAuthFlow, PlaidFlow } from "../../../hooks/usePlaid";
import { ConsentType } from "../../shared/ConsentText/ConsentText";
import { CheckoutModalError, useCheckoutModalState } from "./CheckoutOverlay.hooks";
import { DEFAULT_ERROR_AT, ERROR_LOADING_PAYMENT_METHODS, ERROR_LOADING_USER } from "../../../domain/errors/errors.constants";
import { FullScreenOverlay } from "../../shared/FullScreenOverlay/FullScreenOverlay";
import { ProviderInjectorProps, withProviders } from "../../shared/ProvidersInjector/ProvidersInjector";

const SELECTOR_DIALOG_SCROLLABLE = "[role=presentation]";

export interface PUICheckoutOverlayProps {
  // Modal:
  open: boolean;
  onClose: () => void;

  // Flow:
  guestCheckoutEnabled?: boolean;
  productConfirmationEnabled?: boolean;

  // Personalization:
  theme?: Theme;
  themeOptions?: ThemeOptions;
  logoSrc: string;
  logoSx?: SxProps<Theme>;
  loaderImageSrc: string;
  purchasingImageSrc: string;
  purchasingMessages?: false | string[];
  errorImageSrc: string;
  userFormat: UserFormat;
  acceptedPaymentTypes: PaymentType[];
  paymentLimits?: Partial<Record<PaymentType, number>>;
  purchaseInstructions: string;

  // Legal:
  consentType?: ConsentType;
  privacyHref?: string;
  termsOfUseHref?: string;

  // Data:
  orgID: string;
  invoiceID?: string;
  checkoutItems: CheckoutItem[];

  // Authentication:
  onLogin: () => void;
  isAuthenticated?: boolean;
  isAuthenticatedLoading?: boolean;

  // Other Events:
  debug?: boolean;
  onError?: (error: CheckoutModalError) => void;
  onMarketingOptInChange?: (marketingOptIn: boolean) => void
}

export type PUICheckoutProps = PUICheckoutOverlayProps & ProviderInjectorProps;

export const PUICheckoutOverlay: React.FC<PUICheckoutOverlayProps> = ({
  // Modal:
  open,
  onClose,

  // Flow:
  guestCheckoutEnabled,
  productConfirmationEnabled,

  // Personalization:
  theme: parentTheme,
  themeOptions,
  logoSrc,
  logoSx,
  loaderImageSrc,
  purchasingImageSrc,
  purchasingMessages,
  errorImageSrc,
  userFormat,
  acceptedPaymentTypes,
  paymentLimits, // Not implemented yet. Used to show payment limits for some payment types.
  purchaseInstructions,

  // Legal:
  consentType, // Not implemented yet. Used to let the app control where to log errors to (e.g. Sentry).
  privacyHref,
  termsOfUseHref,

  // Data:
  orgID,
  invoiceID,
  checkoutItems,

  // Authentication:
  onLogin,
  isAuthenticated,
  isAuthenticatedLoading,

  // Other Events:
  debug,
  onError,
  onMarketingOptInChange, // Not implemented yet. Used to let user subscribe / unsubscribe to marketing updates.
}) => {
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
    variables: {
      orgID,
    },
  });

  const [deletePaymentMethod] = useDeletePaymentMethodMutation();

  const isDialogLoading = isAuthenticatedLoading || meLoading || paymentMethodsLoading;
  const isPlaidFlowLoading = continuePlaidOAuthFlow();
  const rawSavedPaymentMethods = paymentMethodsData?.getPaymentMethodList;
  const savedPaymentMethods = useMemo(() => transformRawSavedPaymentMethods(rawSavedPaymentMethods as RawSavedPaymentMethod[]), [rawSavedPaymentMethods]);
  const dialogRootRef = useRef<HTMLDivElement>(null);

  const {
    // CheckoutModalState:
    checkoutStep,
    checkoutError,
    resetModalState,
    goBack,
    goNext,
    goTo,
    setError,

    // SelectedPaymentMethod:
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useCheckoutModalState({
    productConfirmationEnabled,
    isAuthenticated,
    onError,
  });

  useEffect(() => {
    const dialogScrollable = dialogRootRef.current?.querySelector(SELECTOR_DIALOG_SCROLLABLE);

    // Scroll to top on step change:
    if (checkoutStep && dialogScrollable) dialogScrollable.scrollTop = 0;
  }, [checkoutStep]);

  useEffect(() => {
    if (isDialogLoading || !open) return;

    resetModalState();
  }, [isDialogLoading, open, resetModalState]);

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

      let matchingPaymentMethod: SavedPaymentMethod;

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

  useEffect(() => {
    if (meError) setError(ERROR_LOADING_USER(meError));
    if (paymentMethodsError) setError(ERROR_LOADING_PAYMENT_METHODS(paymentMethodsError));
  }, [meError, paymentMethodsError, setError]);

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

  const [paymentReferenceNumber, setPaymentReferenceNumber] = useState("");

  const handlePurchaseSuccess = useCallback(async (paymentReferenceNumber: string) => {
    // After a successful purchase, a new payment method might have been created, so we reload them:
    await refetchPaymentMethods();

    setPaymentReferenceNumber(paymentReferenceNumber);

    goNext();
  }, [refetchPaymentMethods, goNext]);

  const handleFixError = useCallback(async (): Promise<false> => {
    // After an error, all data is reloaded in case the issue was caused by stale/cached data or in case a new payment
    // method has been created despite the error:
    await Promise.allSettled([
      meRefetch(),
      refetchPaymentMethods(),
    ]);

    if (checkoutError.at !== "purchasing") {
      // If we are redirecting users to the PurchasingView again, we keep the CVV to be able to re-try the purchase:
      setSelectedPaymentMethod((prevSelectedPaymentMethod) => ({ ...prevSelectedPaymentMethod, cvv: "" }));
    }

    goTo(checkoutError.at || DEFAULT_ERROR_AT, checkoutError);

    // This function is used as a CheckoutModalFooter's onSubmitClicked, so we want that to show a loader on the submit
    // button when clicked but do not remove it once the Promise is resolved, as we are moving to another view and
    // CheckoutModalFooter will unmount (so doing this prevents a memory leak issue):
    return false;
  }, [meRefetch, refetchPaymentMethods, setSelectedPaymentMethod, goTo, checkoutError]);

  // BLOCK DIALOG LOGIC & SHAKE ANIMATION:

  // TODO: Move to hook.
  const [isDialogBlocked, setIsDialogBlocked] = useState(false);

  // PLAID:

  const handlePlaidFlowCompleted = useCallback((paymentInfo?: PaymentMethod) => {
    if (!paymentInfo) {
      resetModalState();

      return;
    }

    handlePaymentInfoSelected(paymentInfo);

    goTo("purchasing");
  }, [resetModalState, handlePaymentInfoSelected, goTo]);

  if (isDialogLoading || isPlaidFlowLoading) {
    return (<>
      { isPlaidFlowLoading && <PlaidFlow onSubmit={ handlePlaidFlowCompleted } /> }

      <Backdrop
        open={ open }
        onClick={ onClose }>
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

  let headerVariant: CheckoutModalHeaderVariant = isAuthenticated ? 'loggedIn' : 'guest';
  let checkoutStepElement = null;

  if (checkoutStep === "error") {
    headerVariant = "error";

    checkoutStepElement = (
      <ErrorView
        checkoutError={ checkoutError }
        errorImageSrc={ errorImageSrc }
        onFixError={ handleFixError }
        onClose={ onClose }
        debug={ debug } />
    );
  } else if (!checkoutStep) {
    return null;
  } else if (checkoutStep === "authentication") {
    if (!isAuthenticated) headerVariant = 'anonymous';

    checkoutStepElement = (
      <AuthenticationView
        checkoutItems={ checkoutItems }
        isAuthenticated={ isAuthenticated }
        guestCheckoutEnabled={ guestCheckoutEnabled }
        onGuestClicked={ goNext }
        onCloseClicked={ onClose } />
    );
  } else if (checkoutStep === "billing") {
    checkoutStepElement = (
      <BillingView
        checkoutItems={ checkoutItems }
        savedPaymentMethods={ savedPaymentMethods }
        selectedBillingInfo={ selectedPaymentMethod.billingInfo }
        checkoutError={ checkoutError }
        onBillingInfoSelected={ handleBillingInfoSelected }
        onSavedPaymentMethodDeleted={ handleSavedPaymentMethodDeleted }
        onNext={ goNext }
        onClose={ onClose }
        debug={ debug } />
    );
  } else if (checkoutStep === "payment") {
    checkoutStepElement = (
      <PaymentView
        checkoutItems={ checkoutItems }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethod={ selectedPaymentMethod }
        checkoutError={ checkoutError }
        onPaymentInfoSelected={ handlePaymentInfoSelected }
        onCvvSelected={ handleCvvSelected }
        onSavedPaymentMethodDeleted={ handleSavedPaymentMethodDeleted }
        onNext={ goNext }
        onPrev={ goBack }
        onClose={ onClose }
        acceptedPaymentTypes={ acceptedPaymentTypes }
        consentType={ consentType }
        privacyHref={ privacyHref }
        termsOfUseHref={ termsOfUseHref }
        debug={ debug } />
    );
  } else if (checkoutStep === "purchasing") {
    headerVariant = "purchasing";

    checkoutStepElement = (
      <PurchasingView
        purchasingImageSrc={ purchasingImageSrc }
        purchasingMessages={ purchasingMessages }
        orgID={ orgID }
        invoiceID={ invoiceID }
        checkoutItems={ checkoutItems }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethod={ selectedPaymentMethod }
        onPurchaseSuccess={ handlePurchaseSuccess }
        onPurchaseError={ setError }
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
        purchaseInstructions={ purchaseInstructions }
        onNext={ onClose }
        onClose={ onClose } />
    );
  }

  const headerElement = (
    <CheckoutModalHeader
      variant={ headerVariant }
      logoSrc={ logoSrc }
      logoSx={ logoSx }
      user={ meData?.me?.user }
      userFormat={ userFormat }
      onLoginClicked={ onLogin }
      onPrevClicked={ checkoutStep === "authentication" ? onClose : goBack } />
  );

  return (
    <FullScreenOverlay
      centered={ checkoutStep === "purchasing" || checkoutStep === "error" }
      open={ open }
      onClose={ onClose }
      isDialogBlocked={ isDialogBlocked }
      dialogRootRef={ dialogRootRef }
      header={ headerElement }
      children={ checkoutStepElement } />
  );
}

export const PUICheckout: React.FC<PUICheckoutProps> = withProviders(PUICheckoutOverlay);
