import { SavedPaymentMethod } from "../../../domain/circle/circle.interfaces";
import { AchAccount, CoinbaseAddress, CreditCard, CryptoAddress, PaymentMethod, PaymentType } from "../../../domain/payment/payment.interfaces";
import { ACH_MASK_PREFIX, CREDIT_CARD_MASK_PREFIX, GENERIC_MASK } from "../../../domain/payment/payment.constants";

export interface GetFormattedPaymentMethodReturn {
  useCreditCardInput: boolean;
  paymentType: PaymentType | "";
  displayValue: string;
  network: string;
}

function isSavedPaymentMethod(paymentMethodInfo: PaymentMethod | SavedPaymentMethod | null): paymentMethodInfo is SavedPaymentMethod {
  return !!paymentMethodInfo && paymentMethodInfo.hasOwnProperty("id");
}

export function getFormattedPaymentMethod(paymentMethodInfo: PaymentMethod | SavedPaymentMethod | null): GetFormattedPaymentMethodReturn {
  let useCreditCardInput = false;
  let paymentType: PaymentType | "" = "";
  let displayValue = "";
  let network = "";

  if (isSavedPaymentMethod(paymentMethodInfo)) {
    if (paymentMethodInfo.type === "ACH") {
      paymentType = "ACH";
      displayValue = `${ ACH_MASK_PREFIX } ${ paymentMethodInfo.accountNumber }`;
    } else if (paymentMethodInfo.type === "CreditCard") {
      paymentType = "CreditCard";
      displayValue = `${ CREDIT_CARD_MASK_PREFIX } ${ paymentMethodInfo.last4Digit }`;
      network = paymentMethodInfo.network;
    } else if (paymentMethodInfo.type === "Crypto") {
      paymentType = "Crypto";
      displayValue = `${ paymentMethodInfo.id }`;
    }
  } else if (paymentMethodInfo) {
    if ((paymentMethodInfo as CreditCard).hasOwnProperty("cardNumber")) {
      paymentType = "CreditCard";
      displayValue = (paymentMethodInfo as CreditCard).cardNumber;

      if (displayValue) useCreditCardInput = true;
    } else if ((paymentMethodInfo as AchAccount).hasOwnProperty("accountNumber")) {
      paymentType = "ACH";
      displayValue = (paymentMethodInfo as AchAccount).accountId;
    } else if ((paymentMethodInfo as CryptoAddress).type === "Crypto") {
      // TODO: Here it should say "WETH Payment" instead of "Crypto Payment":
      paymentType = "Crypto";
    } else if ((paymentMethodInfo as CoinbaseAddress).type === "Coinbase") {
      paymentType = "Coinbase";
    }
  }

  displayValue ||= GENERIC_MASK;

  return {
    useCreditCardInput,
    paymentType,
    displayValue,
    network,
  };
}
