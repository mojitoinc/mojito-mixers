import { useCallback, useEffect, useMemo, useRef } from "react";

import { join } from "@lib/utils/arrayUtils";
import { PaymentLimits, transformRawRemainingItemLimit } from "../domain/payment/payment.utils";
import { CheckoutItem } from "../domain/product/product.interfaces";
import { PaymentType } from "../domain/payment/payment.interfaces";
import { PAYMENT_METHOD_OPTION_PROPS } from "../components/shared/PaymentMethodSelector/PaymentMethodSelector";
import { useCollectionItemByIdQuery, useValidatePaymentLimitQuery } from "../queries/graphqlGenerated";

export interface UseLimitsReturn {
  limits?: PaymentLimits;
  loading: boolean;
  refetch: () => void;
  limitExceededMessage: string;
}

export function useLimits(
  checkoutItem: CheckoutItem,
  acceptedPaymentTypes: PaymentType[],
  paymentType?: PaymentType,
): UseLimitsReturn {
  const itemsCount = checkoutItem?.units || 0;
  const collectionItemId = checkoutItem?.collectionItemId || "";

  const {
    data: collectionItemData,
    loading: collectionItemLoading,
  } = useCollectionItemByIdQuery({
    skip: !collectionItemId,
    variables: {
      id: collectionItemId,
    },
  });

  const collectionId = collectionItemData?.collectionItemById?.collectionId;

  const {
    data: paymentLimitData,
    loading: paymentLimitLoading,
    refetch,
  } = useValidatePaymentLimitQuery({
    skip: !collectionId,
    variables: {
      collectionId,
      itemsCount,
    },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    if (collectionId) refetch();
  }, [collectionId, refetch, paymentType]);

  const rawRemainingItemLimit = paymentLimitData?.validatePaymentLimit;

  const lastLimitsRef = useRef<undefined | PaymentLimits>();

  const limits: undefined | PaymentLimits = useMemo(() => {
    if (rawRemainingItemLimit) {
      lastLimitsRef.current = transformRawRemainingItemLimit(
        rawRemainingItemLimit,
        itemsCount,
      );
    }

    return lastLimitsRef.current;
  }, [rawRemainingItemLimit, itemsCount]);

  const getLimitExceededMessageFirstPart = useCallback(
    (type: PaymentType | undefined) => {
      if (!limits || !type) return "";

      const paymentTypeLimit = limits[type];

      if (!paymentTypeLimit) return "";

      const purchaseLimit = paymentTypeLimit.purchase;
      const totalLimit = paymentTypeLimit.total;

      if (itemsCount > purchaseLimit && itemsCount > totalLimit) {
        return `You can't buy more than ${ totalLimit } NFTs${
          purchaseLimit < totalLimit ? ` in batches of ${ purchaseLimit }` : ""
        }`;
      }

      if (itemsCount > purchaseLimit && itemsCount <= totalLimit) return `You can't buy more than ${ purchaseLimit } NFTs at once`;

      return "";
    },
    [itemsCount, limits],
  );

  const limitExceededMessage = useMemo(() => {
    const firstPart = getLimitExceededMessageFirstPart(paymentType);

    const alternativePaymentMethods = acceptedPaymentTypes
      .filter(
        (acceptedPaymentType: PaymentType) => acceptedPaymentType !== paymentType &&
          !getLimitExceededMessageFirstPart(acceptedPaymentType),
      )
      .map(
        (alternativePaymentMethodType: PaymentType) => PAYMENT_METHOD_OPTION_PROPS[alternativePaymentMethodType].label,
      );

    const tryWithMessage = alternativePaymentMethods.length
      ? ` with this payment method. Use ${ join(
        alternativePaymentMethods,
        ", ",
        " or ",
      ) } instead`
      : "";

    if (!firstPart) return "";

    return `${ firstPart }${ tryWithMessage }.`;
  }, [getLimitExceededMessageFirstPart, paymentType, acceptedPaymentTypes]);

  return {
    limits,
    loading: collectionItemLoading || paymentLimitLoading || !limits,
    refetch,
    limitExceededMessage,
  };
}
