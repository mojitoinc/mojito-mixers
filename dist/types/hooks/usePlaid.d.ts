/// <reference types="react" />
import { PlaidOAuthFlowState } from "../domain/plaid/plaid.utils";
import { BillingInfo } from "../forms/BillingInfoForm";
import { PaymentMethod } from "../domain/payment/payment.interfaces";
export interface UsePlaidOptionsStartFlow {
    selectedBillingInfo: string | BillingInfo;
}
export interface UsePlaidOptionsContinueFlow {
    onSubmit: (data?: PaymentMethod) => void;
}
export declare type UsePlaidOptions = UsePlaidOptionsStartFlow | UsePlaidOptionsContinueFlow;
export declare function isUsePlaidOptionsStartFlow(options: UsePlaidOptions): options is UsePlaidOptionsStartFlow;
export declare function isUsePlaidOptionsContinueFlow(options: UsePlaidOptions): options is UsePlaidOptionsContinueFlow;
export declare let INITIAL_PLAID_OAUTH_FLOW_STATE: PlaidOAuthFlowState;
export declare function continuePlaidOAuthFlow(): boolean;
export declare function usePlaid(options: UsePlaidOptions): () => void;
export declare const PlaidFlow: React.FC<UsePlaidOptionsContinueFlow>;
