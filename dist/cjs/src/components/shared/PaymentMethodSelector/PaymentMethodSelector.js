'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var material = require('@mui/material');
var AccountBalance = require('../../../../node_modules/@mui/icons-material/AccountBalance.js');
var CreditCard = require('../../../../node_modules/@mui/icons-material/CreditCard.js');
var Language = require('../../../../node_modules/@mui/icons-material/Language.js');
var Icon = require('@mdi/react');
var js = require('@mdi/js');
var ToggleButtonGroup = require('../../../../node_modules/@mui/material/ToggleButtonGroup/ToggleButtonGroup.js');
var ToggleButton = require('../../../../node_modules/@mui/material/ToggleButton/ToggleButton.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Icon__default = /*#__PURE__*/_interopDefaultLegacy(Icon);

const PAYMENT_METHOD_OPTION_PROPS = {
    CreditCard: {
        label: "Credit Card",
        icon: React__default["default"].createElement(CreditCard["default"], null)
    },
    ACH: {
        label: "ACH",
        icon: React__default["default"].createElement(AccountBalance["default"], { sx: { fontSize: "20px" } })
    },
    Wire: {
        label: "Wire",
        icon: React__default["default"].createElement(Language["default"], { sx: { fontSize: "20px" } })
    },
    Crypto: {
        label: "Crypto",
        icon: React__default["default"].createElement(Icon__default["default"], { path: js.mdiEthereum, size: "20px" })
    }
};
const PaymentMethodSelector = ({ paymentMethods, selectedPaymentMethod, onPaymentMethodChange }) => {
    const theme = material.useTheme();
    const wideViewport = material.useMediaQuery(theme.breakpoints.up("sm"));
    const handleChange = React.useCallback((_, paymentMethod) => {
        if (paymentMethod)
            onPaymentMethodChange(paymentMethod);
    }, [onPaymentMethodChange]);
    return (React__default["default"].createElement(ToggleButtonGroup["default"], { value: selectedPaymentMethod, exclusive: true, onChange: handleChange, "aria-label": "payment method", sx: { mb: 3.5 } }, paymentMethods.map((paymentMethod) => {
        const { label, icon } = PAYMENT_METHOD_OPTION_PROPS[paymentMethod];
        return wideViewport ? (React__default["default"].createElement(ToggleButton["default"], { key: paymentMethod, value: paymentMethod, "aria-label": paymentMethod },
            React__default["default"].createElement(material.Stack, { spacing: 1, direction: "row", sx: {
                    alignItems: "center"
                } },
                icon,
                React__default["default"].createElement(material.Typography, { sx: { fontWeight: 500 } }, label)))) : (React__default["default"].createElement(material.Tooltip, { key: paymentMethod, title: label },
            React__default["default"].createElement(ToggleButton["default"], { value: paymentMethod, "aria-label": paymentMethod }, icon)));
    })));
};

exports.PaymentMethodSelector = PaymentMethodSelector;
//# sourceMappingURL=PaymentMethodSelector.js.map
