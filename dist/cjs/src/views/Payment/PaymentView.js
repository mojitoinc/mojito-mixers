'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var CheckoutItemCostBreakdown = require('../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js');
var CheckoutStepper = require('../../components/payments/CheckoutStepper/CheckoutStepper.js');
var PaymentMethodForm = require('../../forms/PaymentMethodForm.js');
var SavedPaymentDetailsSelector = require('../../components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.js');
var BillingInfoItem = require('../../components/payments/BillingInfo/Item/BillingInfoItem.js');
var circle_utils = require('../../domain/circle/circle.utils.js');
var material = require('@mui/material');
var usePlaid = require('../../hooks/usePlaid.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var billingInfoItemBoxProps = { sx: { mt: 2.5 } };
var PaymentView = function (_a) {
    var checkoutItem = _a.checkoutItem, rawSavedPaymentMethods = _a.savedPaymentMethods, selectedPaymentMethod = _a.selectedPaymentMethod, onPaymentInfoSelected = _a.onPaymentInfoSelected, onSavedPaymentMethodDeleted = _a.onSavedPaymentMethodDeleted, onNext = _a.onNext, onPrev = _a.onPrev, onClose = _a.onClose, acceptedPaymentTypes = _a.acceptedPaymentTypes, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref, debug = _a.debug;
    var selectedBillingInfo = selectedPaymentMethod.billingInfo, selectedPaymentInfo = selectedPaymentMethod.paymentInfo;
    var savedPaymentMethods = React.useMemo(function () {
        if (typeof selectedBillingInfo !== "string")
            return [];
        return rawSavedPaymentMethods.filter(function (_a) {
            var addressId = _a.addressId, type = _a.type;
            return addressId === selectedBillingInfo && acceptedPaymentTypes.includes(type);
        });
    }, [acceptedPaymentTypes, rawSavedPaymentMethods, selectedBillingInfo]);
    var selectedPaymentMethodBillingInfo = React.useMemo(function () {
        return typeof selectedBillingInfo === "string"
            ? rawSavedPaymentMethods.find(function (_a) {
                var addressId = _a.addressId;
                return addressId === selectedBillingInfo;
            })
            : circle_utils.billingInfoToSavedPaymentMethodBillingInfo(selectedBillingInfo);
    }, [rawSavedPaymentMethods, selectedBillingInfo]);
    var _b = React.useState({
        isDeleting: false,
        showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string",
    }), _c = _b[0], isDeleting = _c.isDeleting, showSaved = _c.showSaved, setViewState = _b[1];
    var handleShowForm = React.useCallback(function () {
        setViewState({ isDeleting: false, showSaved: false });
    }, []);
    var handleShowSaved = React.useCallback(function () {
        setViewState({ isDeleting: false, showSaved: true });
    }, []);
    var handleSubmit = React.useCallback(function (data) {
        onPaymentInfoSelected(data);
        onNext();
    }, [onPaymentInfoSelected, onNext]);
    var handleSavedPaymentMethodDeleted = React.useCallback(function (savedPaymentMethodId) { return tslib_es6.__awaiter(void 0, void 0, void 0, function () {
        var remainingPaymentMethods;
        return tslib_es6.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setViewState({ isDeleting: true, showSaved: true });
                    return [4 /*yield*/, onSavedPaymentMethodDeleted(savedPaymentMethodId)];
                case 1:
                    _a.sent();
                    remainingPaymentMethods = savedPaymentMethods.length - 1;
                    setViewState({ isDeleting: false, showSaved: remainingPaymentMethods > 0 });
                    return [2 /*return*/];
            }
        });
    }); }, [onSavedPaymentMethodDeleted, savedPaymentMethods.length]);
    React.useEffect(function () {
        if (!selectedPaymentMethodBillingInfo)
            onPrev();
    }, [selectedPaymentMethodBillingInfo, onPrev]);
    React.useEffect(function () {
        var selectedPaymentInfoMatch = typeof selectedPaymentInfo === "string" && savedPaymentMethods.some(function (_a) {
            var id = _a.id;
            return id === selectedPaymentInfo;
        });
        var firstActiveSavedPaymentMethod = savedPaymentMethods.find(function (_a) {
            var status = _a.status;
            return status === "complete";
        });
        if (showSaved && savedPaymentMethods.length > 0 && !selectedPaymentInfoMatch && firstActiveSavedPaymentMethod) {
            onPaymentInfoSelected(firstActiveSavedPaymentMethod.id);
        }
    }, [showSaved, onPaymentInfoSelected, savedPaymentMethods, selectedPaymentInfo]);
    // PLAIN LINKS:
    var onPlaidLinkClicked = usePlaid.usePlaid({
        selectedBillingInfo: selectedBillingInfo,
    });
    // TODO: Handle errors properly:
    if (!selectedPaymentMethodBillingInfo)
        return null;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(CheckoutItemCostBreakdown.CheckoutItemCostBreakdown, { checkoutItem: checkoutItem }),
        React__default["default"].createElement(CheckoutStepper.CheckoutStepper, { progress: 100 }),
        React__default["default"].createElement(BillingInfoItem.BillingInfoItem, { data: selectedPaymentMethodBillingInfo, additionalProps: { onEdit: onPrev, disabled: isDeleting, boxProps: billingInfoItemBoxProps } }),
        React__default["default"].createElement(material.Divider, { sx: { mt: 2.5 } }),
        showSaved ? (React__default["default"].createElement(SavedPaymentDetailsSelector.SavedPaymentDetailsSelector, { showLoader: isDeleting, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodId: typeof selectedPaymentInfo === "string" ? selectedPaymentInfo : undefined, onNew: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onPaymentInfoSelected, onNext: onNext, onClose: onClose, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) : (React__default["default"].createElement(PaymentMethodForm.PaymentMethodForm, { acceptedPaymentTypes: acceptedPaymentTypes, defaultValues: typeof selectedPaymentInfo === "string" ? undefined : selectedPaymentInfo, onPlaidLinkClicked: onPlaidLinkClicked, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, debug: debug }))));
};

exports.PaymentView = PaymentView;
//# sourceMappingURL=PaymentView.js.map
