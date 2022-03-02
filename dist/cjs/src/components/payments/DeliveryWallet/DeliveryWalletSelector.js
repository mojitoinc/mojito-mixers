'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var DisplayBox = require('../DisplayBox/DisplayBox.js');
var Checkbox = require('../../shared/Checkbox/Checkbox.js');
var InputGroupLabel = require('../../shared/InputGroupLabel/InputGroupLabel.js');
var TextField = require('../../shared/TextField/TextField.js');
var validationUtils = require('../../../utils/validationUtils.js');
var wallet_utils = require('../../../domain/wallet/wallet.utils.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const WALLET_ADDRESS_FIELD_LABEL = "Wallet Address";
const INVALID_WALLET_ADDRESS_MESSAGE = validationUtils.withInvalidErrorMessage({ label: WALLET_ADDRESS_FIELD_LABEL });
const DeliveryWalletSelector = ({ validatePersonalAddress, walletAddress, onWalletAddressChange, dictionary, }) => {
    const handleCheckboxChange = React.useCallback((e) => {
        onWalletAddressChange(e.target.checked ? "" : null);
    }, [onWalletAddressChange]);
    const handleInputChange = React.useCallback((e) => {
        onWalletAddressChange(e.target.value);
    }, [onWalletAddressChange]);
    const usePersonalWallet = typeof walletAddress === "string";
    const isAddressOk = wallet_utils.isValidWalletAddress(walletAddress);
    const showAddressError = validatePersonalAddress && !isAddressOk;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Wallet Delivery Address"),
        React__default["default"].createElement(DisplayBox.DisplayBox, { sx: { border: 0, mb: 0.5 } },
            React__default["default"].createElement(material.Typography, null, dictionary.walletInfo)),
        React__default["default"].createElement(Checkbox.Checkbox, { label: "I would like to deliver to a self-hosted wallet (such as Metamask or Rainbow Wallet)", onChange: handleCheckboxChange, checked: usePersonalWallet, sx: { mb: "-13px" } }),
        usePersonalWallet && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Typography, { variant: "body1", sx: { mt: "13px" } }, "Once minted, this is where your items will be delivered:"),
            React__default["default"].createElement(material.Typography, { variant: "body2", sx: { mt: 0.5, mb: 1 } }, "(IMPORTANT: Please make sure the wallet address you provide is correct)"),
            React__default["default"].createElement(TextField.TextField, { margin: "none", label: WALLET_ADDRESS_FIELD_LABEL, onChange: handleInputChange, value: walletAddress, error: showAddressError, helperText: showAddressError && INVALID_WALLET_ADDRESS_MESSAGE })))));
};

exports.DeliveryWalletSelector = DeliveryWalletSelector;
//# sourceMappingURL=DeliveryWalletSelector.js.map
