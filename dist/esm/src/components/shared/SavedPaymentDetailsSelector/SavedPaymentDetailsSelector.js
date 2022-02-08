import { InputGroupLabel } from '../InputGroupLabel/InputGroupLabel.js';
import default_1 from '../../../../node_modules/@mui/icons-material/Add.js';
import { StackList } from '../StackList/StackList.js';
import { SecondaryButton } from '../SecondaryButton/SecondaryButton.js';
import { PaymentDetailsItem } from '../../payments/PaymentDetailsItem/Item/PaymentDetailsItem.js';
import { CheckoutModalFooter } from '../../payments/CheckoutModalFooter/CheckoutModalFooter.js';
import React__default, { useState, useCallback } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

var SavedPaymentDetailsSelector = function (_a) {
    var showLoader = _a.showLoader, savedPaymentMethods = _a.savedPaymentMethods, selectedPaymentMethodId = _a.selectedPaymentMethodId, onNew = _a.onNew, onDelete = _a.onDelete, onPick = _a.onPick, onNext = _a.onNext, onClose = _a.onClose, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref;
    var _b = useState(false), isFormSubmitted = _b[0], setIsFormSubmitted = _b[1];
    var handleNextClicked = useCallback(function (canSubmit) {
        if (canSubmit && selectedPaymentMethodId) {
            onNext();
        }
        else if (!selectedPaymentMethodId) {
            setIsFormSubmitted(true);
        }
    }, [selectedPaymentMethodId, onNext]);
    var getPaymentMethodId = useCallback(function (savedPaymentMethod) { return savedPaymentMethod.id; }, []);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Box, { sx: { position: "relative", mb: consentType === "checkbox" ? 5 : 0 } },
            showLoader ? (React__default.createElement(Box, { sx: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: "rgba(255, 255, 255, 0.75)",
                    zIndex: 100,
                } },
                React__default.createElement(CircularProgress, { color: "secondary" }))) : null,
            React__default.createElement(InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Saved Payment Methods"),
            React__default.createElement(StackList, { data: savedPaymentMethods, additionalProps: function (savedPaymentMethod) { return ({
                    active: savedPaymentMethod.id === selectedPaymentMethodId,
                    disabled: showLoader,
                    onDelete: onDelete,
                    onPick: onPick,
                }); }, component: PaymentDetailsItem, itemKey: getPaymentMethodId, deps: [onDelete, onPick, selectedPaymentMethodId, showLoader] }),
            React__default.createElement(SecondaryButton, { onClick: onNew, startIcon: React__default.createElement(default_1, null), sx: { mt: 2.5 }, disabled: showLoader }, "Add New Payment Method"),
            isFormSubmitted && !selectedPaymentMethodId && (React__default.createElement(Typography, { variant: "caption", component: "p", sx: { mt: 2, color: function (theme) { return theme.palette.warning.dark; } } }, "You must select a saved and approved payment method or create a new one."))),
        React__default.createElement(CheckoutModalFooter, { variant: "toConfirmation", consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, onSubmitClicked: handleNextClicked, onCloseClicked: onClose })));
};

export { SavedPaymentDetailsSelector };
//# sourceMappingURL=SavedPaymentDetailsSelector.js.map
