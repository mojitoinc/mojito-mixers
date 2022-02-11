
import { CheckoutItemCostBreakdown } from "../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown";
import { CheckoutModalFooter } from "../../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import React, { useEffect } from "react";
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

  return (<>
    <CheckoutItemCostBreakdown checkoutItems={ checkoutItems } />

    <CheckoutModalFooter
      variant={ isAuthenticated ? "toPayment" : "toGuestCheckout" }
      guestCheckoutEnabled={ guestCheckoutEnabled }
      privacyHref=""
      termsOfUseHref=""
      onSubmitClicked={ onGuestClicked }
      onCloseClicked={ onCloseClicked } />
  </>);
};
