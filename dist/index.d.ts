/// <reference types="react" />
import React from 'react';
import { ApolloError } from '@apollo/client';
import { Theme, ThemeOptions, SxProps } from '@mui/material/styles';
export { Theme as CheckoutModalTheme, ThemeOptions as CheckoutModalThemeOptions, ThemeProvider as CheckoutModalThemeProvider } from '@mui/material/styles';

declare type UserFormat = "username" | "email" | "name";

declare type PaymentType = "CreditCard" | "ACH" | "Wire" | "Crypto";

declare type LotType = "auction" | "buyNow";
interface CheckoutItem {
    lotID: string;
    lotType: LotType;
    name: string;
    description: string;
    price: number;
    fee: number;
    imageSrc: string;
    imageBackground: string;
}

interface SelectOption {
    value: string | number;
    label: string;
}

declare const FULL_NAME_FIELD = "fullName";
declare const EMAIL_FIELD = "email";
declare const PHONE_FIELD = "phone";
declare const STREET_FIELD = "street";
declare const APARTMENT_FIELD = "apartment";
declare const COUNTRY_FIELD = "country";
declare const CITY_FIELD = "city";
declare const STATE_FIELD = "state";
declare const ZIP_CODE_FIELD = "zipCode";
declare type BillingInfo = {
    [APARTMENT_FIELD]: string;
    [CITY_FIELD]: string;
    [COUNTRY_FIELD]: SelectOption;
    [EMAIL_FIELD]: string;
    [FULL_NAME_FIELD]: string;
    [PHONE_FIELD]: string;
    [STATE_FIELD]: SelectOption;
    [STREET_FIELD]: string;
    [ZIP_CODE_FIELD]: string;
};

declare type ConsentType = "disclaimer" | "checkbox";

interface CheckoutModalProps {
    open: boolean;
    onClose: () => void;
    guestCheckoutEnabled?: boolean;
    productConfirmationEnabled?: boolean;
    theme?: Theme;
    themeOptions?: ThemeOptions;
    logoSrc: string;
    logoSx?: SxProps<Theme>;
    loaderImageSrc: string;
    purchasingImageSrc: string;
    purchasingMessages?: false | string[];
    errorImageSrc: string;
    userFormat: UserFormat;
    acceptedPaymentTypes: PaymentType[];
    paymentLimits?: Partial<Record<PaymentType, number>>;
    purchaseInstructions: string;
    consentType?: ConsentType;
    privacyHref?: string;
    termsOfUseHref?: string;
    orgID: string;
    invoiceID?: string;
    checkoutItem: CheckoutItem;
    onLogin: () => void;
    isAuthenticated?: boolean;
    isAuthenticatedLoading?: boolean;
    onError?: (error: ApolloError | Error | string) => void;
    onMarketingOptInChange?: (marketingOptIn: boolean) => void;
}
declare const CheckoutModal: React.FC<CheckoutModalProps>;

declare const MOJITO_LIGHT_THEME: Theme;
declare const MOJITO_DARK_THEME: Theme;

interface PlaidInfo {
    url: string;
    linkToken: string;
    selectedBillingInfo: string | BillingInfo;
}
declare function persistPlaidReceivedRedirectUri(receivedRedirectUri: string): void;
interface PlaidOAuthFlowState extends PlaidInfo {
    receivedRedirectUri?: string;
    continueOAuthFlow: boolean;
    savedStateUsed: boolean;
}
declare function getPlaidOAuthFlowState(): PlaidOAuthFlowState;

declare let INITIAL_PLAID_OAUTH_FLOW_STATE: PlaidOAuthFlowState;
declare function continuePlaidOAuthFlow(): boolean;

export { CheckoutItem, CheckoutModal, CheckoutModalProps, INITIAL_PLAID_OAUTH_FLOW_STATE, MOJITO_DARK_THEME, MOJITO_LIGHT_THEME, PaymentType, UserFormat, continuePlaidOAuthFlow, getPlaidOAuthFlowState, persistPlaidReceivedRedirectUri };
