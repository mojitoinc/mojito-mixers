import { AnySchema } from "yup";
import { MessageParams } from "yup/lib/types";
import { CreditCardNetwork } from "../domain/react-payment-inputs/react-payment-inputs.utils";
export declare const requireSchemaWhenKeyIs: (key: string) => {
    is: string;
    then: (schema: AnySchema) => any;
};
export declare const withRequiredErrorMessage: ({ label }: {
    label: string;
}) => string;
export declare const withTypeErrorMessageFor: (type: string) => ({ label }: MessageParams) => string;
export declare const withInvalidErrorMessage: ({ label }: {
    label: string;
}) => string;
export declare const withFullNameErrorMessage: ({ label }: {
    label: string;
}) => string;
export declare const withFullNameCharsetErrorMessage: ({ label }: {
    label: string;
}) => string;
export declare const withPhoneErrorMessage: ({ label }: {
    label: string;
}) => string;
export declare const withInvalidAddress: ({ variant }: {
    variant: "form" | "selector";
}) => string;
export declare const withInvalidZipCode: ({ label }: {
    label: string;
}) => string;
export declare const withInvalidCardNumber: ({ label }: {
    label: string;
}) => string;
export declare const withInvalidCVV: ({ cvvLabel, cvvExpectedLength }: {
    cvvLabel: string;
    cvvExpectedLength: 3 | 4 | "3 or 4";
}) => string;
export declare const withInvalidCreditCardNetwork: ({ acceptedCreditCardNetworks }: {
    acceptedCreditCardNetworks: CreditCardNetwork[];
}) => string;
