'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var WalletAddressSelector = require('../../components/shared/Select/WalletAddressSelector/WalletAddressSelector.js');

const ADDRESS_REGEXP = /^0x[a-fA-F0-9]{40}$/;
const SPECIAL_ADDRESS_REGEXP = /^<.+>$/;
function isValidWalletAddress(wallet) {
    if (wallet === null)
        return false;
    if (typeof wallet === "object")
        return ADDRESS_REGEXP.test(wallet.address);
    return wallet === WalletAddressSelector.NEW_WALLET_OPTION.value || ADDRESS_REGEXP.test(wallet);
}
function isSpecialWalletAddressValue(walletAddress) {
    return SPECIAL_ADDRESS_REGEXP.test(walletAddress);
}
function isNewWalletAddress(wallet) {
    return typeof wallet === "string" && wallet !== WalletAddressSelector.NEW_WALLET_OPTION.value;
}
function filterSpecialWalletAddressValues(walletAddress) {
    return walletAddress.trim().replace(SPECIAL_ADDRESS_REGEXP, "");
}

exports.ADDRESS_REGEXP = ADDRESS_REGEXP;
exports.SPECIAL_ADDRESS_REGEXP = SPECIAL_ADDRESS_REGEXP;
exports.filterSpecialWalletAddressValues = filterSpecialWalletAddressValues;
exports.isNewWalletAddress = isNewWalletAddress;
exports.isSpecialWalletAddressValue = isSpecialWalletAddressValue;
exports.isValidWalletAddress = isValidWalletAddress;
//# sourceMappingURL=wallet.utils.js.map
