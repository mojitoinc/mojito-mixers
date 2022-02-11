import { LazyQueryResult } from "@apollo/client";
import { useCallback } from "react";
import { PaymentKeyQuery, PaymentKeyQueryVariables, usePaymentKeyLazyQuery } from "../queries/graphqlGenerated";
import { encryptCardData as encryptCardDataUtil } from "../utils/encryptionUtils";

export interface EncryptCardDataOptions {
  number?: string;
  cvv: string;
}

export interface UseEncryptedDataResult {
  keyID: string;
  encryptedCardData: string;
}

export function useEncryptCardData(): [
  (encryptCardDataOptions: EncryptCardDataOptions) => Promise<UseEncryptedDataResult>,
  LazyQueryResult<PaymentKeyQuery, PaymentKeyQueryVariables>,
] {
  // Changed from usePaymentKeyQuery + skit: true to usePaymentKeyLazyQuery due to https://github.com/apollographql/apollo-client/issues/9101.
  const [fetchPaymentKey, fetchPaymentKeyResult] = usePaymentKeyLazyQuery();

  const encryptCardData = useCallback(async (encryptCardDataOptions: EncryptCardDataOptions) => {
    const paymentKeyResult = await fetchPaymentKey().catch((err) => {
      console.log(err);

      return undefined;
    });

    const paymentKeyData = paymentKeyResult?.data;
    const publicKey = paymentKeyData?.getPaymentPublicKey?.publicKey;
    const keyID = paymentKeyData?.getPaymentPublicKey?.keyID;

    if (!publicKey || !keyID) throw new Error("Missing `publicKey` or `keyID`");

    const encryptedCardData = await encryptCardDataUtil({
      ...encryptCardDataOptions,
      key: publicKey,
    });

    return {
      keyID,
      encryptedCardData,
    };
  }, [fetchPaymentKey]);

  return [encryptCardData, fetchPaymentKeyResult];

}
