import React from "react";
import { ConsentType } from "../../shared/ConsentText/ConsentText";
export declare type CheckoutModalFooterVariant = "toGuestCheckout" | "toPayment" | "toConfirmation" | "toPlaid" | "toReview" | "toMarketplace";
export interface CheckoutModalFooterProps {
    variant: CheckoutModalFooterVariant;
    buttonLabel?: string;
    guestCheckoutEnabled?: boolean;
    consentType?: ConsentType;
    onGoToCollection?: () => void;
    submitDisabled?: boolean;
    onSubmitClicked?: (canSubmit: boolean) => void | Promise<void | false>;
    onCloseClicked?: () => void;
}
export declare const CheckoutModalFooter: React.FC<CheckoutModalFooterProps>;
