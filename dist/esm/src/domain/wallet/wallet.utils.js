import { isAddress } from 'web3-utils';
import { NEW_WALLET_OPTION } from './wallet.constants.js';

// export const ADDRESS_REGEXP = /^0x[a-fA-F0-9]{40}$/;
const SPECIAL_ADDRESS_REGEXP = /^<.+>$/;
// 0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7
function isValidWalletAddress(wallet) {
    if (wallet === null)
        return false;
    if (typeof wallet === "object")
        return isAddress(wallet.address);
    return wallet === NEW_WALLET_OPTION.value || isAddress(wallet);
}
function isSpecialWalletAddressValue(walletAddress) {
    return SPECIAL_ADDRESS_REGEXP.test(walletAddress);
}
function isCustomWalletAddress(wallet) {
    return typeof wallet === "string" && wallet !== NEW_WALLET_OPTION.value;
}
function filterSpecialWalletAddressValues(walletAddress) {
    return walletAddress.trim().replace(SPECIAL_ADDRESS_REGEXP, "");
}

export { SPECIAL_ADDRESS_REGEXP, filterSpecialWalletAddressValues, isCustomWalletAddress, isSpecialWalletAddressValue, isValidWalletAddress };
//# sourceMappingURL=wallet.utils.js.map
