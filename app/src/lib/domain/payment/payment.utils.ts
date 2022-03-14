import images from "react-payment-inputs/images";
import { CreditCardNetwork, getCardNumberError, getExpiryDateError } from "react-payment-inputs";


export function standaloneGetCardImageProps(network = "") {
  // See https://github.com/medipass/react-payment-inputs/blob/master/src/usePaymentInputs.js#L452

  const paymentInputsNetwork = (network.toLowerCase().replace(/\s/g, "") || "placeholder") as CreditCardNetwork;

  return {
    "aria-label": network,
    children: images[paymentInputsNetwork] || images.placeholder,
    width: "1.5em",
    height: "1em",
    viewBox: "0 0 24 16",
  };
}

export const getCardNumberIsValid = (cardNumber?: string) => !getCardNumberError(cardNumber);

export const getExpiryDateIsvalid = (expiryDate?: string) => !getExpiryDateError(expiryDate);

export const getCVCIsValid = (cvc?: string) => !!cvc && (cvc.length === 3 || cvc.length === 4);
