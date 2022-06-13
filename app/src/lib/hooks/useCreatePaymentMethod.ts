import { useCallback } from "react";
import { FetchResult, MutationResult } from "@apollo/client";
import { CreatePaymentMethodMutation, PaymentType, useCreatePaymentMethodMutation, AchMetadata, CreditCardMetadata, CreditCardBillingDetails, useGetPaymentMethodStatusLazyQuery, AchBillingDetails } from "../queries/graphqlGenerated";
import { BillingInfo } from "../forms/BillingInfoForm";
import { PaymentMethod } from "../domain/payment/payment.interfaces";
import { useEncryptCardData } from "./useEncryptCard";
import { billingInfoToBillingDetails, formatPhoneAsE123 } from "../domain/circle/circle.utils";
import { PaymentMethodStatus } from "../domain/circle/circle.interfaces";
import { wait } from "../utils/promiseUtils";
import { PAYMENT_CREATION_INTERVAL_MS, PAYMENT_CREATION_MAX_WAIT_MS } from "../config/config";
import { EXCEPTIONS } from "../domain/errors/exceptions.constants";

export interface CreatePaymentMethodOptions {
  orgID: string;
  debug?: boolean;
}

export interface ExtendedCreatePaymentMethodOptions {
  billingInfo: BillingInfo;
  paymentInfo: PaymentMethod;
}

export function useCreatePaymentMethod({
  orgID,
  debug,
}: CreatePaymentMethodOptions): [
  (billingInfo: BillingInfo, paymentInfo: PaymentMethod) => Promise<FetchResult<CreatePaymentMethodMutation>>,
  MutationResult<CreatePaymentMethodMutation>
] {
  const [encryptCardData] = useEncryptCardData({ orgID });
  const [getPaymentMethodStatus] = useGetPaymentMethodStatusLazyQuery();
  const [createPaymentMethod, createPaymentMethodResult] = useCreatePaymentMethodMutation();

  const extendedCreatePaymentMethod = useCallback(async (
    billingInfo: BillingInfo,
    paymentInfo: PaymentMethod,
  ): Promise<FetchResult<CreatePaymentMethodMutation>> => {
    const metadata: AchMetadata | CreditCardMetadata = {
      email: billingInfo.email,
      phoneNumber: formatPhoneAsE123(billingInfo.phone, `${ billingInfo.country.value }`),
    };

    let createPaymentMethodPromise: ReturnType<typeof createPaymentMethod> | null = null;

    if (paymentInfo.type === PaymentType.CreditCard) {
      const { keyID, encryptedCardData } = await encryptCardData({
        number: paymentInfo.cardNumber.replace(/\s/g, ""),
        cvv: paymentInfo.secureCode,
      });

      const [expirationMonth, expirationYearLastTwoDigits] = paymentInfo.expiryDate.split("/").map(value => parseInt(value.trim(), 10));
      const expirationYear = 2000 + expirationYearLastTwoDigits;

      createPaymentMethodPromise = createPaymentMethod({
        variables: {
          orgID,
          input: {
            paymentType: PaymentType.CreditCard,
            creditCardData: {
              keyID,
              encryptedData: encryptedCardData,
              expirationMonth,
              expirationYear,
              metadata,
              billingDetails: billingInfoToBillingDetails<CreditCardBillingDetails>(billingInfo),
            },
          },
        },
      });
    } else if (paymentInfo.type === PaymentType.Ach) {
      createPaymentMethodPromise = createPaymentMethod({
        variables: {
          orgID,
          input: {
            paymentType: PaymentType.Ach,
            achData: {
              // TODO: Add account name?
              accountId: paymentInfo.accountId,
              publicToken: paymentInfo.publicToken,
              metadata,
              billingDetails: billingInfoToBillingDetails<AchBillingDetails>(billingInfo),
            },
          },
        },
      });
    } else if (paymentInfo.type === PaymentType.Crypto) {
      createPaymentMethodPromise = createPaymentMethod({
        variables: {
          orgID,
          input: {
            paymentType: PaymentType.Crypto,
          },
        },
      });
    } else {
      throw new Error(EXCEPTIONS.PAYMENT_METHOD.UNSUPPORTED);
    }

    let lastPaymentMethodStatusCheck: number;

    const paymentMethodCreatedAt = lastPaymentMethodStatusCheck = Date.now();
    const createPaymentMethodPromiseResult = createPaymentMethodPromise ? await createPaymentMethodPromise : null;
    const createPaymentMethodResultData: { id?: string; status?: string } = createPaymentMethodPromiseResult?.data?.createPaymentMethod || {};
    const paymentMethodID = createPaymentMethodResultData.id;

    let status: PaymentMethodStatus = createPaymentMethodResultData.status as PaymentMethodStatus;
    let totalWaitTimeSoFar = 0;

    if (!paymentMethodID) throw new Error(EXCEPTIONS.PAYMENT_METHOD.CREATION_FAILED);

    while (totalWaitTimeSoFar < PAYMENT_CREATION_MAX_WAIT_MS && status === "pending") {
      const now = Date.now();
      const paymentMethodStatusWaitTime = Math.max(PAYMENT_CREATION_INTERVAL_MS - (now - lastPaymentMethodStatusCheck), 0);

      totalWaitTimeSoFar = now - paymentMethodCreatedAt;

      if (debug) {
        console.log(`    👀 getPaymentMethodStatus (${
          totalWaitTimeSoFar / 1000 | 0
        } / ${
          PAYMENT_CREATION_MAX_WAIT_MS / 1000 | 0
        } sec.)`, { paymentMethodID });
      }

      // eslint-disable-next-line no-await-in-loop
      if (paymentMethodStatusWaitTime > 0) await wait(paymentMethodStatusWaitTime);

      lastPaymentMethodStatusCheck = Date.now();

      // eslint-disable-next-line no-await-in-loop
      const paymentMethodStatusResult = await getPaymentMethodStatus({
        variables: { paymentMethodID },
      });

      status = paymentMethodStatusResult.data?.getPaymentMethod?.status as PaymentMethodStatus || "failed";
    }

    if (status === "failed") throw new Error(EXCEPTIONS.PAYMENT_METHOD.VALIDATION_FAILED);
    else if (status === "complete") return createPaymentMethodPromise;

    throw new Error(EXCEPTIONS.PAYMENT_METHOD.VALIDATION_TIMEOUT);
  }, [debug, orgID, encryptCardData, createPaymentMethod, getPaymentMethodStatus]);

  return [extendedCreatePaymentMethod, createPaymentMethodResult];
}
