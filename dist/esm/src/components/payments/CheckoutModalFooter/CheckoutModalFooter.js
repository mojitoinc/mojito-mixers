import { Box, Typography, Link, Divider } from '@mui/material';
import React__default, { useState, useCallback } from 'react';
import { Checkbox } from '../../shared/Checkbox/index.js';
import { ConsentText, CONSENT_ERROR_MESSAGE } from '../../shared/ConsentText/ConsentText.js';
import { PrimaryButton } from '../../shared/PrimaryButton/PrimaryButton.js';
import { LABELS_BY_VARIANT, ICONS_BY_VARIANT } from './CheckoutModalFooter.constants.js';

var CheckoutModalFooter = function (_a) {
    var variant = _a.variant, guestCheckoutEnabled = _a.guestCheckoutEnabled, consentType = _a.consentType, privacyHref = _a.privacyHref, termsOfUseHref = _a.termsOfUseHref, submitDisabled = _a.submitDisabled, onSubmitClicked = _a.onSubmitClicked, onCloseClicked = _a.onCloseClicked;
    // CONSENT:
    var showConsent = consentType && (privacyHref || termsOfUseHref) && (variant === "toConfirmation" || variant === "toPlaid");
    var consentTextElement = showConsent ? React__default.createElement(ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref }) : null;
    var _b = useState({
        isFormSubmitted: false,
        isConsentChecked: showConsent && consentType === "checkbox" ? false : true,
    }), _c = _b[0], isFormSubmitted = _c.isFormSubmitted, isConsentChecked = _c.isConsentChecked, setConsentState = _b[1];
    var showConsentError = isFormSubmitted && !isConsentChecked;
    var handleConsentClicked = useCallback(function (_, checked) {
        setConsentState(function (prevConsentState) { return ({
            isFormSubmitted: prevConsentState.isFormSubmitted,
            isConsentChecked: checked,
        }); });
    }, []);
    // PRIMARY BUTTON:
    var primaryButtonVisible = variant !== "toGuestCheckout" || guestCheckoutEnabled;
    var primaryButtonLabel = LABELS_BY_VARIANT[variant];
    var PrimaryButtonIcon = ICONS_BY_VARIANT[variant];
    var handleSubmitClicked = useCallback(function () {
        setConsentState({
            isFormSubmitted: true,
            isConsentChecked: isConsentChecked,
        });
        if (onSubmitClicked)
            onSubmitClicked(isConsentChecked);
    }, [isConsentChecked, onSubmitClicked]);
    // CANCEL LINK:
    var handleCancelClicked = useCallback(function (e) {
        e.preventDefault();
        onCloseClicked();
    }, [onCloseClicked]);
    return (React__default.createElement(Box, { sx: {
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            pt: consentType === "checkbox" ? 0 : 5,
            pb: 5,
        } },
        showConsent && consentType === "checkbox" && (React__default.createElement(Checkbox, { label: React__default.createElement(React__default.Fragment, null,
                "I ",
                consentTextElement), checked: isConsentChecked, onChange: handleConsentClicked, error: showConsentError, helperText: showConsentError ? CONSENT_ERROR_MESSAGE : undefined, sx: { alignSelf: "flex-start", mb: 5 } })),
        primaryButtonVisible && (React__default.createElement(PrimaryButton, { onClick: onSubmitClicked ? handleSubmitClicked : undefined, type: onSubmitClicked ? "button" : "submit", endIcon: PrimaryButtonIcon && React__default.createElement(PrimaryButtonIcon, null), disabled: submitDisabled }, primaryButtonLabel)),
        variant !== "toMarketplace" && (React__default.createElement(Typography, { sx: primaryButtonVisible ? { pt: 2 } : undefined },
            primaryButtonVisible ? "or " : null,
            React__default.createElement(Link, { sx: { color: "text.primary" }, href: "", onClick: handleCancelClicked }, "Cancel and Return to Marketplace"))),
        showConsent && consentType === "disclaimer" && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Divider, { sx: { my: 5, width: "100%" } }),
            React__default.createElement(Typography, { sx: { maxWidth: "400px" }, align: "center" },
                "By placing an order you affirm that you ",
                consentTextElement,
                ".")))));
};

export { CheckoutModalFooter };
//# sourceMappingURL=CheckoutModalFooter.js.map
