export declare type LoaderMode = "default" | "success" | "error";
export interface UseOpenCloseCheckoutModalState {
    loaderMode: LoaderMode;
    isOpen: boolean;
}
export interface UseOpenCloseCheckoutModalReturn extends UseOpenCloseCheckoutModalState {
    onOpen: () => void;
    onClose: () => void;
}
export interface UseOpenCloseCheckoutModalOptions {
    paymentIdParam?: string;
    paymentErrorParam?: string;
}
export declare function useOpenCloseCheckoutModal({ paymentIdParam, paymentErrorParam, }: UseOpenCloseCheckoutModalOptions): UseOpenCloseCheckoutModalReturn;
