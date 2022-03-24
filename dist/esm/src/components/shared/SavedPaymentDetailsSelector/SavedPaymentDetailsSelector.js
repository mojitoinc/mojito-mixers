import { InputGroupLabel } from '../InputGroupLabel/InputGroupLabel.js';
import default_1 from '../../../../node_modules/@mui/icons-material/Add.js';
import { StackList } from '../StackList/StackList.js';
import { SecondaryButton } from '../SecondaryButton/SecondaryButton.js';
import { PaymentDetailsItem } from '../../payments/PaymentDetailsItem/Item/PaymentDetailsItem.js';
import { CheckoutModalFooter } from '../../payments/CheckoutModalFooter/CheckoutModalFooter.js';
import React__default, { useMemo, useState, useEffect, useCallback } from 'react';
import { Box, alpha, CircularProgress, Typography } from '@mui/material';
import { OVERLAY_OPACITY } from '../../../config/theme/themeConstants.js';
import { getCreditCardNetworkFromLabel, getCvvIsValid } from '../../../domain/payment/payment.utils.js';
import { withInvalidCVV } from '../../../utils/validationUtils.js';
import { getCardTypeByType } from '../../../domain/react-payment-inputs/react-payment-inputs.utils.js';

const SavedPaymentDetailsSelector = ({ showLoader, acceptedCreditCardNetworks, savedPaymentMethods, selectedPaymentMethodId, onNew, onDelete, onPick, onCvvSelected, onNext, onClose, onAttemptSubmit, consentType, }) => {
    const { creditCardNetwork, cvvLabel, isCvvRequired } = useMemo(() => {
        const selectedPaymentMethod = savedPaymentMethods.find(savedPaymentMethod => savedPaymentMethod.id === selectedPaymentMethodId);
        if (!selectedPaymentMethod || selectedPaymentMethod.type !== "CreditCard") {
            return {
                creditCardNetwork: "",
                cvvLabel: "",
                isCvvRequired: false,
            };
        }
        const creditCardNetwork = getCreditCardNetworkFromLabel(selectedPaymentMethod.network);
        const cvvLabel = getCardTypeByType(creditCardNetwork).code.name;
        return {
            creditCardNetwork,
            cvvLabel,
            isCvvRequired: true,
        };
    }, [savedPaymentMethods, selectedPaymentMethodId]);
    const [{ isFormSubmitted, cvv, }, setSelectorState] = useState({
        isFormSubmitted: false,
        cvv: "",
    });
    useEffect(() => {
        // Reset CVV if user selects a different payment method:
        setSelectorState(({ isFormSubmitted }) => ({ isFormSubmitted, cvv: "" }));
    }, [selectedPaymentMethodId]);
    const { cvvExpectedLength, isCvvValid } = getCvvIsValid(cvv, creditCardNetwork, acceptedCreditCardNetworks, isCvvRequired);
    const cvvError = isFormSubmitted && !isCvvValid;
    const handleNextClicked = useCallback((canSubmit) => {
        onAttemptSubmit();
        if (canSubmit && selectedPaymentMethodId && isCvvValid) {
            onCvvSelected(cvv);
            onNext();
            return;
        }
        setSelectorState(({ cvv }) => ({ isFormSubmitted: true, cvv }));
    }, [onAttemptSubmit, selectedPaymentMethodId, cvv, isCvvValid, onCvvSelected, onNext]);
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
                    cvvLabel,
                    cvvError,
                    onCvvChange: handleCvvChange,
                }), component: PaymentDetailsItem, itemKey: getPaymentMethodId, deps: [selectedPaymentMethodId, showLoader, onDelete, onPick, cvvLabel, cvvError, handleCvvChange] }),
            cvvError && (React__default.createElement(Typography, { variant: "caption", component: "p", sx: { mt: 2, color: theme => theme.palette.warning.dark } }, withInvalidCVV({ cvvLabel, cvvExpectedLength }))),
            React__default.createElement(SecondaryButton, { onClick: onNew, startIcon: React__default.createElement(default_1, null), sx: { mt: 2.5 }, disabled: showLoader }, "Add New Payment Method"),
            isFormSubmitted && !selectedPaymentMethodId && (React__default.createElement(Typography, { variant: "caption", component: "p", sx: { mt: 2, color: theme => theme.palette.warning.dark } }, "You must select a saved and approved payment method or create a new one."))),
        React__default.createElement(CheckoutModalFooter, { variant: "toConfirmation", consentType: consentType, onSubmitClicked: handleNextClicked, onCloseClicked: onClose })));
};

export { SavedPaymentDetailsSelector };
//# sourceMappingURL=SavedPaymentDetailsSelector.js.map
