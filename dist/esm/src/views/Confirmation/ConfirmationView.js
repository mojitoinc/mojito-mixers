import React__default, { useMemo } from 'react';
import { CheckoutModalFooter } from '../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { PurchaseConfirmationBillingDetails } from '../../components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.js';
import { PurchaseConfirmationItemDetails } from '../../components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails.js';
import { billingInfoToSavedPaymentMethodBillingInfo } from '../../domain/circle/circle.utils.js';

const ConfirmationView = ({ checkoutItem, savedPaymentMethods, selectedPaymentMethod, paymentReferenceNumber, purchaseInstructions, onNext, onClose, }) => {
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
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(PurchaseConfirmationBillingDetails, { checkoutItem: checkoutItem, paymentReferenceNumber: paymentReferenceNumber, selectedPaymentMethodBillingInfo: selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo: selectedPaymentMethodPaymentInfo }),
        React__default.createElement(PurchaseConfirmationItemDetails, { checkoutItem: checkoutItem, purchaseInstructions: purchaseInstructions }),
        React__default.createElement(CheckoutModalFooter, { variant: "toMarketplace", privacyHref: "", termsOfUseHref: "", onSubmitClicked: onNext, onCloseClicked: onClose })));
};

export { ConfirmationView };
//# sourceMappingURL=ConfirmationView.js.map
