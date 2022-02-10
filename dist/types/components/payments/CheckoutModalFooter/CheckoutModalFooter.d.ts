import React from "react";
import { ConsentType } from "../../shared/ConsentText/ConsentText";
export declare type CheckoutModalFooterVariant = "toGuestCheckout" | "toPayment" | "toConfirmation" | "toPlaid" | "toForm" | "toMarketplace";
export interface CheckoutModalFooterProps {
    variant: CheckoutModalFooterVariant;
    guestCheckoutEnabled?: boolean;
    consentType?: ConsentType;
    privacyHref?: string;
    termsOfUseHref?: string;
    submitDisabled?: boolean;
    onSubmitClicked?: (canSubmit: boolean) => void | Promise<void | false>;
    onCloseClicked: () => void;
}
export declare const CheckoutModalFooter: React.FC<CheckoutModalFooterProps>;
