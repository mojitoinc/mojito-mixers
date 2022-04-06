// Dev / Debug Stuff:
export const DEV_DEBUG_COUNTER_EXPIRATION_MS = 1000;
export const DEV_DEBUG_COUNTER_CLICKS_NEEDED = 16;
export const DEV_SKIP_3DS_IN_LOCALHOST = true;
export const DEV_DEBUG_ENABLED_KEY = "DEV_DEBUG_ENABLED";


// Errors:
export const ASYNC_ERROR_MAX_WAIT_MS = 16000; // (16 sec) Max. wait time for ErrorView.tsx to fallback to ERROR_GENERIC if errorMessage is not provided.


// Invoice / Reservation:
export const RESERVATION_COUNTDOWN_FROM_MIN = 15;
export const RESERVATION_COUNTDOWN_FROM_MS = RESERVATION_COUNTDOWN_FROM_MIN * 60 * 1000;
export const RESERVATION_COUNTDOWN_REFRESH_RATE_MS = 1000;


// Purchase:
export const PURCHASING_MIN_WAIT_MS = 2500; // PurchasingView will be visible for at least 2.5 seconds (but it will rarely be that low)
export const PURCHASING_MESSAGES_INTERVAL_MS = 5000; // PurchasingView will loop over the following messages, one every 5 seconds.
export const PURCHASING_MESSAGES_DEFAULT = [
  "Muddling mint and lime.",
  "Topping up with club soda.",
  "Adding rum, lime juice and ice.",
  "Shaking things up!",
];

// Payment Method:
export const PAYMENT_CREATION_INTERVAL_MS = 5000; // (5 sec) Polling interval for GetPaymentMethodStatus.
export const PAYMENT_CREATION_MAX_WAIT_MS = 120000; // (2 min) Max. wait time for GetPaymentMethodStatus (to get status === "complete").
export const PAYMENT_CREATION_TIMEOUT_MS = PAYMENT_CREATION_MAX_WAIT_MS * 2; // (4 min) Max. time a user would be stuck in the PurchasingView before throwing an error (for all the above).
export const PAYMENT_NOTIFICATION_INTERVAL_MS = 2500; // (2.5 sec) Polling interval for GetPaymentNotificationQuery in PurchasingView.
export const PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS = ASYNC_ERROR_MAX_WAIT_MS - 1000; // (15 sec) Max. wait time for GetPaymentNotificationQuery to get the error details in ErrorOverlay.tsx.


// Plaid:
export const PLAID_STORAGE_EXPIRATION_MS = 1000 * 60 * 15; // 15 minutes (Plaid requires filling in some data).
export const PLAID_OAUTH_FLOW_INFO_KEY = "PLAID_OAUTH_FLOW_INFO";
export const PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY = "PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI";
export const PLAID_OAUTH_FLOW_STATE_USED_KEY = "PLAID_OAUTH_FLOW_STATE_USED";
export const PLAID_OAUTH_FLOW_URL_SEARCH = "?oauth_state_id=";


// 3DS:
export const THREEDS_STORAGE_EXPIRATION_MS = 1000 * 60 * 7; // 7 minutes (3DS will also ask for some information (in PROD only)).
export const THREEDS_FLOW_INFO_KEY = "THREEDS_FLOW_INFO";
export const THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY = "THREEDS_FLOW_RECEIVED_REDIRECT_URI";
export const THREEDS_FLOW_STATE_USED_KEY = "THREEDS_FLOW_STATE_USED";
export const THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY = "paymentId";
export const THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY = "paymentError";
export const THREEDS_FLOW_SEARCH_PARAM_SUCCESS = `?${ THREEDS_FLOW_SEARCH_PARAM_SUCCESS_KEY }=`;
export const THREEDS_FLOW_SEARCH_PARAM_ERROR = `?${ THREEDS_FLOW_SEARCH_PARAM_ERROR_KEY }=`;

export const THREEDS_REDIRECT_DELAY_MS = 1000; // (1 sec) Small delay before redirecting users to 3DS' page (PurchasingView => 3DS)

export const THREEDS_SUCCESS_REDIRECT_DELAY_MS = 5000; // Success page redirects users automatically after 5 seconds (SuccessView => ConfirmationView)
