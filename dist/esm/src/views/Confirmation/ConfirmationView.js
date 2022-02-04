import React__default, { useMemo } from 'react';
import { CheckoutModalFooter } from '../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { PurchaseConfirmationBillingDetails } from '../../components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.js';
import { PurchaseConfirmationItemDetails } from '../../components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails.js';
import { billingInfoToSavedPaymentMethodBillingInfo } from '../../domain/circle/circle.utils.js';

var ConfirmationView = function (_a) {
    var checkoutItem = _a.checkoutItem, savedPaymentMethods = _a.savedPaymentMethods, selectedPaymentMethod = _a.selectedPaymentMethod, paymentReferenceNumber = _a.paymentReferenceNumber, purchaseInstructions = _a.purchaseInstructions, onNext = _a.onNext, onClose = _a.onClose;
    var selectedBillingInfo = selectedPaymentMethod.billingInfo, selectedPaymentInfo = selectedPaymentMethod.paymentInfo;
    var _b = useMemo(function () {
        if (typeof selectedPaymentInfo === "string") {
            var paymentMethod = savedPaymentMethods.find(function (_a) {
                var id = _a.id;
                return id === selectedPaymentInfo;
            });
            return {
                selectedPaymentMethodBillingInfo: paymentMethod,
                selectedPaymentMethodPaymentInfo: paymentMethod,
            };
        }
        return {
            selectedPaymentMethodBillingInfo: typeof selectedBillingInfo === "string"
                ? savedPaymentMethods.find(function (_a) {
                    var addressId = _a.addressId;
                    return addressId === selectedBillingInfo;
                })
                : billingInfoToSavedPaymentMethodBillingInfo(selectedBillingInfo),
            selectedPaymentMethodPaymentInfo: selectedPaymentInfo,
        };
    }, [savedPaymentMethods, selectedBillingInfo, selectedPaymentInfo]), selectedPaymentMethodBillingInfo = _b.selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo = _b.selectedPaymentMethodPaymentInfo;
    if (!selectedPaymentMethodBillingInfo || !selectedPaymentMethodPaymentInfo)
        return null;
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(PurchaseConfirmationBillingDetails, { checkoutItem: checkoutItem, paymentReferenceNumber: paymentReferenceNumber, selectedPaymentMethodBillingInfo: selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo: selectedPaymentMethodPaymentInfo }),
        React__default.createElement(PurchaseConfirmationItemDetails, { checkoutItem: checkoutItem, purchaseInstructions: purchaseInstructions }),
        React__default.createElement(CheckoutModalFooter, { variant: "toMarketplace", privacyHref: "", termsOfUseHref: "", onSubmitClicked: onNext, onCloseClicked: onClose })));
};

export { ConfirmationView };
//# sourceMappingURL=ConfirmationView.js.map
