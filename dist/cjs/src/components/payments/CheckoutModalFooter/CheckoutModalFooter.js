'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var index = require('../../shared/Checkbox/index.js');
var ConsentText = require('../../shared/ConsentText/ConsentText.js');
var PrimaryButton = require('../../shared/PrimaryButton/PrimaryButton.js');
var CheckoutModalFooter_constants = require('./CheckoutModalFooter.constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

var CheckoutModalFooter = function (_a) {
    var variant = _a.variant, guestCheckoutEnabled = _a.guestCheckoutEnabled, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref, submitDisabled = _a.submitDisabled, onSubmitClicked = _a.onSubmitClicked, onCloseClicked = _a.onCloseClicked;
    // CONSENT:
    var showConsent = consentType && (privacyHref || termsOfUseHref) && (variant === "toConfirmation" || variant === "toPlaid");
    var consentTextElement = showConsent ? React__default["default"].createElement(ConsentText.ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref }) : null;
    var _b = React.useState({
        isFormSubmitted: false,
        isConsentChecked: showConsent && consentType === "checkbox" ? false : true,
    }), _c = _b[0], isFormSubmitted = _c.isFormSubmitted, isConsentChecked = _c.isConsentChecked, setConsentState = _b[1];
    var showConsentError = isFormSubmitted && !isConsentChecked;
    var handleConsentClicked = React.useCallback(function (_, checked) {
        setConsentState(function (prevConsentState) { return ({
            isFormSubmitted: prevConsentState.isFormSubmitted,
            isConsentChecked: checked,
        }); });
    }, []);
    // PRIMARY BUTTON:
    var primaryButtonVisible = variant !== "toGuestCheckout" || guestCheckoutEnabled;
    var primaryButtonLabel = CheckoutModalFooter_constants.LABELS_BY_VARIANT[variant];
    var PrimaryButtonIcon = CheckoutModalFooter_constants.ICONS_BY_VARIANT[variant];
    var handleSubmitClicked = React.useCallback(function () {
        setConsentState({
            isFormSubmitted: true,
            isConsentChecked: isConsentChecked,
        });
        if (onSubmitClicked)
            onSubmitClicked(isConsentChecked);
    }, [isConsentChecked, onSubmitClicked]);
    // CANCEL LINK:
    var handleCancelClicked = React.useCallback(function (e) {
        e.preventDefault();
        onCloseClicked();
    }, [onCloseClicked]);
    return (React__default["default"].createElement(material.Box, { sx: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            pt: consentType === "checkbox" ? 0 : 5,
            pb: 5,
        } },
        showConsent && consentType === "checkbox" && (React__default["default"].createElement(index.Checkbox, { label: React__default["default"].createElement(React__default["default"].Fragment, null,
                "I ",
                consentTextElement), checked: isConsentChecked, onChange: handleConsentClicked, error: showConsentError, helperText: showConsentError ? ConsentText.CONSENT_ERROR_MESSAGE : undefined, sx: { alignSelf: "flex-start", mb: 5 } })),
        primaryButtonVisible && (React__default["default"].createElement(PrimaryButton.PrimaryButton, { onClick: onSubmitClicked ? handleSubmitClicked : undefined, type: onSubmitClicked ? "button" : "submit", endIcon: PrimaryButtonIcon && React__default["default"].createElement(PrimaryButtonIcon, null), disabled: submitDisabled }, primaryButtonLabel)),
        variant !== "toMarketplace" && (React__default["default"].createElement(material.Typography, { sx: primaryButtonVisible ? { pt: 2 } : undefined },
            primaryButtonVisible ? "or " : null,
            React__default["default"].createElement(material.Link, { sx: { color: "text.primary" }, href: "", onClick: handleCancelClicked }, "Cancel and Return to Marketplace"))),
        showConsent && consentType === "disclaimer" && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Divider, { sx: { my: 5, width: "100%" } }),
            React__default["default"].createElement(material.Typography, { sx: { maxWidth: "400px" }, align: "center" },
                "By placing an order you affirm that you ",
                consentTextElement,
                ".")))));
};

exports.CheckoutModalFooter = CheckoutModalFooter;
//# sourceMappingURL=CheckoutModalFooter.js.map
