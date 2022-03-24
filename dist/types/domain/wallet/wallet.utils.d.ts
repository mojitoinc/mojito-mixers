import { Wallet } from "./wallet.interfaces";
export declare const ADDRESS_REGEXP: RegExp;
export declare const SPECIAL_ADDRESS_REGEXP: RegExp;
export declare function isValidWalletAddress(wallet: null | string | Wallet): boolean;
export declare function isSpecialWalletAddressValue(walletAddress: string): boolean;
export declare function isCustomWalletAddress(wallet: null | string | Wallet): boolean;
export declare function filterSpecialWalletAddressValues(walletAddress: string): string;
