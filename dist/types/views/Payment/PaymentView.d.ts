import { CheckoutItem } from "../../domain/product/product.interfaces";
import React from "react";
import { PaymentMethod, PaymentType } from "../../domain/payment/payment.interfaces";
import { SavedPaymentMethod } from "../../domain/circle/circle.interfaces";
import { CheckoutModalError, SelectedPaymentMethod } from "../../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { ConsentType } from "../../components/shared/ConsentText/ConsentText";
import { TaxesState } from "../Billing/BillingView";
import { Wallet } from "../../domain/wallet/wallet.interfaces";
export interface PaymentViewProps {
    checkoutItems: CheckoutItem[];
    taxes: TaxesState;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    wallets?: Wallet[];
    wallet: null | string | Wallet;
    checkoutError?: CheckoutModalError;
    onPaymentInfoSelected: (data: string | PaymentMethod) => void;
    onCvvSelected: (cvv: string) => void;
    onSavedPaymentMethodDeleted: (savedPaymentMethodId: string) => void;
    onWalletChange: (wallet: null | string | Wallet) => void;
    onNext: () => void;
    onPrev: () => void;
    onClose: () => void;
    acceptedPaymentTypes: PaymentType[];
    consentType?: ConsentType;
    debug?: boolean;
}
export declare const PaymentView: React.FC<PaymentViewProps>;
