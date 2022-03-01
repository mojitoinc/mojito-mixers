const ADDRESS_REGEX = /^0x[a-fA-F0-9]{40}$/;

export const isValidWalletAddress = (walletAddress: string | null): boolean =>
  walletAddress === null || ADDRESS_REGEX.test(walletAddress);
