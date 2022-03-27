import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import { CreditCard, PaymentMethod, PaymentType } from "../../../domain/payment/payment.interfaces";
import { ACH_MASK_PREFIX, CREDIT_CARD_MASK_PREFIX } from "../../../domain/payment/payment.constants";

export interface GetFormattedPaymentMethodReturn {
  isMasked: boolean;
  paymentType: PaymentType;
  displayValue: string;
  network: string;
}

function isSavedPaymentMethod(paymentMethodInfo: PaymentMethod | SavedPaymentMethod | null): paymentMethodInfo is SavedPaymentMethod {
  return !!paymentMethodInfo && paymentMethodInfo.hasOwnProperty("id");
}

export function getFormattedPaymentMethod(paymentMethodInfo: PaymentMethod | SavedPaymentMethod | null): GetFormattedPaymentMethodReturn {
  let isMasked = false;
  let paymentType: PaymentType = "CreditCard";
  let displayValue = "";
  let network = "";

  if (isSavedPaymentMethod(paymentMethodInfo)) {
    isMasked = true;

    if (paymentMethodInfo.type === "ACH") {
      paymentType = "ACH";
      displayValue = `${ ACH_MASK_PREFIX } ${ paymentMethodInfo.accountNumber }`;
    } else {
      paymentType = "CreditCard";
      displayValue = `${ CREDIT_CARD_MASK_PREFIX } ${ paymentMethodInfo.last4Digit }`;
      network = paymentMethodInfo.network;
    }
  } else if (paymentMethodInfo === null) {
    isMasked = true;
    displayValue = `${ CREDIT_CARD_MASK_PREFIX } XXXX`;
  } else {
    displayValue = (paymentMethodInfo as CreditCard).cardNumber;
  }

  return {
    isMasked,
    paymentType,
    displayValue,
    network,
  };
}
