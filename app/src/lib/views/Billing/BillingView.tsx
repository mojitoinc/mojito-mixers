import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Divider, Stack } from "@mui/material";

import { useThrottledCallback } from "@swyg/corre";
import { CheckoutDeliveryAndItemCostBreakdown } from "../../components/payments/CheckoutDeliveryAndItemCostBreakdown/CheckoutDeliveryAndItemCostBreakdown";
import { CheckoutStepper } from "../../components/payments/CheckoutStepper/CheckoutStepper";
import { SavedBillingDetailsSelector } from "../../components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { getSavedPaymentMethodAddressIdFromBillingInfo, savedPaymentMethodToBillingInfo } from "../../domain/circle/circle.utils";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { BillingInfo, BillingInfoForm, TaxInfo } from "../../forms/BillingInfoForm";
import { distinctBy } from "../../utils/arrayUtils";
import { CheckoutModalError } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { checkNeedsGenericErrorMessage } from "../../hooks/useFormCheckoutError";
import { TaxQuoteOutput, useGetTaxQuoteLazyQuery } from "../../queries/graphqlGenerated";
import { useCheckoutItemsCostTotal } from "../../hooks/useCheckoutItemCostTotal";
import { Wallet } from "../../domain/wallet/wallet.interfaces";
import { ConsentType } from "../../components/shared/ConsentText/ConsentText";

export type TaxStatus = "incomplete" | "loading" | "complete" | "error";

export interface VertexSuggestions {
  street?: string;
  city?: string;
  zipCode?: string;
}

export interface TaxesState {
  status: TaxStatus;
  invalidZipCode?: boolean;
  taxRate?: number;
  taxAmount?: number;
  vertexSuggestions?: VertexSuggestions;
}

interface BillingViewState {
  isDeleting: boolean;
  showSaved: boolean;
  taxes: null | TaxesState;
}

export interface BillingViewProps {
  vertexEnabled?: boolean;
  checkoutItems: CheckoutItem[];
  savedPaymentMethods: SavedPaymentMethod[];
  selectedBillingInfo: string | BillingInfo;
  wallets?: Wallet[];
  wallet: null | string | Wallet;
  checkoutError?: CheckoutModalError;
  onBillingInfoSelected: (data: string | BillingInfo) => void;
  onTaxesChange: (taxes: TaxesState) => void;
  onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => Promise<void>;
  onWalletChange: (wallet: null | string | Wallet) => void;
  onNext: () => void;
  onClose: () => void;
  consentType?: ConsentType;
  debug?: boolean;
}

export const BillingView: React.FC<BillingViewProps> = ({
  vertexEnabled,
  checkoutItems,
  savedPaymentMethods: rawSavedPaymentMethods,
  selectedBillingInfo,
  wallets,
  wallet,
  checkoutError,
  onBillingInfoSelected,
  onTaxesChange,
  onSavedPaymentMethodDeleted,
  onWalletChange,
  onNext,
  onClose,
  consentType,
  debug,
}) => {
  const savedPaymentMethodAddressIdRef = useRef<string>("");
  const savedPaymentMethods = useMemo(() => distinctBy(rawSavedPaymentMethods, "addressId"), [rawSavedPaymentMethods]);
  const { total: subtotal, fees } = useCheckoutItemsCostTotal(checkoutItems);
  const total = subtotal + fees;
  const [{ isDeleting, showSaved, taxes }, setViewState] = useState<BillingViewState>({
    isDeleting: false,
    showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string" && !checkNeedsGenericErrorMessage("billing", checkoutError),
    taxes: vertexEnabled ? { status: "incomplete" } : null,
  });

  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);

  const [getTaxQuote] = useGetTaxQuoteLazyQuery();

  const getTaxQuoteTimestampRef = useRef<number>(0);

  useEffect(() => () => {
    // To discard the result below that might come after the component has been unmounted:
    getTaxQuoteTimestampRef.current = 0;
  }, []);

  const calculateTaxes = useCallback(async (taxInfo: TaxInfo | BillingInfo) => {
    const calledAt = getTaxQuoteTimestampRef.current;

    let invalidZipCode = false;

    const result = await getTaxQuote({
      variables: {
        input: {
          taxablePrice: total,
          address: {
            street1: taxInfo.street,
            city: taxInfo.city,
            postalCode: taxInfo.zipCode,
            country: `${ taxInfo.country.value }`,
            state: `${ taxInfo.state.value }`,
          },
        },
      },
    }).catch((err) => {
      invalidZipCode = /invalid zipcode/i.test(err.message);

      return { data: null };
    });

    // Discard stale result:
    if (calledAt !== getTaxQuoteTimestampRef.current) return;

    const taxResult = result.data?.getTaxQuote || {} as TaxQuoteOutput;
    const { verifiedAddress } = taxResult;
    const vertexSuggestions: VertexSuggestions = {};

    if (!showSaved && verifiedAddress) {
      // Vertex returns 5+4 zip codes, so we remove the last 4 digits to get the "normal" one:
      const zipCode = (verifiedAddress?.postalCode || "").replace(/-\d{4}$/, "");

      if (taxInfo.street !== verifiedAddress.street1) vertexSuggestions.street = verifiedAddress.street1;
      if (taxInfo.city !== verifiedAddress.city) vertexSuggestions.city = verifiedAddress.city;
      if (taxInfo.zipCode !== zipCode) vertexSuggestions.zipCode = zipCode;
    }

    setViewState(prevViewState => ({
      ...prevViewState,
      taxes: verifiedAddress ? {
        status: "complete",
        taxRate: 100 * taxResult.totalTaxAmount / taxResult.taxablePrice,
        taxAmount: taxResult.totalTaxAmount,
        vertexSuggestions,
      } : {
        status: "error",
        invalidZipCode,
      },
    }));
  }, [getTaxQuote, total, showSaved]);

  const handleThrottledTaxInfoChange = useThrottledCallback((taxInfo: Partial<TaxInfo>) => {
    if (!vertexEnabled) return;

    if (!taxInfo.street || !taxInfo.city || !taxInfo.zipCode || !taxInfo.country?.value || !taxInfo.state?.value) {
      setViewState(prevViewState => (prevViewState.taxes?.status === "incomplete" ? prevViewState : ({ ...prevViewState, taxes: { status: "incomplete" } })));

      return;
    }

    calculateTaxes(taxInfo as TaxInfo);
  }, 1000, [calculateTaxes, vertexEnabled]);

  const handleTaxInfoChange = useCallback((taxInfo: Partial<TaxInfo>) => {
    if (!vertexEnabled) return;

    setViewState(prevViewState => (prevViewState.taxes?.status === "loading" ? prevViewState : ({ ...prevViewState, taxes: { status: "loading" } })));

    getTaxQuoteTimestampRef.current = Date.now();

    handleThrottledTaxInfoChange(taxInfo);
  }, [vertexEnabled, handleThrottledTaxInfoChange]);

  useEffect(() => {
    if (!vertexEnabled) return;

    if (selectedBillingInfo && showSaved) {
      const savedPaymentMethodData = typeof selectedBillingInfo === "string"
        ? savedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo) : null;

      const billingInfo = savedPaymentMethodData
        ? savedPaymentMethodToBillingInfo(savedPaymentMethodData)
        : (typeof selectedBillingInfo === "string" ? null : selectedBillingInfo);

      setViewState(prevViewState => ({ ...prevViewState, taxes: { status: billingInfo ? "loading" : "error" } }));

      if (billingInfo) {
        getTaxQuoteTimestampRef.current = Date.now();

        calculateTaxes(billingInfo);
      }
    } else {
      setViewState(prevViewState => ({ ...prevViewState, taxes: { status: selectedBillingInfo ? "loading" : "incomplete" } }));
    }
  }, [vertexEnabled, selectedBillingInfo, savedPaymentMethods, showSaved, calculateTaxes]);

  useEffect(() => {
    if (taxes) onTaxesChange(taxes);
  }, [onTaxesChange, taxes]);

  const handleShowForm = useCallback((savedPaymentMethodAddressId?: string) => {
    if (savedPaymentMethodAddressId && typeof savedPaymentMethodAddressId === "string") {
      savedPaymentMethodAddressIdRef.current = savedPaymentMethodAddressId;

      const data = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);

      if (data) onBillingInfoSelected(savedPaymentMethodToBillingInfo(data));
    } else {
      onBillingInfoSelected("");
    }

    setViewState({ isDeleting: false, showSaved: false, taxes: vertexEnabled ? { status: "loading" } : null });
  }, [onBillingInfoSelected, savedPaymentMethods, vertexEnabled]);

  const handleShowSaved = useCallback(() => {
    const savedPaymentMethodAddressId = savedPaymentMethodAddressIdRef.current;

    if (savedPaymentMethodAddressId) onBillingInfoSelected(savedPaymentMethodAddressId);

    setViewState({ isDeleting: false, showSaved: true, taxes: vertexEnabled ? { status: "loading" } : null });
  }, [onBillingInfoSelected, vertexEnabled]);

  const handleSubmit = useCallback((data: BillingInfo) => {
    if (taxes && taxes.status !== "complete") return;

    const savedPaymentMethodAddressId = getSavedPaymentMethodAddressIdFromBillingInfo(data);
    const savedPaymentMethodData = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);

    onBillingInfoSelected(savedPaymentMethodData ? savedPaymentMethodAddressId : data);
    onNext();
  }, [savedPaymentMethods, onBillingInfoSelected, onNext, taxes]);

  const handleSavedPaymentMethodDeleted = useCallback(async (savedPaymentMethodId: string) => {
    setViewState(prevViewState => ({ ...prevViewState, isDeleting: true, showSaved: true }));

    await onSavedPaymentMethodDeleted(savedPaymentMethodId);

    const remainingPaymentMethods = savedPaymentMethods.length - savedPaymentMethods.filter(({ addressId }) => addressId === savedPaymentMethodId).length;

    setViewState(prevViewState => ({ ...prevViewState, isDeleting: false, showSaved: remainingPaymentMethods > 0, taxes }));
  }, [onSavedPaymentMethodDeleted, savedPaymentMethods, taxes]);

  const handleFormAttemptSubmit = useCallback(() => setFormSubmitAttempted(true), []);

  useEffect(() => {
    const selectedPaymentInfoMatch = typeof selectedBillingInfo === "string" && savedPaymentMethods.some(({ addressId }) => addressId === selectedBillingInfo);

    if (showSaved && !selectedPaymentInfoMatch && savedPaymentMethods.length > 0 /* && !checkoutError */) {
      onBillingInfoSelected(savedPaymentMethods[0].addressId);
    }
  }, [showSaved, savedPaymentMethods, selectedBillingInfo, onBillingInfoSelected/* , checkoutError */]);

  return (
    <Stack
      direction={{ xs: "column", md: "row" }}
      spacing={{ xs: 0, md: 3.75 }}>

      <Stack sx={{ display: "flex", overflow: "hidden", width: theme => ({ xs: "100%", md: `calc(50% - ${ theme.spacing(3.75 / 2) })` }) }}>
        <CheckoutStepper progress={ 50 } />

        { showSaved ? (
          <SavedBillingDetailsSelector
            showLoader={ isDeleting }
            savedPaymentMethods={ savedPaymentMethods }
            selectedPaymentMethodAddressId={ typeof selectedBillingInfo === "string" ? selectedBillingInfo : undefined }
            taxes={ taxes }
            onNew={ handleShowForm }
            onEdit={ handleShowForm }
            onDelete={ handleSavedPaymentMethodDeleted }
            onPick={ onBillingInfoSelected }
            onNext={ onNext }
            onClose={ onClose }
            onAttemptSubmit={ handleFormAttemptSubmit }
            consentType={ consentType === "checkbox" ? undefined : consentType } />
        ) : (
          <BillingInfoForm
              // variant="loggedIn"
            defaultValues={ typeof selectedBillingInfo === "string" ? undefined : selectedBillingInfo }
            checkoutError={ checkoutError }
            taxes={ taxes }
            onTaxInfoChange={ handleTaxInfoChange }
            onSaved={ savedPaymentMethods.length > 0 ? handleShowSaved : undefined }
            onClose={ onClose }
            onSubmit={ handleSubmit }
            onAttemptSubmit={ handleFormAttemptSubmit }
            consentType={ consentType === "checkbox" ? undefined : consentType }
            debug={ debug } />
        ) }
      </Stack>

      <Divider sx={{ display: { xs: "block", md: "none" } }} />

      <CheckoutDeliveryAndItemCostBreakdown
        checkoutItems={ checkoutItems }
        taxes={ vertexEnabled ? taxes : null }
        validatePersonalDeliveryAddress={ formSubmitAttempted }
        wallets={ wallets }
        wallet={ wallet }
        onWalletChange={ onWalletChange } />
    </Stack>
  );
};
