import { useMemo } from "react";

import { transformRawRemainingItemLimit } from "../domain/payment/payment.utils";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { PaymentType } from "../domain/payment/payment.interfaces";
import { useCollectionItemByIdQuery, useValidatePaymentLimitQuery, ValidatePaymentLimitOutput } from "../queries/graphqlGenerated";

export const useLimits = (checkoutItem: CheckoutItem) => {
  const { data: collectionItemData } = useCollectionItemByIdQuery({
    skip: !checkoutItem?.collectionItemId,
    variables: {
      id: checkoutItem?.collectionItemId,
    },
  });

  const collectionId = collectionItemData?.collectionItemById?.collectionId;

  const {
    data: paymentLimitData,
    refetch,
  } = useValidatePaymentLimitQuery({
    skip: !collectionId,
    variables: {
      collectionId,
      itemsCount: checkoutItem?.units || 0,
    },
  });

  const rawRemainingItemLimit = paymentLimitData?.validatePaymentLimit;

  const remainingItemsLimits : Record<PaymentType, number> = useMemo(
    () => transformRawRemainingItemLimit(rawRemainingItemLimit as ValidatePaymentLimitOutput),
    [rawRemainingItemLimit]
  );

  return { remainingItemsLimits, refetch };
}
