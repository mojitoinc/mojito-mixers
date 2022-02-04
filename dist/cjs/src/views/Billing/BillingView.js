'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var CheckoutItemCostBreakdown = require('../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js');
var CheckoutStepper = require('../../components/payments/CheckoutStepper/CheckoutStepper.js');
var SavedBillingDetailsSelector = require('../../components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.js');
var circle_utils = require('../../domain/circle/circle.utils.js');
var BillingInfoForm = require('../../forms/BillingInfoForm.js');
var arrayUtils = require('../../utils/arrayUtils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var BillingView = function (_a) {
    var checkoutItem = _a.checkoutItem, rawSavedPaymentMethods = _a.savedPaymentMethods, selectedBillingInfo = _a.selectedBillingInfo, onBillingInfoSelected = _a.onBillingInfoSelected, onSavedPaymentMethodDeleted = _a.onSavedPaymentMethodDeleted, onNext = _a.onNext, onClose = _a.onClose;
    var savedPaymentMethodAddressIdRef = React.useRef("");
    var savedPaymentMethods = React.useMemo(function () { return arrayUtils.distinctBy(rawSavedPaymentMethods, "addressId"); }, [rawSavedPaymentMethods]);
    var _b = React.useState({
        isDeleting: false,
        showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string",
    }), _c = _b[0], isDeleting = _c.isDeleting, showSaved = _c.showSaved, setViewState = _b[1];
    var handleShowForm = React.useCallback(function (savedPaymentMethodAddressId) {
        if (savedPaymentMethodAddressId && typeof savedPaymentMethodAddressId === "string") {
            savedPaymentMethodAddressIdRef.current = savedPaymentMethodAddressId;
            var data = savedPaymentMethods.find(function (_a) {
                var addressId = _a.addressId;
                return addressId === savedPaymentMethodAddressId;
            });
            if (data)
                onBillingInfoSelected(circle_utils.savedPaymentMethodToBillingInfo(data));
        }
        setViewState({ isDeleting: false, showSaved: false });
    }, [onBillingInfoSelected, savedPaymentMethods]);
    var handleShowSaved = React.useCallback(function () {
        var savedPaymentMethodAddressId = savedPaymentMethodAddressIdRef.current;
        if (savedPaymentMethodAddressId)
            onBillingInfoSelected(savedPaymentMethodAddressId);
        setViewState({ isDeleting: false, showSaved: true });
    }, [onBillingInfoSelected]);
    var handleSubmit = React.useCallback(function (data) {
        var savedPaymentMethodAddressId = circle_utils.getSavedPaymentMethodAddressIdFromBillingInfo(data);
        var savedPaymentMethodData = savedPaymentMethods.find(function (_a) {
            var addressId = _a.addressId;
            return addressId === savedPaymentMethodAddressId;
        });
        onBillingInfoSelected(savedPaymentMethodData ? savedPaymentMethodAddressId : data);
        onNext();
    }, [savedPaymentMethods, onBillingInfoSelected, onNext]);
    var handleSavedPaymentMethodDeleted = React.useCallback(function (savedPaymentMethodId) { return tslib_es6.__awaiter(void 0, void 0, void 0, function () {
        var remainingPaymentMethods;
        return tslib_es6.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setViewState({ isDeleting: true, showSaved: true });
                    return [4 /*yield*/, onSavedPaymentMethodDeleted(savedPaymentMethodId)];
                case 1:
                    _a.sent();
                    remainingPaymentMethods = savedPaymentMethods.length - savedPaymentMethods.filter(function (_a) {
                        var addressId = _a.addressId;
                        return addressId === savedPaymentMethodId;
                    }).length;
                    setViewState({ isDeleting: false, showSaved: remainingPaymentMethods > 0 });
                    return [2 /*return*/];
            }
        });
    }); }, [onSavedPaymentMethodDeleted, savedPaymentMethods]);
    React.useEffect(function () {
        var selectedPaymentInfoMatch = typeof selectedBillingInfo === "string" && savedPaymentMethods.some(function (_a) {
            var addressId = _a.addressId;
            return addressId === selectedBillingInfo;
        });
        if (showSaved && savedPaymentMethods.length > 0 && !selectedPaymentInfoMatch) {
            onBillingInfoSelected(savedPaymentMethods[0].addressId);
        }
    }, [showSaved, savedPaymentMethods, selectedBillingInfo, onBillingInfoSelected]);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(CheckoutItemCostBreakdown.CheckoutItemCostBreakdown, { checkoutItem: checkoutItem }),
        React__default["default"].createElement(CheckoutStepper.CheckoutStepper, { progress: 50 }),
        showSaved ? (React__default["default"].createElement(SavedBillingDetailsSelector.SavedBillingDetailsSelector, { showLoader: isDeleting, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodAddressId: typeof selectedBillingInfo === "string" ? selectedBillingInfo : undefined, onNew: handleShowForm, onEdit: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onBillingInfoSelected, onNext: onNext, onClose: onClose })) : (React__default["default"].createElement(BillingInfoForm.BillingInfoForm
        // variant="loggedIn"
        , { 
            // variant="loggedIn"
            defaultValues: typeof selectedBillingInfo === "string" ? undefined : selectedBillingInfo, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit }))));
};

exports.BillingView = BillingView;
//# sourceMappingURL=BillingView.js.map
