
export { PUICheckout } from "./components/public/CheckoutOverlay/CheckoutOverlay";
export { PUISuccess } from "./components/public/SuccessOverlay/SuccessOverlay";
export { PUIError } from "./components/public/ErrorOverlay/ErrorOverlay";
export { PUIPlaid } from "./components/public/PlaidOverlay/PlaidOverlay";
export { useOpenCloseCheckoutModal } from "./components/public/useOpenCloseCheckoutModal/useOpenCloseCheckoutModal";
export { getPlaidOAuthFlowState, persistPlaidReceivedRedirectUri } from "./domain/plaid/plaid.utils";
export { continuePlaidOAuthFlow } from "./hooks/usePlaid";
export { continueCheckout, continueFlows, getCheckoutModalState, persistReceivedRedirectUri3DS } from "./components/public/CheckoutOverlay/CheckoutOverlay.utils";
export { extendDefaultTheme, MOJITO_LIGHT_THEME, MOJITO_DARK_THEME } from "./config/theme/theme";

export type { Theme as CheckoutModalTheme, ThemeOptions as CheckoutModalThemeOptions } from "@mui/material/styles";
export type { PUICheckoutProps } from "./components/public/CheckoutOverlay/CheckoutOverlay";
export type { PUISuccessProps } from "./components/public/SuccessOverlay/SuccessOverlay";
export type { PUIErrorProps } from "./components/public/ErrorOverlay/ErrorOverlay";
export type { CheckoutModalErrorAt, CheckoutModalError } from "./components/public/CheckoutOverlay/CheckoutOverlay.hooks";
export type { UserFormat } from "./domain/auth/authentication.interfaces";
export type { PaymentType } from "./domain/payment/payment.interfaces";
export type { CheckoutItem } from "./domain/product/product.interfaces";
export type { CircleFieldErrorAt, CircleFieldErrors } from "./domain/circle/circle.utils";
export type { PUIDictionary, PUIDictionaryKeys, PUIDictionarySingleLine, PUIDictionaryMultiLine } from "./domain/dictionary/dictionary.interfaces";
export type { CheckoutEventType, CheckoutEventData } from "./domain/events/events.interfaces";

if (process.env.NODE_ENV === "development" && process.browser) {
  console.log("\n👨‍💻 PUI development mode.\n\n");

  // (window as any)._React = React;
  // (window as any)._ThemeProvider = ThemeProvider;
}

