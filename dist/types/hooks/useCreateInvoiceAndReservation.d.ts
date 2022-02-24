/// <reference types="react" />
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { CheckoutItem } from "../domain/product/product.interfaces";
export interface UseCreateInvoiceAndReservationOptions {
    orgID: string;
    checkoutItems: CheckoutItem[];
    debug?: boolean;
}
export interface InvoiceAndReservationState {
    invoiceID?: string;
    error?: string | CheckoutModalError;
}
export interface UseCreateInvoiceAndReservationReturn {
    invoiceAndReservationState: InvoiceAndReservationState;
    createInvoiceAndReservation: () => Promise<void>;
    countdownElementRef: React.RefObject<HTMLSpanElement>;
}
export declare function useCreateInvoiceAndReservation({ orgID, checkoutItems, debug, }: UseCreateInvoiceAndReservationOptions): UseCreateInvoiceAndReservationReturn;
