import { AnySchema } from "yup";
import { MessageParams } from "yup/lib/types";
import { CreditCardNetwork, getCardNameByType } from "../domain/react-payment-inputs/react-payment-inputs.utils";

export type ErrorMessageParams = Partial<MessageParams> & { label: string };


// Generic:

export const CONSENT_ERROR_MESSAGE = "You must accept the terms and conditions of the sale.";

export const withRequiredErrorMessage = ({ label }: ErrorMessageParams) => `${ label } is required.`;

export const withInvalidErrorMessage = ({ label }: ErrorMessageParams) => `${ label } is not valid.`;

export const requireSchemaWhenKeyIs = (key: string) => ({
  is: key,
  then: (schema: AnySchema) => schema.required(withRequiredErrorMessage),
});


// Billing Information:

export const withFullNameErrorMessage = ({ label }: ErrorMessageParams) => `${ label } must have at least first and last name.`;

export const withFullNameCharsetErrorMessage = ({ label }: ErrorMessageParams) => `${ label } contains invalid characters.`;

export const withPhoneErrorMessage = ({ label }: ErrorMessageParams) => `${ label } must be a valid phone number.`;


// Saved Information:

export const SELECTION_ERROR_MESSAGE = "You must select a saved and approved payment method or create a new one.";


// Address:

export const withInvalidAddress = ({ variant }: { variant: "form" | "selector" }) => `Please, ${ variant === "form" ? "enter" : "select" } a valid address to calculate taxes.`;

export const withInvalidZipCode = ({ label }: ErrorMessageParams) => `The ${ label } you entered does not match the address.`;


// Credit Card:

export const withInvalidCardNumber = ({ label }: ErrorMessageParams) => `${ label } is invalid.`;

export const withInvalidCVV = ({ cvvLabel, cvvExpectedLength }: { cvvLabel: string, cvvExpectedLength: 3 | 4 | "3 or 4" }) => `${ cvvLabel } must have ${ cvvExpectedLength } digits.`;

export const withInvalidCreditCardNetwork = ({ acceptedCreditCardNetworks }: { acceptedCreditCardNetworks: CreditCardNetwork[] }) => {
  const [
    acceptedCreditCardName,
    ...otherAcceptedCreditCardNames
  ] = acceptedCreditCardNetworks.map(acceptedCreditCardNetwork => getCardNameByType(acceptedCreditCardNetwork));

  return `Only ${
    otherAcceptedCreditCardNames.join(", ")
  }${
    otherAcceptedCreditCardNames.length ? " and " : ""
  }${
    acceptedCreditCardName
  } ${
    acceptedCreditCardNetworks.length === 1 ? "is" : "are"
  } accepted.`;
};


// Discount Code:

export const DISCOUNT_CODE_INVALID_ERROR_MESSAGE = "The discount code is invalid or expired.";

export const DISCOUNT_CODE_EXCEPTION_ERROR_MESSAGE = "The discount code could not be validated.";


// Plaid:

export const withInvalidConnection = ({ label }: ErrorMessageParams) => `Could not connect${ label ? ` to ${ label }` : "" }.`;
