import { __awaiter, __generator } from '../../../node_modules/tslib/tslib.es6.js';
import React__default, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { CheckoutItemCostBreakdown } from '../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js';
import { CheckoutStepper } from '../../components/payments/CheckoutStepper/CheckoutStepper.js';
import { SavedBillingDetailsSelector } from '../../components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.js';
import { savedPaymentMethodToBillingInfo, getSavedPaymentMethodAddressIdFromBillingInfo } from '../../domain/circle/circle.utils.js';
import { BillingInfoForm } from '../../forms/BillingInfoForm.js';
import { distinctBy } from '../../utils/arrayUtils.js';

var BillingView = function (_a) {
    var checkoutItem = _a.checkoutItem, rawSavedPaymentMethods = _a.savedPaymentMethods, selectedBillingInfo = _a.selectedBillingInfo, onBillingInfoSelected = _a.onBillingInfoSelected, onSavedPaymentMethodDeleted = _a.onSavedPaymentMethodDeleted, onNext = _a.onNext, onClose = _a.onClose, debug = _a.debug;
    var savedPaymentMethodAddressIdRef = useRef("");
    var savedPaymentMethods = useMemo(function () { return distinctBy(rawSavedPaymentMethods, "addressId"); }, [rawSavedPaymentMethods]);
    var _b = useState({
        isDeleting: false,
        showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string",
    }), _c = _b[0], isDeleting = _c.isDeleting, showSaved = _c.showSaved, setViewState = _b[1];
    var handleShowForm = useCallback(function (savedPaymentMethodAddressId) {
        if (savedPaymentMethodAddressId && typeof savedPaymentMethodAddressId === "string") {
            savedPaymentMethodAddressIdRef.current = savedPaymentMethodAddressId;
            var data = savedPaymentMethods.find(function (_a) {
                var addressId = _a.addressId;
                return addressId === savedPaymentMethodAddressId;
            });
            if (data)
                onBillingInfoSelected(savedPaymentMethodToBillingInfo(data));
        }
        setViewState({ isDeleting: false, showSaved: false });
    }, [onBillingInfoSelected, savedPaymentMethods]);
    var handleShowSaved = useCallback(function () {
        var savedPaymentMethodAddressId = savedPaymentMethodAddressIdRef.current;
        if (savedPaymentMethodAddressId)
            onBillingInfoSelected(savedPaymentMethodAddressId);
        setViewState({ isDeleting: false, showSaved: true });
    }, [onBillingInfoSelected]);
    var handleSubmit = useCallback(function (data) {
        var savedPaymentMethodAddressId = getSavedPaymentMethodAddressIdFromBillingInfo(data);
        var savedPaymentMethodData = savedPaymentMethods.find(function (_a) {
            var addressId = _a.addressId;
            return addressId === savedPaymentMethodAddressId;
        });
        onBillingInfoSelected(savedPaymentMethodData ? savedPaymentMethodAddressId : data);
        onNext();
    }, [savedPaymentMethods, onBillingInfoSelected, onNext]);
    var handleSavedPaymentMethodDeleted = useCallback(function (savedPaymentMethodId) { return __awaiter(void 0, void 0, void 0, function () {
        var remainingPaymentMethods;
        return __generator(this, function (_a) {
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
    useEffect(function () {
        var selectedPaymentInfoMatch = typeof selectedBillingInfo === "string" && savedPaymentMethods.some(function (_a) {
            var addressId = _a.addressId;
            return addressId === selectedBillingInfo;
        });
        if (showSaved && savedPaymentMethods.length > 0 && !selectedPaymentInfoMatch) {
            onBillingInfoSelected(savedPaymentMethods[0].addressId);
        }
    }, [showSaved, savedPaymentMethods, selectedBillingInfo, onBillingInfoSelected]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(CheckoutItemCostBreakdown, { checkoutItem: checkoutItem }),
        React__default.createElement(CheckoutStepper, { progress: 50 }),
        showSaved ? (React__default.createElement(SavedBillingDetailsSelector, { showLoader: isDeleting, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodAddressId: typeof selectedBillingInfo === "string" ? selectedBillingInfo : undefined, onNew: handleShowForm, onEdit: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onBillingInfoSelected, onNext: onNext, onClose: onClose })) : (React__default.createElement(BillingInfoForm
        // variant="loggedIn"
        , { 
            // variant="loggedIn"
            defaultValues: typeof selectedBillingInfo === "string" ? undefined : selectedBillingInfo, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit, debug: debug }))));
};

export { BillingView };
//# sourceMappingURL=BillingView.js.map
