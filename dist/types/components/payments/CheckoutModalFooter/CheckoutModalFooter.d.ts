import React from "react";
import { ConsentType } from "../../shared/ConsentText/ConsentText";
export declare type CheckoutModalFooterVariant = "toGuestCheckout" | "toPayment" | "toConfirmation" | "toPlaid" | "toReview" | "toMarketplace";
export interface CheckoutModalFooterProps {
    variant: CheckoutModalFooterVariant;
    guestCheckoutEnabled?: boolean;
    consentType?: ConsentType;
    submitLabel?: string;
    submitDisabled?: boolean;
    onSubmitClicked?: (canSubmit: boolean) => void | Promise<void | false>;
    closeLabel?: string;
    closeDisabled?: boolean;
    onCloseClicked?: () => void;
    onGoToCollection?: () => void;
}
export declare const CheckoutModalFooter: React.FC<CheckoutModalFooterProps>;
