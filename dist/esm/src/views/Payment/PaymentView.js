import { __awaiter } from '../../../node_modules/tslib/tslib.es6.js';
import React__default, { useMemo, useState, useCallback, useEffect } from 'react';
import { CheckoutDeliveryAndItemCostBreakdown } from '../../components/payments/CheckoutDeliveryAndItemCostBreakdown/CheckoutDeliveryAndItemCostBreakdown.js';
import { CheckoutStepper } from '../../components/payments/CheckoutStepper/CheckoutStepper.js';
import { PaymentMethodForm } from '../../forms/PaymentMethodForm.js';
import { SavedPaymentDetailsSelector } from '../../components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.js';
import { BillingInfoItem } from '../../components/payments/BillingInfo/Item/BillingInfoItem.js';
import { billingInfoToSavedPaymentMethodBillingInfo } from '../../domain/circle/circle.utils.js';
import { Stack, Divider } from '@mui/material';
import { usePlaid } from '../../hooks/usePlaid.js';
import { checkNeedsGenericErrorMessage } from '../../hooks/useFormCheckoutError.js';

const billingInfoItemBoxProps = { sx: { mt: 2.5 } };
const PaymentView = ({ checkoutItems, taxes, savedPaymentMethods: rawSavedPaymentMethods, selectedPaymentMethod, wallets, wallet, checkoutError, onPaymentInfoSelected, onCvvSelected, onSavedPaymentMethodDeleted, onWalletChange, onNext, onPrev, onClose, acceptedPaymentTypes, consentType, debug, }) => {
    const { billingInfo: selectedBillingInfo, paymentInfo: selectedPaymentInfo, } = selectedPaymentMethod;
    const savedPaymentMethods = useMemo(() => {
        if (typeof selectedBillingInfo !== "string")
            return [];
        return rawSavedPaymentMethods.filter(({ addressId, type }) => addressId === selectedBillingInfo && acceptedPaymentTypes.includes(type));
    }, [acceptedPaymentTypes, rawSavedPaymentMethods, selectedBillingInfo]);
    const selectedPaymentMethodBillingInfo = useMemo(() => {
        return typeof selectedBillingInfo === "string"
            ? rawSavedPaymentMethods.find(({ addressId }) => addressId === selectedBillingInfo)
            : billingInfoToSavedPaymentMethodBillingInfo(selectedBillingInfo);
    }, [rawSavedPaymentMethods, selectedBillingInfo]);
    const [{ isDeleting, showSaved }, setViewState] = useState({
        isDeleting: false,
        showSaved: savedPaymentMethods.length > 0 && typeof selectedBillingInfo === "string" && !checkNeedsGenericErrorMessage("payment", checkoutError),
    });
    const [formSubmitAttempted, setFormSubmitAttempted] = useState(false);
    const handleShowForm = useCallback(() => {
        setViewState({ isDeleting: false, showSaved: false });
    }, []);
    const handleShowSaved = useCallback(() => {
        setViewState({ isDeleting: false, showSaved: true });
    }, []);
    const handleSubmit = useCallback((data) => {
        onPaymentInfoSelected(data);
        onNext();
    }, [onPaymentInfoSelected, onNext]);
    const handleSavedPaymentMethodDeleted = useCallback((savedPaymentMethodId) => __awaiter(void 0, void 0, void 0, function* () {
        setViewState({ isDeleting: true, showSaved: true });
        yield onSavedPaymentMethodDeleted(savedPaymentMethodId);
        const remainingPaymentMethods = savedPaymentMethods.length - 1;
        setViewState({ isDeleting: false, showSaved: remainingPaymentMethods > 0 });
    }), [onSavedPaymentMethodDeleted, savedPaymentMethods.length]);
    const handleFormAttemptSubmit = useCallback(() => setFormSubmitAttempted(true), []);
    useEffect(() => {
        if (!selectedPaymentMethodBillingInfo)
            onPrev();
    }, [selectedPaymentMethodBillingInfo, onPrev]);
    useEffect(() => {
        const selectedPaymentInfoMatch = typeof selectedPaymentInfo === "string" && savedPaymentMethods.some(({ id }) => id === selectedPaymentInfo);
        const firstActiveSavedPaymentMethod = savedPaymentMethods.find(({ status }) => status === "complete");
        if (showSaved && !selectedPaymentInfoMatch && firstActiveSavedPaymentMethod /* && savedPaymentMethods.length > 0 && !checkoutError */) {
            onPaymentInfoSelected(firstActiveSavedPaymentMethod.id);
        }
    }, [showSaved, onPaymentInfoSelected, savedPaymentMethods, selectedPaymentInfo /*, checkoutError*/]);
    // PLAIN LINKS:
    const onPlaidLinkClicked = usePlaid({
        selectedBillingInfo,
    });
    // TODO: Handle errors properly:
    if (!selectedPaymentMethodBillingInfo)
        return null;
    return (React__default.createElement(Stack, { direction: {
            xs: "column",
            sm: "column",
            md: "row",
        }, spacing: 8.75 },
        React__default.createElement(Stack, { sx: { display: "flex", overflow: "hidden", width: { xs: "100%", md: "calc(50% - 35px)" } } },
            React__default.createElement(CheckoutStepper, { progress: 100 }),
            React__default.createElement(BillingInfoItem, { data: selectedPaymentMethodBillingInfo, additionalProps: { onEdit: onPrev, disabled: isDeleting, boxProps: billingInfoItemBoxProps } }),
            React__default.createElement(Divider, { sx: { mt: 2.5 } }),
            showSaved ? (React__default.createElement(SavedPaymentDetailsSelector, { showLoader: isDeleting, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodId: typeof selectedPaymentInfo === "string" ? selectedPaymentInfo : undefined, onNew: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onPaymentInfoSelected, onCvvSelected: onCvvSelected, onNext: onNext, onClose: onClose, onAttemptSubmit: handleFormAttemptSubmit, consentType: consentType })) : (React__default.createElement(PaymentMethodForm, { acceptedPaymentTypes: acceptedPaymentTypes, defaultValues: typeof selectedPaymentInfo === "string" ? undefined : selectedPaymentInfo, checkoutError: checkoutError, onPlaidLinkClicked: onPlaidLinkClicked, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit, onAttemptSubmit: handleFormAttemptSubmit, consentType: consentType, debug: debug }))),
        React__default.createElement(CheckoutDeliveryAndItemCostBreakdown, { checkoutItems: checkoutItems, taxes: taxes, validatePersonalDeliveryAddress: formSubmitAttempted, wallets: wallets, wallet: wallet, onWalletChange: onWalletChange })));
};

export { PaymentView };
//# sourceMappingURL=PaymentView.js.map
