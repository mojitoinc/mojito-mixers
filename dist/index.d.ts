/// <reference types="react" />
import React$1, { ErrorInfo } from 'react';
import { Theme, ThemeOptions, SxProps } from '@mui/material/styles';
export { Theme as CheckoutModalTheme, ThemeOptions as CheckoutModalThemeOptions } from '@mui/material/styles';
import { ApolloError, ApolloClient, NormalizedCacheObject } from '@apollo/client';

declare type UserFormat = "username" | "email" | "name";

declare type PaymentType = "CreditCard" | "ACH" | "Wire" | "Crypto";
declare type CreditCard = {
    type: "CreditCard";
    cardNumber: string;
    expiryDate: string;
    secureCode: string;
    nameOnCard: string;
};
declare type AchAccount = {
    type: "ACH";
    accountId: string;
    publicToken: string;
};
declare type WireAccount = {
    type: "Wire";
};
declare type CryptoAddress = {
    type: "Crypto";
};
declare type PaymentMethod = CreditCard | AchAccount | WireAccount | CryptoAddress;

declare type LotType = "auction" | "buyNow";
interface CheckoutItemInfo {
    lotID: string;
    lotType: LotType;
    name: string;
    description: string;
    imageSrc: string;
    imageBackground: string;
    totalSupply: number;
    remainingSupply: number;
    units: number;
    fee: number;
}
interface CheckoutItem extends CheckoutItemInfo {
    unitPrice: number;
    taxes: number;
    totalPrice: number;
}

declare type ShippingMethod = "custom wallet" | "multisig wallet";
interface CheckoutEventData {
    step: number;
    stepName: string;
    departmentCategory: "NFT";
    paymentType?: PaymentType;
    shippingMethod: ShippingMethod;
    checkoutItems: CheckoutItem[];
    currency: "USD";
    revenue: number;
    fees: number;
    tax?: number;
    total: number;
    circlePaymentID?: string;
    paymentID?: string;
}
declare type CheckoutModalNavigateType = "navigate:authentication" | "navigate:billing" | "navigate:payment" | "navigate:purchasing" | "navigate:confirmation" | "navigate:error";
declare type CheckoutModalEventType = "event:paymentSuccess" | "event:paymentError";
declare type CheckoutEventType = CheckoutModalNavigateType | CheckoutModalEventType;

declare type ConsentType = "disclaimer" | "checkbox" | "circle";

interface SelectOption<V = string | number> {
    value: V;
    label: string;
}

interface Network {
    id: string;
    name: string;
}

declare const FULL_NAME_FIELD = "fullName";
declare const EMAIL_FIELD = "email";
declare const PHONE_FIELD = "phone";
declare const STREET_FIELD = "street";
declare const APARTMENT_FIELD = "apartment";
declare const ZIP_CODE_FIELD = "zipCode";
declare const CITY_FIELD = "city";
declare const STATE_FIELD = "state";
declare const COUNTRY_FIELD = "country";
declare type BillingInfo = {
    [FULL_NAME_FIELD]: string;
    [EMAIL_FIELD]: string;
    [PHONE_FIELD]: string;
    [STREET_FIELD]: string;
    [APARTMENT_FIELD]: string;
    [ZIP_CODE_FIELD]: string;
    [CITY_FIELD]: string;
    [STATE_FIELD]: SelectOption;
    [COUNTRY_FIELD]: SelectOption;
};

declare type CircleFieldErrorAt = "billing" | "payment";
interface CircleFieldErrors {
    summary: string;
    billing?: Record<string, string>;
    payment?: Record<string, string>;
    unknown?: Record<string, string>;
    firstAt: CircleFieldErrorAt;
}

declare type CheckoutModalErrorAt = "reset" | "authentication" | "billing" | "payment" | "purchasing";
interface CheckoutModalError {
    at?: CheckoutModalErrorAt;
    error?: ApolloError | Error;
    circleFieldErrors?: CircleFieldErrors;
    errorMessage: string;
}
declare type CheckoutModalStep = "authentication" | "billing" | "payment" | "purchasing" | "confirmation" | "error";

interface AuthorizedApolloProviderProps {
    apolloClient?: ApolloClient<NormalizedCacheObject> | null;
    uri: string;
}

interface CommonProviderProps {
    onCatch?: (error: Error, errorInfo?: ErrorInfo) => void | true;
}
interface ThemeProviderProps extends CommonProviderProps {
    theme?: Theme;
    themeOptions?: ThemeOptions;
}
declare type ProvidersInjectorProps = ThemeProviderProps & AuthorizedApolloProviderProps;

declare type PUIDictionarySingleLine = string | React.ReactFragment;
declare type PUIDictionaryMultiLine = PUIDictionarySingleLine[];
declare type PUIDictionary = {
    walletInfo: PUIDictionarySingleLine;
    walletMultiSigTooltip: PUIDictionarySingleLine;
    wirePaymentsDisclaimer: PUIDictionaryMultiLine;
    purchaseInstructions: PUIDictionaryMultiLine;
    privacyHref?: string;
    termsOfUseHref?: string;
};
declare type PUIDictionaryKeys = keyof PUIDictionary;

interface PUICheckoutOverlayProps {
    open: boolean;
    onClose: () => void;
    onGoToCollection?: () => void;
    guestCheckoutEnabled?: boolean;
    productConfirmationEnabled?: boolean;
    vertexEnabled?: boolean;
    threeDSEnabled?: boolean;
    logoSrc: string;
    logoSx?: SxProps<Theme>;
    loaderImageSrc: string;
    purchasingImageSrc: string;
    purchasingMessages?: false | string[];
    errorImageSrc: string;
    userFormat: UserFormat;
    acceptedPaymentTypes: PaymentType[];
    paymentLimits?: Partial<Record<PaymentType, number>>;
    dictionary?: Partial<PUIDictionary>;
    network?: Network;
    consentType?: ConsentType;
    orgID: string;
    invoiceID?: string;
    checkoutItems: CheckoutItemInfo[];
    onLogin: () => void;
    isAuthenticated?: boolean;
    isAuthenticatedLoading?: boolean;
    debug?: boolean;
    onEvent?: (eventType: CheckoutEventType, eventData: CheckoutEventData) => void;
    onError?: (error: CheckoutModalError) => void;
    onMarketingOptInChange?: (marketingOptIn: boolean) => void;
}
declare type PUICheckoutProps = PUICheckoutOverlayProps & ProvidersInjectorProps;
declare const PUICheckout: React$1.FC<PUICheckoutProps>;

interface FullScreenOverlayFunctionalProps {
    open?: boolean;
    onClose?: () => void;
    isDialogBlocked?: boolean;
}

interface PUISuccessOverlayProps extends FullScreenOverlayFunctionalProps {
    logoSrc?: string;
    logoSx?: SxProps<Theme>;
    successImageSrc: string;
    onRedirect: (pathnameOrUrl: string) => void;
}
declare type PUISuccessProps$1 = PUISuccessOverlayProps & ThemeProviderProps;
declare const PUISuccess: React$1.FC<PUISuccessProps$1>;

interface PUIErrorOverlayProps extends FullScreenOverlayFunctionalProps {
    logoSrc?: string;
    logoSx?: SxProps<Theme>;
    errorImageSrc: string;
    onRedirect: (pathnameOrUrl: string) => void;
}
declare type PUIErrorProps = PUIErrorOverlayProps & ThemeProviderProps;
declare const PUIError: React$1.FC<PUIErrorProps>;

interface PUIPlaidOverlayProps {
    onRedirect: (pathnameOrUrl: string) => void;
}
declare type PUISuccessProps = PUIPlaidOverlayProps & ThemeProviderProps;
declare const PUIPlaid: React$1.FC<PUISuccessProps>;

declare function useOpenCloseCheckoutModal(): {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
};

interface PlaidInfo {
    url?: string;
    linkToken: string;
    selectedBillingInfo: string | BillingInfo;
    timestamp?: number;
}
interface PlaidOAuthFlowState extends PlaidInfo {
    receivedRedirectUri?: string;
    continueOAuthFlow: boolean;
    savedStateUsed: boolean;
}
declare function persistPlaidReceivedRedirectUri(receivedRedirectUri: string): void;
declare function getPlaidOAuthFlowState(): PlaidOAuthFlowState;

declare function continuePlaidOAuthFlow(): boolean;

interface CheckoutModalInfo {
    url?: string;
    invoiceID: string;
    circlePaymentID: string;
    paymentID: string;
    billingInfo: string | BillingInfo;
    paymentInfo: string | PaymentMethod;
    timestamp?: number;
}
interface CheckoutModalState3DS extends CheckoutModalInfo {
    receivedRedirectUri?: string;
    continue3DSFlow: boolean;
    purchaseSuccess: boolean;
    purchaseError: boolean;
    savedStateUsed: boolean;
}
declare function persistReceivedRedirectUri3DS(receivedRedirectUri: string): void;
declare function getCheckoutModalState(): CheckoutModalState3DS;
declare function continueCheckout(noClear?: boolean): [boolean, CheckoutModalState3DS];
declare type FlowType = "" | "3DS" | "Plaid";
interface ContinueFlowsReturn {
    flowType: FlowType;
    checkoutStep: CheckoutModalStep | "";
    checkoutError?: CheckoutModalError;
    invoiceID: string;
    circlePaymentID: string;
    paymentID: string;
    billingInfo: string | BillingInfo;
    paymentInfo: string | PaymentMethod;
}
declare function continueFlows(noClear?: boolean): ContinueFlowsReturn;

declare const extendDefaultTheme: (themeOptions?: ThemeOptions | undefined) => Theme;
declare const MOJITO_LIGHT_THEME: Theme;
declare const MOJITO_DARK_THEME: Theme;

interface PalettePaymentUI {
    progressBar?: string;
    paymentMethodSelectorBorder?: string;
    paymentMethodSelectorBackground?: string;
    mainButtonBackground?: string;
    mainButtonBorderWidth?: number;
}

export { CheckoutEventData, CheckoutEventType, CheckoutItem, CheckoutModalError, CheckoutModalErrorAt, CircleFieldErrorAt, CircleFieldErrors, MOJITO_DARK_THEME, MOJITO_LIGHT_THEME, PUICheckout, PUICheckoutProps, PUIDictionary, PUIDictionaryKeys, PUIDictionaryMultiLine, PUIDictionarySingleLine, PUIError, PUIErrorProps, PUIPlaid, PUISuccess, PUISuccessProps$1 as PUISuccessProps, PalettePaymentUI, PaymentType, UserFormat, continueCheckout, continueFlows, continuePlaidOAuthFlow, extendDefaultTheme, getCheckoutModalState, getPlaidOAuthFlowState, persistPlaidReceivedRedirectUri, persistReceivedRedirectUri3DS, useOpenCloseCheckoutModal };
