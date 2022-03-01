/// <reference types="react" />
import React from 'react';
import { Theme, ThemeOptions, SxProps } from '@mui/material/styles';
export { Theme as CheckoutModalTheme, ThemeOptions as CheckoutModalThemeOptions, ThemeProvider as PUIThemeProvider } from '@mui/material/styles';
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

declare type ConsentType = "disclaimer" | "checkbox" | "circle";

interface SelectOption {
    value: string | number;
    label: string;
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

interface ThemeProviderProps {
    theme?: Theme;
    themeOptions?: ThemeOptions;
}
declare type ProvidersInjectorProps = ThemeProviderProps & AuthorizedApolloProviderProps;

declare type CustomTextsKeys = 'wirePaymentsDisclaimer' | 'purchaseInstructions';

interface PUICheckoutOverlayProps {
    open: boolean;
    onClose: () => void;
    guestCheckoutEnabled?: boolean;
    productConfirmationEnabled?: boolean;
    logoSrc: string;
    logoSx?: SxProps<Theme>;
    loaderImageSrc: string;
    purchasingImageSrc: string;
    purchasingMessages?: false | string[];
    errorImageSrc: string;
    userFormat: UserFormat;
    acceptedPaymentTypes: PaymentType[];
    paymentLimits?: Partial<Record<PaymentType, number>>;
    customTexts: Record<CustomTextsKeys, React.ReactFragment[]>;
    consentType?: ConsentType;
    privacyHref?: string;
    termsOfUseHref?: string;
    orgID: string;
    invoiceID?: string;
    checkoutItems: CheckoutItemInfo[];
    onLogin: () => void;
    isAuthenticated?: boolean;
    isAuthenticatedLoading?: boolean;
    debug?: boolean;
    onError?: (error: CheckoutModalError) => void;
    onMarketingOptInChange?: (marketingOptIn: boolean) => void;
}
declare type PUICheckoutProps = PUICheckoutOverlayProps & ProvidersInjectorProps;
declare const PUICheckout: React.FC<PUICheckoutProps>;

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
declare const PUISuccess: React.FC<PUISuccessProps$1>;

interface PUIErrorOverlayProps extends FullScreenOverlayFunctionalProps {
    logoSrc?: string;
    logoSx?: SxProps<Theme>;
    errorImageSrc: string;
    onRedirect: (pathnameOrUrl: string) => void;
}
declare type PUIErrorProps = PUIErrorOverlayProps & ThemeProviderProps;
declare const PUIError: React.FC<PUIErrorProps>;

interface PUIPlaidOverlayProps {
    onRedirect: (pathnameOrUrl: string) => void;
}
declare type PUISuccessProps = PUIPlaidOverlayProps & ThemeProviderProps;
declare const PUIPlaid: React.FC<PUISuccessProps>;

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
    paymentReferenceNumber: string;
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
interface ContinueFlowsReturn {
    checkoutStep: CheckoutModalStep | "";
    checkoutError?: CheckoutModalError;
    invoiceID: string;
    billingInfo: string | BillingInfo;
    paymentInfo: string | PaymentMethod;
    paymentReferenceNumber: string;
}
declare function continueFlows(noClear?: boolean): ContinueFlowsReturn;

declare const extendDefaultTheme: (themeOptions?: ThemeOptions | undefined) => Theme;
declare const MOJITO_LIGHT_THEME: Theme;
declare const MOJITO_DARK_THEME: Theme;

export { CheckoutItem, CheckoutModalError, CheckoutModalErrorAt, CircleFieldErrorAt, CircleFieldErrors, MOJITO_DARK_THEME, MOJITO_LIGHT_THEME, PUICheckout, PUICheckoutProps, PUIError, PUIErrorProps, PUIPlaid, PUISuccess, PUISuccessProps$1 as PUISuccessProps, PaymentType, UserFormat, continueCheckout, continueFlows, continuePlaidOAuthFlow, extendDefaultTheme, getCheckoutModalState, getPlaidOAuthFlowState, persistPlaidReceivedRedirectUri, persistReceivedRedirectUri3DS, useOpenCloseCheckoutModal };
