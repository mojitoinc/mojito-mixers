import { CheckoutItem } from "../../domain/product/product.interfaces";
import React from "react";
import { PaymentMethod, PaymentType } from "../../domain/payment/payment.interfaces";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { SelectedPaymentMethod } from "../../components/payments/CheckoutModal/CheckoutModal";
export interface PaymentViewProps {
    checkoutItem: CheckoutItem;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    onPaymentInfoSelected: (data: string | PaymentMethod) => void;
    onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => void;
    onNext: () => void;
    onPrev: () => void;
    onClose: () => void;
    acceptedPaymentTypes: PaymentType[];
    privacyHref: string;
    termsOfUseHref: string;
}
export declare const PaymentView: React.FC<PaymentViewProps>;
