'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var PrimaryButton = require('../../shared/PrimaryButton/PrimaryButton.js');
var CheckoutModalFooter_constants = require('./CheckoutModalFooter.constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CheckoutModalFooter = function (_a) {
    var variant = _a.variant, guestCheckoutEnabled = _a.guestCheckoutEnabled, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref, onSubmitClicked = _a.onSubmitClicked, onCloseClicked = _a.onCloseClicked;
    var buttonLabel = CheckoutModalFooter_constants.LABELS_BY_VARIANT[variant];
    var ButtonIconComponent = CheckoutModalFooter_constants.ICONS_BY_VARIANT[variant];
    var handleCancelClicked = React.useCallback(function (e) {
        e.preventDefault();
        onCloseClicked();
    }, [onCloseClicked]);
    var displayPrimaryButton = variant !== "toGuestCheckout" || guestCheckoutEnabled;
    return (React__default["default"].createElement(material.Box, { sx: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            py: 5
        } },
        displayPrimaryButton && (React__default["default"].createElement(PrimaryButton.PrimaryButton, { onClick: onSubmitClicked, endIcon: ButtonIconComponent && React__default["default"].createElement(ButtonIconComponent, null) }, buttonLabel)),
        variant !== "toMarketplace" && (React__default["default"].createElement(material.Typography, { sx: displayPrimaryButton ? { pt: 2 } : undefined },
            displayPrimaryButton ? "or " : null,
            React__default["default"].createElement(material.Link, { sx: { color: "text.primary" }, href: "", onClick: handleCancelClicked }, "Cancel and Return to Marketplace"))),
        variant === "toConfirmation" && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Divider, { sx: { my: 5, width: "100%" } }),
            React__default["default"].createElement(material.Typography, { sx: { maxWidth: "400px" }, align: "center" },
                "By placing an order you affirm that you have read, understood, and consent to the",
                " ",
                React__default["default"].createElement(material.Link, { color: "text.primary", href: privacyHref, target: "_blank" }, "Privacy Notices"),
                " ",
                "and",
                " ",
                React__default["default"].createElement(material.Link, { color: "text.primary", href: termsOfUseHref, target: "_blank" }, "Terms of Use"),
                ".")))));
};

exports.CheckoutModalFooter = CheckoutModalFooter;
//# sourceMappingURL=CheckoutModalFooter.js.map
