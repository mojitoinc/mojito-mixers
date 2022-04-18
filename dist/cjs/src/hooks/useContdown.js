'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var corre = require('@swyg/corre');
var React = require('react');
var config = require('../config/config.js');
var errors_constants = require('../domain/errors/errors.constants.js');
var formatUtils = require('../utils/formatUtils.js');

function useCountdown({ invoiceCountdownStart, setError, }) {
    const countdownStartRef = React.useRef(invoiceCountdownStart);
    const countdownElementRef = React.useRef(null);
    React.useEffect(() => {
        countdownStartRef.current = invoiceCountdownStart;
    }, [invoiceCountdownStart]);
    corre.useThrottledRequestAnimationFrame(() => {
        const countdownStart = countdownStartRef.current;
        const countdownElement = countdownElementRef.current;
        if (countdownStart === null)
            return;
        const formattedTimeLeft = formatUtils.formatTimeLeft(countdownStart, config.RESERVATION_COUNTDOWN_FROM_MS);
        if (formattedTimeLeft === "00:00") {
            countdownStartRef.current = null;
            setError(errors_constants.ERROR_INVOICE_TIMEOUT());
            return;
        }
        if (countdownElement)
            countdownElement.textContent = formattedTimeLeft;
    }, countdownStartRef.current === null || invoiceCountdownStart === null ? null : config.RESERVATION_COUNTDOWN_REFRESH_RATE_MS);
    return { countdownElementRef };
}

exports.useCountdown = useCountdown;
//# sourceMappingURL=useContdown.js.map
