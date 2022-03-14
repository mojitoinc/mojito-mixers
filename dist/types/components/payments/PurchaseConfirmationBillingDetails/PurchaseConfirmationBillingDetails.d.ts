import React from "react";
import { SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "../../../domain/circle/circle.interfaces";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";
import { Wallet } from "../../../domain/wallet/wallet.interfaces";
export interface PurchaseConfirmationBillingDetailsProps {
    checkoutItems: CheckoutItem[];
    circlePaymentID: string;
    wallet: null | string | Wallet;
    selectedPaymentMethodBillingInfo: SavedPaymentMethodBillingInfo;
    selectedPaymentMethodPaymentInfo: PaymentMethod | SavedPaymentMethod;
    dictionary: PUIDictionary;
}
export declare const PurchaseConfirmationBillingDetails: React.FC<PurchaseConfirmationBillingDetailsProps>;
