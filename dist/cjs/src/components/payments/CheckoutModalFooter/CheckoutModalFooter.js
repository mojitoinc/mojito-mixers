'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var tslib_es6 = require('../../../../node_modules/tslib/tslib.es6.js');
var material = require('@mui/material');
var React = require('react');
var themeConstants = require('../../../config/theme/themeConstants.js');
var promiseUtils = require('../../../utils/promiseUtils.js');
var Checkbox = require('../../shared/Checkbox/Checkbox.js');
var ConsentText = require('../../shared/ConsentText/ConsentText.js');
var PrimaryButton = require('../../shared/PrimaryButton/PrimaryButton.js');
var CheckoutModalFooter_constants = require('./CheckoutModalFooter.constants.js');
var Img = require('../../shared/Img/Img.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

const VARIANTS_WITH_DISCLAIMER = ["toPayment", "toPlaid", "toConfirmation"];
const CheckoutModalFooter = ({ variant, buttonLabel, guestCheckoutEnabled, consentType, onGoToCollection, submitDisabled, onSubmitClicked, onCloseClicked, }) => {
    // CONSENT:
    const showConsent = consentType && VARIANTS_WITH_DISCLAIMER.includes(variant);
    const consentTextElement = showConsent ? React__default["default"].createElement(ConsentText.ConsentText, null) : null;
    const [{ isFormSubmitted, isFormLoading, isConsentChecked, }, setConsentState] = React.useState({
        isFormSubmitted: false,
        isFormLoading: false,
        isConsentChecked: showConsent && consentType === "checkbox" ? false : true,
    });
    const showConsentError = isFormSubmitted && !isConsentChecked;
    const handleConsentClicked = React.useCallback((_, checked) => {
        setConsentState((prevConsentState) => ({
            isFormSubmitted: prevConsentState.isFormSubmitted,
            isFormLoading: prevConsentState.isFormLoading,
            isConsentChecked: checked,
        }));
    }, []);
    // COLLECTION BUTTON (ConfirmationView-specific):
    const handleCollectionClicked = React.useCallback((e) => {
        e.preventDefault();
        // TODO: In order to implement be functionality below, we need to pass a Link component to PUI to use, and then we
        // can just pass a collectionPathname instead of onGoToCollection:
        // We want to display the link (href) if the user hovers the button or if they click with the wheel or Ctrl + Click,
        // but we don't know what type of routing the parent app is using (Next.js, React Router, etc.) so we just prevent
        // default here and let the parent app handle the routing:
        // console.log(e.ctrlKey, e.button);
        if (onGoToCollection)
            onGoToCollection();
    }, [onGoToCollection]);
    // PRIMARY BUTTON:
    const primaryButtonVisible = variant !== "toGuestCheckout" || guestCheckoutEnabled;
    const primaryButtonLabel = buttonLabel || CheckoutModalFooter_constants.LABELS_BY_VARIANT[variant];
    const PrimaryButtonIcon = CheckoutModalFooter_constants.ICONS_BY_VARIANT[variant];
    const handleSubmitClicked = React.useCallback(() => tslib_es6.__awaiter(void 0, void 0, void 0, function* () {
        if (!onSubmitClicked)
            return;
        setConsentState({
            isFormSubmitted: true,
            isFormLoading: true,
            isConsentChecked,
        });
        const promiseOrResult = onSubmitClicked(isConsentChecked);
        const result = promiseUtils.isPromise(promiseOrResult) ? yield promiseOrResult : promiseOrResult;
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
    const handleCancelClicked = React.useCallback((e) => {
        e.preventDefault();
        if (onCloseClicked)
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
        onGoToCollection && (React__default["default"].createElement(PrimaryButton.PrimaryButton, { onClick: handleCollectionClicked, disabled: submitDisabled || isFormLoading, sx: { mb: 2 } }, "View Collection")),
        primaryButtonVisible && (React__default["default"].createElement(PrimaryButton.PrimaryButton, { onClick: onSubmitClicked ? handleSubmitClicked : undefined, type: onSubmitClicked ? "button" : "submit", endIcon: isFormLoading ? React__default["default"].createElement(material.CircularProgress, { color: "inherit", size: "1em" }) : (PrimaryButtonIcon && React__default["default"].createElement(PrimaryButtonIcon, null)), disabled: submitDisabled || isFormLoading }, primaryButtonLabel)),
        variant !== "toMarketplace" && onCloseClicked && (React__default["default"].createElement(material.Typography, { sx: primaryButtonVisible ? { pt: 2 } : undefined },
            primaryButtonVisible ? "or " : null,
            React__default["default"].createElement(material.Link, { sx: { color: "text.primary" }, href: "", onClick: handleCancelClicked }, "Cancel and Return to Marketplace"))),
        showConsent && consentType === "disclaimer" && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Divider, { sx: { my: 5, width: "100%" } }),
            React__default["default"].createElement(material.Typography, { sx: { maxWidth: themeConstants.SM_MOBILE_MAX_WIDTH }, align: "center" },
                "By placing an order you affirm that you ",
                consentTextElement))),
        showConsent && consentType === "circle" && (React__default["default"].createElement(React__default["default"].Fragment, null,
            React__default["default"].createElement(material.Divider, { sx: { my: 5, width: "100%" } }),
            React__default["default"].createElement(material.Box, { display: "flex" },
                React__default["default"].createElement(material.Typography, { sx: { maxWidth: themeConstants.SM_MOBILE_MAX_WIDTH, marginRight: 1 }, align: "center" }, "Payments powered by"),
                React__default["default"].createElement(material.Link, { href: "https://www.circle.com/en/", target: "_blank", rel: "noopener noreferrer" },
                    React__default["default"].createElement(Img.Img, { src: themeConstants.CIRCLE_LOGO_IMAGE_SRC, height: 20 })))))));
};

exports.CheckoutModalFooter = CheckoutModalFooter;
//# sourceMappingURL=CheckoutModalFooter.js.map
