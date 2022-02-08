'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var Checkbox = require('../../shared/Checkbox/Checkbox.js');
var ConsentText = require('../../shared/ConsentText/ConsentText.js');
var PrimaryButton = require('../../shared/PrimaryButton/PrimaryButton.js');
var CheckoutModalFooter_constants = require('./CheckoutModalFooter.constants.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const CheckoutModalFooter = ({ variant, guestCheckoutEnabled, consentType, privacyHref, termsOfUseHref, submitDisabled, onSubmitClicked, onCloseClicked, }) => {
    // CONSENT:
    const showConsent = consentType && (privacyHref || termsOfUseHref) && (variant === "toConfirmation" || variant === "toPlaid");
    const consentTextElement = showConsent ? React__default["default"].createElement(ConsentText.ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref }) : null;
    const [{ isFormSubmitted, isConsentChecked, }, setConsentState] = React.useState({
        isFormSubmitted: false,
        isConsentChecked: showConsent && consentType === "checkbox" ? false : true,
    });
    const showConsentError = isFormSubmitted && !isConsentChecked;
    const handleConsentClicked = React.useCallback((_, checked) => {
        setConsentState((prevConsentState) => ({
            isFormSubmitted: prevConsentState.isFormSubmitted,
            isConsentChecked: checked,
        }));
    }, []);
    // PRIMARY BUTTON:
    const primaryButtonVisible = variant !== "toGuestCheckout" || guestCheckoutEnabled;
    const primaryButtonLabel = CheckoutModalFooter_constants.LABELS_BY_VARIANT[variant];
    const PrimaryButtonIcon = CheckoutModalFooter_constants.ICONS_BY_VARIANT[variant];
    const handleSubmitClicked = React.useCallback(() => {
        setConsentState({
            isFormSubmitted: true,
            isConsentChecked,
        });
        if (onSubmitClicked)
            onSubmitClicked(isConsentChecked);
    }, [isConsentChecked, onSubmitClicked]);
    // CANCEL LINK:
    const handleCancelClicked = React.useCallback((e) => {
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
        showConsent && consentType === "checkbox" && (React__default["default"].createElement(Checkbox.Checkbox, { label: React__default["default"].createElement(React__default["default"].Fragment, null,
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
