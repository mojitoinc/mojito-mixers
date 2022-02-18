import { __awaiter } from '../../../node_modules/tslib/tslib.es6.js';
import React__default, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Stack } from '@mui/material';
import { CheckoutItemCostBreakdown } from '../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js';
import { CheckoutStepper } from '../../components/payments/CheckoutStepper/CheckoutStepper.js';
import { SavedBillingDetailsSelector } from '../../components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.js';
import { savedPaymentMethodToBillingInfo, getSavedPaymentMethodAddressIdFromBillingInfo } from '../../domain/circle/circle.utils.js';
import { BillingInfoForm } from '../../forms/BillingInfoForm.js';
import { distinctBy } from '../../utils/arrayUtils.js';
import { checkNeedsGenericErrorMessage } from '../../hooks/useFormCheckoutError.js';

const BillingView = ({ checkoutItems, savedPaymentMethods: rawSavedPaymentMethods, selectedBillingInfo, checkoutError, onBillingInfoSelected, onSavedPaymentMethodDeleted, onNext, onClose, debug, }) => {
    const savedPaymentMethodAddressIdRef = useRef("");
    const savedPaymentMethods = useMemo(() => distinctBy(rawSavedPaymentMethods, "addressId"), [rawSavedPaymentMethods]);
    const [{ isDeleting, showSaved }, setViewState] = useState({
        isDeleting: false,
        showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string" && !checkNeedsGenericErrorMessage("billing", checkoutError),
    });
    const handleShowForm = useCallback((savedPaymentMethodAddressId) => {
        if (savedPaymentMethodAddressId && typeof savedPaymentMethodAddressId === "string") {
            savedPaymentMethodAddressIdRef.current = savedPaymentMethodAddressId;
            const data = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);
            if (data)
                onBillingInfoSelected(savedPaymentMethodToBillingInfo(data));
        }
        setViewState({ isDeleting: false, showSaved: false });
    }, [onBillingInfoSelected, savedPaymentMethods]);
    const handleShowSaved = useCallback(() => {
        const savedPaymentMethodAddressId = savedPaymentMethodAddressIdRef.current;
        if (savedPaymentMethodAddressId)
            onBillingInfoSelected(savedPaymentMethodAddressId);
        setViewState({ isDeleting: false, showSaved: true });
    }, [onBillingInfoSelected]);
    const handleSubmit = useCallback((data) => {
        const savedPaymentMethodAddressId = getSavedPaymentMethodAddressIdFromBillingInfo(data);
        const savedPaymentMethodData = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);
        onBillingInfoSelected(savedPaymentMethodData ? savedPaymentMethodAddressId : data);
        onNext();
    }, [savedPaymentMethods, onBillingInfoSelected, onNext]);
    const handleSavedPaymentMethodDeleted = useCallback((savedPaymentMethodId) => __awaiter(void 0, void 0, void 0, function* () {
        setViewState({ isDeleting: true, showSaved: true });
        yield onSavedPaymentMethodDeleted(savedPaymentMethodId);
        const remainingPaymentMethods = savedPaymentMethods.length - savedPaymentMethods.filter(({ addressId }) => addressId === savedPaymentMethodId).length;
        setViewState({ isDeleting: false, showSaved: remainingPaymentMethods > 0 });
    }), [onSavedPaymentMethodDeleted, savedPaymentMethods]);
    useEffect(() => {
        const selectedPaymentInfoMatch = typeof selectedBillingInfo === "string" && savedPaymentMethods.some(({ addressId }) => addressId === selectedBillingInfo);
        if (showSaved && !selectedPaymentInfoMatch /* && savedPaymentMethods.length > 0 && !checkoutError */) {
            onBillingInfoSelected(savedPaymentMethods[0].addressId);
        }
    }, [showSaved, savedPaymentMethods, selectedBillingInfo, onBillingInfoSelected /*, checkoutError*/]);
    return (React__default.createElement(Stack, { direction: {
            xs: "column",
            sm: "column",
            md: "row",
        }, spacing: 8.75 },
        React__default.createElement(Stack, { sx: { display: 'flex', flex: 1 } },
            React__default.createElement(CheckoutStepper, { progress: 50 }),
            showSaved ? (React__default.createElement(SavedBillingDetailsSelector, { showLoader: isDeleting, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodAddressId: typeof selectedBillingInfo === "string" ? selectedBillingInfo : undefined, onNew: handleShowForm, onEdit: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onBillingInfoSelected, onNext: onNext, onClose: onClose })) : (React__default.createElement(BillingInfoForm
            // variant="loggedIn"
            , { 
                // variant="loggedIn"
                defaultValues: typeof selectedBillingInfo === "string" ? undefined : selectedBillingInfo, checkoutError: checkoutError, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit, debug: debug }))),
        React__default.createElement(CheckoutItemCostBreakdown, { checkoutItems: checkoutItems })));
};

export { BillingView };
//# sourceMappingURL=BillingView.js.map
