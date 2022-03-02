import { InputGroupLabel } from '../InputGroupLabel/InputGroupLabel.js';
import default_1 from '../../../../node_modules/@mui/icons-material/Add.js';
import { StackList } from '../StackList/StackList.js';
import React__default, { useCallback } from 'react';
import { BillingInfoItem } from '../../payments/BillingInfo/Item/BillingInfoItem.js';
import { SecondaryButton } from '../SecondaryButton/SecondaryButton.js';
import { CheckoutModalFooter } from '../../payments/CheckoutModalFooter/CheckoutModalFooter.js';
import { Box, alpha, CircularProgress } from '@mui/material';
import { OVERLAY_OPACITY } from '../../../config/theme/theme.js';
import { TaxesMessagesBox } from '../TaxesMessagesBox/TaxesMessagesBox.js';

const SavedBillingDetailsSelector = ({ showLoader, savedPaymentMethods, selectedPaymentMethodAddressId, taxes, onNew, onEdit, onDelete, onPick, onNext, onClose, onAttemptSubmit, }) => {
    const getPaymentMethodAddressId = useCallback((savedPaymentMethod) => savedPaymentMethod.addressId, []);
    const handleNextClicked = useCallback(() => {
        onAttemptSubmit();
        onNext();
    }, [onAttemptSubmit, onNext]);
    return (React__default.createElement(React__default.Fragment, null,
        React__default.createElement(Box, { sx: { position: "relative" } },
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
            React__default.createElement(InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Saved Billing Info"),
            React__default.createElement(StackList, { data: savedPaymentMethods, additionalProps: (savedPaymentMethod) => ({
                    active: savedPaymentMethod.addressId === selectedPaymentMethodAddressId,
                    disabled: showLoader,
                    onDelete,
                    onPick,
                    onEdit,
                }), component: BillingInfoItem, itemKey: getPaymentMethodAddressId, deps: [selectedPaymentMethodAddressId, showLoader, onDelete, onPick, onEdit] }),
            React__default.createElement(SecondaryButton, { onClick: onNew, startIcon: React__default.createElement(default_1, null), sx: { mt: 2.5 }, disabled: showLoader }, "Add New Billing Info"),
            React__default.createElement(TaxesMessagesBox, { sx: { mt: 5 }, taxes: taxes, variant: "selector" })),
        React__default.createElement(CheckoutModalFooter, { variant: "toPayment", buttonLabel: taxes.status === "loading" ? "Calculating taxes..." : undefined, submitDisabled: taxes.status !== "complete", onSubmitClicked: handleNextClicked, onCloseClicked: onClose })));
};

export { SavedBillingDetailsSelector };
//# sourceMappingURL=SavedBillingDetailsSelector.js.map
