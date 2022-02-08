import React from "react";
import { UserFormat } from "../../../domain/auth/authentication.interfaces";
import { PaymentMethod, PaymentType } from "../../../domain/payment/payment.interfaces";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { BillingInfo } from "../../../forms/BillingInfoForm";
import { ApolloError } from "@apollo/client";
import { Theme, ThemeOptions, SxProps } from "@mui/material/styles";
import { ConsentType } from "../../shared/ConsentText/ConsentText";
export declare type CheckoutState = "authentication" | "billing" | "payment" | "purchasing" | "confirmation";
export interface SelectedPaymentMethod {
    billingInfo: string | BillingInfo;
    paymentInfo: string | PaymentMethod;
}
export interface CheckoutModalProps {
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
export declare const CheckoutModal: React.FC<CheckoutModalProps>;
