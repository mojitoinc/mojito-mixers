'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var PrimaryButton = require('../../shared/PrimaryButton/PrimaryButton.js');
var OutlinedSecondaryButton = require('../../shared/OutlinedSecondaryButton/OutlinedSecondaryButton.js');
var ChevronLeft = require('../../../../node_modules/@mui/icons-material/ChevronLeft.js');
var Close = require('../../../../node_modules/@mui/icons-material/Close.js');
var formatUtils = require('../../../utils/formatUtils.js');
var CheckoutModalHeader_utils = require('./CheckoutModalHeader.utils.js');
var React = require('react');
var config = require('../../../config/config.js');
var Img = require('../../shared/Img/Img.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

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
    const title = customTitle || CHECKOUT_MODAL_TITLE[variant] || formatUtils.NBSP;
    const displayUsername = CheckoutModalHeader_utils.getFormattedUser(variant, user, userFormat);
    const showControls = CHECKOUT_MODAL_CONTROLS[variant] || false;
    const clickCounterRef = React.useRef(0);
    const clickTimestampRef = React.useRef(0);
    const handleLogoClick = React.useCallback(() => {
        if (!setDebug)
            return;
        const counter = clickCounterRef.current;
        const timestamp = clickTimestampRef.current;
        const now = Date.now();
        const elapsed = now - timestamp;
        const nextCounter = elapsed > config.DEV_DEBUG_COUNTER_EXPIRATION_MS || counter === config.DEV_DEBUG_COUNTER_CLICKS_NEEDED ? 1 : counter + 1;
        clickTimestampRef.current = now;
        clickCounterRef.current = nextCounter;
        if (nextCounter === config.DEV_DEBUG_COUNTER_CLICKS_NEEDED) {
            setDebug((prevValue) => {
                const nextValue = !prevValue;
                console.log(`\n🐞 DEBUG MODE ${nextValue ? "ENABLED" : "DISABLED"}!\n\n`);
                return nextValue;
            });
        }
    }, [setDebug]);
    return (React__default["default"].createElement(material.Box, null,
        React__default["default"].createElement(material.Stack, { spacing: 2, direction: "row", sx: { justifyContent: "space-between", alignItems: "center", py: 2 } },
            React__default["default"].createElement(material.Typography, { variant: "h5", id: "checkout-modal-header-title" }, title),
            React__default["default"].createElement(Img.Img, { src: logoSrc, onClick: setDebug ? handleLogoClick : undefined, sx: Object.assign({ maxHeight: "32px", maxWidth: { xs: "180px", sm: "240px" } }, logoSx) })),
        React__default["default"].createElement(material.Divider, null),
        showControls ? (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Stack, { spacing: 2, direction: "row", sx: { justifyContent: "space-between", alignItems: "center", py: 2 } },
                (variant === "anonymous" && onLogin) ? (React__default["default"].createElement(React__default["default"].Fragment, null,
                    React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500" } }, "Already have an account?"),
                    React__default["default"].createElement(PrimaryButton.PrimaryButton, { onClick: onLogin }, "Log in"))) : null,
                (variant !== "anonymous" && displayUsername) ? (React__default["default"].createElement(React__default["default"].Fragment, null,
                    onClose && React__default["default"].createElement(OutlinedSecondaryButton.OutlinedSecondaryButton, { onClick: onClose },
                        React__default["default"].createElement(Close["default"], null)),
                    onPrev && React__default["default"].createElement(OutlinedSecondaryButton.OutlinedSecondaryButton, { onClick: onPrev },
                        React__default["default"].createElement(ChevronLeft["default"], null)),
                    variant === "loggedIn" && countdownElementRef ? (React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500" } },
                        "Time left: ",
                        " ",
                        React__default["default"].createElement(material.Box, { component: "span", sx: COUNTDOWN_CONTAINER_SX },
                            "00:00",
                            React__default["default"].createElement(material.Box, { component: "span", ref: countdownElementRef, sx: COUNTDOWN_SX },
                                config.RESERVATION_COUNTDOWN_FROM_MIN,
                                ":00")))) : null,
                    React__default["default"].createElement(material.Typography, { sx: { fontWeight: "500", minHeight: 40, display: "flex", alignItems: "center" } }, displayUsername))) : null),
            React__default["default"].createElement(material.Divider, null))) : null));
};

exports.CheckoutModalHeader = CheckoutModalHeader;
//# sourceMappingURL=CheckoutModalHeader.js.map
