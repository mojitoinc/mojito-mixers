import { AnySchema } from "yup";
import { MessageParams } from "yup/lib/types";
export declare const requireSchemaWhenKeyIs: (key: string) => {
    is: string;
    then: (schema: AnySchema) => any;
};
export declare const withRequiredErrorMessage: ({ label: fieldLabel }: MessageParams) => string;
export declare const withTypeErrorMessageFor: (type: string) => ({ label: fieldLabel }: MessageParams) => string;
export declare const withInvalidErrorMessage: ({ label: fieldLabel }: MessageParams) => string;
