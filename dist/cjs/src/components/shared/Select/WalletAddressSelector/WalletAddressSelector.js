'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../../node_modules/tslib/tslib.es6.js');
var React = require('react');
var Select = require('../Select.js');
var wallet_utils = require('../../../../domain/wallet/wallet.utils.js');
var wallet_constants = require('../../../../domain/wallet/wallet.constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const mapWalletAddressToSelectOption = (wallet) => ({
    value: wallet.id,
    label: `${wallet.name} (${wallet.address})`,
});
const reduceWalletsByID = (walletsMap, wallet) => {
    walletsMap[wallet.id] = wallet;
    return walletsMap;
};
const reduceWalletsByAddress = (walletsMap, wallet) => {
    walletsMap[wallet.address] = wallet;
    return walletsMap;
};
const WalletAddressSelector = (_a) => {
    var { label, wallets, wallet, onSelectWallet, disabled: parentDisabled, error, helperText } = _a, props = tslib_es6.__rest(_a, ["label", "wallets", "wallet", "onSelectWallet", "disabled", "error", "helperText"]);
    const { options, walletsByID, walletsByAddress } = React.useMemo(() => {
        const options = [wallet_constants.NEW_WALLET_OPTION, wallet_constants.CUSTOM_WALLET_OPTION, ...(wallets || []).map(mapWalletAddressToSelectOption)];
        const walletsByID = (wallets || []).reduce(reduceWalletsByID, {});
        const walletsByAddress = (wallets || []).reduce(reduceWalletsByAddress, {});
        return { options, walletsByID, walletsByAddress };
    }, [wallets]);
    const handleChange = React.useCallback((e) => {
        const value = e.target.value;
        const maybeWallet = walletsByID[value];
        onSelectWallet(maybeWallet || value);
    }, [onSelectWallet, walletsByID]);
    // Filter out incorrect values or select MultiSig option if manually entered:
    React.useEffect(() => {
        if (typeof wallet === "string") {
            const maybeWallet = walletsByAddress[wallet];
            // Check if the manually entered value matches a MultiSig wallet:
            if (maybeWallet)
                onSelectWallet(maybeWallet);
            return;
        }
        if (wallet && !walletsByID[wallet.id])
            onSelectWallet(wallet_constants.NEW_WALLET_OPTION.value);
    }, [wallet, walletsByID, walletsByAddress, onSelectWallet]);
    // Init (first-load only):
    React.useEffect(() => {
        if (wallets === undefined || wallet !== null)
            return;
        onSelectWallet(wallets[0] || wallet_constants.NEW_WALLET_OPTION.value);
    }, [wallets, wallet, onSelectWallet]);
    // Select display value:
    const selectValue = typeof wallet === "string"
        ? (wallet_utils.isSpecialWalletAddressValue(wallet) ? wallet : wallet_constants.CUSTOM_WALLET_OPTION.value)
        : ((wallet === null || wallet === void 0 ? void 0 : wallet.id) || wallet_constants.NEW_WALLET_OPTION.value);
    const disabled = parentDisabled || wallets === undefined || wallet === null;
    const showError = !wallet_utils.isNewWalletAddress(wallet);
    return (React__default["default"].createElement(Select.Select, Object.assign({}, props, { label: label, options: options, onChange: handleChange, value: selectValue, disabled: disabled, error: showError ? error : undefined, helperText: showError ? helperText : undefined, displayEmpty: true })));
};

exports.WalletAddressSelector = WalletAddressSelector;
//# sourceMappingURL=WalletAddressSelector.js.map
