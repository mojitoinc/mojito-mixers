// Dev / Debug Stuff:
export const DEV_DEBUG_COUNTER_EXPIRATION_MS = 1000;
export const DEV_DEBUG_COUNTER_CLICKS_NEEDED = 16;
export const DEV_SKIP_3DS_IN_LOCALHOST = true;
export const DEV_DEBUG_ENABLED_KEY = "DEV_DEBUG_ENABLED";

// Invoice / Reservation:
export const RESERVATION_COUNTDOWN_FROM_MIN = 15;
export const RESERVATION_COUNTDOWN_FROM_MS = RESERVATION_COUNTDOWN_FROM_MIN * 60 * 1000;
export const RESERVATION_COUNTDOWN_REFRESH_RATE_MS = 1000;


// Purchase:
export const PURCHASING_MIN_WAIT_MS = 3000; // PurchasingView will be visible for at least 3 seconds.
export const PURCHASING_MESSAGES_INTERVAL_MS = 5000; // PurchasingView will loop over the following messages, one every 5 seconds.
export const PURCHASING_MESSAGES_DEFAULT = [
  "Muddling mint and lime.",
  "Topping up with club soda.",
  "Adding rum, lime juice and ice.",
  "Shaking things up!",
];

export const PAYMENT_CREATION_INTERVAL_MS = 5000; // (5 sec) Polling interval for GetPaymentMethodStatus.
export const PAYMENT_CREATION_MAX_WAIT_MS = 120000; // (2 min) Max. wait time for GetPaymentMethodStatus (to get status === "complete").
export const PAYMENT_CREATION_MIN_WAIT_MS = 5000; // (5 sec) Min. time a user would be stuck in the PurchasingView.
export const PAYMENT_CREATION_TIMEOUT_MS = PAYMENT_CREATION_MAX_WAIT_MS * 2; // (4 min) Max. time a user would be stuck in the PurchasingView before throwing an error.
export const PAYMENT_NOTIFICATION_INTERVAL_MS = 2500; // (2.5 sec) Polling interval for GetPaymentNotificationQuery in PurchasingView.
export const PAYMENT_NOTIFICATION_ERROR_MAX_WAIT_MS = 10000; // (10 sec) Max. wait time for GetPaymentNotificationQuery to get the error details in ErrorOverlay.tsx.

// Plaid:
export const PLAID_STORAGE_EXPIRATION_MS = 1000 * 60 * 15; // 15 minutes (Plaid requires filling in some data).
export const PLAID_OAUTH_FLOW_INFO_KEY = "PLAID_OAUTH_FLOW_INFO";
export const PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI_KEY = "PLAID_OAUTH_FLOW_RECEIVED_REDIRECT_URI";
export const PLAID_OAUTH_FLOW_STATE_USED_KEY = "PLAID_OAUTH_FLOW_STATE_USED";
export const PLAID_OAUTH_FLOW_URL_SEARCH = "?oauth_state_id=";


// 3DS:
export const THREEDS_REDIRECT_DELAY_MS = 1000; // (1 sec) Small delay before redirecting users to 3DS' page.
export const THREEDS_STORAGE_EXPIRATION_MS = 1000 * 60 * 7; // 7 minutes (3DS will also ask for some information (in PROD only)).
export const THREEDS_FLOW_INFO_KEY = "THREEDS_FLOW_INFO";
export const THREEDS_FLOW_RECEIVED_REDIRECT_URI_KEY = "THREEDS_FLOW_RECEIVED_REDIRECT_URI";
export const THREEDS_FLOW_STATE_USED_KEY = "THREEDS_FLOW_STATE_USED";
export const THREEDS_FLOW_URL_SEARCH = "?paymentId=";

export const THREEDS_SUCCESS_REDIRECT_DELAY_MS = 5000; // Success page redirects users automatically after 5 seconds.
