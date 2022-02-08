import { __awaiter, __generator } from '../../../node_modules/tslib/tslib.es6.js';
import React__default, { useMemo, useState, useCallback, useEffect } from 'react';
import { CheckoutItemCostBreakdown } from '../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js';
import { CheckoutStepper } from '../../components/payments/CheckoutStepper/CheckoutStepper.js';
import { PaymentMethodForm } from '../../forms/PaymentMethodForm.js';
import { SavedPaymentDetailsSelector } from '../../components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.js';
import { BillingInfoItem } from '../../components/payments/BillingInfo/Item/BillingInfoItem.js';
import { billingInfoToSavedPaymentMethodBillingInfo } from '../../domain/circle/circle.utils.js';
import { Divider } from '@mui/material';
import { usePlaid } from '../../hooks/usePlaid.js';

var billingInfoItemBoxProps = { sx: { mt: 2.5 } };
var PaymentView = function (_a) {
    var checkoutItem = _a.checkoutItem, rawSavedPaymentMethods = _a.savedPaymentMethods, selectedPaymentMethod = _a.selectedPaymentMethod, onPaymentInfoSelected = _a.onPaymentInfoSelected, onSavedPaymentMethodDeleted = _a.onSavedPaymentMethodDeleted, onNext = _a.onNext, onPrev = _a.onPrev, onClose = _a.onClose, acceptedPaymentTypes = _a.acceptedPaymentTypes, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref, debug = _a.debug;
    var selectedBillingInfo = selectedPaymentMethod.billingInfo, selectedPaymentInfo = selectedPaymentMethod.paymentInfo;
    var savedPaymentMethods = useMemo(function () {
        if (typeof selectedBillingInfo !== "string")
            return [];
        return rawSavedPaymentMethods.filter(function (_a) {
            var addressId = _a.addressId, type = _a.type;
            return addressId === selectedBillingInfo && acceptedPaymentTypes.includes(type);
        });
    }, [acceptedPaymentTypes, rawSavedPaymentMethods, selectedBillingInfo]);
    var selectedPaymentMethodBillingInfo = useMemo(function () {
        return typeof selectedBillingInfo === "string"
            ? rawSavedPaymentMethods.find(function (_a) {
                var addressId = _a.addressId;
                return addressId === selectedBillingInfo;
            })
            : billingInfoToSavedPaymentMethodBillingInfo(selectedBillingInfo);
    }, [rawSavedPaymentMethods, selectedBillingInfo]);
    var _b = useState({
        isDeleting: false,
        showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string",
    }), _c = _b[0], isDeleting = _c.isDeleting, showSaved = _c.showSaved, setViewState = _b[1];
    var handleShowForm = useCallback(function () {
        setViewState({ isDeleting: false, showSaved: false });
    }, []);
    var handleShowSaved = useCallback(function () {
        setViewState({ isDeleting: false, showSaved: true });
    }, []);
    var handleSubmit = useCallback(function (data) {
        onPaymentInfoSelected(data);
        onNext();
    }, [onPaymentInfoSelected, onNext]);
    var handleSavedPaymentMethodDeleted = useCallback(function (savedPaymentMethodId) { return __awaiter(void 0, void 0, void 0, function () {
        var remainingPaymentMethods;
        return __generator(this, function (_a) {
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
    useEffect(function () {
        if (!selectedPaymentMethodBillingInfo)
            onPrev();
    }, [selectedPaymentMethodBillingInfo, onPrev]);
    useEffect(function () {
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
    var onPlaidLinkClicked = usePlaid({
        selectedBillingInfo: selectedBillingInfo,
    });
    // TODO: Handle errors properly:
    if (!selectedPaymentMethodBillingInfo)
        return null;
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(CheckoutItemCostBreakdown, { checkoutItem: checkoutItem }),
        React__default.createElement(CheckoutStepper, { progress: 100 }),
        React__default.createElement(BillingInfoItem, { data: selectedPaymentMethodBillingInfo, additionalProps: { onEdit: onPrev, disabled: isDeleting, boxProps: billingInfoItemBoxProps } }),
        React__default.createElement(Divider, { sx: { mt: 2.5 } }),
        showSaved ? (React__default.createElement(SavedPaymentDetailsSelector, { showLoader: isDeleting, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodId: typeof selectedPaymentInfo === "string" ? selectedPaymentInfo : undefined, onNew: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onPaymentInfoSelected, onNext: onNext, onClose: onClose, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) : (React__default.createElement(PaymentMethodForm, { acceptedPaymentTypes: acceptedPaymentTypes, defaultValues: typeof selectedPaymentInfo === "string" ? undefined : selectedPaymentInfo, onPlaidLinkClicked: onPlaidLinkClicked, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, debug: debug }))));
};

export { PaymentView };
//# sourceMappingURL=PaymentView.js.map
