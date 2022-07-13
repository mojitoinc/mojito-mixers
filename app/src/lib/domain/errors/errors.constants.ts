import { ApolloError } from "@apollo/client";
import { CheckoutModalError, CheckoutModalErrorAt } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { withFullNameErrorMessage } from "../../utils/validationUtils";

export const BUILT_IN_ERRORS = ["EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "AggregateError", "InternalError"];

export const DEFAULT_ERROR_AT = "reset";

export interface MappedError {
  errorLocation?: CheckoutModalErrorAt;
  fieldName?: string;
  errorMessage: string;
}

export interface ErrorCreator<
  V extends Record<string, string | number> = Record<string, never>
> {
  (error?: ApolloError | Error, variables?: V): CheckoutModalError;
  errorMessage: string;
}

function createError<
  V extends Record<string, string | number> = Record<string, never>
>(
  errorMessage: string,
  at: CheckoutModalErrorAt,
): ErrorCreator<V> {
  const errorCreator: ErrorCreator<V> = (error?: ApolloError | Error, variables?: V): CheckoutModalError => {
    let finalErrorMessage = errorMessage;

    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        finalErrorMessage = finalErrorMessage.replace(`$${ key }`, `${ value }`);
      });
    }

    return ({
      error,
      errorMessage: finalErrorMessage,
      at,
    });
  };

  errorCreator.errorMessage = errorMessage;

  return errorCreator;
}


// Generic:

export const ERROR_GENERIC = createError("An unexpected error happened.", "close");

export const ERROR_LOADING = createError("Loading error details...", "close");

export const ERROR_LOADING_TIMEOUT = createError("The purchase could not be completed.", "payment");


// CheckoutModal:

export const ERROR_LOADING_USER = createError("User could not be loaded.", "reset");

export const ERROR_LOADING_PAYMENT_METHODS = createError("Payment methods could not be loaded.", "reset");

export const ERROR_LOADING_INVOICE = createError("Invoice could not be loaded.", "reset");

export const ERROR_INVOICE_TIMEOUT = createError("Your product reservation expired. Please, try to complete the purchase again in time.", "reset");


// PurchasingView / useFullPayment:

export const ERROR_PURCHASE_TIMEOUT = createError("The purchase could not be completed in time.", "purchasing");

export const ERROR_PURCHASE_NO_ITEMS = createError("No items to purchase.", "close");

export const ERROR_PURCHASE_NO_UNITS = createError("No units to purchase.", "close");

export const ERROR_PURCHASE_LOADING_ITEMS = createError("Purchase items could not be loaded.", "close");

export const ERROR_PURCHASE_TOTAL_SOLD_OUT = createError("Sold out.", "close");

export const ERROR_PURCHASE_PARTIAL_SOLD_OUT = createError<{ availableUnits: number }>("Only $availableUnits available.", "close");

export const ERROR_PURCHASE_NOT_ALLOWED = createError("You don't have access to this sale.", "close");

export const ERROR_PURCHASE_CREATING_INVOICE = createError("Invoice could not be created.", "reset");

export const ERROR_PURCHASE_SELECTED_PAYMENT_METHOD = createError("Could not find the selected payment method.", "reset");

export const ERROR_PURCHASE_CREATING_PAYMENT_METHOD = createError("Payment method could not be saved.", "billing");

export const ERROR_PURCHASE_CVV = createError("Could not verify CVV.", "payment");

export const ERROR_PURCHASE_PAYING = createError("Payment failed.", "purchasing");


// MAPPED ERRORS:

export const MAPPED_ERRORS: Record<string, MappedError> = {
  "lot auction not started": {
    errorLocation: "close",
    errorMessage: "The auction has not started yet.",
  },
  "payment limit exceeded": {
    errorLocation: "close",
    errorMessage: "You have already bought the maximum number of NFTs allowed for this sale.",
  },
  "name should contains first and last name": {
    errorLocation: "billing",
    fieldName: "fullName",
    errorMessage: withFullNameErrorMessage({ label: "Full Name" }),
  },
};
