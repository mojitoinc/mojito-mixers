import { NEW_WALLET_OPTION } from "../../components/shared/Select/WalletAddressSelector/WalletAddressSelector";
import { Wallet } from "./wallet.interfaces";

export const ADDRESS_REGEXP = /^0x[a-fA-F0-9]{40}$/;

export const SPECIAL_ADDRESS_REGEXP = /^<.+>$/;

export function isValidWalletAddress(wallet: null | string | Wallet): boolean {
  if (wallet === null) return false;

  if (typeof wallet === "object") return ADDRESS_REGEXP.test(wallet.address);

  return wallet === NEW_WALLET_OPTION.value || ADDRESS_REGEXP.test(wallet);
}

export function isSpecialWalletAddressValue(walletAddress: string): boolean {
  return SPECIAL_ADDRESS_REGEXP.test(walletAddress);
}

export function isNewWalletAddress(wallet: null | string | Wallet) {
  return typeof wallet === "string" && wallet !== NEW_WALLET_OPTION.value;
}

export function filterSpecialWalletAddressValues(walletAddress: string): string {
  return walletAddress.trim().replace(SPECIAL_ADDRESS_REGEXP, "");
}
