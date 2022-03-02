import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stack } from "@mui/material";

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
import { useThrottledCallback } from "@swyg/corre";
import { PUIDictionary } from "../../domain/dictionary/dictionary.interfaces";

export type TaxStatus = "incomplete" | "loading" | "complete" | "error";

export interface TaxesState {
  status: TaxStatus;
  taxRate?: number;
  taxAmount?: number;
}

interface BillingViewState {
  isDeleting: boolean;
  showSaved: boolean;
  taxes: TaxesState;
}

export interface BillingViewProps {
  checkoutItems: CheckoutItem[];
  savedPaymentMethods: SavedPaymentMethod[];
  selectedBillingInfo: string | BillingInfo;
  walletAddress: string | null;
  checkoutError?: CheckoutModalError;
  onBillingInfoSelected: (data: string | BillingInfo) => void;
  onTaxesChange: (taxes: TaxesState) => void;
  onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => Promise<void>;
  onWalletAddressChange: (personalWalletAddress: string | null) => void;
  onNext: () => void;
  onClose: () => void;
  dictionary: PUIDictionary;
  debug?: boolean;
}

export const BillingView: React.FC<BillingViewProps> = ({
  checkoutItems,
  savedPaymentMethods: rawSavedPaymentMethods,
  selectedBillingInfo,
  walletAddress,
  checkoutError,
  onBillingInfoSelected,
  onTaxesChange,
  onSavedPaymentMethodDeleted,
  onWalletAddressChange,
  onNext,
  onClose,
  dictionary,
  debug,
}) => {
  const savedPaymentMethodAddressIdRef = useRef<string>("");
  const savedPaymentMethods = useMemo(() => distinctBy(rawSavedPaymentMethods, "addressId"), [rawSavedPaymentMethods]);
  const { total: subtotal, fees } = useCheckoutItemsCostTotal(checkoutItems);
  const total = subtotal + fees;

  const [{ isDeleting, showSaved, taxes }, setViewState] = useState<BillingViewState>({
    isDeleting: false,
    showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string" && !checkNeedsGenericErrorMessage("billing", checkoutError),
    taxes: { status: "incomplete" },
  });

  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);

  const [getTaxQuote] = useGetTaxQuoteLazyQuery();

  const getTaxQuoteTimestampRef = useRef<number>();

  const calculateTaxes = useCallback(async (taxInfo: TaxInfo | BillingInfo) => {
    const calledAt = getTaxQuoteTimestampRef.current;

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
    }).catch(() => ({ data: null }));

    // Discard stale result:
    if (calledAt !== getTaxQuoteTimestampRef.current) return;

    const taxResult = result.data?.getTaxQuote || {} as TaxQuoteOutput;
    const isValid = !!taxResult.verifiedAddress;

    setViewState((prevViewState) => ({ ...prevViewState, taxes: isValid ? {
      status: "complete",
      taxRate: 100 * taxResult.totalTaxAmount / taxResult.taxablePrice,
      taxAmount: taxResult.totalTaxAmount,
    } : { status: "error"} }));
  }, [getTaxQuote, total]);

  const handleThrottledTaxInfoChange = useThrottledCallback((taxInfo: Partial<TaxInfo>) => {
    if (!taxInfo.street || !taxInfo.city || !taxInfo.zipCode || !taxInfo.country?.value || !taxInfo.state?.value) {
      setViewState((prevViewState) => prevViewState.taxes.status === "incomplete" ? prevViewState : ({ ...prevViewState, taxes: { status: "incomplete" }}));

      return;
    }

    calculateTaxes(taxInfo as TaxInfo);
  }, 1000, [calculateTaxes]);

  const handleTaxInfoChange = useCallback((taxInfo: Partial<TaxInfo>) => {
    setViewState((prevViewState) => prevViewState.taxes.status === "loading" ? prevViewState : ({ ...prevViewState, taxes: { status: "loading" }}));

    getTaxQuoteTimestampRef.current = Date.now();

    handleThrottledTaxInfoChange(taxInfo);
  }, [handleThrottledTaxInfoChange]);

  useEffect(() => {
    if (selectedBillingInfo && showSaved) {
      const savedPaymentMethodData = typeof selectedBillingInfo === "string"
        ? savedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo) : null;

      const billingInfo = savedPaymentMethodData
        ? savedPaymentMethodToBillingInfo(savedPaymentMethodData)
        : (typeof selectedBillingInfo === "string" ? null : selectedBillingInfo);

      setViewState((prevViewState) => ({ ...prevViewState, taxes: { status: billingInfo ? "loading" : "error" } }));

      if (billingInfo) {
        getTaxQuoteTimestampRef.current = Date.now();

        calculateTaxes(billingInfo);
      }
    } else {
      setViewState((prevViewState) => ({ ...prevViewState, taxes: { status: selectedBillingInfo ? "loading" : "incomplete" } }));
    }
  }, [selectedBillingInfo, savedPaymentMethods, showSaved, calculateTaxes]);

  useEffect(() => {
    onTaxesChange(taxes);
  }, [onTaxesChange, taxes]);

  const handleShowForm = useCallback((savedPaymentMethodAddressId?: string) => {
    if (savedPaymentMethodAddressId && typeof savedPaymentMethodAddressId === "string") {
      savedPaymentMethodAddressIdRef.current = savedPaymentMethodAddressId;

      const data = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);

      if (data) onBillingInfoSelected(savedPaymentMethodToBillingInfo(data));
    } else {
      onBillingInfoSelected("");
    }

    setViewState({ isDeleting: false, showSaved: false, taxes: { status: "loading" } });
  }, [onBillingInfoSelected, savedPaymentMethods]);

  const handleShowSaved = useCallback(() => {
    const savedPaymentMethodAddressId = savedPaymentMethodAddressIdRef.current;

    if (savedPaymentMethodAddressId) onBillingInfoSelected(savedPaymentMethodAddressId);

    setViewState({ isDeleting: false, showSaved: true, taxes: { status: "loading" } });
  }, [onBillingInfoSelected]);

  const handleSubmit = useCallback((data: BillingInfo) => {
    if (taxes.status !== "complete") return;

    const savedPaymentMethodAddressId = getSavedPaymentMethodAddressIdFromBillingInfo(data);
    const savedPaymentMethodData = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);

    onBillingInfoSelected(savedPaymentMethodData ? savedPaymentMethodAddressId : data);
    onNext();
  }, [savedPaymentMethods, onBillingInfoSelected, onNext, taxes.status]);

  const handleSavedPaymentMethodDeleted = useCallback(async (savedPaymentMethodId: string) => {
    setViewState(({ taxes }) => ({ isDeleting: true, showSaved: true, taxes }));

    await onSavedPaymentMethodDeleted(savedPaymentMethodId);

    const remainingPaymentMethods = savedPaymentMethods.length - savedPaymentMethods.filter(({ addressId }) => addressId === savedPaymentMethodId).length;

    setViewState(({ taxes }) => ({ isDeleting: false, showSaved: remainingPaymentMethods > 0, taxes }));
  }, [onSavedPaymentMethodDeleted, savedPaymentMethods]);

  const handleFormAttemptSubmit = useCallback(() => setFormSubmitAttempted(true), []);

  useEffect(() => {
    const selectedPaymentInfoMatch = typeof selectedBillingInfo === "string" && savedPaymentMethods.some(({ addressId }) => addressId === selectedBillingInfo);

    if (showSaved && !selectedPaymentInfoMatch && savedPaymentMethods.length > 0 /* && !checkoutError */) {
      onBillingInfoSelected(savedPaymentMethods[0].addressId);
    }
  }, [showSaved, savedPaymentMethods, selectedBillingInfo, onBillingInfoSelected/*, checkoutError*/]);

  return (
    <Stack
      direction={{
        xs: "column",
        sm: "column",
        md: "row",
      }}
      spacing={8.75}
    >
      <Stack sx={{ display: 'flex', flex: 1, overflow: "hidden" }}>
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
              onAttemptSubmit={ handleFormAttemptSubmit } />
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
              debug={ debug } />
          ) }
      </Stack>

      <CheckoutDeliveryAndItemCostBreakdown
        checkoutItems={ checkoutItems }
        taxes={ taxes }
        validatePersonalDeliveryAddress={ formSubmitAttempted }
        walletAddress={ walletAddress }
        onWalletAddressChange={ onWalletAddressChange }
        dictionary={ dictionary } />
    </Stack>
  );
};
