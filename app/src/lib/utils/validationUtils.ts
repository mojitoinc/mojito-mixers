import { AnySchema } from "yup";
import { MessageParams } from "yup/lib/types";
import { CreditCardNetwork, getCardNameByType } from "../domain/react-payment-inputs/react-payment-inputs.utils";

export const requireSchemaWhenKeyIs = (key: string) => ({
  is: key,
  then: (schema: AnySchema) => schema.required(withRequiredErrorMessage)
});

export const withRequiredErrorMessage = ({ label }: { label: string }) => `${ label } is required.`;

export const withTypeErrorMessageFor = (type: string) => ({ label }: MessageParams) => `${ label } must be a ${ type }.`;

export const withInvalidErrorMessage = ({ label }: { label: string }) => `${ label } is not valid.`;

export const withFullNameErrorMessage = ({ label }: { label: string }) => `${ label } must have at least first and last name.`;

export const withPhoneErrorMessage = ({ label }: { label: string }) => `${ label } must be a valid phone number.`;

export const withInvalidCardNumber = ({ label }: { label: string }) => `${ label } is invalid.`;

export const withInvalidCVV = ({ cvvLabel, cvvExpectedLength }: { cvvLabel: string, cvvExpectedLength: 3 | 4 | "3 or 4" }) => {
  return `${ cvvLabel } must have ${ cvvExpectedLength } digits.`;
};

export const withInvalidCreditCardNetwork = ({ acceptedCreditCardNetworks }: { acceptedCreditCardNetworks: CreditCardNetwork[] }) => {
  const [ acceptedCreditCardName, ...otherAcceptedCreditCardNames] = acceptedCreditCardNetworks.map((acceptedCreditCardNetwork) => {
    return getCardNameByType(acceptedCreditCardNetwork);
  });

  return `Only ${ otherAcceptedCreditCardNames.join(", ") }${ otherAcceptedCreditCardNames.length ? " and " : "" }${ acceptedCreditCardName } ${ otherAcceptedCreditCardNames.length === 1 ? "is" : "are" } accepted.`;
};
