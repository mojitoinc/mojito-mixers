import { __awaiter } from '../../../node_modules/tslib/tslib.es6.js';
import React__default, { useMemo, useState, useCallback, useEffect } from 'react';
import { CheckoutItemCostBreakdown } from '../../components/payments/CheckoutItemCost/Breakdown/CheckoutItemCostBreakdown.js';
import { CheckoutStepper } from '../../components/payments/CheckoutStepper/CheckoutStepper.js';
import { PaymentMethodForm } from '../../forms/PaymentMethodForm.js';
import { SavedPaymentDetailsSelector } from '../../components/shared/SavedPaymentDetailsSelector/SavedPaymentDetailsSelector.js';
import { BillingInfoItem } from '../../components/payments/BillingInfo/Item/BillingInfoItem.js';
import { billingInfoToSavedPaymentMethodBillingInfo } from '../../domain/circle/circle.utils.js';
import { Stack, Divider } from '@mui/material';
import { usePlaid } from '../../hooks/usePlaid.js';
import { checkNeedsGenericErrorMessage } from '../../hooks/useFormCheckoutError.js';

const billingInfoItemBoxProps = { sx: { mt: 2.5 } };
const PaymentView = ({ checkoutItems, taxes, savedPaymentMethods: rawSavedPaymentMethods, selectedPaymentMethod, checkoutError, onPaymentInfoSelected, onCvvSelected, onSavedPaymentMethodDeleted, onNext, onPrev, onClose, acceptedPaymentTypes, consentType, privacyHref, termsOfUseHref, wirePaymentsDisclaimerText, debug, }) => {
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
        React__default.createElement(Stack, { sx: { display: 'flex', flex: 1, overflow: "hidden" } },
            React__default.createElement(CheckoutStepper, { progress: 100 }),
            React__default.createElement(BillingInfoItem, { data: selectedPaymentMethodBillingInfo, additionalProps: { onEdit: onPrev, disabled: isDeleting, boxProps: billingInfoItemBoxProps } }),
            React__default.createElement(Divider, { sx: { mt: 2.5 } }),
            showSaved ? (React__default.createElement(SavedPaymentDetailsSelector, { showLoader: isDeleting, savedPaymentMethods: savedPaymentMethods, selectedPaymentMethodId: typeof selectedPaymentInfo === "string" ? selectedPaymentInfo : undefined, onNew: handleShowForm, onDelete: handleSavedPaymentMethodDeleted, onPick: onPaymentInfoSelected, onCvvSelected: onCvvSelected, onNext: onNext, onClose: onClose, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref })) : (React__default.createElement(PaymentMethodForm, { acceptedPaymentTypes: acceptedPaymentTypes, defaultValues: typeof selectedPaymentInfo === "string" ? undefined : selectedPaymentInfo, checkoutError: checkoutError, onPlaidLinkClicked: onPlaidLinkClicked, onSaved: savedPaymentMethods.length > 0 ? handleShowSaved : undefined, onClose: onClose, onSubmit: handleSubmit, consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, wirePaymentsDisclaimerText: wirePaymentsDisclaimerText, debug: debug }))),
        React__default.createElement(CheckoutItemCostBreakdown, { checkoutItems: checkoutItems, taxes: taxes })));
};

export { PaymentView };
//# sourceMappingURL=PaymentView.js.map
