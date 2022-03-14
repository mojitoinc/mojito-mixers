import React__default, { useMemo } from 'react';
import { Stack } from '@mui/material';
import { CheckoutModalFooter } from '../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { PurchaseConfirmationBillingDetails } from '../../components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.js';
import { PurchaseConfirmationItemDetails } from '../../components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails.js';
import { billingInfoToSavedPaymentMethodBillingInfo } from '../../domain/circle/circle.utils.js';

const ConfirmationView = ({ checkoutItems, savedPaymentMethods, selectedPaymentMethod, circlePaymentID, wallet, onGoToCollection, onNext, dictionary, }) => {
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
    return (React__default.createElement(Stack, { direction: {
            xs: "column",
            sm: "column",
            md: "row",
        }, spacing: 8.75, sx: { display: "flex" } },
        React__default.createElement(PurchaseConfirmationBillingDetails, { checkoutItems: checkoutItems, circlePaymentID: circlePaymentID, wallet: wallet, selectedPaymentMethodBillingInfo: selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo: selectedPaymentMethodPaymentInfo, dictionary: dictionary }),
        React__default.createElement(Stack, { sx: { display: "flex", flex: 1 } },
            React__default.createElement(PurchaseConfirmationItemDetails, { checkoutItems: checkoutItems, dictionary: dictionary }),
            React__default.createElement(CheckoutModalFooter, { variant: "toMarketplace", onSubmitClicked: onNext, onGoToCollection: onGoToCollection }))));
};

export { ConfirmationView };
//# sourceMappingURL=ConfirmationView.js.map
