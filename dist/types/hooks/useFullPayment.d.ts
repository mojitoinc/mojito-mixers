import { CheckoutModalError, SelectedPaymentMethod } from "../components/payments/CheckoutModal/CheckoutModal.hooks";
import { SavedPaymentMethod } from "../domain/circle/circle.interfaces";
import { PaymentStatus } from "../domain/payment/payment.interfaces";
import { CheckoutItem } from "../domain/product/product.interfaces";
export interface UseFullPaymentOptions {
    orgID: string;
    invoiceID?: string;
    checkoutItems: CheckoutItem[];
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    debug?: boolean;
}
export interface PaymentState {
    paymentStatus: PaymentStatus;
    paymentReferenceNumber: string;
    paymentError?: string | CheckoutModalError;
}
export declare function useFullPayment({ orgID, invoiceID: existingInvoiceID, checkoutItems, savedPaymentMethods, selectedPaymentMethod, debug, }: UseFullPaymentOptions): [PaymentState, () => Promise<void>];
