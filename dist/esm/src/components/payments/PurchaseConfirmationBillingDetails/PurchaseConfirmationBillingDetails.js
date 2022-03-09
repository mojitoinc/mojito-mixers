import { Box, Stack, Typography, Chip, InputAdornment } from '@mui/material';
import React__default from 'react';
import { CreditCardIcon } from '../../shared/Icons/Icons.js';
import { ReadOnlyField, ReadOnlyCardField } from '../../shared/ReadOnlyField/ReadOnlyField.js';
import { CheckoutItemCostPurchase } from '../CheckoutItemCost/Purchase/CheckoutItemCostPurchase.js';
import { PAYMENT_TYPE_LABEL } from './PurchaseConfirmationBillingDetails.constants.js';
import { getFormattedPaymentMethod } from './PurchaseConfirmationBillingDetails.utils.js';
import default_1 from '../../../../node_modules/@mui/icons-material/Check.js';
import DeliveryWalletDetails from '../DeliveryWallet/DeliveryWalletDetails.js';
import { CopyButton } from '../../shared/CopyButton/CopyButton.js';

const PurchaseConfirmationBillingDetails = ({ checkoutItems, circlePaymentID, walletAddress, wallets, selectedPaymentMethodBillingInfo, selectedPaymentMethodPaymentInfo, dictionary }) => {
    const { isMasked, paymentType, displayValue, network, } = getFormattedPaymentMethod(selectedPaymentMethodPaymentInfo);
    const icon = network ? React__default.createElement(CreditCardIcon, { network: network }) : null;
    return (React__default.createElement(Box, { sx: { display: 'flex', flexDirection: 'column', flex: 1, position: "relative" } },
        React__default.createElement(Stack, { spacing: 2, direction: { xs: "column", sm: "row" }, sx: {
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                pt: 2
            } },
            React__default.createElement(Typography, { variant: "h5" }, "Purchase Confirmation"),
            React__default.createElement(Chip, { size: "small", color: "success", label: (React__default.createElement(React__default.Fragment, null,
                    "Payment Processed",
                    React__default.createElement(default_1, { sx: { height: "24px", ml: 1.5 } }))) })),
        React__default.createElement(Stack, { spacing: 2, direction: { xs: "column", sm: "row" }, sx: {
                justifyContent: "space-between",
                alignItems: { xs: "flex-start", sm: "center" },
                pt: 1.5,
                pb: { xs: 2.5, sm: 1.5 }
            } },
            isMasked ? (React__default.createElement(ReadOnlyField, { label: PAYMENT_TYPE_LABEL[paymentType], value: displayValue, InputProps: icon ? {
                    endAdornment: (React__default.createElement(InputAdornment, { position: "end" }, icon)),
                } : undefined })) : (React__default.createElement(ReadOnlyCardField, { label: PAYMENT_TYPE_LABEL[paymentType], value: displayValue })),
            React__default.createElement(ReadOnlyField, { label: "Reference No.", value: circlePaymentID || "-", InputProps: circlePaymentID ? {
                    endAdornment: (React__default.createElement(CopyButton, { label: "Reference No.", value: circlePaymentID, size: "small" })),
                } : undefined })),
        React__default.createElement(CheckoutItemCostPurchase, { checkoutItems: checkoutItems, selectedPaymentMethodBillingInfo: selectedPaymentMethodBillingInfo }),
        React__default.createElement(DeliveryWalletDetails, { walletAddress: walletAddress, wallets: wallets, dictionary: dictionary })));
};

export { PurchaseConfirmationBillingDetails };
//# sourceMappingURL=PurchaseConfirmationBillingDetails.js.map
