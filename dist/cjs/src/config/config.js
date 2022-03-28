'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

// Dev / Debug Stuff:
const DEV_DEBUG_COUNTER_EXPIRATION_MS = 1000;
const DEV_DEBUG_COUNTER_CLICKS_NEEDED = 16;
const DEV_SKIP_3DS_IN_LOCALHOST = false;
const DEV_DEBUG_ENABLED_KEY = "DEV_DEBUG_ENABLED";
// Errors:
const ASYNC_ERROR_MAX_WAIT_MS = 16000; // (16 sec) Max. wait time for ErrorView.tsx to fallback to ERROR_GENERIC if errorMessage is not provided.
// Invoice / Reservation:
const RESERVATION_COUNTDOWN_FROM_MIN = 15;
const RESERVATION_COUNTDOWN_FROM_MS = RESERVATION_COUNTDOWN_FROM_MIN * 60 * 1000;
const RESERVATION_COUNTDOWN_REFRESH_RATE_MS = 1000;
// Purchase:
const PURCHASING_MIN_WAIT_MS = 2500; // PurchasingView will be visible for at least 2.5 seconds (but it will rarely be that low)
const PURCHASING_MESSAGES_INTERVAL_MS = 5000; // PurchasingView will loop over the following messages, one every 5 seconds.
const PURCHASING_MESSAGES_DEFAULT = [
    "Muddling mint and lime.",
    "Topping up with club soda.",
    "Adding rum, lime juice and ice.",
    "Shaking things up!",
];
// Payment Method:
const PAYMENT_CREATION_INTERVAL_MS = 5000; // (5 sec) Polling interval for GetPaymentMethodStatus.
const PAYMENT_CREATION_MAX_WAIT_MS = 120000; // (2 min) Max. wait time for GetPaymentMethodStatus (to get status === "complete").
const PAYMENT_CREATION_TIMEOUT_MS = PAYMENT_CREATION_MAX_WAIT_MS * 2; // (4 min) Max. time a user would be stuck in the PurchasingView before throwing an error (for all the above).
const PAYMENT_NOTIFICATION_INTERVAL_MS = 2500; // (2.5 sec) Polling interval for GetPaymentNotificationQuery in PurchasingView.
const PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS = ASYNC_ERROR_MAX_WAIT_MS - 1000; // (15 sec) Max. wait time for GetPaymentNotificationQuery to get the error details in ErrorOverlay.tsx.
// Plaid:
const PLAID_STORAGE_EXPIRATION_MS = 1000 * 60 * 15; // 15 minutes (Plaid requires filling in some data).
const PLAID_OAUTH_FLOW_INFO_KEY = "PLAID_OAUTH_FLOW_INFO";
const PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY = "PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI";
const PLAID_OAUTH_FLOW_STATE_USED_KEY = "PLAID_OAUTH_FLOW_STATE_USED";
const PLAID_OAUTH_FLOW_URL_SEARCH = "?oauth_state_id=";
// 3DS:
const THREEDS_STORAGE_EXPIRATION_MS = 1000 * 60 * 7; // 7 minutes (3DS will also ask for some information (in PROD only)).
const THREEDS_FLOW_INFO_KEY = "THREEDS_FLOW_INFO";
const THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY = "THREEDS_FLOW_RECEIVED_REDIRECT_URI";
const THREEDS_FLOW_STATE_USED_KEY = "THREEDS_FLOW_STATE_USED";
const THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY = "paymentId";
const THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY = "paymentError";
const THREEDS_FLOW_SEARCH_PARAM_SUCCESS = `?${THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY}=`;
const THREEDS_FLOW_SEARCH_PARAM_ERROR = `?${THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY}=`;
const THREEDS_REDIRECT_DELAY_MS = 1000; // (1 sec) Small delay before redirecting users to 3DS' page (PurchasingView => 3DS)
const THREEDS_SUCCESS_REDIRECT_DELAY_MS = 5000; // Success page redirects users automatically after 5 seconds (SuccessView => ConfirmationView)

exports.ASYNC_ERROR_MAX_WAIT_MS = ASYNC_ERROR_MAX_WAIT_MS;
exports.DEV_DEBUG_COUNTER_CLICKS_NEEDED = DEV_DEBUG_COUNTER_CLICKS_NEEDED;
exports.DEV_DEBUG_COUNTER_EXPIRATION_MS = DEV_DEBUG_COUNTER_EXPIRATION_MS;
exports.DEV_DEBUG_ENABLED_KEY = DEV_DEBUG_ENABLED_KEY;
exports.DEV_SKIP_3DS_IN_LOCALHOST = DEV_SKIP_3DS_IN_LOCALHOST;
exports.PAYMENT_CREATION_INTERVAL_MS = PAYMENT_CREATION_INTERVAL_MS;
exports.PAYMENT_CREATION_MAX_WAIT_MS = PAYMENT_CREATION_MAX_WAIT_MS;
exports.PAYMENT_CREATION_TIMEOUT_MS = PAYMENT_CREATION_TIMEOUT_MS;
exports.PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS = PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS;
exports.PAYMENT_NOTIFICATION_INTERVAL_MS = PAYMENT_NOTIFICATION_INTERVAL_MS;
exports.PLAID_OAUTH_FLOW_INFO_KEY = PLAID_OAUTH_FLOW_INFO_KEY;
exports.PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY = PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY;
exports.PLAID_OAUTH_FLOW_STATE_USED_KEY = PLAID_OAUTH_FLOW_STATE_USED_KEY;
exports.PLAID_OAUTH_FLOW_URL_SEARCH = PLAID_OAUTH_FLOW_URL_SEARCH;
exports.PLAID_STORAGE_EXPIRATION_MS = PLAID_STORAGE_EXPIRATION_MS;
exports.PURCHASING_MESSAGES_DEFAULT = PURCHASING_MESSAGES_DEFAULT;
exports.PURCHASING_MESSAGES_INTERVAL_MS = PURCHASING_MESSAGES_INTERVAL_MS;
exports.PURCHASING_MIN_WAIT_MS = PURCHASING_MIN_WAIT_MS;
exports.RESERVATION_COUNTDOWN_FROM_MIN = RESERVATION_COUNTDOWN_FROM_MIN;
exports.RESERVATION_COUNTDOWN_FROM_MS = RESERVATION_COUNTDOWN_FROM_MS;
exports.RESERVATION_COUNTDOWN_REFRESH_RATE_MS = RESERVATION_COUNTDOWN_REFRESH_RATE_MS;
exports.THREEDS_FLOW_INFO_KEY = THREEDS_FLOW_INFO_KEY;
exports.THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY = THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY;
exports.THREEDS_FLOW_SEARCH_PARAM_ERROR = THREEDS_FLOW_SEARCH_PARAM_ERROR;
exports.THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY = THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY;
exports.THREEDS_FLOW_SEARCH_PARAM_SUCCESS = THREEDS_FLOW_SEARCH_PARAM_SUCCESS;
exports.THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY = THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY;
exports.THREEDS_FLOW_STATE_USED_KEY = THREEDS_FLOW_STATE_USED_KEY;
exports.THREEDS_REDIRECT_DELAY_MS = THREEDS_REDIRECT_DELAY_MS;
exports.THREEDS_STORAGE_EXPIRATION_MS = THREEDS_STORAGE_EXPIRATION_MS;
exports.THREEDS_SUCCESS_REDIRECT_DELAY_MS = THREEDS_SUCCESS_REDIRECT_DELAY_MS;
//# sourceMappingURL=config.js.map
