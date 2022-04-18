/// <reference types="react" />
import { BillingInfo } from "../forms/BillingInfoForm";
import { PaymentMethod } from "../domain/payment/payment.interfaces";
import { ApolloError } from "@apollo/client";
export interface UsePlaidOptionsStartFlow {
    orgID: string;
    invoiceID: string;
    invoiceCountdownStart: number;
    selectedBillingInfo: string | BillingInfo;
    skip: boolean;
}
export interface UsePlaidOptionsContinueFlow {
    onSubmit: (data?: PaymentMethod) => void;
}
export declare type UsePlaidOptions = UsePlaidOptionsStartFlow | UsePlaidOptionsContinueFlow;
export declare function isUsePlaidOptionsStartFlow(options: UsePlaidOptions): options is UsePlaidOptionsStartFlow;
export declare function isUsePlaidOptionsContinueFlow(options: UsePlaidOptions): options is UsePlaidOptionsContinueFlow;
export declare let INITIAL_PLAID_OAUTH_FLOW_STATE: import("../components/public/CheckoutOverlay/CheckoutOverlay.types").CheckoutModalStateCombined;
export declare function continuePlaidOAuthFlow(): boolean;
export interface UsePlaidReturn {
    loading: boolean;
    error?: ApolloError;
    openLink: () => void;
    refetchLink: () => void;
}
export declare function usePlaid(options: UsePlaidOptions): UsePlaidReturn;
export declare const PlaidFlow: React.FC<UsePlaidOptionsContinueFlow>;
