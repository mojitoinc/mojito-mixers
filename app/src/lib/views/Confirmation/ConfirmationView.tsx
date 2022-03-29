import React, { useMemo } from "react";
import { Divider, Stack } from "@mui/material";

import { CheckoutModalFooter } from "../../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { PurchaseConfirmationBillingDetails } from "../../components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails";
import { PurchaseConfirmationItemDetails } from "../../components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { billingInfoToSavedPaymentMethodBillingInfo } from "../../domain/circle/circle.utils";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { Wallet } from "../../domain/wallet/wallet.interfaces";

export interface ConfirmationViewProps {
  checkoutItems: CheckoutItem[];
  savedPaymentMethods: SavedPaymentMethod[];
  selectedPaymentMethod: SelectedPaymentMethod;
  circlePaymentID: string;
  wallet: null | string | Wallet;
  onNext: () => void;
  goToHref?: string;
  goToLabel?: string;
  onGoTo?: () => void;
}

export const ConfirmationView: React.FC<ConfirmationViewProps> = ({
  checkoutItems,
  savedPaymentMethods,
  selectedPaymentMethod,
  circlePaymentID,
  wallet,
  onNext,
  goToHref,
  goToLabel,
  onGoTo,
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

  return (
    <Stack
      direction={{ xs: "column",  md: "row" }}
      spacing={{ xs: 3,  md: 3.75 }}>

      <PurchaseConfirmationBillingDetails
        checkoutItems={ checkoutItems }
        circlePaymentID={ circlePaymentID }
        wallet={ wallet }
        selectedPaymentMethodBillingInfo={ selectedPaymentMethodBillingInfo }
        selectedPaymentMethodPaymentInfo={ selectedPaymentMethodPaymentInfo } />

      <Stack sx={{ display: "flex", flex: 1 }}>
        <Divider sx={{ display: { xs: "block", md: "none" } }} />

        <PurchaseConfirmationItemDetails
          checkoutItems={checkoutItems}/>

        <CheckoutModalFooter
          variant="toMarketplace"
          onSubmitClicked={onNext}
          goToHref={goToHref}
          goToLabel={goToLabel}
          onGoTo={onGoTo} />
      </Stack>

    </Stack>
  );
};
