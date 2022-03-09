
import { useCallback, useEffect, useMemo, useState } from "react";
import { CheckoutDeliveryAndItemCostBreakdown } from "../../components/payments/CheckoutDeliveryAndItemCostBreakdown/CheckoutDeliveryAndItemCostBreakdown";
import { CheckoutStepper } from "../../components/payments/CheckoutStepper/CheckoutStepper";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import React from "react";
import { PaymentMethodForm } from "../../forms/PaymentMethodForm";
import { PaymentMethod, PaymentType } from "../../domain/payment/payment.interfaces";
import { SavedPaymentDetailsSelector } from "../../components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector";
import { BillingInfoItem } from "../../components/payments/BillingInfo/Item/BillingInfoItem";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { billingInfoToSavedPaymentMethodBillingInfo } from "../../domain/circle/circle.utils";
import { CheckoutModalError, SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { BoxProps, Divider, Stack } from "@mui/material";
import { usePlaid } from "../../hooks/usePlaid";
import { ConsentType } from "../../components/shared/ConsentText/ConsentText";
import { checkNeedsGenericErrorMessage } from "../../hooks/useFormCheckoutError";
import { TaxesState } from "../Billing/BillingView";

const billingInfoItemBoxProps: BoxProps = { sx: { mt: 2.5 } };

interface PaymentViewState {
  isDeleting: boolean;
  showSaved: boolean;
}

export interface PaymentViewProps {
  checkoutItems: CheckoutItem[];
  taxes: TaxesState;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethod: SelectedPaymentMethod;
  walletAddress: string | null;
  checkoutError?: CheckoutModalError;
  onPaymentInfoSelected: (data: string | PaymentMethod) => void;
  onCvvSelected: (cvv: string) => void;
  onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => void;
  onWalletAddressChange: (walletAddress: string | null) => void;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
  acceptedPaymentTypes: PaymentType[];
  consentType?: ConsentType;
  debug?: boolean;
}

export const PaymentView: React.FC<PaymentViewProps> = ({
  checkoutItems,
  taxes,
  savedPaymentMethods: rawSavedPaymentMethods,
  selectedPaymentMethod,
  walletAddress,
  checkoutError,
  onPaymentInfoSelected,
  onCvvSelected,
  onSavedPaymentMethodDeleted,
  onWalletAddressChange,
  onNext,
  onPrev,
  onClose,
  acceptedPaymentTypes,
  consentType,
  debug,
}) => {
  const {
    billingInfo: selectedBillingInfo,
    paymentInfo: selectedPaymentInfo,
  } = selectedPaymentMethod;

  const savedPaymentMethods = useMemo(() => {
    if (typeof selectedBillingInfo !== "string") return [];

    return rawSavedPaymentMethods.filter(({ addressId, type }) => addressId === selectedBillingInfo && acceptedPaymentTypes.includes(type));
  }, [acceptedPaymentTypes, rawSavedPaymentMethods, selectedBillingInfo]);

  const selectedPaymentMethodBillingInfo = useMemo(() => {
    return typeof selectedBillingInfo === "string"
      ? rawSavedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo)
      : billingInfoToSavedPaymentMethodBillingInfo(selectedBillingInfo) as SavedPaymentMethod;
  }, [rawSavedPaymentMethods, selectedBillingInfo]);

  const [{ isDeleting, showSaved }, setViewState] = useState<PaymentViewState>({
    isDeleting: false,
    showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string" && !checkNeedsGenericErrorMessage("payment", checkoutError),
  });

  const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);

  const handleShowForm = useCallback(() => {
    setViewState({ isDeleting: false, showSaved: false });
  }, []);

  const handleShowSaved = useCallback(() => {
    setViewState({ isDeleting: false, showSaved: true });
  }, []);

  const handleSubmit = useCallback((data: PaymentMethod) => {
    onPaymentInfoSelected(data);
    onNext();
  }, [onPaymentInfoSelected, onNext]);

  const handleSavedPaymentMethodDeleted = useCallback(async (savedPaymentMethodId: string) => {
    setViewState({ isDeleting: true, showSaved: true });

    await onSavedPaymentMethodDeleted(savedPaymentMethodId);

    const remainingPaymentMethods = savedPaymentMethods.length - 1;

    setViewState({ isDeleting: false, showSaved: remainingPaymentMethods > 0 });
  }, [onSavedPaymentMethodDeleted, savedPaymentMethods.length]);

  const handleFormAttemptSubmit = useCallback(() => setFormSubmitAttempted(true), []);

  useEffect(() => {
    if (!selectedPaymentMethodBillingInfo) onPrev();
  }, [selectedPaymentMethodBillingInfo, onPrev]);

  useEffect(() => {
    const selectedPaymentInfoMatch = typeof selectedPaymentInfo === "string" && savedPaymentMethods.some(({ id }) => id === selectedPaymentInfo);
    const firstActiveSavedPaymentMethod = savedPaymentMethods.find(({ status }) => status === "complete");

    if (showSaved && !selectedPaymentInfoMatch && firstActiveSavedPaymentMethod /* && savedPaymentMethods.length > 0 && !checkoutError */) {
      onPaymentInfoSelected(firstActiveSavedPaymentMethod.id);
    }
  }, [showSaved, onPaymentInfoSelected, savedPaymentMethods, selectedPaymentInfo/*, checkoutError*/]);

  // PLAIN LINKS:
  const onPlaidLinkClicked = usePlaid({
    selectedBillingInfo,
  });

  // TODO: Handle errors properly:
  if (!selectedPaymentMethodBillingInfo) return null;

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
        <CheckoutStepper progress={100} />

        <BillingInfoItem
          data={selectedPaymentMethodBillingInfo}
          additionalProps={{ onEdit: onPrev, disabled: isDeleting, boxProps: billingInfoItemBoxProps }} />

        <Divider sx={{ mt: 2.5 }} />

        {showSaved ? (
          <SavedPaymentDetailsSelector
            showLoader={isDeleting}
            savedPaymentMethods={savedPaymentMethods}
            selectedPaymentMethodId={typeof selectedPaymentInfo === "string" ? selectedPaymentInfo : undefined}
            onNew={handleShowForm}
            onDelete={handleSavedPaymentMethodDeleted}
            onPick={onPaymentInfoSelected}
            onCvvSelected={onCvvSelected}
            onNext={onNext}
            onClose={onClose}
            onAttemptSubmit={handleFormAttemptSubmit}
            consentType={consentType} />
        ) : (
          <PaymentMethodForm
            acceptedPaymentTypes={acceptedPaymentTypes}
            defaultValues={typeof selectedPaymentInfo === "string" ? undefined : selectedPaymentInfo}
            checkoutError={checkoutError}
            onPlaidLinkClicked={onPlaidLinkClicked}
            onSaved={savedPaymentMethods.length > 0 ? handleShowSaved : undefined}
            onClose={onClose}
            onSubmit={handleSubmit}
            onAttemptSubmit={handleFormAttemptSubmit}
            consentType={consentType}
            debug={debug} />
        )}
      </Stack>

      <CheckoutDeliveryAndItemCostBreakdown
        checkoutItems={checkoutItems}
        taxes={taxes}
        validatePersonalDeliveryAddress={formSubmitAttempted}
        walletAddress={walletAddress}
        onWalletAddressChange={onWalletAddressChange}/>
    </Stack>
  );
};
