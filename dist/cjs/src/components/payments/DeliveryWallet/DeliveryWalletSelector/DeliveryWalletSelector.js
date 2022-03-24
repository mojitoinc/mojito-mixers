'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var DisplayBox = require('../../DisplayBox/DisplayBox.js');
var InputGroupLabel = require('../../../shared/InputGroupLabel/InputGroupLabel.js');
var TextField = require('../../../shared/TextField/TextField.js');
var validationUtils = require('../../../../utils/validationUtils.js');
var wallet_utils = require('../../../../domain/wallet/wallet.utils.js');
var WalletAddressSelector = require('../../../shared/Select/WalletAddressSelector/WalletAddressSelector.js');
var useDictionary = require('../../../../hooks/useDictionary.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const WALLET_ADDRESS_FIELD_LABEL = "Wallet Address";
const INVALID_WALLET_ADDRESS_MESSAGE = validationUtils.withInvalidErrorMessage({
    label: WALLET_ADDRESS_FIELD_LABEL,
});
const DeliveryWalletSelector = ({ validatePersonalAddress, wallets, wallet, onWalletChange, }) => {
    const dictionary = useDictionary.useDictionary();
    const handleInputChange = React.useCallback((e) => {
        onWalletChange(e.target.value);
    }, [onWalletChange]);
    const handleSelectWallet = React.useCallback((nextWallet) => {
        onWalletChange(nextWallet);
    }, [onWalletChange]);
    const isAddressOk = wallet_utils.isValidWalletAddress(wallet);
    const showAddressError = validatePersonalAddress && !isAddressOk;
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Wallet Delivery Address"),
        React__default["default"].createElement(DisplayBox.DisplayBox, null,
            React__default["default"].createElement(material.Typography, { sx: { mb: 1.5 } }, dictionary.walletInfo),
            React__default["default"].createElement(WalletAddressSelector.WalletAddressSelector, { margin: "none", label: "Wallet", wallets: wallets, wallet: wallet, onSelectWallet: handleSelectWallet, error: showAddressError, helperText: showAddressError ? INVALID_WALLET_ADDRESS_MESSAGE : undefined }),
            wallet_utils.isCustomWalletAddress(wallet) && (React__default["default"].createElement(React__default["default"].Fragment, null,
                React__default["default"].createElement(material.Typography, { variant: "body1", sx: { my: 1.5 } }, "Once minted, this is where your items will be delivered:"),
                React__default["default"].createElement(TextField.TextField, { margin: "none", label: WALLET_ADDRESS_FIELD_LABEL, onChange: handleInputChange, value: wallet, error: showAddressError, helperText: showAddressError ? INVALID_WALLET_ADDRESS_MESSAGE : undefined }),
                React__default["default"].createElement(material.Typography, { variant: "body2", sx: { mt: 1.5 } }, "(IMPORTANT: Please make sure the wallet address you provide is correct)"))))));
};

exports.DeliveryWalletSelector = DeliveryWalletSelector;
//# sourceMappingURL=DeliveryWalletSelector.js.map
