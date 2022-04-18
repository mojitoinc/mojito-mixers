import { isAddress } from "web3-utils";
import { NEW_WALLET_OPTION } from "./wallet.constants";
import { Wallet } from "./wallet.interfaces";

// export const ADDRESS_REGEXP = /^0x[a-fA-F0-9]{40}$/;

export const SPECIAL_ADDRESS_REGEXP = /^<.+>$/;

// 0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7

export function isValidWalletAddress(wallet: null | string | Wallet): boolean {
  if (wallet === null) return false;

  if (typeof wallet === "object") return isAddress(wallet.address);

  return wallet === NEW_WALLET_OPTION.value || isAddress(wallet);
}

export function isSpecialWalletAddressValue(walletAddress: string): boolean {
  return SPECIAL_ADDRESS_REGEXP.test(walletAddress);
}

export function isCustomWalletAddress(wallet: null | string | Wallet) {
  return typeof wallet === "string" && wallet !== NEW_WALLET_OPTION.value;
}

export function filterSpecialWalletAddressValues(walletAddress: string): string {
  return walletAddress.trim().replace(SPECIAL_ADDRESS_REGEXP, "");
}
