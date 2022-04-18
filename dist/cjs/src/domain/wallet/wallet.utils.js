'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var web3Utils = require('web3-utils');
var wallet_constants = require('./wallet.constants.js');

// export const ADDRESS_REGEXP = /^0x[a-fA-F0-9]{40}$/;
const SPECIAL_ADDRESS_REGEXP = /^<.+>$/;
// 0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7
function isValidWalletAddress(wallet) {
    if (wallet === null)
        return false;
    if (typeof wallet === "object")
        return web3Utils.isAddress(wallet.address);
    return wallet === wallet_constants.NEW_WALLET_OPTION.value || web3Utils.isAddress(wallet);
}
function isSpecialWalletAddressValue(walletAddress) {
    return SPECIAL_ADDRESS_REGEXP.test(walletAddress);
}
function isCustomWalletAddress(wallet) {
    return typeof wallet === "string" && wallet !== wallet_constants.NEW_WALLET_OPTION.value;
}
function filterSpecialWalletAddressValues(walletAddress) {
    return walletAddress.trim().replace(SPECIAL_ADDRESS_REGEXP, "");
}

exports.SPECIAL_ADDRESS_REGEXP = SPECIAL_ADDRESS_REGEXP;
exports.filterSpecialWalletAddressValues = filterSpecialWalletAddressValues;
exports.isCustomWalletAddress = isCustomWalletAddress;
exports.isSpecialWalletAddressValue = isSpecialWalletAddressValue;
exports.isValidWalletAddress = isValidWalletAddress;
//# sourceMappingURL=wallet.utils.js.map
