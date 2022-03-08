'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var CheckoutModalFooter = require('../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var PurchaseConfirmationBillingDetails = require('../../components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.js');
var PurchaseConfirmationItemDetails = require('../../components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails.js');
var circle_utils = require('../../domain/circle/circle.utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const ConfirmationView = ({ checkoutItems, savedPaymentMethods, selectedPaymentMethod, circlePaymentID, onGoToCollection, onNext, dictionary, }) => {
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
    return (React__default["default"].createElement(material.Stack, { direction: {
            xs: "column",
            sm: "column",
            md: "row",
        }, spacing: 8.75, sx: { display: "flex" } },
        React__default["default"].createElement(PurchaseConfirmationBillingDetails.PurchaseConfirmationBillingDetails, { checkoutItems: checkoutItems, circlePaymentID: circlePaymentID, selectedPaymentMethodBillingInfo: selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo: selectedPaymentMethodPaymentInfo, dictionary: dictionary }),
        React__default["default"].createElement(material.Stack, { sx: { display: "flex", flex: 1 } },
            React__default["default"].createElement(PurchaseConfirmationItemDetails.PurchaseConfirmationItemDetails, { checkoutItems: checkoutItems, dictionary: dictionary }),
            React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: "toMarketplace", onSubmitClicked: onNext, onGoToCollection: onGoToCollection }))));
};

exports.ConfirmationView = ConfirmationView;
//# sourceMappingURL=ConfirmationView.js.map
