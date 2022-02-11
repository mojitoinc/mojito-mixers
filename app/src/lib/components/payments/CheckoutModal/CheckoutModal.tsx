import { Backdrop, Box, CircularProgress, Dialog, DialogContent } from "@mui/material";
import React, { Fragment, useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { CheckoutModalHeader, CheckoutModalHeaderVariant } from "../CheckoutModalHeader/CheckoutModalHeader";
import { PurchasingView } from "../../../views/Purchasing/PurchasingView";
import { ApolloError } from "@apollo/client";
import { ErrorView } from "../../../views/Error/ErrorView";
import { RawSavedPaymentMethod, SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import { Theme, ThemeProvider, createTheme, ThemeOptions, SxProps } from "@mui/material/styles";
import { useShakeAnimation } from "../../../utils/animationUtils";
import { resetStepperProgress } from "../CheckoutStepper/CheckoutStepper";
import { continuePlaidOAuthFlow, INITIAL_PLAID_OAUTH_FLOW_STATE, PlaidFlow } from "../../../hooks/usePlaid";
import { ConsentType } from "../../shared/ConsentText/ConsentText";

const SELECTOR_DIALOG_SCROLLABLE = "[role=presentation]";

export type CheckoutState = "authentication" | "billing" | "payment" | "purchasing" | "confirmation";

export interface SelectedPaymentMethod {
  billingInfo: string | BillingInfo;
  paymentInfo: string | PaymentMethod;
}

export interface CheckoutModalProps {
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
  checkoutItem: CheckoutItem;

  // Authentication:
  onLogin: () => void;
  isAuthenticated?: boolean;
  isAuthenticatedLoading?: boolean;

  // Other Events:
  debug?: boolean;
  onError?: (error: ApolloError | Error | string) => void;
  onMarketingOptInChange?: (marketingOptIn: boolean) => void
}

const CHECKOUT_STEPS: CheckoutState[] = ["authentication", "billing", "payment", "purchasing", "confirmation"];

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
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
  checkoutItem,

  // Authentication:
  onLogin,
  isAuthenticated,
  isAuthenticatedLoading,

  // Other Events:
  debug,
  onError, // Not implemented yet. Used to let the app control where to log errors to (e.g. Sentry).
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
  const startAt = !isAuthenticated || productConfirmationEnabled ? 0 : 1;
  const rawSavedPaymentMethods = paymentMethodsData?.getPaymentMethodList;
  const savedPaymentMethods = useMemo(() => transformRawSavedPaymentMethods(rawSavedPaymentMethods as RawSavedPaymentMethod[]), [rawSavedPaymentMethods]);
  const dialogRootRef = useRef<HTMLDivElement>(null);
  const paperRef = useRef<HTMLDivElement>(null);
  const [paymentError, setPaymentError] = useState("");
  const [checkoutStepIndex, setCheckoutStepIndex] = useState(0);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<SelectedPaymentMethod>({
    billingInfo: "",
    paymentInfo: "",
  });

  const checkoutStep = CHECKOUT_STEPS[checkoutStepIndex];

  useEffect(() => {
    const dialogScrollable = dialogRootRef.current?.querySelector(SELECTOR_DIALOG_SCROLLABLE);

    // Scroll to top on step change:
    if (checkoutStep && dialogScrollable) dialogScrollable.scrollTop = 0;
  }, [checkoutStep]);

  const resetModalState = useCallback(() => {
    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();

    // Once authentication has loaded, we know if we need to skip the product confirmation step or not. Also, when the
    // modal is re-opened, we need to reset its state, taking into account if we need to resume a Plaid OAuth flow:s
    const { selectedBillingInfo, continueOAuthFlow, savedStateUsed } = INITIAL_PLAID_OAUTH_FLOW_STATE;

    setPaymentError("");
    setCheckoutStepIndex(continueOAuthFlow && !savedStateUsed ? 3 : startAt);
    setSelectedPaymentMethod({ billingInfo: selectedBillingInfo || "", paymentInfo: "" });
  }, [startAt]);

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

      if (typeof billingInfo === "string" && typeof paymentInfo === "string") return prevSelectedPaymentMethod;

      // To find the saved payment method(s) that was/were last created:
      const reversedSavedPaymentMethods = savedPaymentMethods.slice().reverse();

      let matchingPaymentMethod: SavedPaymentMethod;

      if (typeof billingInfo === "object") {
        const addressId = getSavedPaymentMethodAddressIdFromBillingInfo(billingInfo);

        matchingPaymentMethod = reversedSavedPaymentMethods.find(paymentMethod => paymentMethod.addressId === addressId);
      }

      const isBillingInfoAddressId = typeof billingInfo === "string";

      return !isBillingInfoAddressId && matchingPaymentMethod ? {
        billingInfo: matchingPaymentMethod.addressId,
        paymentInfo: matchingPaymentMethod.id,
      } : {
        billingInfo,
        paymentInfo: isBillingInfoAddressId ? reversedSavedPaymentMethods[0].id : paymentInfo,
      };
    });
  }, [savedPaymentMethods]);

  useEffect(() => {
    if (!checkoutStep) onClose();
  }, [checkoutStep, onClose]);

  useEffect(() => {
    if (meError) setPaymentError("User could not be loaded.");
    if (paymentMethodsError) setPaymentError("Payment methods could not be loaded.");
  }, [meError, paymentMethodsError]);

  const handlePrevClicked = useCallback(() => {
    setCheckoutStepIndex((prevCheckoutStepIndex) => prevCheckoutStepIndex - 1);
  }, []);

  const handleNextClicked = useCallback(() => {
    setCheckoutStepIndex(prevCheckoutStepIndex => prevCheckoutStepIndex + 1);
  }, []);

  const handleBillingInfoSelected = useCallback((billingInfo: string | BillingInfo) => {
    // TODO: Does paymentInfo need to be reset when coming back to billing info to fix validation errors?
    setSelectedPaymentMethod({ billingInfo, paymentInfo: "" });
  }, []);

  const handlePaymentInfoSelected = useCallback((paymentInfo: string | PaymentMethod) => {
    setSelectedPaymentMethod(({ billingInfo }) => ({ billingInfo, paymentInfo }));
  }, []);

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
  }, [checkoutStep, deletePaymentMethod, orgID, refetchPaymentMethods, savedPaymentMethods]);

  const [paymentReferenceNumber, setPaymentReferenceNumber] = useState("");

  const handlePurchaseSuccess = useCallback(async (paymentReferenceNumber: string) => {
    // After a successful purchase, a new payment method might have been created, so we reload them:
    await refetchPaymentMethods();

    setPaymentReferenceNumber(paymentReferenceNumber);

    handleNextClicked();
  }, [refetchPaymentMethods, handleNextClicked]);

  const handleReviewData = useCallback(async (): Promise<false> => {
    // After an error, all data is reloaded in case the issue was caused by stale/cached data or in case a new payment
    // method has been created despite the error:
    await Promise.allSettled([
      meRefetch(),
      refetchPaymentMethods(),
    ]);

    // TODO: paymentError should have a source property to know where the error is coming from and handle recovery differently here:
    setPaymentError("");
    setCheckoutStepIndex(2);

    // This function is used as a CheckoutModalFooter's onSubmitClicked, so we want that to show a loader on the submit
    // button when clicked but do not remove it once the Promise is resolved, as we are moving to another view and
    // CheckoutModalFooter will unmount (so doing this prevents a memory leak issue):
    return false;
  }, [meRefetch, refetchPaymentMethods]);

  // BLOCK DIALOG LOGIC & SHAKE ANIMATION:

  const [shakeSx, shake] = useShakeAnimation(paperRef.current);

  const [isDialogBlocked, setIsDialogBlocked] = useState(false);

  useEffect(() => {
    if (parentTheme && themeOptions) {
      throw new Error("You can't use both `themeOptions` and `theme`. Please, use only one. `themeOptions` is preferred.");
    }
  }, [parentTheme, themeOptions]);

  // PLAID:

  const handlePlaidFlowCompleted = useCallback((paymentInfo?: PaymentMethod) => {
    if (!paymentInfo) {
      resetModalState();

      return;
    }

    handlePaymentInfoSelected(paymentInfo);
    setCheckoutStepIndex(3);
  }, [resetModalState, handlePaymentInfoSelected]);

  const theme = useMemo(() => themeOptions ? createTheme(themeOptions) : parentTheme, [parentTheme, themeOptions]);
  const Wrapper = theme ? ThemeProvider : Fragment;
  const wrapperProps = theme ? { theme } : {};

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

  if (paymentError) {
    headerVariant = "error";

    checkoutStepElement = (
      <ErrorView
        errorMessage={ paymentError }
        errorImageSrc={ errorImageSrc }
        onReviewData={ handleReviewData }
        onClose={ onClose } />
    );
  } else if (!checkoutStep) {
    return null;
  } else if (checkoutStep === "authentication") {
    if (!isAuthenticated) headerVariant = 'anonymous';

    checkoutStepElement = (
      <AuthenticationView
        checkoutItem={ checkoutItem }
        isAuthenticated={ isAuthenticated }
        guestCheckoutEnabled={ guestCheckoutEnabled }
        onGuestClicked={ handleNextClicked }
        onCloseClicked={ onClose } />
    );
  } else if (checkoutStep === "billing") {
    checkoutStepElement = (
      <BillingView
        checkoutItem={ checkoutItem }
        savedPaymentMethods={ savedPaymentMethods }
        selectedBillingInfo={ selectedPaymentMethod.billingInfo }
        onBillingInfoSelected={ handleBillingInfoSelected }
        onSavedPaymentMethodDeleted={ handleSavedPaymentMethodDeleted }
        onNext={ handleNextClicked }
        onClose={ onClose }
        debug={ debug } />
    );
  } else if (checkoutStep === "payment") {
    checkoutStepElement = (
      <PaymentView
        checkoutItem={ checkoutItem }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethod={ selectedPaymentMethod }
        onPaymentInfoSelected={ handlePaymentInfoSelected }
        onSavedPaymentMethodDeleted={ handleSavedPaymentMethodDeleted }
        onNext={ handleNextClicked }
        onPrev={ handlePrevClicked }
        onClose={ onClose }
        acceptedPaymentTypes={ acceptedPaymentTypes }
        consentType={ consentType }
        privacyHref={ privacyHref }
        termsOfUseHref={ termsOfUseHref }
        debug={ debug } />
    );
  } else if (checkoutStep === "purchasing") {
    headerVariant = 'purchasing';

    checkoutStepElement = (
      <PurchasingView
        purchasingImageSrc={ purchasingImageSrc }
        purchasingMessages={ purchasingMessages }
        orgID={ orgID }
        invoiceID={ invoiceID }
        lotID={ checkoutItem.lotID }
        lotType={ checkoutItem.lotType }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethod={ selectedPaymentMethod }
        onPurchaseSuccess={ handlePurchaseSuccess }
        onPurchaseError={ setPaymentError }
        onDialogBlocked={ setIsDialogBlocked }
        debug={ debug } />
    );
  } else if (checkoutStep === "confirmation") {
    headerVariant = 'logoOnly';

    checkoutStepElement = (
      <ConfirmationView
        checkoutItem={ checkoutItem }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethod={ selectedPaymentMethod }
        paymentReferenceNumber={ paymentReferenceNumber }
        purchaseInstructions={ purchaseInstructions }
        onNext={ handleNextClicked }
        onClose={ onClose } />
    );
  }

  return (
    <Wrapper { ...(wrapperProps as any) }>
      <Dialog
        open={ isDialogBlocked ? true : open }
        onClose={ isDialogBlocked ? undefined : onClose }
        onBackdropClick={ isDialogBlocked ? shake : undefined }
        aria-labelledby="checkout-modal-header-title"
        scroll="body"
        ref={ dialogRootRef }
        PaperProps={ { sx: shakeSx, ref: paperRef }}
        // Dialog only:
        // fullWidth
        // maxWidth="sm"
        fullScreen>

        <DialogContent
          sx={{
            overflowX: 'hidden',
            px: {
              xs: 1.5,
              sm: 2.5,
            },
            py: 2.5,
            maxWidth: theme => theme.breakpoints.values.lg,
            mx: "auto",
          }}>

          <CheckoutModalHeader
            variant={ headerVariant }
            logoSrc={ logoSrc }
            logoSx={ logoSx }
            user={ meData?.me?.user }
            userFormat={ userFormat }
            onLoginClicked={ onLogin }
            onPrevClicked={ handlePrevClicked } />

          { checkoutStepElement }

        </DialogContent>
      </Dialog>
    </Wrapper>
  );
}
