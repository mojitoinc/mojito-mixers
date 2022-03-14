'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const BUILT_IN_ERRORS = ["EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "AggregateError", "InternalError"];
const DEFAULT_ERROR_AT = "payment";
function createError(errorMessage, at = DEFAULT_ERROR_AT) {
    return (error) => ({
        error,
        errorMessage,
        at,
    });
}
// CheckoutModal:
const ERROR_LOADING_USER = createError("User could not be loaded.", "billing");
const ERROR_LOADING_PAYMENT_METHODS = createError("Payment methods could not be loaded.", "billing");
const ERROR_LOADING_INVOICE = createError("Invoice could not be loaded.", "billing");
// PurchasingView:
const ERROR_PURCHASE = createError("The purchase could not be completed.");
const ERROR_PURCHASE_TIMEOUT = createError("The purchase could not be completed in time.");
// useFullPayment:
const ERROR_PURCHASE_NO_ITEMS = createError("No items to purchase.");
const ERROR_PURCHASE_NO_UNITS = createError("No units to purchase.");
const ERROR_PURCHASE_LOADING_ITEMS = createError("Purchase items could not be loaded.");
const ERROR_PURCHASE_SELECTED_PAYMENT_METHOD = createError("Could not find the selected payment method.", "payment");
const ERROR_PURCHASE_CREATING_PAYMENT_METHOD = createError("Payment method could not be saved.", "billing");
const ERROR_PURCHASE_CREATING_INVOICE = createError("Invoice could not be created.", "reset");
const ERROR_PURCHASE_CVV = createError("Could not verify CVV.");
const ERROR_PURCHASE_PAYING = createError("Payment failed.");
const ERROR_PURCHASE_3DS = createError("Payment method could not be verified.", "payment");
const ERROR_INVOICE_TIMEOUT = createError("Your product reservation expired. Please, try to complete the purchase again in time.", "reset");

exports.BUILT_IN_ERRORS = BUILT_IN_ERRORS;
exports.DEFAULT_ERROR_AT = DEFAULT_ERROR_AT;
exports.ERROR_INVOICE_TIMEOUT = ERROR_INVOICE_TIMEOUT;
exports.ERROR_LOADING_INVOICE = ERROR_LOADING_INVOICE;
exports.ERROR_LOADING_PAYMENT_METHODS = ERROR_LOADING_PAYMENT_METHODS;
exports.ERROR_LOADING_USER = ERROR_LOADING_USER;
exports.ERROR_PURCHASE = ERROR_PURCHASE;
exports.ERROR_PURCHASE_3DS = ERROR_PURCHASE_3DS;
exports.ERROR_PURCHASE_CREATING_INVOICE = ERROR_PURCHASE_CREATING_INVOICE;
exports.ERROR_PURCHASE_CREATING_PAYMENT_METHOD = ERROR_PURCHASE_CREATING_PAYMENT_METHOD;
exports.ERROR_PURCHASE_CVV = ERROR_PURCHASE_CVV;
exports.ERROR_PURCHASE_LOADING_ITEMS = ERROR_PURCHASE_LOADING_ITEMS;
exports.ERROR_PURCHASE_NO_ITEMS = ERROR_PURCHASE_NO_ITEMS;
exports.ERROR_PURCHASE_NO_UNITS = ERROR_PURCHASE_NO_UNITS;
exports.ERROR_PURCHASE_PAYING = ERROR_PURCHASE_PAYING;
exports.ERROR_PURCHASE_SELECTED_PAYMENT_METHOD = ERROR_PURCHASE_SELECTED_PAYMENT_METHOD;
exports.ERROR_PURCHASE_TIMEOUT = ERROR_PURCHASE_TIMEOUT;
//# sourceMappingURL=errors.constants.js.map
