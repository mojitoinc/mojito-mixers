import { SelectedPaymentMethod } from "../components/payments/CheckoutModal/CheckoutModal";
import { SavedPaymentMethod } from "../domain/circle/circle.interfaces";
import { PaymentStatus } from "../domain/payment/payment.interfaces";
import { LotType } from "../domain/product/product.interfaces";
export interface UseFullPaymentOptions {
    orgID: string;
    invoiceID?: string;
    lotID: string;
    lotType: LotType;
    savedPaymentMethods: SavedPaymentMethod[];
    selectedPaymentMethod: SelectedPaymentMethod;
    debug?: boolean;
}
export interface PaymentState {
    paymentStatus: PaymentStatus;
    paymentReferenceNumber: string;
    paymentError?: string;
}
export declare function useFullPayment({ orgID, invoiceID: existingInvoiceID, lotID, lotType, savedPaymentMethods, selectedPaymentMethod, debug, }: UseFullPaymentOptions): PaymentState;
