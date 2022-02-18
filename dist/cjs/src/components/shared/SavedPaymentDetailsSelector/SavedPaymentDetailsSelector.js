'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var InputGroupLabel = require('../InputGroupLabel/InputGroupLabel.js');
var Add = require('../../../../node_modules/@mui/icons-material/Add.js');
var StackList = require('../StackList/StackList.js');
var SecondaryButton = require('../SecondaryButton/SecondaryButton.js');
var PaymentDetailsItem = require('../../payments/PaymentDetailsItem/Item/PaymentDetailsItem.js');
var CheckoutModalFooter = require('../../payments/CheckoutModalFooter/CheckoutModalFooter.js');
var React = require('react');
var material = require('@mui/material');
var theme = require('../../../config/theme/theme.js');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);

function validateCvv(isCvvRequired, cvv) {
    return !isCvvRequired || cvv.length === 3 || cvv.length === 4;
}
const SavedPaymentDetailsSelector = ({ showLoader, savedPaymentMethods, selectedPaymentMethodId, onNew, onDelete, onPick, onCvvSelected, onNext, onClose, consentType, privacyHref, termsOfUseHref, }) => {
    const isCvvRequired = React.useMemo(() => {
        const selectedPaymentMethod = savedPaymentMethods.find(savedPaymentMethod => savedPaymentMethod.id === selectedPaymentMethodId);
        return (selectedPaymentMethod === null || selectedPaymentMethod === void 0 ? void 0 : selectedPaymentMethod.type) === "CreditCard";
    }, [savedPaymentMethods, selectedPaymentMethodId]);
    const [{ isFormSubmitted, cvv, }, setSelectorState] = React.useState({
        isFormSubmitted: false,
        cvv: "",
    });
    React.useEffect(() => {
        // Reset CVV if user selects a different payment method:
        setSelectorState(({ isFormSubmitted }) => ({ isFormSubmitted, cvv: "" }));
    }, [selectedPaymentMethodId]);
    const isCvvOk = validateCvv(isCvvRequired, cvv);
    const cvvError = isFormSubmitted && !isCvvOk;
    const handleNextClicked = React.useCallback((canSubmit) => {
        if (canSubmit && selectedPaymentMethodId && isCvvOk) {
            onCvvSelected(cvv);
            onNext();
            return;
        }
        setSelectorState(({ cvv }) => ({ isFormSubmitted: true, cvv }));
    }, [selectedPaymentMethodId, cvv, isCvvOk, onCvvSelected, onNext]);
    const handleCvvChange = React.useCallback((e) => {
        const cvv = e.currentTarget.value || "";
        setSelectorState(({ isFormSubmitted }) => ({ isFormSubmitted, cvv }));
    }, []);
    const getPaymentMethodId = React.useCallback((savedPaymentMethod) => savedPaymentMethod.id, []);
    return (React__default["default"].createElement(React__default["default"].Fragment, null,
        React__default["default"].createElement(material.Box, { sx: { position: "relative", mb: consentType === "checkbox" ? 5 : 0 } },
            showLoader ? (React__default["default"].createElement(material.Box, { sx: {
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    background: theme$1 => material.alpha(theme$1.palette.background.default, theme.OVERLAY_OPACITY),
                    zIndex: 100,
                } },
                React__default["default"].createElement(material.CircularProgress, { color: "secondary" }))) : null,
            React__default["default"].createElement(InputGroupLabel.InputGroupLabel, { sx: { mt: 2.5, mb: 1.5 } }, "Saved Payment Methods"),
            React__default["default"].createElement(StackList.StackList, { data: savedPaymentMethods, additionalProps: (savedPaymentMethod) => ({
                    active: savedPaymentMethod.id === selectedPaymentMethodId,
                    disabled: showLoader,
                    onDelete,
                    onPick,
                    cvvError,
                    onCvvChange: handleCvvChange,
                }), component: PaymentDetailsItem.PaymentDetailsItem, itemKey: getPaymentMethodId, deps: [selectedPaymentMethodId, showLoader, onDelete, onPick, cvvError, handleCvvChange] }),
            cvvError && (React__default["default"].createElement(material.Typography, { variant: "caption", component: "p", sx: { mt: 2, color: theme => theme.palette.warning.dark } }, "You must enter a valid CVV number.")),
            React__default["default"].createElement(SecondaryButton.SecondaryButton, { onClick: onNew, startIcon: React__default["default"].createElement(Add["default"], null), sx: { mt: 2.5 }, disabled: showLoader }, "Add New Payment Method"),
            isFormSubmitted && !selectedPaymentMethodId && (React__default["default"].createElement(material.Typography, { variant: "caption", component: "p", sx: { mt: 2, color: theme => theme.palette.warning.dark } }, "You must select a saved and approved payment method or create a new one."))),
        React__default["default"].createElement(CheckoutModalFooter.CheckoutModalFooter, { variant: "toConfirmation", consentType: consentType, privacyHref: privacyHref, termsOfUseHref: termsOfUseHref, onSubmitClicked: handleNextClicked, onCloseClicked: onClose })));
};

exports.SavedPaymentDetailsSelector = SavedPaymentDetailsSelector;
//# sourceMappingURL=SavedPaymentDetailsSelector.js.map
