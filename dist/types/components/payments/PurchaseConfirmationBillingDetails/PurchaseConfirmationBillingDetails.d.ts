import React from "react";
import { SavedPaymentMethod, SavedPaymentMethodBillingInfo } from "../../../domain/circle/circle.interfaces";
import { PaymentMethod } from "../../../domain/payment/payment.interfaces";
import { CheckoutItem } from "../../../domain/product/product.interfaces";
import { PUIDictionary } from "../../../domain/dictionary/dictionary.interfaces";
export interface PurchaseConfirmationBillingDetailsProps {
    checkoutItems: CheckoutItem[];
    paymentReferenceNumber: string;
    selectedPaymentMethodBillingInfo: SavedPaymentMethodBillingInfo;
    selectedPaymentMethodPaymentInfo: PaymentMethod | SavedPaymentMethod;
    dictionary: PUIDictionary;
}
export declare const PurchaseConfirmationBillingDetails: React.FC<PurchaseConfirmationBillingDetailsProps>;
