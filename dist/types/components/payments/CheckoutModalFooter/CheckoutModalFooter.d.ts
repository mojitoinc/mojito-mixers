import React from "react";
export declare type ConsentType = "disclaimer" | "checkbox";
export declare type CheckoutModalFooterVariant = "toGuestCheckout" | "toPayment" | "toConfirmation" | "toPlaid" | "toForm" | "toMarketplace";
export interface CheckoutModalFooterProps {
    variant: CheckoutModalFooterVariant;
    guestCheckoutEnabled?: boolean;
    privacyHref: string;
    termsOfUseHref: string;
    onSubmitClicked: () => void;
    onCloseClicked: () => void;
}
export declare const CheckoutModalFooter: React.FC<CheckoutModalFooterProps>;
