import React__default, { useMemo } from 'react';
import { Stack, Divider } from '@mui/material';
import { CheckoutModalFooter } from '../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { PurchaseConfirmationBillingDetails } from '../../components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.js';
import { PurchaseConfirmationItemDetails } from '../../components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails.js';
import { billingInfoToSavedPaymentMethodBillingInfo } from '../../domain/circle/circle.utils.js';

const ConfirmationView = ({ checkoutItems, savedPaymentMethods, selectedPaymentMethod, processorPaymentID, wallet, onNext, goToHref, goToLabel, onGoTo, }) => {
    const { billingInfo: selectedBillingInfo, paymentInfo: selectedPaymentInfo, } = selectedPaymentMethod;
    const { selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo, } = useMemo(() => {
        if (typeof selectedPaymentInfo === "string") {
            const paymentMethod = savedPaymentMethods.find(({ id }) => id === selectedPaymentInfo);
            return {
                selectedPaymentMethodBillingInfo: paymentMethod,
                selectedPaymentMethodPaymentInfo: paymentMethod,
            };
        }
        return {
            selectedPaymentMethodBillingInfo: typeof selectedBillingInfo === "string"
                ? savedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo)
                : billingInfoToSavedPaymentMethodBillingInfo(selectedBillingInfo),
            selectedPaymentMethodPaymentInfo: selectedPaymentInfo,
        };
    }, [savedPaymentMethods, selectedBillingInfo, selectedPaymentInfo]);
    if (!selectedPaymentMethodBillingInfo || !selectedPaymentMethodPaymentInfo)
        return null;
    return (React__default.createElement(Stack, { direction: { xs: "column", md: "row" }, spacing: { xs: 3, md: 3.75 } },
        React__default.createElement(PurchaseConfirmationBillingDetails, { checkoutItems: checkoutItems, processorPaymentID: processorPaymentID, wallet: wallet, selectedPaymentMethodBillingInfo: selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo: selectedPaymentMethodPaymentInfo }),
        React__default.createElement(Stack, { sx: { display: "flex", flex: 1 } },
            React__default.createElement(Divider, { sx: { display: { xs: "block", md: "none" } } }),
            React__default.createElement(PurchaseConfirmationItemDetails, { checkoutItems: checkoutItems }),
            React__default.createElement(CheckoutModalFooter, { variant: "toMarketplace", onSubmitClicked: onNext, goToHref: goToHref, goToLabel: goToLabel, onGoTo: onGoTo }))));
};

export { ConfirmationView };
//# sourceMappingURL=ConfirmationView.js.map
