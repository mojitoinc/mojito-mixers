import { InputGroupLabel } from '../InputGroupLabel/InputGroupLabel.js';
import default_1 from '../../../../node_modules/@mui/icons-material/Add.js';
import { StackList } from '../StackList/StackList.js';
import { SecondaryButton } from '../SecondaryButton/SecondaryButton.js';
import { PaymentDetailsItem } from '../../payments/PaymentDetailsItem/Item/PaymentDetailsItem.js';
import { CheckoutModalFooter } from '../../payments/CheckoutModalFooter/CheckoutModalFooter.js';
import React__default, { useMemo, useState, useEffect, useCallback } from 'react';
import { Box, alpha, CircularProgress, Typography } from '@mui/material';
import { OVERLAY_OPACITY } from '../../../config/theme/themeConstants.js';
import { getCVCIsValid } from '../../../domain/payment/payment.utils.js';

function validateCvv(isCvvRequired, cvv) {
    return !isCvvRequired || getCVCIsValid(cvv);
}
const SavedPaymentDetailsSelector = ({ showLoader, savedPaymentMethods, selectedPaymentMethodId, onNew, onDelete, onPick, onCvvSelected, onNext, onClose, onAttemptSubmit, consentType, }) => {
    const isCvvRequired = useMemo(() => {
        const selectedPaymentMethod = savedPaymentMethods.find(savedPaymentMethod => savedPaymentMethod.id === selectedPaymentMethodId);
        return (selectedPaymentMethod === null || selectedPaymentMethod === void 0 ? void 0 : selectedPaymentMethod.type) === "CreditCard";
    }, [savedPaymentMethods, selectedPaymentMethodId]);
    const [{ isFormSubmitted, cvv, }, setSelectorState] = useState({
        isFormSubmitted: false,
        cvv: "",
    });
    useEffect(() => {
        // Reset CVV if user selects a different payment method:
        setSelectorState(({ isFormSubmitted }) => ({ isFormSubmitted, cvv: "" }));
    }, [selectedPaymentMethodId]);
    const isCvvOk = validateCvv(isCvvRequired, cvv);
    const cvvError = isFormSubmitted && !isCvvOk;
    const handleNextClicked = useCallback((canSubmit) => {
        onAttemptSubmit();
        if (canSubmit && selectedPaymentMethodId && isCvvOk) {
            onCvvSelected(cvv);
            onNext();
            return;
        }
        setSelectorState(({ cvv }) => ({ isFormSubmitted: true, cvv }));
    }, [onAttemptSubmit, selectedPaymentMethodId, cvv, isCvvOk, onCvvSelected, onNext]);
    const handleCvvChange = useCallback((e) => {
        const cvv = e.currentTarget.value || "";
        setSelectorState(({ isFormSubmitted }) => ({ isFormSubmitted, cvv }));
    }, []);
    const getPaymentMethodId = useCallback((savedPaymentMethod) => savedPaymentMethod.id, []);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Box, { sx: { position: "relative", mb: consentType === "checkbox" ? 5 : 0 } },
            showLoader ? (React__default.createElement(Box, { sx: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme => alpha(theme.palette.background.default, OVERLAY_OPACITY),
                    zIndex: 100,
                } },
                React__default.createElement(CircularProgress, { color: "secondary" }))) : null,
            React__default.createElement(InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Saved Payment Methods"),
            React__default.createElement(StackList, { data: savedPaymentMethods, additionalProps: (savedPaymentMethod) => ({
                    active: savedPaymentMethod.id === selectedPaymentMethodId,
                    disabled: showLoader,
                    onDelete,
                    onPick,
                    cvvError,
                    onCvvChange: handleCvvChange,
                }), component: PaymentDetailsItem, itemKey: getPaymentMethodId, deps: [selectedPaymentMethodId, showLoader, onDelete, onPick, cvvError, handleCvvChange] }),
            cvvError && (React__default.createElement(Typography, { variant: "caption", component: "p", sx: { mt: 2, color: theme => theme.palette.warning.dark } }, "You must enter a valid CVV number.")),
            React__default.createElement(SecondaryButton, { onClick: onNew, startIcon: React__default.createElement(default_1, null), sx: { mt: 2.5 }, disabled: showLoader }, "Add New Payment Method"),
            isFormSubmitted && !selectedPaymentMethodId && (React__default.createElement(Typography, { variant: "caption", component: "p", sx: { mt: 2, color: theme => theme.palette.warning.dark } }, "You must select a saved and approved payment method or create a new one."))),
        React__default.createElement(CheckoutModalFooter, { variant: "toConfirmation", consentType: consentType, onSubmitClicked: handleNextClicked, onCloseClicked: onClose })));
};

export { SavedPaymentDetailsSelector, validateCvv };
//# sourceMappingURL=SavedPaymentDetailsSelector.js.map
