export declare const DEFAULT_CVC_LENGTH = 3;
export declare const DEFAULT_CARD_FORMAT: RegExp;
export declare type CreditCardDisplayName = "American Express" | "Diners Club" | "Discover" | "Hipercard" | "JCB" | "UnionPay" | "MasterCard" | "Maestro" | "Elo" | "Visa" | "Credit Card";
export declare type CreditCardNetwork = "amex" | "dinersclub" | "discover" | "hipercard" | "jcb" | "unionpay" | "mastercard" | "maestro" | "elo" | "visa" | "placeholder";
export declare const CREDIT_CARD_NETWORKS: CreditCardNetwork[];
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
export declare const CARD_TYPES: CardType[];
export declare function getCardTypeByValue(cardNumber: string): CardType;
export declare function getCardTypeByType(type: "" | CreditCardNetwork): CardType;
export declare function getCardNameByType(type: "" | CreditCardNetwork): CreditCardDisplayName;
