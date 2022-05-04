import { useThrottledRequestAnimationFrame } from "@swyg/corre";
import { useEffect, useRef } from "react";
import { CheckoutModalError } from "../components/public/CheckoutOverlay/CheckoutOverlay.hooks";
import { RESERVATION_COUNTDOWN_FROM_MS, RESERVATION_COUNTDOWN_REFRESH_RATE_MS } from "../config/config";
import { ERROR_INVOICE_TIMEOUT } from "../domain/errors/errors.constants";
import { formatTimeLeft } from "../utils/formatUtils";

export interface UseCountdownOptions {
  invoiceCountdownStart: number | null;
  setError: (error?: string | CheckoutModalError) => void;
}

export interface UseCountdownReturn {
  countdownElementRef: React.RefObject<HTMLSpanElement>;
}

export function useCountdown({
  invoiceCountdownStart,
  setError,
}: UseCountdownOptions): UseCountdownReturn {
  const countdownStartRef = useRef<number | null>(invoiceCountdownStart);
  const countdownElementRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    countdownStartRef.current = invoiceCountdownStart;
  }, [invoiceCountdownStart]);

  useThrottledRequestAnimationFrame(() => {
    const countdownStart = countdownStartRef.current;
    const countdownElement = countdownElementRef.current;

    if (countdownStart === null) return;

    const formattedTimeLeft = formatTimeLeft(countdownStart, RESERVATION_COUNTDOWN_FROM_MS);

    if (formattedTimeLeft === "00:00") {
      countdownStartRef.current = null;

      setError(ERROR_INVOICE_TIMEOUT());

      return;
    }

    if (countdownElement) countdownElement.textContent = formattedTimeLeft;
  }, countdownStartRef.current === null || invoiceCountdownStart === null ? null : RESERVATION_COUNTDOWN_REFRESH_RATE_MS);

  return { countdownElementRef };
}
