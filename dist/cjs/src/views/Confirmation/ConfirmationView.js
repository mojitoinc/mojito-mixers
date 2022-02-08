'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var CheckoutModalFooter = require('../../components/payments/CheckoutModalFooter/CheckoutModalFooter.js');
var PurchaseConfirmationBillingDetails = require('../../components/payments/PurchaseConfirmationBillingDetails/PurchaseConfirmationBillingDetails.js');
var PurchaseConfirmationItemDetails = require('../../components/payments/PurchaseConfirmationItemDetails/PurchaseConfirmationItemDetails.js');
var circle_utils = require('../../domain/circle/circle.utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var ConfirmationView = function ConfirmationView(_a) {
  var checkoutItem = _a.checkoutItem,
      savedPaymentMethods = _a.savedPaymentMethods,
      selectedPaymentMethod = _a.selectedPaymentMethod,
      paymentReferenceNumber = _a.paymentReferenceNumber,
      purchaseInstructions = _a.purchaseInstructions,
      onNext = _a.onNext,
      onClose = _a.onClose;
  var selectedBillingInfo = selectedPaymentMethod.billingInfo,
      selectedPaymentInfo = selectedPaymentMethod.paymentInfo;

  var _b = React.useMemo(function () {
    if (typeof selectedPaymentInfo === "string") {
      var paymentMethod = savedPaymentMethods.find(function (_a) {
        var id = _a.id;
        return id === selectedPaymentInfo;
      });
      return {
        selectedPaymentMethodBillingInfo: paymentMethod,
        selectedPaymentMethodPaymentInfo: paymentMethod
      };
    }

    return {
      selectedPaymentMethodBillingInfo: typeof selectedBillingInfo === "string" ? savedPaymentMethods.find(function (_a) {
        var addressId = _a.addressId;
        return addressId === selectedBillingInfo;
      }) : circle_utils.billingInfoToSavedPaymentMethodBillingInfo(selectedBillingInfo),
      selectedPaymentMethodPaymentInfo: selectedPaymentInfo
    };
  }, [savedPaymentMethods, selectedBillingInfo, selectedPaymentInfo]),
      selectedPaymentMethodBillingInfo = _b.selectedPaymentMethodBillingInfo,
      selectedPaymentMethodPaymentInfo = _b.selectedPaymentMethodPaymentInfo;

  if (!selectedPaymentMethodBillingInfo || !selectedPaymentMethodPaymentInfo) return null;
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement(PurchaseConfirmationBillingDetails.PurchaseConfirmationBillingDetails, {
    checkoutItem: checkoutItem,
    paymentReferenceNumber: paymentReferenceNumber,
    selectedPaymentMethodBillingInfo: selectedPaymentMethodBillingInfo,
    selectedPaymentMethodPaymentInfo: selectedPaymentMethodPaymentInfo
  }), /*#__PURE__*/React__default["default"].createElement(PurchaseConfirmationItemDetails.PurchaseConfirmationItemDetails, {
    checkoutItem: checkoutItem,
    purchaseInstructions: purchaseInstructions
  }), /*#__PURE__*/React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, {
    variant: "toMarketplace",
    privacyHref: "",
    termsOfUseHref: "",
    onSubmitClicked: onNext,
    onCloseClicked: onClose
  }));
};

exports.ConfirmationView = ConfirmationView;
//# sourceMappingURL=ConfirmationView.js.map
