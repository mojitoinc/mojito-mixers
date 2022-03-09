export type PUIDictionarySingleLine = string | React.ReactFragment;
export type PUIDictionaryMultiLine = PUIDictionarySingleLine[];

export type PUIDictionary = {
  walletInfo: PUIDictionarySingleLine;
  walletMultiSigTooltip: PUIDictionarySingleLine;

  wirePaymentsDisclaimer: PUIDictionaryMultiLine;
  purchaseInstructions: PUIDictionaryMultiLine;

  privacyHref?: string;
  termsOfUseHref?: string;
};

export type PUIDictionaryKeys = keyof PUIDictionary;
