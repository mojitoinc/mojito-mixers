import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { CheckoutItemCostBreakdown } from "../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown";
import { CheckoutStepper } from "../../components/payments/CheckoutStepper/CheckoutStepper";
import { SavedBillingDetailsSelector } from "../../components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { getSavedPaymentMethodAddressIdFromBillingInfo, savedPaymentMethodToBillingInfo } from "../../domain/circle/circle.utils";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { BillingInfo, BillingInfoForm } from "../../forms/BillingInfoForm";
import { distinctBy } from "../../utils/arrayUtils";
import React from "react";

export interface BillingViewProps {
  checkoutItem: CheckoutItem;
  savedPaymentMethods: SavedPaymentMethod[];
  selectedBillingInfo: string | BillingInfo;
  onBillingInfoSelected: (data: string | BillingInfo) => void;
  onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => Promise<void>;
  onNext: () => void;
  onClose: () => void;
}

export const BillingView: React.FC<BillingViewProps> = ({
  checkoutItem,
  savedPaymentMethods: rawSavedPaymentMethods,
  selectedBillingInfo,
  onBillingInfoSelected,
  onSavedPaymentMethodDeleted,
  onNext,
  onClose,
}) => {
  const savedPaymentMethodAddressIdRef = useRef<string>("");
  const savedPaymentMethods = useMemo(() => distinctBy(rawSavedPaymentMethods, "addressId"), [rawSavedPaymentMethods]);

  const [{ isDeleting, showSaved }, setViewState] = useState({
    isDeleting: false,
    showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string",
  });

  const handleShowForm = useCallback((savedPaymentMethodAddressId?: string) => {
    if (savedPaymentMethodAddressId && typeof savedPaymentMethodAddressId === "string") {
      savedPaymentMethodAddressIdRef.current = savedPaymentMethodAddressId;

      const data = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);

      if (data) onBillingInfoSelected(savedPaymentMethodToBillingInfo(data));
    }

    setViewState({ isDeleting: false, showSaved: false });
  }, [onBillingInfoSelected, savedPaymentMethods]);

  const handleShowSaved = useCallback(() => {
    const savedPaymentMethodAddressId = savedPaymentMethodAddressIdRef.current;

    if (savedPaymentMethodAddressId) onBillingInfoSelected(savedPaymentMethodAddressId);

    setViewState({ isDeleting: false, showSaved: true });
  }, [onBillingInfoSelected]);

  const handleSubmit = useCallback((data: BillingInfo) => {
    const savedPaymentMethodAddressId = getSavedPaymentMethodAddressIdFromBillingInfo(data);
    const savedPaymentMethodData = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);

    onBillingInfoSelected(savedPaymentMethodData ? savedPaymentMethodAddressId : data);
    onNext();
  }, [savedPaymentMethods, onBillingInfoSelected, onNext]);

  const handleSavedPaymentMethodDeleted = useCallback(async (savedPaymentMethodId: string) => {
    setViewState({ isDeleting: true, showSaved: true });

    await onSavedPaymentMethodDeleted(savedPaymentMethodId);

    const remainingPaymentMethods = savedPaymentMethods.length - savedPaymentMethods.filter(({ addressId }) => addressId === savedPaymentMethodId).length;

    setViewState({ isDeleting: false, showSaved: remainingPaymentMethods > 0 });
  }, [onSavedPaymentMethodDeleted, savedPaymentMethods]);

  useEffect(() => {
    const selectedPaymentInfoMatch = typeof selectedBillingInfo === "string" && savedPaymentMethods.some(({ addressId }) => addressId === selectedBillingInfo);

    if (showSaved && savedPaymentMethods.length > 0 && !selectedPaymentInfoMatch) {
      onBillingInfoSelected(savedPaymentMethods[0].addressId);
    }
  }, [showSaved, savedPaymentMethods, selectedBillingInfo, onBillingInfoSelected]);

  return (<>
    <CheckoutItemCostBreakdown checkoutItem={ checkoutItem } />

    <CheckoutStepper progress={ 50 } />

    { showSaved ? (
      <SavedBillingDetailsSelector
        showLoader={ isDeleting }
        savedPaymentMethods={ savedPaymentMethods }
        selectedPaymentMethodAddressId={ typeof selectedBillingInfo === "string" ? selectedBillingInfo : undefined }
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
        onSaved={ savedPaymentMethods.length > 0 ? handleShowSaved : undefined }
        onClose={ onClose }
        onSubmit={ handleSubmit } />
    ) }
  </>);
};
