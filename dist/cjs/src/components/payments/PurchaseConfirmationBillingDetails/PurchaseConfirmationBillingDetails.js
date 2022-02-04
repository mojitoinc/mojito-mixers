'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var Icons = require('../../shared/Icons/Icons.js');
var ReadOnlyField = require('../../shared/ReadOnlyField/ReadOnlyField.js');
var CheckoutItemCostPurchase = require('../CheckoutItemCost/Purchase/CheckoutItemCostPurchase.js');
var PurchaseConfirmationBillingDetails_constants = require('./PurchaseConfirmationBillingDetails.constants.js');
var PurchaseConfirmationBillingDetails_utils = require('./PurchaseConfirmationBillingDetails.utils.js');
var Check = require('../../../../node_modules/@mui/icons-material/Check.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var PurchaseConfirmationBillingDetails = function (_a) {
    var checkoutItem = _a.checkoutItem, paymentReferenceNumber = _a.paymentReferenceNumber, selectedPaymentMethodBillingInfo = _a.selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo = _a.selectedPaymentMethodPaymentInfo;
    var _b = PurchaseConfirmationBillingDetails_utils.getFormattedPaymentMethod(selectedPaymentMethodPaymentInfo), isMasked = _b.isMasked, paymentType = _b.paymentType, displayValue = _b.displayValue, network = _b.network;
    var icon = network ? React__default["default"].createElement(Icons.CreditCardIcon, { network: network }) : null;
    return (React__default["default"].createElement(material.Box, { sx: { position: "relative", mb: 2 } },
        React__default["default"].createElement(material.Stack, { spacing: 2, direction: { xs: "column", sm: "row" }, sx: {
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                pt: 2
            } },
            React__default["default"].createElement(material.Typography, { variant: "h5" }, "Purchase Confirmation"),
            React__default["default"].createElement(material.Chip, { size: "small", color: "success", label: (React__default["default"].createElement(React__default["default"].Fragment, null,
                    "Payment Processed",
                    React__default["default"].createElement(Check["default"], { sx: { height: "24px", ml: 1.5 } }))) })),
        React__default["default"].createElement(material.Stack, { spacing: 2, direction: { xs: "column", sm: "row" }, sx: {
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                pt: 1.5,
                pb: { xs: 2.5, sm: 1.5 }
            } },
            isMasked ? (React__default["default"].createElement(ReadOnlyField.ReadOnlyField, { label: PurchaseConfirmationBillingDetails_constants.PAYMENT_TYPE_LABEL[paymentType], value: displayValue, InputProps: icon ? {
                    endAdornment: (React__default["default"].createElement(material.InputAdornment, { position: "end" }, icon)),
                } : undefined })) : (React__default["default"].createElement(ReadOnlyField.ReadOnlyCardField, { label: PurchaseConfirmationBillingDetails_constants.PAYMENT_TYPE_LABEL[paymentType], value: displayValue })),
            React__default["default"].createElement(ReadOnlyField.ReadOnlyField, { label: "Reference No.", value: paymentReferenceNumber || "-" })),
        React__default["default"].createElement(CheckoutItemCostPurchase.CheckoutItemCostPurchase, { checkoutItem: checkoutItem, selectedPaymentMethodBillingInfo: selectedPaymentMethodBillingInfo })));
};

exports.PurchaseConfirmationBillingDetails = PurchaseConfirmationBillingDetails;
//# sourceMappingURL=PurchaseConfirmationBillingDetails.js.map
