import { __awaiter } from '../../../node_modules/tslib/tslib.es6.js';
import React__default, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Stack } from '@mui/material';
import { CheckoutDeliveryAndItemCostBreakdown } from '../../components/payments/CheckoutDeliveryAndItemCostBreakdown/CheckoutDeliveryAndItemCostBreakdown.js';
import { CheckoutStepper } from '../../components/payments/CheckoutStepper/CheckoutStepper.js';
import { SavedBillingDetailsSelector } from '../../components/shared/SavedBillingDetailsSelector/SavedBillingDetailsSelector.js';
import { savedPaymentMethodToBillingInfo, getSavedPaymentMethodAddressIdFromBillingInfo } from '../../domain/circle/circle.utils.js';
import { BillingInfoForm } from '../../forms/BillingInfoForm.js';
import { distinctBy } from '../../utils/arrayUtils.js';
import { checkNeedsGenericErrorMessage } from '../../hooks/useFormCheckoutError.js';
import { useGetTaxQuoteLazyQuery } from '../../queries/graphqlGenerated.js';
import { useCheckoutItemsCostTotal } from '../../hooks/useCheckoutItemCostTotal.js';
import { useThrottledCallback } from '@swyg/corre';

const BillingView = ({ checkoutItems, savedPaymentMethods: rawSavedPaymentMethods, selectedBillingInfo, walletAddress, checkoutError, onBillingInfoSelected, onTaxesChange, onSavedPaymentMethodDeleted, onWalletAddressChange, onNext, onClose, dictionary, debug, }) => {
    const savedPaymentMethodAddressIdRef = useRef("");
    const savedPaymentMethods = useMemo(() => distinctBy(rawSavedPaymentMethods, "addressId"), [rawSavedPaymentMethods]);
    const { total: subtotal, fees } = useCheckoutItemsCostTotal(checkoutItems);
    const total = subtotal + fees;
    const [{ isDeleting, showSaved, taxes }, setViewState] = useState({
        isDeleting: false,
        showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string" && !checkNeedsGenericErrorMessage("billing", checkoutError),
        taxes: { status: "incomplete" },
    });
    const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
    const [getTaxQuote] = useGetTaxQuoteLazyQuery();
    const getTaxQuoteTimestampRef = useRef(0);
    useEffect(() => {
        return () => {
            // To discard the result below that might come after the component has been unmounted:
            getTaxQuoteTimestampRef.current = 0;
        };
    }, []);
    const calculateTaxes = useCallback((taxInfo) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        const calledAt = getTaxQuoteTimestampRef.current;
        const result = yield getTaxQuote({
            variables: {
                input: {
                    taxablePrice: total,
                    address: {
                        street1: taxInfo.street,
                        city: taxInfo.city,
                        postalCode: taxInfo.zipCode,
                        country: `${taxInfo.country.value}`,
                        state: `${taxInfo.state.value}`,
                    },
                },
            },
        }).catch(() => ({ data: null }));
        // Discard stale result:
        if (calledAt !== getTaxQuoteTimestampRef.current)
            return;
        const taxResult = ((_a = result.data) === null || _a === void 0 ? void 0 : _a.getTaxQuote) || {};
        const isValid = !!taxResult.verifiedAddress;
        setViewState((prevViewState) => (Object.assign(Object.assign({}, prevViewState), { taxes: isValid ? {
                status: "complete",
                taxRate: 100 * taxResult.totalTaxAmount / taxResult.taxablePrice,
                taxAmount: taxResult.totalTaxAmount,
            } : { status: "error" } })));
    }), [getTaxQuote, total]);
    const handleThrottledTaxInfoChange = useThrottledCallback((taxInfo) => {
        var _a, _b;
        if (!taxInfo.street || !taxInfo.city || !taxInfo.zipCode || !((_a = taxInfo.country) === null || _a === void 0 ? void 0 : _a.value) || !((_b = taxInfo.state) === null || _b === void 0 ? void 0 : _b.value)) {
            setViewState((prevViewState) => prevViewState.taxes.status === "incomplete" ? prevViewState : (Object.assign(Object.assign({}, prevViewState), { taxes: { status: "incomplete" } })));
            return;
        }
        calculateTaxes(taxInfo);
    }, 1000, [calculateTaxes]);
    const handleTaxInfoChange = useCallback((taxInfo) => {
        setViewState((prevViewState) => prevViewState.taxes.status === "loading" ? prevViewState : (Object.assign(Object.assign({}, prevViewState), { taxes: { status: "loading" } })));
        getTaxQuoteTimestampRef.current = Date.now();
        handleThrottledTaxInfoChange(taxInfo);
    }, [handleThrottledTaxInfoChange]);
    useEffect(() => {
        if (selectedBillingInfo && showSaved) {
            const savedPaymentMethodData = typeof selectedBillingInfo === "string"
                ? savedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo) : null;
            const billingInfo = savedPaymentMethodData
                ? savedPaymentMethodToBillingInfo(savedPaymentMethodData)
                : (typeof selectedBillingInfo === "string" ? null : selectedBillingInfo);
            setViewState((prevViewState) => (Object.assign(Object.assign({}, prevViewState), { taxes: { status: billingInfo ? "loading" : "error" } })));
            if (billingInfo) {
                getTaxQuoteTimestampRef.current = Date.now();
                calculateTaxes(billingInfo);
            }
        }
        else {
            setViewState((prevViewState) => (Object.assign(Object.assign({}, prevViewState), { taxes: { status: selectedBillingInfo ? "loading" : "incomplete" } })));
        }
    }, [selectedBillingInfo, savedPaymentMethods, showSaved, calculateTaxes]);
    useEffect(() => {
        onTaxesChange(taxes);
    }, [onTaxesChange, taxes]);
    const handleShowForm = useCallback((savedPaymentMethodAddressId) => {
        if (savedPaymentMethodAddressId && typeof savedPaymentMethodAddressId === "string") {
            savedPaymentMethodAddressIdRef.current = savedPaymentMethodAddressId;
            const data = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);
            if (data)
                onBillingInfoSelected(savedPaymentMethodToBillingInfo(data));
        }
        else {
            onBillingInfoSelected("");
        }
        setViewState({ isDeleting: false, showSaved: false, taxes: { status: "loading" } });
    }, [onBillingInfoSelected, savedPaymentMethods]);
    const handleShowSaved = useCallback(() => {
        const savedPaymentMethodAddressId = savedPaymentMethodAddressIdRef.current;
        if (savedPaymentMethodAddressId)
            onBillingInfoSelected(savedPaymentMethodAddressId);
        setViewState({ isDeleting: false, showSaved: true, taxes: { status: "loading" } });
    }, [onBillingInfoSelected]);
    const handleSubmit = useCallback((data) => {
        if (taxes.status !== "complete")
            return;
        const savedPaymentMethodAddressId = getSavedPaymentMethodAddressIdFromBillingInfo(data);
        const savedPaymentMethodData = savedPaymentMethods.find(({ addressId }) => addressId === savedPaymentMethodAddressId);
        onBillingInfoSelected(savedPaymentMethodData ? savedPaymentMethodAddressId : data);
        onNext();
    }, [savedPaymentMethods, onBillingInfoSelected, onNext, taxes.status]);
    const handleSavedPaymentMethodDeleted = useCallback((savedPaymentMethodId) => __awaiter(void 0, void 0, void 0, function* () {
        setViewState(({ taxes }) => ({ isDeleting: true, showSaved: true, taxes }));
        yield onSavedPaymentMethodDeleted(savedPaymentMethodId);
        const remainingPaymentMethods = savedPaymentMethods.length - savedPaymentMethods.filter(({ addressId }) => addressId === savedPaymentMethodId).length;
        setViewState(({ taxes }) => ({ isDeleting: false, showSaved: remainingPaymentMethods > 0, taxes }));
    }), [onSavedPaymentMethodDeleted, savedPaymentMethods]);
    const handleFormAttemptSubmit = useCallback(() => setFormSubmitAttempted(true), []);
    useEffect(() => {
        const selectedPaymentInfoMatch = typeof selectedBillingInfo === "string" && savedPaymentMethods.some(({ addressId }) => addressId === selectedBillingInfo);
        if (showSaved && !selectedPaymentInfoMatch && savedPaymentMethods.length > 0 /* && !checkoutError */) {
            onBillingInfoSelected(savedPaymentMethods[0].addressId);
        }
    }, [showSaved, savedPaymentMethods, selectedBillingInfo, onBillingInfoSelected /*, checkoutError*/]);
    return (React__default.createElement(Stack, { direction: {
            xs: "column",
            sm: "column",
            md: "row",
        }, spacing: 8.75 },
        React__default.createElement(Stack, { sx: { display: 'flex', flex: 1, overflow: "hidden" } },
            React__default.createElement(CheckoutStepper, { progress: 50 }),
            showSaved ? (React__default.createElement(SavedBillingDetailsSelector, { showLoader: isDeleting, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodAddressId: typeof selectedBillingInfo === "string" ? selectedBillingInfo : undefined, taxes: taxes, onNew: handleShowForm, onEdit: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onBillingInfoSelected, onNext: onNext, onClose: onClose, onAttemptSubmit: handleFormAttemptSubmit })) : (React__default.createElement(BillingInfoForm
            // variant="loggedIn"
            , { 
                // variant="loggedIn"
                defaultValues: typeof selectedBillingInfo === "string" ? undefined : selectedBillingInfo, checkoutError: checkoutError, taxes: taxes, onTaxInfoChange: handleTaxInfoChange, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit, onAttemptSubmit: handleFormAttemptSubmit, debug: debug }))),
        React__default.createElement(CheckoutDeliveryAndItemCostBreakdown, { checkoutItems: checkoutItems, taxes: taxes, validatePersonalDeliveryAddress: formSubmitAttempted, walletAddress: walletAddress, onWalletAddressChange: onWalletAddressChange, dictionary: dictionary })));
};

export { BillingView };
//# sourceMappingURL=BillingView.js.map
