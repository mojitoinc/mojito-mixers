/// <reference types="react" />
export declare function standaloneGetCardImageProps(network?: string): {
    "aria-label": string;
    children: import("react").ReactSVGElement;
    width: string;
    height: string;
    viewBox: string;
};
export declare const getCardNumberIsValid: (cardNumber?: string | undefined) => boolean;
export declare const getExpiryDateIsvalid: (expiryDate?: string | undefined) => boolean;
export declare const getCVCIsValid: (cvc?: string | undefined) => boolean;
