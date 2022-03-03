import React__default, { useEffect } from 'react';
import { Stack } from '@mui/material';
import { CheckoutItemCostBreakdown } from '../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js';
import { CheckoutModalFooter } from '../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { resetStepperProgress } from '../../components/payments/CheckoutStepper/CheckoutStepper.js';

const AuthenticationView = ({ checkoutItems, taxes, isAuthenticated, guestCheckoutEnabled, onGuestClicked, onCloseClicked, }) => {
    useEffect(() => {
        // Make sure the progress tracker in BillingView and PaymentView is properly animated:
        resetStepperProgress();
    }, []);
    return (React__default.createElement(Stack, { sx: { mt: 5 } },
        React__default.createElement(CheckoutItemCostBreakdown, { checkoutItems: checkoutItems, taxes: taxes }),
        React__default.createElement(CheckoutModalFooter, { variant: isAuthenticated ? "toPayment" : "toGuestCheckout", guestCheckoutEnabled: guestCheckoutEnabled, onSubmitClicked: onGuestClicked, onCloseClicked: onCloseClicked })));
};

export { AuthenticationView };
//# sourceMappingURL=AuthenticationView.js.map
