import React__default, { useCallback } from 'react';
import { useTheme, useMediaQuery, Stack, Typography, Tooltip } from '@mui/material';
import default_1$1 from '../../../../node_modules/@mui/icons-material/AccountBalance.js';
import default_1 from '../../../../node_modules/@mui/icons-material/CreditCard.js';
import default_1$2 from '../../../../node_modules/@mui/icons-material/Language.js';
import Icon from '@mdi/react';
import { mdiEthereum } from '@mdi/js';
import ToggleButtonGroup from '../../../../node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js';
import ToggleButton from '../../../../node_modules/@mui/material/ToggleButton/ToggleButton.js';

const PAYMENT_METHOD_OPTION_PROPS = {
    CreditCard: {
        label: "Credit Card",
        icon: React__default.createElement(default_1, null)
    },
    ACH: {
        label: "ACH",
        icon: React__default.createElement(default_1$1, { sx: { fontSize: "20px" } })
    },
    Wire: {
        label: "Wire",
        icon: React__default.createElement(default_1$2, { sx: { fontSize: "20px" } })
    },
    Crypto: {
        label: "Crypto",
        icon: React__default.createElement(Icon, { path: mdiEthereum, size: "20px" })
    }
};
const PaymentMethodSelector = ({ paymentMethods, selectedPaymentMethod, onPaymentMethodChange }) => {
    const theme = useTheme();
    const wideViewport = useMediaQuery(theme.breakpoints.up("sm"));
    const handleChange = useCallback((_, paymentMethod) => {
        if (paymentMethod)
            onPaymentMethodChange(paymentMethod);
    }, [onPaymentMethodChange]);
    return (React__default.createElement(ToggleButtonGroup, { value: selectedPaymentMethod, exclusive: true, onChange: handleChange, "aria-label": "payment method", sx: { mb: 3.5 } }, paymentMethods.map((paymentMethod) => {
        const { label, icon } = PAYMENT_METHOD_OPTION_PROPS[paymentMethod];
        return wideViewport ? (React__default.createElement(ToggleButton, { key: paymentMethod, value: paymentMethod, "aria-label": paymentMethod },
            React__default.createElement(Stack, { spacing: 1, direction: "row", sx: {
                    alignItems: "center"
                } },
                icon,
                React__default.createElement(Typography, { sx: { fontWeight: 500 } }, label)))) : (React__default.createElement(Tooltip, { key: paymentMethod, title: label },
            React__default.createElement(ToggleButton, { value: paymentMethod, "aria-label": paymentMethod }, icon)));
    })));
};

export { PaymentMethodSelector };
//# sourceMappingURL=PaymentMethodSelector.js.map
