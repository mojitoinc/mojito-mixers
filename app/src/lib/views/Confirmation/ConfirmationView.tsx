import { useMemo } from "react";
import { CheckoutModalFooter } from "../../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { PurchaseConfirmationBillingDetails } from "../../components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails";
import { PurchaseConfirmationItemDetails } from "../../components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { billingInfoToSavedPaymentMethodBillingInfo } from "../../domain/circle/circle.utils";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import React from "react";
import { SelectedPaymentMethod } from "../../components/payments/CheckoutModal/CheckoutModal";

export interface ConfirmationViewProps {
  checkoutItems: CheckoutItem[];
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethod: SelectedPaymentMethod;
  paymentReferenceNumber: string;
  purchaseInstructions: string;
  onNext: () => void;
  onClose: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  checkoutItems,
  savedPaymentMethods,
  selectedPaymentMethod,
  paymentReferenceNumber,
  purchaseInstructions,
  onNext,
  onClose,
}) => {
  const {
    billingInfo: selectedBillingInfo,
    paymentInfo: selectedPaymentInfo,
  } = selectedPaymentMethod;

  const {
    selectedPaymentMethodBillingInfo,
    selectedPaymentMethodPaymentInfo,
  } = useMemo(() => {
    if (typeof selectedPaymentInfo === "string") {
      const paymentMethod = savedPaymentMethods.find(({ id }) => id === selectedPaymentInfo);

      return {
        selectedPaymentMethodBillingInfo: paymentMethod,
        selectedPaymentMethodPaymentInfo: paymentMethod,
      }
    }

    return {
      selectedPaymentMethodBillingInfo: typeof selectedBillingInfo === "string"
        ? savedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo)
        : billingInfoToSavedPaymentMethodBillingInfo(selectedBillingInfo) as SavedPaymentMethod,
      selectedPaymentMethodPaymentInfo: selectedPaymentInfo,
    };
  }, [savedPaymentMethods, selectedBillingInfo, selectedPaymentInfo]);

  if (!selectedPaymentMethodBillingInfo || !selectedPaymentMethodPaymentInfo) return null;

  return (<>
    <PurchaseConfirmationBillingDetails
      checkoutItems={ checkoutItems }
      paymentReferenceNumber={ paymentReferenceNumber }
      selectedPaymentMethodBillingInfo={ selectedPaymentMethodBillingInfo }
      selectedPaymentMethodPaymentInfo={ selectedPaymentMethodPaymentInfo } />

    <PurchaseConfirmationItemDetails
      checkoutItems={ checkoutItems }
      purchaseInstructions={ purchaseInstructions } />

    <CheckoutModalFooter
      variant="toMarketplace"
      privacyHref=""
      termsOfUseHref=""
      onSubmitClicked={ onNext }
      onCloseClicked={ onClose } />
  </>);
};
