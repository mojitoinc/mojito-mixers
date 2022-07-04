import images from "react-payment-inputs/images";
import { getExpiryDateError } from "react-payment-inputs";
import { CreditCardNetwork, CREDIT_CARD_NETWORKS, getCardTypeByValue } from "../react-payment-inputs/react-payment-inputs.utils";
import { ValidatePaymentLimitOutput } from "../../queries/graphqlGenerated";

export function getCreditCardNetworkFromNumber(cardNumber: string): "" | CreditCardNetwork {
  return getCardTypeByValue(cardNumber)?.type || "";
}

export function getCreditCardNetworkFromLabel(network = ""): "" | CreditCardNetwork {
  if (!network) return "";

  const creditCardNetwork = network.toLowerCase().replace(/\s/g, "") as CreditCardNetwork;

  return CREDIT_CARD_NETWORKS.includes(creditCardNetwork) ? creditCardNetwork : "";
}

export function getCreditCardNetworkImageFromLabel(network = ""): CreditCardNetwork {
  return getCreditCardNetworkFromLabel(network) || "placeholder";
}

export function standaloneGetCardImageProps(network = "") {
  // See https://github.com/medipass/react-payment-inputs/blob/master/src/usePaymentInputs.js#L452

  const creditCardNetworkImage = getCreditCardNetworkImageFromLabel(network);

  return {
    "aria-label": network,
    children: images[creditCardNetworkImage] || images.placeholder,
    width: "1.5em",
    height: "1em",
    viewBox: "0 0 24 16",
  };
}

export const getExpiryDateIsValid = (expiryDate?: string) => !getExpiryDateError(expiryDate);

export function getCvvIsValid(cvv = "", network: "" | CreditCardNetwork = "", networks: CreditCardNetwork[] = [], required = true) {
  // if (required && !cvv) return false;
  // if (!required && !cvv) return true;

  const cvvLength = cvv.length;

  let cvvExpectedLength: 3 | 4 | "3 or 4" = "3 or 4";

  if ((!network && networks.length > 0 && !networks.includes("amex")) || network !== "amex") {
    cvvExpectedLength = 3;
  } else if ((!network && networks.length === 1 && networks.includes("amex")) || network === "amex") {
    cvvExpectedLength = 4;
  }

  return cvv ? {
    cvvLength,
    cvvExpectedLength,
    isCvvValid: cvvLength === cvvExpectedLength || ((cvvLength === 3 || cvvLength === 4) && cvvExpectedLength === "3 or 4"),
  } : {
    cvvLength,
    cvvExpectedLength,
    isCvvValid: !required,
  };
}

export interface PaymentLimits {
  CreditCard: {
    purchase: number;
    total: number;
  },
  ACH: {
    purchase: number;
    total: number;
  };
  Wire: {
    purchase: number;
    total: number;
  };
  Crypto: {
    purchase: number;
    total: number;
  };
  Coinbase: {
    purchase: number;
    total: number;
  };
}

export function transformRawRemainingItemLimit(rawRemainingItemLimit?: ValidatePaymentLimitOutput, itemsCount = 0): PaymentLimits {
  return {
    CreditCard: {
      purchase: (rawRemainingItemLimit?.creditCard?.remainingTransaction ?? Infinity) + itemsCount,
      total: (rawRemainingItemLimit?.creditCard?.remainingTotal ?? Infinity) + itemsCount,
    },
    ACH: {
      purchase: (rawRemainingItemLimit?.ach?.remainingTransaction ?? Infinity) + itemsCount,
      total: (rawRemainingItemLimit?.ach?.remainingTotal ?? Infinity) + itemsCount,
    },
    Wire: {
      purchase: (rawRemainingItemLimit?.wire?.remainingTransaction ?? Infinity) + itemsCount,
      total: (rawRemainingItemLimit?.wire?.remainingTotal ?? Infinity) + itemsCount,
    },
    // TODO: Update once crypto is added to ValidatePaymentLimitOutput:
    Crypto: {
      purchase: ((rawRemainingItemLimit as any)?.crypto?.remainingTransaction ?? Infinity) + itemsCount,
      total: ((rawRemainingItemLimit as any)?.crypto?.remainingTotal ?? Infinity) + itemsCount,
    },
    // TODO: Update once crypto is added to ValidatePaymentLimitOutput:
    Coinbase: {
      purchase: ((rawRemainingItemLimit as any)?.crypto?.remainingTransaction ?? Infinity) + itemsCount,
      total: ((rawRemainingItemLimit as any)?.crypto?.remainingTotal ?? Infinity) + itemsCount,
    },
  };
}
