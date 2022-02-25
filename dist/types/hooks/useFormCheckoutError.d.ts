/// <reference types="react" />
import { UseFormSetError } from "react-hook-form";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { CircleFieldErrorAt } from "../domain/circle/circle.utils";
export interface UseFormCheckoutErrorOptions {
    formKey: CircleFieldErrorAt;
    checkoutError?: CheckoutModalError;
    fields: string[];
    setError: UseFormSetError<any>;
    deps?: React.DependencyList;
}
export declare function checkNeedsGenericErrorMessage(formKey: CircleFieldErrorAt, checkoutError?: CheckoutModalError): boolean | undefined;
export declare function useFormCheckoutError({ formKey, checkoutError, fields, setError, deps, }: UseFormCheckoutErrorOptions): string;
