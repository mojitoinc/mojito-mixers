export type PUIDictionarySingleLine = string | React.ReactElement;
export type PUIDictionaryMultiLine = PUIDictionarySingleLine[];

export type PUIDictionary = {
  walletInfo: PUIDictionarySingleLine;
  walletMultiSigTooltip: PUIDictionarySingleLine;

  wirePaymentsDisclaimer: PUIDictionaryMultiLine;
  purchaseInstructions: PUIDictionaryMultiLine;

  privacyHref?: string;
  termsOfUseHref?: string;

  goToMarketplaceHref?: string;
  goToMarketplaceLabel?: string;

  goToHref?: string;
  goToLabel?: string;
};

export type PUIDictionaryKeys = keyof PUIDictionary;
