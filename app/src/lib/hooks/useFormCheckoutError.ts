import { useEffect, useState } from "react";
import { UseFormSetError } from "react-hook-form";
import { CheckoutModalError } from "../components/payments/CheckoutModal/CheckoutModal.hooks";
import { CircleFieldErrorAt } from "../domain/circle/circle.utils";

export interface UseFormCheckoutErrorOptions {
  formKey: CircleFieldErrorAt;
  checkoutError?: CheckoutModalError;
  fields: string[];
  setError: UseFormSetError<any>;
  deps?: React.DependencyList;
}

export function checkNeedsGenericErrorMessage(formKey: CircleFieldErrorAt, checkoutError?: CheckoutModalError) {
  return checkoutError && checkoutError.circleFieldErrors && (
    (formKey === "billing" && !checkoutError.circleFieldErrors.payment) ||
    (formKey === "payment" && !checkoutError.circleFieldErrors.billing)
  );
}

export function useFormCheckoutError({
  formKey,
  checkoutError,
  fields,
  setError,
  deps = [],
}: UseFormCheckoutErrorOptions): string {
  const [genericErrorMessage, setGenericErrorMessage] = useState("");

  useEffect(() => {
    let needsGenericErrorMessage = checkNeedsGenericErrorMessage(formKey, checkoutError);

    const fieldErrors: Record<string, string> = checkoutError?.circleFieldErrors?.[formKey] || {};

    if (fieldErrors) {
      Object.entries(fieldErrors).forEach(([inputName, message]) => {
        if (!fields.includes(inputName)) return;

        needsGenericErrorMessage = false;

        setError(inputName as Parameters<typeof setError>[0], { type: "manual", message });
      });
    }

    // Only show the generic error message at the bottom of the form if we could not match any error to a specific
    // input field:
    setGenericErrorMessage(needsGenericErrorMessage ? (checkoutError?.errorMessage || "") : "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formKey, checkoutError, fields, setError, ...deps]);

  return genericErrorMessage;
}
