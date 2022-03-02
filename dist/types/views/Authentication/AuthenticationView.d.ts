import React from "react";
import { CheckoutItem } from "../../domain/product/product.interfaces";
import { TaxesState } from "../Billing/BillingView";
export interface AuthenticationViewProps {
    checkoutItems: CheckoutItem[];
    taxes: TaxesState;
    isAuthenticated?: boolean;
    guestCheckoutEnabled?: boolean;
    onGuestClicked: () => void;
    onCloseClicked: () => void;
}
export declare const AuthenticationView: React.FC<AuthenticationViewProps>;
