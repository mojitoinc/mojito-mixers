import { AnySchema } from "yup";
import { MessageParams } from "yup/lib/types";

export const requireSchemaWhenKeyIs = (key: string) => ({
  is: key,
  then: (schema: AnySchema) => schema.required(withRequiredErrorMessage)
});

export const withRequiredErrorMessage = ({ label: fieldLabel }: MessageParams) => `${fieldLabel} is required`;
export const withTypeErrorMessageFor = (type: string) => ({ label: fieldLabel }: MessageParams) => `${fieldLabel} must be a ${type}`;
export const withInvalidErrorMessage = ({ label: fieldLabel }: MessageParams) => `${fieldLabel} is not valid`;
