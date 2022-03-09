import { useCallback } from "react";
import { CreatePaymentMethodMutation, PaymentType, useCreatePaymentMethodMutation, AchMetadata, CreditCardMetadata, CreditCardBillingDetails, useGetPaymentMethodStatusLazyQuery } from "../queries/graphqlGenerated";
import { BillingInfo } from "../forms/BillingInfoForm";
import { FetchResult, MutationResult } from "@apollo/client";
import { PaymentMethod } from "../domain/payment/payment.interfaces";
import { useEncryptCardData } from "./useEncryptCard";
import { formatPhoneAsE123 } from "../domain/circle/circle.utils";
import { fullTrim } from "../utils/formatUtils";
import { PaymentStatus } from "../domain/circle/circle.interfaces";
import { wait } from "../utils/promiseUtils";
import { PAYMENT_CREATION_INTERVAL_MS, PAYMENT_CREATION_MAX_WAIT_MS } from "../config/config";

export interface CreatePaymentMethodOptions {
  debug?: boolean;
}

export interface ExtendedCreatePaymentMethodOptions {
  orgID: string;
  billingInfo: BillingInfo;
  paymentInfo: PaymentMethod;
}

export function useCreatePaymentMethod({
  debug,
}: CreatePaymentMethodOptions): [
  (orgID: string, billingInfo: BillingInfo, paymentInfo: PaymentMethod) => Promise<FetchResult<CreatePaymentMethodMutation>>,
  MutationResult<CreatePaymentMethodMutation>
] {
  const [encryptCardData] = useEncryptCardData();
  const [getPaymentMethodStatus] = useGetPaymentMethodStatusLazyQuery();
  const [createPaymentMethod, createPaymentMethodResult] = useCreatePaymentMethodMutation();

  const extendedCreatePaymentMethod = useCallback(async (
    orgID: string,
    billingInfo: BillingInfo,
    paymentInfo: PaymentMethod,
  ): Promise<FetchResult<CreatePaymentMethodMutation>> => {
    if (!orgID) throw new Error("Missing `orgID`");

    const metadata: AchMetadata | CreditCardMetadata = {
      email: billingInfo.email,
      phoneNumber: formatPhoneAsE123(billingInfo.phone, `${ billingInfo.country.value }`),
    };

    // Using CreditCardBillingDetails as it's more restrictive than AchBillingDetails (address 2 is required instead of optional):
    const billingDetails : CreditCardBillingDetails = {
      name: fullTrim(billingInfo.fullName),
      city: fullTrim(billingInfo.city),
      country: `${ billingInfo.country.value }`,
      address1: fullTrim(billingInfo.street || ""),
      address2: fullTrim(billingInfo.apartment || ""),
      district: `${ billingInfo.state.value || billingInfo.state.label }`,
      postalCode: fullTrim(billingInfo.zipCode),
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
              billingDetails,
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
              billingDetails,
            },
          },
        },
      });
    } else {
      throw new Error("Unsupported payment method.");
    }

    if (!createPaymentMethodPromise) {
      throw new Error("Payment method could not be saved.");
    }

    let lastPaymentMethodStatusCheck: number;

    const paymentMethodCreatedAt = lastPaymentMethodStatusCheck = Date.now();

    const createPaymentMethodResult = await createPaymentMethodPromise;
    const createPaymentMethodResultData: { id?: string; status?: string } = createPaymentMethodResult.data?.createPaymentMethod || {};
    const paymentMethodID = createPaymentMethodResultData.id;

    let status: PaymentStatus = createPaymentMethodResultData.status as PaymentStatus;

    if (!paymentMethodID || status === "failed") throw new Error("Payment method could not be saved.");

    if (status === "complete") return createPaymentMethodPromise;

    let totalWaitTimeSoFar = 0;

    while (totalWaitTimeSoFar < PAYMENT_CREATION_MAX_WAIT_MS && status === "pending") {
      const now = Date.now();
      const paymentMethodStatusWaitTime = Math.max(PAYMENT_CREATION_INTERVAL_MS - (now - lastPaymentMethodStatusCheck), 0);

      totalWaitTimeSoFar = now - paymentMethodCreatedAt;

      if (debug) console.log(`    👀 getPaymentMethodStatus (${ totalWaitTimeSoFar / 1000 | 0 } / ${ PAYMENT_CREATION_MAX_WAIT_MS / 1000 | 0 } sec.)`, { paymentMethodID  });

      if (paymentMethodStatusWaitTime > 0) await wait(paymentMethodStatusWaitTime);

      lastPaymentMethodStatusCheck = Date.now();

      const paymentMethodStatusResult = await getPaymentMethodStatus({
        variables: { paymentMethodID },
      });

      status = paymentMethodStatusResult.data?.getPaymentMethod.status as PaymentStatus || "failed";
    }

    if (status === "failed") throw new Error("Payment method could not be saved.");
    else if (status === "complete") return createPaymentMethodPromise;

    throw new Error("Payment method could not be validated.");
  }, [debug, encryptCardData, createPaymentMethod, getPaymentMethodStatus]);

  return [extendedCreatePaymentMethod, createPaymentMethodResult];
}
