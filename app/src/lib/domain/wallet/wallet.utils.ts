const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const isValidWalletAddress = (walletAddress: string): boolean =>
  ADDRESS_REGEX.test(walletAddress);
