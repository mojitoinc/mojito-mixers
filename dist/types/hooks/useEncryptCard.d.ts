import { LazyQueryResult } from "@apollo/client";
import { PaymentKeyQuery, PaymentKeyQueryVariables } from "../queries/graphqlGenerated";
export interface EncryptCardDataOptions {
    number?: string;
    cvv: string;
}
export interface UseEncryptedDataResult {
    keyID: string;
    encryptedCardData: string;
}
export declare function useEncryptCardData(): [
    (encryptCardDataOptions: EncryptCardDataOptions) => Promise<UseEncryptedDataResult>,
    LazyQueryResult<PaymentKeyQuery, PaymentKeyQueryVariables>
];
