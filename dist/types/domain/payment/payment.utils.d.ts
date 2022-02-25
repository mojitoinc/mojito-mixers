/// <reference types="react" />
export declare const DEFAULT_CARD_FORMAT: RegExp;
export declare const CARD_TYPES: {
    displayName: string;
    type: string;
    format: RegExp;
    startPattern: RegExp;
    gaps: number[];
    lengths: number[];
    code: {
        name: string;
        length: number;
    };
}[];
export declare function standaloneGetCardImageProps(network: string): {
    "aria-label": string;
    children: import("react").ReactSVGElement;
    width: string;
    height: string;
    viewBox: string;
};
export declare const getCardNumberIsValid: (cardNumber?: string | undefined) => boolean;
export declare const getExpiryDateIsvalid: (expiryDate?: string | undefined) => boolean;
export declare const getCVCIsValid: (cvc?: string | undefined, cardNumber?: string | undefined) => boolean;
