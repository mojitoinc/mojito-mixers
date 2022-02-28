import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Stack } from "@mui/material";

import { CheckoutItemCostBreakdown } from "../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown";
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
  checkoutError?: CheckoutModalError;
  onBillingInfoSelected: (data: string | BillingInfo) => void;
  onTaxesChange: (taxes: TaxesState) => void;
  onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => Promise<void>;
  onNext: () => void;
  onClose: () => void;
  debug?: boolean;
}

export const BillingView: React.FC<BillingViewProps> = ({
  checkoutItems,
  savedPaymentMethods: rawSavedPaymentMethods,
  selectedBillingInfo,
  checkoutError,
  onBillingInfoSelected,
  onTaxesChange,
  onSavedPaymentMethodDeleted,
  onNext,
  onClose,
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

  const [getTaxQuote] = useGetTaxQuoteLazyQuery();

  const calculateTaxes = useCallback(async (taxInfo: TaxInfo | BillingInfo) => {
    console.log("calculateTaxes()", taxInfo);

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

    const taxResult = result.data?.getTaxQuote || {} as TaxQuoteOutput;

    console.log({ taxInfo, taxResult });

    const isValid = !!taxResult.verifiedAddress;

    setViewState((prevViewState) => ({ ...prevViewState, taxes: isValid ? {
      status: "complete",
      taxRate: 100 * taxResult.totalTaxAmount / taxResult.taxablePrice,
      taxAmount: taxResult.totalTaxAmount,
    } : { status: "error"} }));
  }, [getTaxQuote, total]);

  const handleThrottledTaxInfoChange = useThrottledCallback((taxInfo: Partial<TaxInfo>) => {
    console.log("throttled taxInfo =", taxInfo);

    if (Object.values(taxInfo).some(value => !value)) return;

    calculateTaxes(taxInfo as TaxInfo);
  }, 1000, [calculateTaxes]);

  const handleTaxInfoChange = useCallback((taxInfo: Partial<TaxInfo>) => {
    console.log("taxInfo =", taxInfo);

    setViewState((prevViewState) => prevViewState.taxes.status === "loading" ? prevViewState : ({ ...prevViewState, taxes: { status: "loading" }}));

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

      if (billingInfo) calculateTaxes(billingInfo);
    } else {
      console.log(selectedBillingInfo ? "loading" : "incomplete", selectedBillingInfo);

      setViewState((prevViewState) => ({ ...prevViewState, taxes: { status: selectedBillingInfo ? "loading" : "incomplete" } }));

      // TODO: Re-compute taxes here too...
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
    }

    setViewState({ isDeleting: false, showSaved: false, taxes: { status: "loading" } });
  }, [onBillingInfoSelected, savedPaymentMethods]);

  const handleShowSaved = useCallback(() => {
    const savedPaymentMethodAddressId = savedPaymentMethodAddressIdRef.current;

    if (savedPaymentMethodAddressId) onBillingInfoSelected(savedPaymentMethodAddressId);

    setViewState({ isDeleting: false, showSaved: true, taxes: { status: "loading" } });
  }, [onBillingInfoSelected]);

  const handleSubmit = useCallback((data: BillingInfo) => {
    const savedPaymentMethodAddressId = getSavedPaymentMethodAddressIdFromBillingInfo(data);
    const savedPaymentMethodData = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);

    onBillingInfoSelected(savedPaymentMethodData ? savedPaymentMethodAddressId : data);
    onNext();
  }, [savedPaymentMethods, onBillingInfoSelected, onNext]);

  const handleSavedPaymentMethodDeleted = useCallback(async (savedPaymentMethodId: string) => {
    setViewState(({ taxes }) => ({ isDeleting: true, showSaved: true, taxes }));

    await onSavedPaymentMethodDeleted(savedPaymentMethodId);

    const remainingPaymentMethods = savedPaymentMethods.length - savedPaymentMethods.filter(({ addressId }) => addressId === savedPaymentMethodId).length;

    setViewState(({ taxes }) => ({ isDeleting: false, showSaved: remainingPaymentMethods > 0, taxes }));
  }, [onSavedPaymentMethodDeleted, savedPaymentMethods]);

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
              onClose={ onClose } />
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
              debug={ debug } />
          ) }
      </Stack>

      <CheckoutItemCostBreakdown checkoutItems={ checkoutItems } taxes={ taxes } />
    </Stack>
  );
};
