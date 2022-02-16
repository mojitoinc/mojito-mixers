import { useEffect, useState } from "react";
import { UseFormWatch, UseFormSetError } from "react-hook-form";
import { CheckoutModalError } from "../components/payments/CheckoutModal/CheckoutModal.hooks";
import { CircleFieldErrorAt } from "../domain/circle/circle.utils";

export interface UseFormCheckoutErrorOptions {
  formKey: CircleFieldErrorAt;
  checkoutError: CheckoutModalError;
  watch: UseFormWatch<any>;
  setError: UseFormSetError<any>;
  deps?: React.DependencyList;
}

export function useFormCheckoutError({
  formKey,
  checkoutError,
  watch,
  setError,
  deps,
}: UseFormCheckoutErrorOptions): string {
  const [genericErrorMessage, setGenericErrorMessage] = useState("");

  useEffect(() => {
    let needsGenericErrorMessage = !!checkoutError;

    const availableInputs = Object.keys(watch());

    Object.entries(checkoutError?.circleFieldErrors?.[formKey] || {}).forEach(([inputName, message]) => {
      if (!availableInputs.includes(inputName)) return;

      needsGenericErrorMessage = false;

      setError(inputName as Parameters<typeof setError>[0], { type: "manual", message });
    });

    setGenericErrorMessage(needsGenericErrorMessage ? checkoutError.errorMessage : "");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkoutError, formKey, watch, setError, ...deps]);

  return genericErrorMessage;
}
