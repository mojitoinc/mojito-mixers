import { __awaiter } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box, CircularProgress, Typography, Link, Divider } from '@mui/material';
import React__default, { useState, useCallback } from 'react';
import { SM_MOBILE_MAX_WIDTH } from '../../../config/theme/theme.js';
import { isPromise } from '../../../utils/promiseUtils.js';
import { Checkbox } from '../../shared/Checkbox/Checkbox.js';
import { ConsentText, CONSENT_ERROR_MESSAGE } from '../../shared/ConsentText/ConsentText.js';
import { PrimaryButton } from '../../shared/PrimaryButton/PrimaryButton.js';
import { LABELS_BY_VARIANT, ICONS_BY_VARIANT } from './CheckoutModalFooter.constants.js';

const CheckoutModalFooter = ({ variant, buttonLabel, guestCheckoutEnabled, consentType, privacyHref, termsOfUseHref, submitDisabled, onSubmitClicked, onCloseClicked, }) => {
    // CONSENT:
    const showConsent = consentType && (privacyHref || termsOfUseHref) && (variant === "toConfirmation" || variant === "toPlaid");
    const consentTextElement = showConsent ? React__default.createElement(ConsentText, { privacyHref: privacyHref, termsOfUseHref: termsOfUseHref }) : null;
    const [{ isFormSubmitted, isFormLoading, isConsentChecked, }, setConsentState] = useState({
        isFormSubmitted: false,
        isFormLoading: false,
        isConsentChecked: showConsent && consentType === "checkbox" ? false : true,
    });
    const showConsentError = isFormSubmitted && !isConsentChecked;
    const handleConsentClicked = useCallback((_, checked) => {
        setConsentState((prevConsentState) => ({
            isFormSubmitted: prevConsentState.isFormSubmitted,
            isFormLoading: prevConsentState.isFormLoading,
            isConsentChecked: checked,
        }));
    }, []);
    // PRIMARY BUTTON:
    const primaryButtonVisible = variant !== "toGuestCheckout" || guestCheckoutEnabled;
    const primaryButtonLabel = buttonLabel || LABELS_BY_VARIANT[variant];
    const PrimaryButtonIcon = ICONS_BY_VARIANT[variant];
    const handleSubmitClicked = useCallback(() => __awaiter(void 0, void 0, void 0, function* () {
        if (!onSubmitClicked)
            return;
        setConsentState({
            isFormSubmitted: true,
            isFormLoading: true,
            isConsentChecked,
        });
        const promiseOrResult = onSubmitClicked(isConsentChecked);
        const result = isPromise(promiseOrResult) ? yield promiseOrResult : promiseOrResult;
        // This means the parent component will make this one unmount, so there's no need to update the state anymore:
        if (result === false)
            return;
        setConsentState({
            isFormSubmitted: true,
            isFormLoading: false,
            isConsentChecked,
        });
    }), [isConsentChecked, onSubmitClicked]);
    // CANCEL LINK:
    const handleCancelClicked = useCallback((e) => {
        e.preventDefault();
        if (onCloseClicked)
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
        primaryButtonVisible && (React__default.createElement(PrimaryButton, { onClick: onSubmitClicked ? handleSubmitClicked : undefined, type: onSubmitClicked ? "button" : "submit", endIcon: isFormLoading ? React__default.createElement(CircularProgress, { color: "inherit", size: "1em" }) : (PrimaryButtonIcon && React__default.createElement(PrimaryButtonIcon, null)), disabled: submitDisabled || isFormLoading }, primaryButtonLabel)),
        variant !== "toMarketplace" && onCloseClicked && (React__default.createElement(Typography, { sx: primaryButtonVisible ? { pt: 2 } : undefined },
            primaryButtonVisible ? "or " : null,
            React__default.createElement(Link, { sx: { color: "text.primary" }, href: "", onClick: handleCancelClicked }, "Cancel and Return to Marketplace"))),
        showConsent && consentType === "disclaimer" && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Divider, { sx: { my: 5, width: "100%" } }),
            React__default.createElement(Typography, { sx: { maxWidth: SM_MOBILE_MAX_WIDTH }, align: "center" },
                "By placing an order you affirm that you ",
                consentTextElement,
                ".")))));
};

export { CheckoutModalFooter };
//# sourceMappingURL=CheckoutModalFooter.js.map
