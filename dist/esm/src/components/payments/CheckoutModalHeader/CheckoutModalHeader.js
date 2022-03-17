import { Box, Stack, Typography, Divider } from '@mui/material';
import { PrimaryButton } from '../../shared/PrimaryButton/PrimaryButton.js';
import { OutlinedSecondaryButton } from '../../shared/OutlinedSecondaryButton/OutlinedSecondaryButton.js';
import default_1$1 from '../../../../node_modules/@mui/icons-material/ChevronLeft.js';
import default_1 from '../../../../node_modules/@mui/icons-material/Close.js';
import { NBSP } from '../../../utils/formatUtils.js';
import { getFormattedUser } from './CheckoutModalHeader.utils.js';
import React__default, { useRef, useCallback } from 'react';
import { COUNTER_CLICKS_NEEDED, RESERVATION_COUNTDOWN_FROM_MIN, COUNTER_EXPIRATION_MS } from '../../../config/config.js';
import { Img } from '../../shared/Img/Img.js';

const CHECKOUT_MODAL_TITLE = {
    anonymous: "Checkout",
    guest: "Checkout",
    loggedIn: "Checkout",
    logoOnly: "",
    purchasing: "Purchasing",
    error: "Error",
};
const CHECKOUT_MODAL_CONTROLS = {
    anonymous: true,
    guest: true,
    loggedIn: true,
    logoOnly: false,
    purchasing: false,
    error: false,
};
const COUNTDOWN_CONTAINER_SX = {
    position: "relative",
    color: "transparent",
    userSelect: "none",
};
const COUNTDOWN_SX = {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    color: theme => theme.palette.text.primary,
    userSelect: "auto",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
};
const CheckoutModalHeader = ({ variant, countdownElementRef, title: customTitle, logoSrc, logoSx, user, userFormat, onLogin, onClose, onPrev, setDebug, }) => {
    const title = customTitle || CHECKOUT_MODAL_TITLE[variant] || NBSP;
    const displayUsername = getFormattedUser(variant, user, userFormat);
    const showControls = CHECKOUT_MODAL_CONTROLS[variant] || false;
    const clickCounterRef = useRef(0);
    const clickTimestampRef = useRef(0);
    const handleLogoClick = useCallback(() => {
        if (!setDebug)
            return;
        const counter = clickCounterRef.current;
        const timestamp = clickTimestampRef.current;
        const now = Date.now();
        const elapsed = now - timestamp;
        const nextCounter = elapsed > COUNTER_EXPIRATION_MS || counter === COUNTER_CLICKS_NEEDED ? 1 : counter + 1;
        clickTimestampRef.current = now;
        clickCounterRef.current = nextCounter;
        if (nextCounter === COUNTER_CLICKS_NEEDED) {
            setDebug((prevValue) => {
                const nextValue = !prevValue;
                console.log(`\n🐞 DEBUG MODE ${nextValue ? "ENABLED" : "DISABLED"}!\n\n`);
                return nextValue;
            });
        }
    }, [setDebug]);
    return (React__default.createElement(Box, null,
        React__default.createElement(Stack, { spacing: 2, direction: "row", sx: { justifyContent: "space-between", alignItems: "center", py: 2 } },
            React__default.createElement(Typography, { variant: "h5", id: "checkout-modal-header-title" }, title),
            React__default.createElement(Img, { src: logoSrc, onClick: setDebug ? handleLogoClick : undefined, sx: Object.assign({ maxHeight: "32px", maxWidth: { xs: "180px", sm: "240px" } }, logoSx) })),
        React__default.createElement(Divider, null),
        showControls ? (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Stack, { spacing: 2, direction: "row", sx: { justifyContent: "space-between", alignItems: "center", py: 2 } },
                (variant === "anonymous" && onLogin) ? (React__default.createElement(React__default.Fragment, null,
                    React__default.createElement(Typography, { sx: { fontWeight: "500" } }, "Already have an account?"),
                    React__default.createElement(PrimaryButton, { onClick: onLogin }, "Log in"))) : null,
                (variant !== "anonymous" && displayUsername) ? (React__default.createElement(React__default.Fragment, null,
                    onClose && React__default.createElement(OutlinedSecondaryButton, { onClick: onClose },
                        React__default.createElement(default_1, null)),
                    onPrev && React__default.createElement(OutlinedSecondaryButton, { onClick: onPrev },
                        React__default.createElement(default_1$1, null)),
                    variant === "loggedIn" && countdownElementRef ? (React__default.createElement(Typography, { sx: { fontWeight: "500" } },
                        "Time left: ",
                        " ",
                        React__default.createElement(Box, { component: "span", sx: COUNTDOWN_CONTAINER_SX },
                            "00:00",
                            React__default.createElement(Box, { component: "span", ref: countdownElementRef, sx: COUNTDOWN_SX },
                                RESERVATION_COUNTDOWN_FROM_MIN,
                                ":00")))) : null,
                    React__default.createElement(Typography, { sx: { fontWeight: "500", minHeight: 40, display: "flex", alignItems: "center" } }, displayUsername))) : null),
            React__default.createElement(Divider, null))) : null));
};

export { CheckoutModalHeader };
//# sourceMappingURL=CheckoutModalHeader.js.map
