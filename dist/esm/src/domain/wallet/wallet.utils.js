import { NEW_WALLET_OPTION } from './wallet.constants.js';

const ADDRESS_REGEXP = /^0x[a-fA-F0-9]{40}$/;
const SPECIAL_ADDRESS_REGEXP = /^<.+>$/;
function isValidWalletAddress(wallet) {
    if (wallet === null)
        return false;
    if (typeof wallet === "object")
        return ADDRESS_REGEXP.test(wallet.address);
    return wallet === NEW_WALLET_OPTION.value || ADDRESS_REGEXP.test(wallet);
}
function isSpecialWalletAddressValue(walletAddress) {
    return SPECIAL_ADDRESS_REGEXP.test(walletAddress);
}
function isNewWalletAddress(wallet) {
    return typeof wallet === "string" && wallet !== NEW_WALLET_OPTION.value;
}
function filterSpecialWalletAddressValues(walletAddress) {
    return walletAddress.trim().replace(SPECIAL_ADDRESS_REGEXP, "");
}

export { ADDRESS_REGEXP, SPECIAL_ADDRESS_REGEXP, filterSpecialWalletAddressValues, isNewWalletAddress, isSpecialWalletAddressValue, isValidWalletAddress };
//# sourceMappingURL=wallet.utils.js.map
