import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { CheckoutItem } from "../domain/product/product.interfaces";
export interface UseCreateInvoiceAndReservationOptions {
    orgID: string;
    checkoutItems: CheckoutItem[];
    debug?: boolean;
}
export interface InvoiceAndReservationState {
    invoiceID?: string;
    invoiceCountdownStart?: number;
    error?: string | CheckoutModalError;
}
export interface UseCreateInvoiceAndReservationReturn {
    invoiceAndReservationState: InvoiceAndReservationState;
    createInvoiceAndReservation: () => Promise<void>;
}
export declare function useCreateInvoiceAndReservation({ orgID, checkoutItems, debug, }: UseCreateInvoiceAndReservationOptions): UseCreateInvoiceAndReservationReturn;
