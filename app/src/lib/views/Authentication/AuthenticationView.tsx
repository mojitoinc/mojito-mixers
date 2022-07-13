import React, { useEffect } from "react";
import { Stack } from "@mui/material";

import { CheckoutItemCostBreakdown } from "../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown";
import { CheckoutModalFooter } from "../../components/payments/CheckoutModalFooter/CheckoutModalFooter";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { resetStepperProgress } from "../../components/payments/CheckoutStepper/CheckoutStepper";
import { TaxesState } from "../Billing/BillingView";
import { usePromoCode } from "../../utils/promoCodeUtils";
import { FiatCurrency, CryptoCurrency } from "../../domain/payment/payment.interfaces";
import { Market } from "../../components/public/CheckoutOverlay/CheckoutOverlay";

export interface AuthenticationViewProps {
  checkoutItems: CheckoutItem[];
  taxes: null | TaxesState;
  marketType: Market;
  displayCurrency: FiatCurrency;
  cryptoCurrencies: CryptoCurrency[];
  isAuthenticated?: boolean;
  guestCheckoutEnabled?: boolean;
  onGuestClicked: () => void;
  onCloseClicked: () => void;
  invoiceItemIDs: string[];
}

export const AuthenticationView: React.FC<AuthenticationViewProps> = ({
  checkoutItems,
  taxes,
  marketType,
  displayCurrency,
  cryptoCurrencies,
  isAuthenticated,
  guestCheckoutEnabled,
  onGuestClicked,
  onCloseClicked,
  invoiceItemIDs,
}) => {
  const { setEditable, setInvoiceItemIDs } = usePromoCode();

  useEffect(() => {
    if (invoiceItemIDs.length > 0) {
      setInvoiceItemIDs(invoiceItemIDs);
    }
  }, [invoiceItemIDs, setInvoiceItemIDs]);

  useEffect(() => {
    setEditable(true);
  }, [setEditable]);

  useEffect(() => {
    // Make sure the progress tracker in BillingView and PaymentView is properly animated:
    resetStepperProgress();
  }, []);

  return (
    <Stack sx={{ mt: 5 }}>
      <CheckoutItemCostBreakdown
        checkoutItems={ checkoutItems }
        taxes={ taxes }
        displayCurrency={ displayCurrency }
        cryptoCurrencies={ cryptoCurrencies }
        onlyCryptoWarningVariant={ marketType === "secondary" ? "box" : undefined } />

      <CheckoutModalFooter
        variant={ isAuthenticated ? "toPayment" : "toGuestCheckout" }
        guestCheckoutEnabled={ guestCheckoutEnabled }
        onSubmitClicked={ onGuestClicked }
        onCloseClicked={ onCloseClicked } />
    </Stack>
  );
};
