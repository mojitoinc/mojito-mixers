import { Box, Typography, Link, Divider } from '@mui/material';
import React__default, { useCallback } from 'react';
import { PrimaryButton } from '../../shared/PrimaryButton/PrimaryButton.js';
import { LABELS_BY_VARIANT, ICONS_BY_VARIANT } from './CheckoutModalFooter.constants.js';

var CheckoutModalFooter = function (_a) {
    var variant = _a.variant, guestCheckoutEnabled = _a.guestCheckoutEnabled, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref, onSubmitClicked = _a.onSubmitClicked, onCloseClicked = _a.onCloseClicked;
    var buttonLabel = LABELS_BY_VARIANT[variant];
    var ButtonIconComponent = ICONS_BY_VARIANT[variant];
    var handleCancelClicked = useCallback(function (e) {
        e.preventDefault();
        onCloseClicked();
    }, [onCloseClicked]);
    var displayPrimaryButton = variant !== "toGuestCheckout" || guestCheckoutEnabled;
    return (React__default.createElement(Box, { sx: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            py: 5
        } },
        displayPrimaryButton && (React__default.createElement(PrimaryButton, { onClick: onSubmitClicked, endIcon: ButtonIconComponent && React__default.createElement(ButtonIconComponent, null) }, buttonLabel)),
        variant !== "toMarketplace" && (React__default.createElement(Typography, { sx: displayPrimaryButton ? { pt: 2 } : undefined },
            displayPrimaryButton ? "or " : null,
            React__default.createElement(Link, { sx: { color: "text.primary" }, href: "", onClick: handleCancelClicked }, "Cancel and Return to Marketplace"))),
        variant === "toConfirmation" && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Divider, { sx: { my: 5, width: "100%" } }),
            React__default.createElement(Typography, { sx: { maxWidth: "400px" }, align: "center" },
                "By placing an order you affirm that you have read, understood, and consent to the",
                " ",
                React__default.createElement(Link, { color: "text.primary", href: privacyHref, target: "_blank" }, "Privacy Notices"),
                " ",
                "and",
                " ",
                React__default.createElement(Link, { color: "text.primary", href: termsOfUseHref, target: "_blank" }, "Terms of Use"),
                ".")))));
};

export { CheckoutModalFooter };
//# sourceMappingURL=CheckoutModalFooter.js.map
