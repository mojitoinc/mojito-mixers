/// <reference types="react" />
export declare type PUIDictionarySingleLine = string | React.ReactFragment;
export declare type PUIDictionaryMultiLine = PUIDictionarySingleLine[];
export declare type PUIDictionary = {
    walletInfo: PUIDictionarySingleLine;
    walletMultiSigTooltip: PUIDictionarySingleLine;
    wirePaymentsDisclaimer: PUIDictionaryMultiLine;
    purchaseInstructions: PUIDictionaryMultiLine;
    privacyHref?: string;
    termsOfUseHref?: string;
};
export declare type PUIDictionaryKeys = keyof PUIDictionary;
