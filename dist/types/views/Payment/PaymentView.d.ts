import { CheckoutItem } from "../../domain/product/product.interfaces";
import React from "react";
import { PaymentMethod, PaymentType } from "../../domain/payment/payment.interfaces";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { SelectedPaymentMethod } from "../../components/payments/CheckoutModal/CheckoutModal";
import { ConsentType } from "../../components/shared/ConsentText/ConsentText";
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
    consentType: ConsentType;
    privacyHref: string;
    termsOfUseHref: string;
    debug?: boolean;
}
export declare const PaymentView: React.FC<PaymentViewProps>;
