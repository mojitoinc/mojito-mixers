import { __rest } from '../../../../../node_modules/tslib/tslib.es6.js';
import React__default, { useMemo, useCallback, useEffect } from 'react';
import { Select } from '../Select.js';
import { isSpecialWalletAddressValue, isCustomWalletAddress } from '../../../../domain/wallet/wallet.utils.js';
import { NEW_WALLET_OPTION, CUSTOM_WALLET_OPTION } from '../../../../domain/wallet/wallet.constants.js';

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
    var { label, wallets, wallet, onSelectWallet, disabled: parentDisabled, error, helperText } = _a, props = __rest(_a, ["label", "wallets", "wallet", "onSelectWallet", "disabled", "error", "helperText"]);
    const { options, walletsByID, walletsByAddress } = useMemo(() => {
        const options = [NEW_WALLET_OPTION, CUSTOM_WALLET_OPTION, ...(wallets || []).map(mapWalletAddressToSelectOption)];
        const walletsByID = (wallets || []).reduce(reduceWalletsByID, {});
        const walletsByAddress = (wallets || []).reduce(reduceWalletsByAddress, {});
        return { options, walletsByID, walletsByAddress };
    }, [wallets]);
    const handleChange = useCallback((e) => {
        const value = e.target.value;
        const maybeWallet = walletsByID[value];
        onSelectWallet(maybeWallet || value);
    }, [onSelectWallet, walletsByID]);
    // Filter out incorrect values or select MultiSig option if manually entered:
    useEffect(() => {
        if (typeof wallet === "string") {
            const maybeWallet = walletsByAddress[wallet];
            // Check if the manually entered value matches a MultiSig wallet:
            if (maybeWallet)
                onSelectWallet(maybeWallet);
            return;
        }
        if (wallet && !walletsByID[wallet.id])
            onSelectWallet(NEW_WALLET_OPTION.value);
    }, [wallet, walletsByID, walletsByAddress, onSelectWallet]);
    // Init (first-load only):
    useEffect(() => {
        if (wallets === undefined || wallet !== null)
            return;
        onSelectWallet(wallets[0] || NEW_WALLET_OPTION.value);
    }, [wallets, wallet, onSelectWallet]);
    // Select display value:
    const selectValue = typeof wallet === "string"
        ? (isSpecialWalletAddressValue(wallet) ? wallet : CUSTOM_WALLET_OPTION.value)
        : ((wallet === null || wallet === void 0 ? void 0 : wallet.id) || NEW_WALLET_OPTION.value);
    const disabled = parentDisabled || wallets === undefined || wallet === null;
    const showError = !isCustomWalletAddress(wallet);
    return (React__default.createElement(Select, Object.assign({}, props, { label: label, options: options, onChange: handleChange, value: selectValue, disabled: disabled, error: showError ? error : undefined, helperText: showError ? helperText : undefined, displayEmpty: true })));
};

export { WalletAddressSelector };
//# sourceMappingURL=WalletAddressSelector.js.map
