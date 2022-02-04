import { CheckoutItem } from "../../domain/product/product.interfaces";
import React from "react";
export interface AuthenticationViewProps {
    checkoutItem: CheckoutItem;
    isAuthenticated?: boolean;
    guestCheckoutEnabled?: boolean;
    onGuestClicked: () => void;
    onCloseClicked: () => void;
}
export declare const AuthenticationView: React.FC<AuthenticationViewProps>;
