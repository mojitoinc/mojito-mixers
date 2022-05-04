export const DEFAULT_CVC_LENGTH = 3;
export const DEFAULT_CARD_FORMAT = /(\d{1,4})/g;

export type CreditCardDisplayName = "American Express" | "Diners Club" | "Discover" | "Hipercard" | "JCB" | "UnionPay" | "MasterCard" | "Maestro" | "Elo" | "Visa" | "Credit Card";

export type CreditCardNetwork = "amex" | "dinersclub" | "discover" | "hipercard" | "jcb" | "unionpay" | "mastercard" | "maestro" | "elo" | "visa" | "placeholder";

export const CREDIT_CARD_NETWORKS: CreditCardNetwork[] = ["amex", "dinersclub", "discover", "hipercard", "jcb", "unionpay", "mastercard", "maestro", "elo", "visa"];

export interface CardType {
  displayName: CreditCardDisplayName;
  type: CreditCardNetwork;
  format: RegExp;
  startPattern: RegExp;
  gaps: number[];
  lengths: number[];
  code: {
    name: string;
    length: 3 | 4;
  };
}

export const CARD_TYPES: CardType[] = [{
  displayName: "Visa",
  type: "visa",
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^4/,
  gaps: [4, 8, 12],
  lengths: [16, 18, 19],
  code: {
    name: "CVV",
    length: DEFAULT_CVC_LENGTH,
  },
}, {
  displayName: "MasterCard",
  type: "mastercard",
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(5[1-5]|677189)|^(222[1-9]|2[3-6]\d{2}|27[0-1]\d|2720)/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: "CVC",
    length: DEFAULT_CVC_LENGTH,
  },
}, {
  displayName: "American Express",
  type: "amex",
  format: /(\d{1,4})(\d{1,6})?(\d{1,5})?/,
  startPattern: /^3[47]/,
  gaps: [4, 10],
  lengths: [15],
  code: {
    name: "CID",
    length: 4,
  },
}, {
  displayName: "Diners Club",
  type: "dinersclub",
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(36|38|30[0-5])/,
  gaps: [4, 10],
  lengths: [14, 16, 19],
  code: {
    name: "CVV",
    length: DEFAULT_CVC_LENGTH,
  },
}, {
  displayName: "Discover",
  type: "discover",
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(6011|65|64[4-9]|622)/,
  gaps: [4, 8, 12],
  lengths: [16, 19],
  code: {
    name: "CID",
    length: DEFAULT_CVC_LENGTH,
  },
}, {
  displayName: "JCB",
  type: "jcb",
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^35/,
  gaps: [4, 8, 12],
  lengths: [16, 17, 18, 19],
  code: {
    name: "CVV",
    length: DEFAULT_CVC_LENGTH,
  },
}, {
  displayName: "UnionPay",
  type: "unionpay",
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^62/,
  gaps: [4, 8, 12],
  lengths: [14, 15, 16, 17, 18, 19],
  code: {
    name: "CVN",
    length: DEFAULT_CVC_LENGTH,
  },
}, {
  displayName: "Maestro",
  type: "maestro",
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(5018|5020|5038|6304|6703|6708|6759|676[1-3])/,
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: "CVC",
    length: DEFAULT_CVC_LENGTH,
  },
}, {
  displayName: "Elo",
  type: "elo",
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(4011(78|79)|43(1274|8935)|45(1416|7393|763(1|2))|50(4175|6699|67[0-7][0-9]|9000)|627780|63(6297|6368)|650(03([^4])|04([0-9])|05(0|1)|4(0[5-9]|3[0-9]|8[5-9]|9[0-9])|5([0-2][0-9]|3[0-8])|9([2-6][0-9]|7[0-8])|541|700|720|901)|651652|655000|655021)/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: "CVE",
    length: DEFAULT_CVC_LENGTH,
  },
}, {
  displayName: "Hipercard",
  type: "hipercard",
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^(384100|384140|384160|606282|637095|637568|60(?!11))/,
  gaps: [4, 8, 12],
  lengths: [16],
  code: {
    name: "CVC",
    length: DEFAULT_CVC_LENGTH,
  },
}, {
  displayName: "Credit Card",
  type: "placeholder",
  format: DEFAULT_CARD_FORMAT,
  startPattern: /^\d+$/,
  gaps: [4, 8, 12],
  lengths: [12, 13, 14, 15, 16, 17, 18, 19],
  code: {
    name: "Secure Code",
    length: DEFAULT_CVC_LENGTH,
  },
}];

const CARD_TYPES_BY_TYPE = CARD_TYPES.reduce((cardsAcc, cardType: CardType) => {
  cardsAcc[cardType.type] = cardType;

  return cardsAcc;
}, {} as Record<CreditCardNetwork, CardType>);

export function getCardTypeByType(type: "" | CreditCardNetwork): CardType {
  return CARD_TYPES_BY_TYPE[type || "placeholder"] || CARD_TYPES_BY_TYPE.placeholder;
}

const CARD_NAMES_BY_TYPE = CARD_TYPES.reduce((cardsAcc, cardType: CardType) => {
  cardsAcc[cardType.type] = cardType.displayName;

  return cardsAcc;
}, {} as Record<CreditCardNetwork, CreditCardDisplayName>);

export function getCardNameByType(type: "" | CreditCardNetwork): CreditCardDisplayName {
  return CARD_NAMES_BY_TYPE[type || "placeholder"] || CARD_NAMES_BY_TYPE.placeholder;
}

export function getCardTypeByValue(cardNumber: string): CardType {
  return CARD_TYPES.find(cardType => cardType.startPattern.test(cardNumber)) || CARD_TYPES_BY_TYPE.placeholder;
}
