const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;
const isValidWalletAddress = (walletAddress) => walletAddress === null || ADDRESS_REGEX.test(walletAddress);

export { isValidWalletAddress };
//# sourceMappingURL=wallet.utils.js.map
