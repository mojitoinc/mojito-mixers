/// <reference types="react" />
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
export interface UseCountdownOptions {
    invoiceCountdownStart: number | null;
    setError: (error?: string | CheckoutModalError) => void;
}
export interface UseCountdownReturn {
    countdownElementRef: React.RefObject<HTMLSpanElement>;
}
export declare function useCountdown({ invoiceCountdownStart, setError, }: UseCountdownOptions): UseCountdownReturn;
