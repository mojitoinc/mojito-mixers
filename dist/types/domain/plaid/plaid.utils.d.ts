import { BillingInfo } from "../../forms/BillingInfoForm";
export interface PlaidInfo {
    url?: string;
    linkToken: string;
    selectedBillingInfo: string | BillingInfo;
    timestamp?: number;
}
export interface PlaidOAuthFlowState extends PlaidInfo {
    receivedRedirectUri?: string;
    continueOAuthFlow: boolean;
    savedStateUsed: boolean;
}
export declare function persistPlaidInfo(info: PlaidInfo): void;
export declare function persistPlaidReceivedRedirectUri(receivedRedirectUri: string): void;
export declare function persistPlaidOAuthStateUsed(used?: boolean): void;
export declare function clearPlaidInfo(isExpired?: boolean): PlaidOAuthFlowState;
export declare function getPlaidOAuthFlowState(): PlaidOAuthFlowState;
