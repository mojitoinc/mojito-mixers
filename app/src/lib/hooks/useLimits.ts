import { useCallback, useMemo } from "react";

import { transformRawRemainingItemLimit } from "../domain/payment/payment.utils";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { PaymentType } from "../domain/payment/payment.interfaces";
import {
  useCollectionItemByIdQuery,
  useValidatePaymentLimitQuery,
  ValidatePaymentLimitOutput,
} from "../queries/graphqlGenerated";
import { PAYMENT_METHOD_OPTION_PROPS } from "@components/shared/PaymentMethodSelector/PaymentMethodSelector";

export const useLimits = (checkoutItem: CheckoutItem) => {
  const itemsCount = checkoutItem?.units || 0;

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
    loading,
  } = useValidatePaymentLimitQuery({
    skip: !collectionId,
    variables: {
      collectionId,
      itemsCount,
    },
    notifyOnNetworkStatusChange: true,
  });

  const rawRemainingItemLimit = paymentLimitData?.validatePaymentLimit;

  const itemLimits: Record<PaymentType, number> = useMemo(
    () =>
      transformRawRemainingItemLimit(
        rawRemainingItemLimit as ValidatePaymentLimitOutput,
        itemsCount
      ),
    [rawRemainingItemLimit, itemsCount]
  );

  const getItemLimitFor = useCallback(
    (paymentType: PaymentType) =>
      (!!itemLimits && itemLimits[paymentType]) ?? Infinity,
    [itemLimits]
  );

  const limitExceededFor = useCallback(
    (paymentType: PaymentType) => itemsCount > getItemLimitFor(paymentType),
    [itemsCount, getItemLimitFor]
  );

  const getItemLimitExceededMessageFor = useCallback(
    (selectedPaymentType: PaymentType, acceptedPaymentTypes: PaymentType[]) => {
      const otherPaymentMethodsWithLimit = acceptedPaymentTypes.filter(
        (paymentType: PaymentType) => paymentType !== selectedPaymentType && !limitExceededFor(paymentType)
      )
      .map(
        (paymentType: PaymentType) =>
          PAYMENT_METHOD_OPTION_PROPS[paymentType].label
      );

      if (otherPaymentMethodsWithLimit.length > 0)
        return `You can't buy more than ${getItemLimitFor(
          selectedPaymentType
        )} items with ${
          PAYMENT_METHOD_OPTION_PROPS[selectedPaymentType].label
        }. Use ${otherPaymentMethodsWithLimit.join(", ")} instead.`;

      return `You have already bought the maximum ${getItemLimitFor(
        selectedPaymentType
      )} items allowed for this sale.`;
    },
    [getItemLimitFor, limitExceededFor]
  );

  return { itemLimits, refetch, loading, limitExceededFor, getItemLimitExceededMessageFor };
};
