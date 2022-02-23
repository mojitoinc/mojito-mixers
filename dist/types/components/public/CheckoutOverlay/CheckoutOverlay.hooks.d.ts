import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { CircleFieldErrors } from "../../../domain/circle/circle.utils";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
export declare type CheckoutModalErrorAt = "authentication" | "billing" | "payment" | "purchasing";
export interface CheckoutModalError {
    at?: CheckoutModalErrorAt;
    error?: ApolloError | Error;
    circleFieldErrors?: CircleFieldErrors;
    errorMessage: string;
}
export declare type CheckoutModalStep = "authentication" | "billing" | "payment" | "purchasing" | "confirmation" | "error";
export interface CheckoutModalStateOptions {
    invoiceID?: string;
    productConfirmationEnabled?: boolean;
    isAuthenticated?: boolean;
    onError?: (error: CheckoutModalError) => void;
}
export interface CheckoutModalState {
    checkoutStep: CheckoutModalStep;
    checkoutError?: CheckoutModalError;
}
export interface SelectedPaymentMethod {
    billingInfo: string | BillingInfo;
    paymentInfo: string | PaymentMethod;
    cvv: string;
}
export interface PurchaseState {
    invoiceID: string | null;
    paymentReferenceNumber: string;
}
export interface CheckoutModalStateReturn extends CheckoutModalState, PurchaseState {
    initModalState: () => void;
    goBack: () => void;
    goNext: () => void;
    goTo: (checkoutStep: CheckoutModalStep, error?: null | string | CheckoutModalError) => void;
    setError: (error: null | string | CheckoutModalError) => void;
    selectedPaymentMethod: SelectedPaymentMethod;
    setSelectedPaymentMethod: Dispatch<SetStateAction<SelectedPaymentMethod>>;
    setInvoiceID: (invoiceID: string) => void;
    setPaymentReferenceNumber: (paymentReferenceNumber: string) => void;
}
export declare const CHECKOUT_STEPS: CheckoutModalStep[];
export declare function useCheckoutModalState({ invoiceID: initialInvoiceID, productConfirmationEnabled, isAuthenticated, onError, }: CheckoutModalStateOptions): CheckoutModalStateReturn;
