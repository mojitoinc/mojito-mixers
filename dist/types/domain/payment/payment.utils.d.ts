/// <reference types="react" />
import { CreditCardNetwork } from "../react-payment-inputs/react-payment-inputs.utils";
export declare function getCreditCardNetworkFromNumber(cardNumber: string): "" | CreditCardNetwork;
export declare function getCreditCardNetworkFromLabel(network?: string): "" | CreditCardNetwork;
export declare function getCreditCardNetworkImageFromLabel(network?: string): CreditCardNetwork;
export declare function standaloneGetCardImageProps(network?: string): {
    "aria-label": string;
    children: import("react").ReactSVGElement;
    width: string;
    height: string;
    viewBox: string;
};
export declare const getExpiryDateIsValid: (expiryDate?: string | undefined) => boolean;
export declare const getCvvIsValid: (cvv?: string, network?: "" | CreditCardNetwork, networks?: CreditCardNetwork[], required?: boolean) => {
    cvvLength: number;
    cvvExpectedLength: 3 | 4 | "3 or 4";
    isCvvValid: boolean;
};
