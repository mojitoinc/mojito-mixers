import React, { useEffect } from "react";
import { Stack } from "@mui/material";

import { CheckoutItemCostBreakdown } from "../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown";
import { CheckoutModalFooter } from "../../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { resetStepperProgress } from "../../components/payments/CheckoutStepper/CheckoutStepper";

export interface AuthenticationViewProps {
  checkoutItems: CheckoutItem[];
  isAuthenticated?: boolean;
  guestCheckoutEnabled?: boolean;
  onGuestClicked: () => void;
  onCloseClicked: () => void;
}

export const AuthenticationView: React.FC<AuthenticationViewProps> = ({
  checkoutItems,
  isAuthenticated,
  guestCheckoutEnabled,
  onGuestClicked,
  onCloseClicked,
}) => {
  useEffect(() => {
    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();
  }, []);

  return (<Stack sx={{ mt: 5 }}>
    <CheckoutItemCostBreakdown checkoutItems={ checkoutItems } />

    <CheckoutModalFooter
      variant={ isAuthenticated ? "toPayment" : "toGuestCheckout" }
      guestCheckoutEnabled={ guestCheckoutEnabled }
      onSubmitClicked={ onGuestClicked }
      onCloseClicked={ onCloseClicked } />
  </Stack>);
};
