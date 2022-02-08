import { useCallback } from "react";
import { CreatePaymentMethodMutation, PaymentType, useCreatePaymentMethodMutation, usePaymentKeyLazyQuery, AchMetadata, CreditCardMetadata, CreditCardBillingDetails } from "../queries/graphqlGenerated";
import { createMessage, encrypt, Key, readKeys, Message } from "openpgp";
import atob from "atob";
import btoa from "btoa";
import { BillingInfo } from "../forms/BillingInfoForm";
import { FetchResult, MutationResult } from "@apollo/client";
import { formatPhoneAsE123 } from "../domain/circle/circle.utils";
import { PaymentMethod } from "../domain/payment/payment.interfaces";

async function encryptCard(
  key: string,
  cardNumber: string,
  cvv: string
) {
  const dataToEncrypt = {
    number: cardNumber,
    cvv,
  };

  const decodedPublicKey = atob(key);

  const [encryptionKeys, message] = await Promise.allSettled([
    readKeys({ armoredKeys: decodedPublicKey }),
    createMessage({ text: JSON.stringify(dataToEncrypt) }),
  ]).then((allSettledResults) => {
    return allSettledResults.map((allSettledResult) => {
      return allSettledResult.status === "fulfilled" ? allSettledResult.value : null;
    }) as [Key[], Message<string>];
  });

  const ciphertext = await encrypt({
    message,
    encryptionKeys,
  });

  return btoa(ciphertext);
}

export interface ExtendedCreatePaymentMethodOptions {
  orgID: string;
  billingInfo: BillingInfo;
  paymentInfo: PaymentMethod;
}

export function useCreatePaymentMethod(): [
  (orgID: string, billingInfo: BillingInfo, paymentInfo: PaymentMethod) => Promise<FetchResult<CreatePaymentMethodMutation>>,
  MutationResult<CreatePaymentMethodMutation>
] {
  // Changed from usePaymentKeyQuery + skit: true to usePaymentKeyLazyQuery due to https://github.com/apollographql/apollo-client/issues/9101.
  const [fetchPaymentKey]= usePaymentKeyLazyQuery();

  const [
    createPaymentMethod,
    createPaymentMethodResult,
  ] = useCreatePaymentMethodMutation();

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
      name: billingInfo.fullName,
      city: billingInfo.city,
      country: `${ billingInfo.country.value }`,
      address1: billingInfo.street || "",
      address2: billingInfo.apartment || "",
      district: `${ billingInfo.state.value || billingInfo.state.label }`,
      postalCode: billingInfo.zipCode,
    };

    if (paymentInfo.type === PaymentType.CreditCard) {
      const paymentKeyResult = await fetchPaymentKey().catch((err) => {
        console.log(err);

        return undefined;
      });

      const paymentKeyData = paymentKeyResult?.data;
      const publicKey = paymentKeyData?.getPaymentPublicKey?.publicKey;
      const keyID = paymentKeyData?.getPaymentPublicKey?.keyID;

      if (!publicKey || !keyID) throw new Error("Missing `publicKey` or `keyID`");

      const encryptedCardData = await encryptCard(
        publicKey,
        paymentInfo.cardNumber.replace(/\s/g, ""),
        paymentInfo.secureCode,
      );

      const [expirationMonth, expirationYearLastTwoDigits] = paymentInfo.expiryDate.split("/").map(value => parseInt(value.trim(), 10));
      const expirationYear = 2000 + expirationYearLastTwoDigits;

      return createPaymentMethod({
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
    }

    if (paymentInfo.type === PaymentType.Ach) {
      return createPaymentMethod({
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
    }

    throw new Error("Unsupported payment method.");
  }, [fetchPaymentKey, createPaymentMethod]);

  return [extendedCreatePaymentMethod, createPaymentMethodResult];
}
