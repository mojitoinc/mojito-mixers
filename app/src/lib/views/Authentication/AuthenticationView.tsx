import React, { useEffect } from "react";
import { Stack } from "@mui/material";

import { CheckoutItemCostBreakdown } from "../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown";
import { CheckoutModalFooter } from "../../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { resetStepperProgress } from "../../components/payments/CheckoutStepper/CheckoutStepper";
import { TaxesState } from "../Billing/BillingView";
import { usePromoCode } from "../../utils/promoCodeUtils";

export interface AuthenticationViewProps {
  checkoutItems: CheckoutItem[];
  taxes: null | TaxesState;
  isAuthenticated?: boolean;
  guestCheckoutEnabled?: boolean;
  onGuestClicked: () => void;
  onCloseClicked: () => void;
}

export const AuthenticationView: React.FC<AuthenticationViewProps> = ({
  checkoutItems,
  taxes,
  isAuthenticated,
  guestCheckoutEnabled,
  onGuestClicked,
  onCloseClicked,
}) => {
  const { setEditable } = usePromoCode();

  useEffect(() => {
    setEditable(true);
  }, [setEditable]);

  useEffect(() => {
    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();
  }, []);

  return (
    <Stack sx={{ mt: 5 }}>
      <CheckoutItemCostBreakdown checkoutItems={ checkoutItems } taxes={ taxes } />

      <CheckoutModalFooter
        variant={ isAuthenticated ? "toPayment" : "toGuestCheckout" }
        guestCheckoutEnabled={ guestCheckoutEnabled }
        onSubmitClicked={ onGuestClicked }
        onCloseClicked={ onCloseClicked } />
    </Stack>
  );
};
