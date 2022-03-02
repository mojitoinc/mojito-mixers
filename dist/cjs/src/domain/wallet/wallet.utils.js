'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const isValidWalletAddress = (walletAddress) => walletAddress === null || ADDRESS_REGEX.test(walletAddress);

exports.isValidWalletAddress = isValidWalletAddress;
//# sourceMappingURL=wallet.utils.js.map
