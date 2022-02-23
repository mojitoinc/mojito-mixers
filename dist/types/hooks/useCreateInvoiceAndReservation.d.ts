import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { CheckoutItem } from "../domain/product/product.interfaces";
export interface UseCreateInvoiceAndReservationOptions {
    orgID: string;
    checkoutItems: CheckoutItem[];
    debug?: boolean;
}
export interface UseCreateInvoiceAndReservationState {
    invoiceID?: string;
    error?: string | CheckoutModalError;
}
export declare function useCreateInvoiceAndReservation({ orgID, checkoutItems, debug, }: UseCreateInvoiceAndReservationOptions): [UseCreateInvoiceAndReservationState, () => Promise<void>];
