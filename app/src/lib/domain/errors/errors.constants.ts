import { ApolloError } from "@apollo/client";
import { CheckoutModalError, CheckoutModalErrorAt } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";

export const BUILT_IN_ERRORS = ["EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "AggregateError", "InternalError"];

export const DEFAULT_ERROR_AT: CheckoutModalErrorAt = "purchasing";

function createError(errorMessage: string, at: CheckoutModalErrorAt = DEFAULT_ERROR_AT): (error?: ApolloError | Error) => CheckoutModalError {
  return (error?: ApolloError | Error) => ({
    error,
    errorMessage,
    at,
  });
}


// CheckoutModal:

export const ERROR_LOADING_USER = createError("User could not be loaded.");

export const ERROR_LOADING_PAYMENT_METHODS = createError("Payment methods could not be loaded.");


// PurchasingView:

export const ERROR_PURCHASE = createError("The purchase could not be completed.");


// useFullPayment:

export const ERROR_PURCHASE_NO_ITEMS = createError("No items to purchase.");

export const ERROR_PURCHASE_NO_UNITS = createError("No units to purchase.");

export const ERROR_PURCHASE_LOADING_ITEMS = createError("Purchase items could not be loaded.");

export const ERROR_PURCHASE_SELECTED_PAYMENT_METHOD = createError("Could not find the selected payment method.", "payment");

export const ERROR_PURCHASE_CREATING_PAYMENT_METHOD = createError("Payment method could not be saved.", "billing");

export const ERROR_PURCHASE_CREATING_INVOICE = createError("Invoice could not be created.");

export const ERROR_PURCHASE_CVV = createError("Could not verify CVV.");

export const ERROR_PURCHASE_PAYING = createError("Payment failed.");

export const ERROR_PURCHASE_3DS = createError("Payment method could not be verified.", "payment");
