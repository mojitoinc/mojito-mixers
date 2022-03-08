import { useCallback } from "react";
import { CreatePaymentMethodMutation, PaymentType, useCreatePaymentMethodMutation, AchMetadata, CreditCardMetadata, CreditCardBillingDetails } from "../queries/graphqlGenerated";
import { BillingInfo } from "../forms/BillingInfoForm";
import { FetchResult, MutationResult } from "@apollo/client";
import { PaymentMethod } from "../domain/payment/payment.interfaces";
import { useEncryptCardData } from "./useEncryptCard";
import { formatPhoneAsE123 } from "../domain/circle/circle.utils";
import { fullTrim } from "../utils/formatUtils";


export interface ExtendedCreatePaymentMethodOptions {
  orgID: string;
  billingInfo: BillingInfo;
  paymentInfo: PaymentMethod;
}

export function useCreatePaymentMethod(): [
  (orgID: string, billingInfo: BillingInfo, paymentInfo: PaymentMethod) => Promise<FetchResult<CreatePaymentMethodMutation>>,
  MutationResult<CreatePaymentMethodMutation>
] {
  const [encryptCardData] = useEncryptCardData();
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

    if (paymentInfo.type === PaymentType.CreditCard) {
      const { keyID, encryptedCardData } = await encryptCardData({
        number: paymentInfo.cardNumber.replace(/\s/g, ""),
        cvv: paymentInfo.secureCode,
      });

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
  }, [encryptCardData, createPaymentMethod]);

  return [extendedCreatePaymentMethod, createPaymentMethodResult];
}
