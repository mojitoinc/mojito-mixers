import { useThrottledRequestAnimationFrame } from '@swyg/corre';
import { useRef, useEffect } from 'react';
import { RESERVATION_COUNTDOWN_REFRESH_RATE_MS, RESERVATION_COUNTDOWN_FROM_MS } from '../config/config.js';
import { ERROR_INVOICE_TIMEOUT } from '../domain/errors/errors.constants.js';
import { formatTimeLeft } from '../utils/formatUtils.js';

function useCountdown({ invoiceCountdownStart, setError, }) {
    const countdownStartRef = useRef(invoiceCountdownStart);
    const countdownElementRef = useRef(null);
    useEffect(() => {
        countdownStartRef.current = invoiceCountdownStart;
    }, [invoiceCountdownStart]);
    useThrottledRequestAnimationFrame(() => {
        const countdownStart = countdownStartRef.current;
        const countdownElement = countdownElementRef.current;
        if (countdownStart === null)
            return;
        const formattedTimeLeft = formatTimeLeft(countdownStart, RESERVATION_COUNTDOWN_FROM_MS);
        if (formattedTimeLeft === "00:00") {
            countdownStartRef.current = null;
            setError(ERROR_INVOICE_TIMEOUT());
            return;
        }
        if (countdownElement)
            countdownElement.textContent = formattedTimeLeft;
    }, countdownStartRef.current === null || invoiceCountdownStart === null ? null : RESERVATION_COUNTDOWN_REFRESH_RATE_MS);
    return { countdownElementRef };
}

export { useCountdown };
//# sourceMappingURL=useContdown.js.map
