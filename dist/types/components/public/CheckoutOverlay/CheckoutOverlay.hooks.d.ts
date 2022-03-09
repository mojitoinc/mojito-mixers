import { ApolloError } from "@apollo/client";
import { Dispatch, SetStateAction } from "react";
import { CircleFieldErrors } from "../../../domain/circle/circle.utils";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { TaxesState } from "../../../views/Billing/BillingView";
export declare type CheckoutModalErrorAt = "reset" | "authentication" | "billing" | "payment" | "purchasing";
export interface CheckoutModalError {
    at?: CheckoutModalErrorAt;
    error?: ApolloError | Error;
    circleFieldErrors?: CircleFieldErrors;
    errorMessage: string;
}
export declare type CheckoutModalStep = "authentication" | "billing" | "payment" | "purchasing" | "confirmation" | "error";
export declare enum CheckoutModalStepIndex {
    authentication = 0,
    billing = 1,
    payment = 2,
    purchasing = 3,
    confirmation = 4,
    error = 5
}
export interface CheckoutModalStateOptions {
    invoiceID?: string | null;
    productConfirmationEnabled?: boolean;
    isAuthenticated?: boolean;
    onError?: (error: CheckoutModalError) => void;
}
export interface CheckoutModalState {
    checkoutStep: CheckoutModalStep;
    checkoutError?: CheckoutModalError;
    isDialogBlocked: boolean;
}
export interface SelectedPaymentMethod {
    billingInfo: string | BillingInfo;
    paymentInfo: string | PaymentMethod;
    cvv: string;
}
export interface PurchaseState {
    invoiceID: string | null;
    taxes: TaxesState;
    walletAddress: string | null;
    circlePaymentID: string;
    paymentID: string;
}
export interface CheckoutModalStateReturn extends CheckoutModalState, PurchaseState {
    initModalState: () => void;
    goBack: () => void;
    goNext: () => void;
    goTo: (checkoutStep?: CheckoutModalStep, error?: null | string | CheckoutModalError) => void;
    setError: (error: string | CheckoutModalError) => void;
    setIsDialogBlocked: (isDialogBlocked: boolean) => void;
    selectedPaymentMethod: SelectedPaymentMethod;
    setSelectedPaymentMethod: Dispatch<SetStateAction<SelectedPaymentMethod>>;
    setInvoiceID: (invoiceID: string | null) => void;
    setTaxes: (taxes: TaxesState) => void;
    setWalletAddress: (walletAddress: string | null) => void;
    setPayments: (circlePaymentID: string, paymentID: string) => void;
}
export declare const CHECKOUT_STEPS: CheckoutModalStep[];
export declare function useCheckoutModalState({ invoiceID: initialInvoiceID, productConfirmationEnabled, isAuthenticated, onError, }: CheckoutModalStateOptions): CheckoutModalStateReturn;
