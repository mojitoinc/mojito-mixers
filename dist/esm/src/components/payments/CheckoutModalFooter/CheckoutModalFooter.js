import { __awaiter } from '../../../../node_modules/tslib/tslib.es6.js';
import { Box, CircularProgress, Typography, Link, Divider } from '@mui/material';
import React__default, { useState, useCallback } from 'react';
import { SM_MOBILE_MAX_WIDTH, CIRCLE_LOGO_IMAGE_SRC } from '../../../config/theme/themeConstants.js';
import { isPromise } from '../../../utils/promiseUtils.js';
import { Checkbox } from '../../shared/Checkbox/Checkbox.js';
import { ConsentText, CONSENT_ERROR_MESSAGE } from '../../shared/ConsentText/ConsentText.js';
import { PrimaryButton } from '../../shared/PrimaryButton/PrimaryButton.js';
import { LABELS_BY_VARIANT, ICONS_BY_VARIANT } from './CheckoutModalFooter.constants.js';
import { Img } from '../../shared/Img/Img.js';

const VARIANTS_WITH_DISCLAIMER = ["toPayment", "toPlaid", "toConfirmation"];
const CheckoutModalFooter = ({ 
// Configuration:
variant, guestCheckoutEnabled, consentType, 
// Submit button:
submitLabel, submitDisabled, submitLoading, onSubmitClicked, 
// Close link:
closeLabel, closeDisabled, onCloseClicked, 
// Secondary button:
goToLabel = "View Invoices", onGoTo, }) => {
    // CONSENT:
    const showConsent = consentType && VARIANTS_WITH_DISCLAIMER.includes(variant);
    const consentTextElement = showConsent ? React__default.createElement(ConsentText, null) : null;
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
    // SECONDARY BUTTON (ConfirmationView-specific):
    const handleGoToClicked = useCallback((e) => {
        // We want to display the link (href) if the user hovers the button or if they click with the wheel or
        // Ctrl/Command + Click, but we don't know what type of routing the parent app is using (Next.js, React Router, etc.)
        // so we just prevent default here and let the parent app handle the routing:
        if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            e.stopPropagation();
        }
        if (onGoTo)
            onGoTo();
    }, [onGoTo]);
    // SUBMIT BUTTON:
    const primaryButtonVisible = variant !== "toGuestCheckout" || guestCheckoutEnabled;
    const primaryButtonLabel = submitLabel || LABELS_BY_VARIANT[variant];
    const isPrimaryButtonDisabled = submitDisabled || isFormLoading;
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
    const cancelLinkLabel = closeLabel || "Cancel and Return to Marketplace";
    const cancelLinkColor = closeDisabled ? "text.disabled" : "text.primary"; // TODO: Create custom Link component with this functionality.
    const isCancelLinkDisabled = closeDisabled || isFormLoading;
    const handleCancelClicked = useCallback((e) => {
        e.preventDefault();
        if (onCloseClicked && !isCancelLinkDisabled)
            onCloseClicked();
    }, [onCloseClicked, isCancelLinkDisabled]);
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
        goToLabel && onGoTo && (React__default.createElement(PrimaryButton, { onClickCapture: handleGoToClicked, disabled: isPrimaryButtonDisabled, href: "/profile/invoices", sx: { mb: 2 } }, goToLabel)),
        primaryButtonVisible && (React__default.createElement(PrimaryButton, { onClick: onSubmitClicked ? handleSubmitClicked : undefined, type: onSubmitClicked ? "button" : "submit", endIcon: isFormLoading || submitLoading ? React__default.createElement(CircularProgress, { color: "inherit", size: "1em" }) : (PrimaryButtonIcon && React__default.createElement(PrimaryButtonIcon, null)), disabled: isPrimaryButtonDisabled }, primaryButtonLabel)),
        variant !== "toMarketplace" && (onCloseClicked || closeDisabled) && (React__default.createElement(Typography, { sx: { color: cancelLinkColor, pt: primaryButtonVisible ? 2 : 0 } },
            primaryButtonVisible ? "or " : null,
            React__default.createElement(Link, { sx: { color: cancelLinkColor, cursor: isCancelLinkDisabled ? "not-allowed" : "pointer" }, href: "", onClick: handleCancelClicked }, cancelLinkLabel))),
        showConsent && consentType === "disclaimer" && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Divider, { sx: { my: 5, width: "100%" } }),
            React__default.createElement(Typography, { sx: { maxWidth: SM_MOBILE_MAX_WIDTH }, align: "center" },
                "By placing an order you affirm that you ",
                consentTextElement))),
        showConsent && consentType === "circle" && (React__default.createElement(React__default.Fragment, null,
            React__default.createElement(Divider, { sx: { my: 5, width: "100%" } }),
            React__default.createElement(Box, { display: "flex" },
                React__default.createElement(Typography, { sx: { maxWidth: SM_MOBILE_MAX_WIDTH, marginRight: 1 }, align: "center" }, "Payments powered by"),
                React__default.createElement(Link, { href: "https://www.circle.com/en/", target: "_blank", rel: "noopener noreferrer" },
                    React__default.createElement(Img, { src: CIRCLE_LOGO_IMAGE_SRC, height: 20 })))))));
};

export { CheckoutModalFooter };
//# sourceMappingURL=CheckoutModalFooter.js.map
