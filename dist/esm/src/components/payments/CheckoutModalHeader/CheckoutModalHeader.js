import { __assign } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box, Stack, Typography, Divider } from '@mui/material';
import { PrimaryButton } from '../../shared/PrimaryButton/PrimaryButton.js';
import { OutlinedSecondaryButton } from '../../shared/OutlinedSecondaryButton/OutlinedSecondaryButton.js';
import default_1 from '../../../../node_modules/@mui/icons-material/ChevronLeft.js';
import { NBSP } from '../../../utils/formatUtils.js';
import { getFormattedUser } from './CheckoutModalHeader.utils.js';
import React__default from 'react';

var CHECKOUT_MODAL_TITLE = {
    anonymous: "Checkout",
    guest: "Checkout",
    loggedIn: "Checkout",
    logoOnly: "",
    purchasing: "Purchasing",
    error: "Error",
};
var CHECKOUT_MODAL_CONTROLS = {
    anonymous: true,
    guest: true,
    loggedIn: true,
    logoOnly: false,
    purchasing: false,
    error: false,
};
var CheckoutModalHeader = function (_a) {
    var variant = _a.variant, customTitle = _a.title, logoSrc = _a.logoSrc, logoSx = _a.logoSx, user = _a.user, userFormat = _a.userFormat, onLoginClicked = _a.onLoginClicked, onPrevClicked = _a.onPrevClicked;
    var title = customTitle || CHECKOUT_MODAL_TITLE[variant] || NBSP;
    var displayUsername = getFormattedUser(variant, user, userFormat);
    var showControls = CHECKOUT_MODAL_CONTROLS[variant] || false;
    return (React__default.createElement(Box, null,
        React__default.createElement(Stack, { spacing: 2, direction: "row", sx: { justifyContent: "space-between", alignItems: "center", py: 2 } },
            React__default.createElement(Typography, { variant: "h5", id: "checkout-modal-header-title" }, title),
            React__default.createElement(Box, { component: "img", src: logoSrc, sx: __assign({ maxHeight: "32px", maxWidth: { xs: "180px", sm: "240px" } }, logoSx) })),
        React__default.createElement(Divider, null),
        showControls ? (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Stack, { spacing: 2, direction: "row", sx: { justifyContent: "space-between", alignItems: "center", py: 2 } }, variant === "anonymous" ? (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(Typography, { sx: { fontWeight: "500" } }, "Already have an account?"),
                React__default.createElement(PrimaryButton, { onClick: onLoginClicked }, "Log in"))) : (React__default.createElement(React__default.Fragment, null,
                React__default.createElement(OutlinedSecondaryButton, { onClick: onPrevClicked },
                    React__default.createElement(default_1, null)),
                React__default.createElement(Typography, { sx: { fontWeight: "500", minHeight: 40, display: "flex", alignItems: "center" } }, displayUsername)))),
            React__default.createElement(Divider, null))) : null));
};

export { CheckoutModalHeader };
//# sourceMappingURL=CheckoutModalHeader.js.map
