'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var CheckoutModalFooter = require('../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var PurchaseConfirmationBillingDetails = require('../../components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.js');
var PurchaseConfirmationItemDetails = require('../../components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails.js');
var circle_utils = require('../../domain/circle/circle.utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ConfirmationView = ({ checkoutItem, savedPaymentMethods, selectedPaymentMethod, paymentReferenceNumber, purchaseInstructions, onNext, onClose, }) => {
    const { billingInfo: selectedBillingInfo, paymentInfo: selectedPaymentInfo, } = selectedPaymentMethod;
    const { selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo, } = React.useMemo(() => {
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
                : circle_utils.billingInfoToSavedPaymentMethodBillingInfo(selectedBillingInfo),
            selectedPaymentMethodPaymentInfo: selectedPaymentInfo,
        };
    }, [savedPaymentMethods, selectedBillingInfo, selectedPaymentInfo]);
    if (!selectedPaymentMethodBillingInfo || !selectedPaymentMethodPaymentInfo)
        return null;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(PurchaseConfirmationBillingDetails.PurchaseConfirmationBillingDetails, { checkoutItem: checkoutItem, paymentReferenceNumber: paymentReferenceNumber, selectedPaymentMethodBillingInfo: selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo: selectedPaymentMethodPaymentInfo }),
        React__default["default"].createElement(PurchaseConfirmationItemDetails.PurchaseConfirmationItemDetails, { checkoutItem: checkoutItem, purchaseInstructions: purchaseInstructions }),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: "toMarketplace", privacyHref: "", termsOfUseHref: "", onSubmitClicked: onNext, onCloseClicked: onClose })));
};

exports.ConfirmationView = ConfirmationView;
//# sourceMappingURL=ConfirmationView.js.map
