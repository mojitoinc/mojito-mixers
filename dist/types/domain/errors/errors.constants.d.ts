import { ApolloError } from "@apollo/client";
import { CheckoutModalError, CheckoutModalErrorAt } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
export declare const BUILT_IN_ERRORS: string[];
export declare const DEFAULT_ERROR_AT = "payment";
export interface MappedError {
    errorLocation?: CheckoutModalErrorAt;
    fieldName?: string;
    errorMessage: string;
}
export interface ErrorCreator {
    (error?: ApolloError | Error): CheckoutModalError;
    errorMessage: string;
}
export declare const ERROR_GENERIC: ErrorCreator;
export declare const ERROR_LOADING: ErrorCreator;
export declare const ERROR_LOADING_USER: ErrorCreator;
export declare const ERROR_LOADING_PAYMENT_METHODS: ErrorCreator;
export declare const ERROR_LOADING_INVOICE: ErrorCreator;
export declare const ERROR_PURCHASE: ErrorCreator;
export declare const ERROR_PURCHASE_TIMEOUT: ErrorCreator;
export declare const ERROR_PURCHASE_NO_ITEMS: ErrorCreator;
export declare const ERROR_PURCHASE_NO_UNITS: ErrorCreator;
export declare const ERROR_PURCHASE_LOADING_ITEMS: ErrorCreator;
export declare const ERROR_PURCHASE_SELECTED_PAYMENT_METHOD: ErrorCreator;
export declare const ERROR_PURCHASE_CREATING_PAYMENT_METHOD: ErrorCreator;
export declare const ERROR_PURCHASE_CREATING_INVOICE: ErrorCreator;
export declare const ERROR_PURCHASE_CVV: ErrorCreator;
export declare const ERROR_PURCHASE_PAYING: ErrorCreator;
export declare const ERROR_PURCHASE_3DS: ErrorCreator;
export declare const ERROR_INVOICE_TIMEOUT: ErrorCreator;
export declare const MAPPED_ERRORS: Record<string, MappedError>;
